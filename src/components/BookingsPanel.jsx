import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { supabase } from '../lib/supabase';

const IconBooking = () => <span className="text-xl">📋</span>;

export default function BookingsPanel() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBookings();

        // Real-time subscription
        const channel = supabase
            .channel('public:bookings')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'bookings' }, (payload) => {
                fetchBookings(); // Refresh on new booking
            })
            .subscribe();

        return () => supabase.removeChannel(channel);
    }, []);

    async function fetchBookings() {
        try {
            const { data, error } = await supabase
                .from('bookings')
                .select('*')
                .order('created_at', { ascending: false })
                .limit(20);

            if (data) {
                setBookings(data);
            }
        } catch (e) {
            console.error('Failed to fetch bookings:', e);
        } finally {
            setLoading(false);
        }
    }

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmed': return 'text-emerald-500 bg-emerald-500/10';
            case 'pending': return 'text-yellow-500 bg-yellow-500/10';
            case 'cancelled': return 'text-red-500 bg-red-500/10';
            default: return 'text-gray-500 bg-gray-500/10';
        }
    };

    return (
        <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-white">
                <IconBooking /> Recent Bookings
            </h2>

            {loading ? (
                <div className="text-center text-gray-400 py-8">Loading bookings...</div>
            ) : bookings.length === 0 ? (
                <div className="text-center text-gray-400 py-8">No bookings yet</div>
            ) : (
                <div className="space-y-3">
                    {bookings.map((booking) => (
                        <div key={booking.id} className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-gold/20 transition-all">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-bold text-white">{booking.customer_name}</h3>
                                    <p className="text-xs text-gray-400">{booking.customer_email}</p>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(booking.status)}`}>
                                    {booking.status}
                                </span>
                            </div>

                            <div className="grid grid-cols-2 gap-2 text-sm mt-3">
                                <div>
                                    <span className="text-gray-500">From:</span>
                                    <span className="text-white ml-1">{booking.pickup_location}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">To:</span>
                                    <span className="text-white ml-1">{booking.dropoff_location}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Vehicle:</span>
                                    <span className="text-gold ml-1">{booking.vehicle_type}</span>
                                </div>
                                <div>
                                    <span className="text-gray-500">Date:</span>
                                    <span className="text-white ml-1">{booking.pickup_date}</span>
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 mt-2 pt-2 border-t border-white/5">
                                📞 {booking.customer_phone} • 👥 {booking.passengers} pax • 🧳 {booking.luggage} bags
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
