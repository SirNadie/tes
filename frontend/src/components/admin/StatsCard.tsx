interface StatsCardProps {
    title: string;
    value: string;
    icon: string;
    iconBgColor: string;
    iconColor: string;
    trend?: {
        value: string;
        isPositive: boolean;
        label: string;
    };
    liveIndicator?: boolean;
    glowColor: string;
}

export default function StatsCard({
    title,
    value,
    icon,
    iconBgColor,
    iconColor,
    trend,
    liveIndicator,
    glowColor,
}: StatsCardProps) {
    return (
        <div className="bg-surface-dark border border-border-dark rounded-xl p-5 flex flex-col gap-2 relative overflow-hidden group">
            <div className="flex justify-between items-start z-10">
                <div>
                    <p className="text-gray-400 text-sm font-medium">{title}</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
                </div>
                <div className={`p-2 ${iconBgColor} rounded-lg ${iconColor}`}>
                    <span className="material-symbols-outlined">{icon}</span>
                </div>
            </div>

            <div className="flex items-center gap-2 mt-2 z-10">
                {trend && (
                    <>
                        <span
                            className={`flex items-center text-xs font-bold px-1.5 py-0.5 rounded ${trend.isPositive
                                    ? 'text-green-500 bg-green-500/10'
                                    : 'text-red-500 bg-red-500/10'
                                }`}
                        >
                            <span className="material-symbols-outlined text-[14px] mr-0.5">
                                {trend.isPositive ? 'trending_up' : 'trending_down'}
                            </span>
                            {trend.value}
                        </span>
                        <span className="text-gray-500 text-xs">{trend.label}</span>
                    </>
                )}

                {liveIndicator && (
                    <span className="flex items-center text-gray-400 text-xs font-medium">
                        <span className="size-2 rounded-full bg-green-500 mr-1.5 animate-pulse"></span>
                        Live now
                    </span>
                )}
            </div>

            {/* Decorative gradient background */}
            <div
                className={`absolute -right-4 -bottom-4 w-24 h-24 ${glowColor} rounded-full blur-2xl group-hover:opacity-150 transition-all`}
            ></div>
        </div>
    );
}
