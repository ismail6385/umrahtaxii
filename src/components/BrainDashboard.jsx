
import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { supabase } from '../lib/supabase';

// Icons (Simple SVG placeholders)
const IconRadar = () => <span className="text-xl">📡</span>;
const IconBrain = () => <span className="text-xl">🧠</span>;
const IconRevenue = () => <span className="text-xl">💰</span>;
const IconSEO = () => <span className="text-xl">🔎</span>;
const IconSettings = () => <span className="text-xl">⚙️</span>;

export default function BrainDashboard({ initialData }) {
    const [data, setData] = useState(initialData);
    const [connected, setConnected] = useState(false);
    const [toggles, setToggles] = useState({
        autoPage: true,
        autoLinking: true,
        autoHomepage: true,
        autoFAQ: true,
        autoLang: false
    });

    // Fetch live data from Supabase
    useEffect(() => {
        async function fetchLiveBrain() {
            try {
                // 1. Fetch Radar
                const { data: radarData } = await supabase.from('brain_radar').select('*').limit(5);
                const { data: decisionsData } = await supabase.from('brain_decisions').select('*').limit(5).order('created_at', { ascending: false });
                const { data: metricsData } = await supabase.from('brain_metrics').select('*');

                if (radarData && radarData.length > 0) {
                    setConnected(true);

                    // Transform Metric Data
                    const revenue = {
                        topRoute: metricsData?.find(m => m.metric_key === 'topRoute')?.metric_value || "Loading...",
                        topHotel: metricsData?.find(m => m.metric_key === 'topHotel')?.metric_value || "Loading...",
                        highValueCountry: metricsData?.find(m => m.metric_key === 'highValueCountry')?.metric_value || "Loading..."
                    };

                    const seo = {
                        google: {
                            rank: metricsData?.find(m => m.metric_key === 'rank')?.metric_value || "-",
                            status: metricsData?.find(m => m.metric_key === 'status')?.metric_value || "-"
                        },
                        chatgpt: {
                            sentiment: metricsData?.find(m => m.category === 'seo_chatgpt')?.metric_value || "neutral"
                        },
                        bing: {
                            indexed: metricsData?.find(m => m.metric_key === 'indexed')?.metric_value || "0"
                        }
                    };

                    setData({
                        systemStatus: "Live Sync",
                        radar: radarData.map(r => ({
                            signal: r.signal_name,
                            value: r.signal_value,
                            type: r.type,
                            trend: r.trend
                        })),
                        decisions: decisionsData.map(d => ({
                            action: d.action,
                            detail: d.detail,
                            time: "Just now",
                            impact: d.impact
                        })),
                        revenue,
                        seo
                    });
                }
            } catch (e) {
                console.error("Brain connection failed:", e);
            }
        }

        fetchLiveBrain();

        // Subscribe to real-time changes
        const channel = supabase
            .channel('public:brain_radar')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'brain_radar' }, (payload) => {
                fetchLiveBrain(); // Re-fetch on new signal
            })
            .subscribe();

        return () => supabase.removeChannel(channel);

    }, []);

    const toggleSwitch = (key) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="bg-[#0A0A0F] text-white p-6 min-h-screen font-sans border border-white/10 rounded-xl shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-3">
                        <span className="text-gold">●</span> Website Brain Dashboard
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">Real-time Autonomous Decision Engine</p>
                </div>
                <div className="flex items-center gap-4">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${connected ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'}`}>
                        <span className={`animate-pulse w-2 h-2 rounded-full ${connected ? 'bg-emerald-500' : 'bg-yellow-500'}`}></span>
                        {connected ? 'SUPABASE LINKED' : 'OFFLINE MODE'}
                    </span>
                    <span className="text-gray-500 text-xs font-mono">v3.0.0-MCP</span>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">

                {/* 1. Live Demand Radar */}
                <div className="md:col-span-2 bg-gray-900/50 border border-white/10 rounded-xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <IconRadar />
                    </div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-gold">
                        <IconRadar /> Live Demand Radar
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {data.radar.map((item, idx) => (
                            <div key={idx} className="bg-black/40 p-4 rounded-lg border border-white/5 hover:border-gold/20 transition-all group">
                                <div className="text-xs text-gray-500 uppercase tracking-widest mb-1">{item.signal}</div>
                                <div className="font-bold text-lg group-hover:text-emerald-400 transition-colors truncate">
                                    {item.value}
                                </div>
                                <div className="flex items-center gap-1 mt-2 text-xs">
                                    {item.trend === 'up' && <span className="text-emerald-500">▲ Rising</span>}
                                    {item.trend === 'rocket' && <span className="text-purple-500">🚀 Viral</span>}
                                    {item.trend === 'stable' && <span className="text-blue-500">● Stable</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 2. Control Switches */}
                <div className="bg-gray-900/50 border border-white/10 rounded-xl p-6">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                        <IconSettings /> AI Controls
                    </h2>
                    <div className="space-y-4">
                        {Object.entries(toggles).map(([key, isActive]) => (
                            <div key={key} className="flex items-center justify-between">
                                <span className="text-gray-300 capitalize">{key.replace(/auto/g, 'Auto ').replace(/([A-Z])/g, ' $1').trim()}</span>
                                <button
                                    onClick={() => toggleSwitch(key)}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${isActive ? 'bg-emerald-500' : 'bg-gray-700'}`}
                                >
                                    <span className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${isActive ? 'translate-x-6' : 'translate-x-0'}`} />
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-8 pt-4 border-t border-white/10 text-xs text-gray-500 text-center">
                        Caution: Disabling 'Auto Page' will stop growth engine.
                    </div>
                </div>

                {/* 3. AI Decisions Feed */}
                <div className="md:col-span-1 bg-gray-900/50 border border-white/10 rounded-xl p-6 h-full">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-purple-400">
                        <IconBrain /> AI Decisions Feed
                    </h2>
                    <div className="space-y-4 relative">
                        {/* Connecting Line */}
                        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-white/5"></div>

                        {data.decisions.map((decision, idx) => (
                            <div key={idx} className="relative pl-6">
                                <div className="absolute left-[5px] top-2 w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                <div className="text-xs text-gray-500 mb-0.5">{decision.time}</div>
                                <div className="text-white font-medium text-sm">{decision.action}</div>
                                <div className="text-xs text-gray-400">{decision.detail}</div>
                            </div>
                        ))}
                        <div className="relative pl-6 animate-pulse opacity-50">
                            <div className="absolute left-[5px] top-2 w-2 h-2 rounded-full bg-gray-500"></div>
                            <div className="text-xs text-gray-500">Listening to signals...</div>
                        </div>
                    </div>
                </div>

                {/* 4. Revenue & SEO */}
                <div className="md:col-span-2 grid md:grid-cols-2 gap-6">
                    {/* Revenue */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gold">
                            <IconRevenue /> Revenue Intelligence
                        </h2>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">Top Performing Route</span>
                                <span className="text-white font-mono text-sm">{data.revenue.topRoute}</span>
                            </div>
                            <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                <span className="text-gray-400 text-sm">Highest Conversion Hotel</span>
                                <span className="text-white font-mono text-sm">{data.revenue.topHotel}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">Best Value Country</span>
                                <span className="text-emerald-400 font-mono text-sm font-bold">{data.revenue.highValueCountry}</span>
                            </div>
                        </div>
                    </div>

                    {/* SEO Visibility */}
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-blue-400">
                            <IconSEO /> SEO & AI Visibility
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-lg p-3 text-center">
                                <h3 className="text-xs text-gray-500 uppercase">Google Rank</h3>
                                <div className="text-2xl font-bold text-white mt-1">#{data.seo.google.rank}</div>
                                <div className="text-xs text-emerald-500">▲ {data.seo.google.status}</div>
                            </div>
                            <div className="bg-white/5 rounded-lg p-3 text-center">
                                <h3 className="text-xs text-gray-500 uppercase">Indexing</h3>
                                <div className="text-2xl font-bold text-white mt-1">{data.seo.bing.indexed}</div>
                                <div className="text-xs text-blue-500">Pages Live</div>
                            </div>
                            <div className="col-span-2 bg-white/5 rounded-lg p-3 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-lg">🤖</div>
                                    <div className="text-sm">
                                        <div className="text-white font-bold">ChatGPT Status</div>
                                        <div className="text-xs text-emerald-400">{data.seo.chatgpt.sentiment} Sentiment</div>
                                    </div>
                                </div>
                                <div className="text-xs px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded border border-emerald-500/20">
                                    Mentioned
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
