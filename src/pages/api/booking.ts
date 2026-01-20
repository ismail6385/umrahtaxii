import type { APIRoute } from 'astro';
import { Resend } from 'resend';
import { supabase } from '../../lib/supabase';

const resend = new Resend('re_UERhEqbY_AvrhT7GTLt1rsGTVpzdzsaUg');

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== Booking API Called ===');
    console.log('Content-Type:', request.headers.get('content-type'));

    const data = await request.json();
    console.log('Received data:', data);

    // 1. Save to Supabase
    const { data: booking, error: dbError } = await supabase
      .from('bookings')
      .insert([{
        customer_name: data.name,
        customer_email: data.email,
        customer_phone: data.phone,
        pickup_location: data.pickup,
        dropoff_location: data.dropoff,
        vehicle_type: data.vehicle,
        passengers: parseInt(data.passengers),
        luggage: parseInt(data.luggage),
        pickup_date: data.date,
        pickup_time: data.time,
        special_requests: data.notes || '',
        status: 'pending'
      }])
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save booking');
    }

    // 2. Send Email Notification via Resend
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C4A975;">🚕 New Booking Request - Umrah Taxi</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h3>Customer Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          
          <h3>Trip Details:</h3>
          <p><strong>From:</strong> ${data.pickup}</p>
          <p><strong>To:</strong> ${data.dropoff}</p>
          <p><strong>Vehicle:</strong> ${data.vehicle}</p>
          <p><strong>Passengers:</strong> ${data.passengers}</p>
          <p><strong>Luggage:</strong> ${data.luggage}</p>
          <p><strong>Date:</strong> ${data.date}</p>
          <p><strong>Time:</strong> ${data.time}</p>
          
          ${data.notes ? `<p><strong>Special Requests:</strong> ${data.notes}</p>` : ''}
          
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Booking ID: ${booking.id}<br>
            Received: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;

    await resend.emails.send({
      from: 'Umrah Taxi <bookings@umrahtaxi.site>',
      to: 'umrahtaxi22@gmail.com',
      subject: `🚕 New Booking: ${data.pickup} → ${data.dropoff}`,
      html: emailHtml
    });

    // 3. Send confirmation to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C4A975;">✅ Booking Confirmed - Umrah Taxi</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for choosing Umrah Taxi! Your booking request has been received.</p>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Your Trip Details:</h3>
          <p><strong>From:</strong> ${data.pickup}</p>
          <p><strong>To:</strong> ${data.dropoff}</p>
          <p><strong>Vehicle:</strong> ${data.vehicle}</p>
          <p><strong>Date & Time:</strong> ${data.date} at ${data.time}</p>
          <p><strong>Booking ID:</strong> ${booking.id}</p>
        </div>
        
        <p>Our team will contact you shortly via WhatsApp or phone to confirm your booking.</p>
        <p style="color: #666; font-size: 14px;">
          For immediate assistance, contact us on WhatsApp: +966 XX XXX XXXX
        </p>
        
        <p>JazakAllah Khair,<br><strong>Umrah Taxi Team</strong></p>
      </div>
    `;

    await resend.emails.send({
      from: 'Umrah Taxi <bookings@umrahtaxi.site>',
      to: data.email,
      subject: '✅ Booking Confirmed - Umrah Taxi',
      html: customerEmailHtml
    });

    return new Response(JSON.stringify({
      success: true,
      bookingId: booking.id,
      message: 'Booking confirmed! Check your email for details.'
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error: any) {
    console.error('Booking error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error?.message || 'Booking failed'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
