import { useState } from 'preact/hooks';

interface Props {
    locations: Record<string, any>;
    vehicles: any[];
}

export const BookingWidget = ({ locations, vehicles }: Props) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        pickup: 'jeddah-airport',
        dropoff: 'makkah-city',
        vehicle: 'camry',
        passengers: '2',
        luggage: '2',
        date: '',
        time: '',
        notes: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/booking', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                setMessage('✅ Booking confirmed! Check your email.');
                // Reset form
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    pickup: 'jeddah-airport',
                    dropoff: 'makkah-city',
                    vehicle: 'camry',
                    passengers: '2',
                    luggage: '2',
                    date: '',
                    time: '',
                    notes: ''
                });
            } else {
                setMessage('❌ ' + result.error);
            }
        } catch (error) {
            setMessage('❌ Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const updateField = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <div class="booking-widget bg-glass p-6 rounded-xl shadow-gold max-w-md w-full mx-auto backdrop-blur-md border border-white/10">
            <h3 class="text-2xl font-bold text-white mb-6 font-heading text-center">
                Book Your <span class="text-gold">Umrah Ride</span>
            </h3>

            <form onSubmit={handleSubmit} class="space-y-4">
                {/* Customer Info */}
                <div class="form-group">
                    <label class="block text-sm text-gray-300 mb-1">Full Name *</label>
                    <input
                        type="text"
                        required
                        value={formData.name}
                        onInput={(e) => updateField('name', (e.target as HTMLInputElement).value)}
                        class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        placeholder="Ahmed Ali"
                    />
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Email *</label>
                        <input
                            type="email"
                            required
                            value={formData.email}
                            onInput={(e) => updateField('email', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors text-sm"
                            placeholder="you@email.com"
                        />
                    </div>
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Phone *</label>
                        <input
                            type="tel"
                            required
                            value={formData.phone}
                            onInput={(e) => updateField('phone', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors text-sm"
                            placeholder="+966..."
                        />
                    </div>
                </div>

                {/* Trip Details */}
                <div class="form-group">
                    <label class="block text-sm text-gray-300 mb-1">Pickup Location *</label>
                    <select
                        value={formData.pickup}
                        onChange={(e) => updateField('pickup', (e.target as HTMLSelectElement).value)}
                        class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                    >
                        {Object.values(locations).map(loc => (
                            <option value={loc.id} key={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <div class="form-group">
                    <label class="block text-sm text-gray-300 mb-1">Dropoff Location *</label>
                    <select
                        value={formData.dropoff}
                        onChange={(e) => updateField('dropoff', (e.target as HTMLSelectElement).value)}
                        class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                    >
                        {Object.values(locations).map(loc => (
                            <option value={loc.id} key={loc.id}>{loc.name}</option>
                        ))}
                    </select>
                </div>

                <div class="form-group">
                    <label class="block text-sm text-gray-300 mb-1">Select Vehicle *</label>
                    <select
                        value={formData.vehicle}
                        onChange={(e) => updateField('vehicle', (e.target as HTMLSelectElement).value)}
                        class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                    >
                        {vehicles.map(v => (
                            <option value={v.id} key={v.id}>{`${v.name} (${v.capacity_pax} Pax)`}</option>
                        ))}
                    </select>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Passengers</label>
                        <input
                            type="number"
                            min="1"
                            max="26"
                            value={formData.passengers}
                            onInput={(e) => updateField('passengers', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        />
                    </div>
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Luggage</label>
                        <input
                            type="number"
                            min="0"
                            max="20"
                            value={formData.luggage}
                            onInput={(e) => updateField('luggage', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-3">
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Date *</label>
                        <input
                            type="date"
                            required
                            value={formData.date}
                            onInput={(e) => updateField('date', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        />
                    </div>
                    <div class="form-group">
                        <label class="block text-sm text-gray-300 mb-1">Time *</label>
                        <input
                            type="time"
                            required
                            value={formData.time}
                            onInput={(e) => updateField('time', (e.target as HTMLInputElement).value)}
                            class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        />
                    </div>
                </div>

                <div class="form-group">
                    <label class="block text-sm text-gray-300 mb-1">Special Requests</label>
                    <textarea
                        value={formData.notes}
                        onInput={(e) => updateField('notes', (e.target as HTMLTextAreaElement).value)}
                        class="w-full bg-black/50 border border-gray-600 text-white rounded-lg p-3 focus:border-gold focus:outline-none transition-colors"
                        rows={2}
                        placeholder="Child seat, extra stops, etc."
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    class={`w-full btn btn-primary text-lg mt-4 cursor-pointer ${loading ? 'opacity-50' : ''}`}
                >
                    {loading ? '⏳ Processing...' : '📧 Confirm Booking'}
                </button>

                {message && (
                    <div class={`text-center text-sm p-3 rounded ${message.includes('✅') ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                        {message}
                    </div>
                )}

                <p class="text-xs text-center text-gray-400 mt-2">
                    ⚡ Instant confirmation • Email notification
                </p>
            </form>
        </div>
    );
};
