export default function RevenueChart() {
    return (
        <div className="bg-surface-dark border border-border-dark rounded-xl p-6">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h3 className="text-lg font-bold text-white">Revenue vs Expenses</h3>
                    <p className="text-sm text-gray-400">Financial performance over the last 30 days</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-1 bg-surface-highlight rounded-lg border border-border-dark">
                        <span className="size-2 rounded-full bg-primary"></span>
                        <span className="text-xs text-white font-medium">Revenue</span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1 bg-surface-highlight rounded-lg border border-border-dark">
                        <span className="size-2 rounded-full bg-gray-500"></span>
                        <span className="text-xs text-white font-medium">Expenses</span>
                    </div>
                </div>
            </div>

            {/* Chart SVG */}
            <div className="w-full h-[300px] relative">
                <svg
                    className="w-full h-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 1000 300"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {/* Grid lines */}
                    <line x1="0" y1="0" x2="1000" y2="0" stroke="#2a3b4d" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="75" x2="1000" y2="75" stroke="#2a3b4d" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="150" x2="1000" y2="150" stroke="#2a3b4d" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="225" x2="1000" y2="225" stroke="#2a3b4d" strokeWidth="1" strokeDasharray="4 4" />
                    <line x1="0" y1="300" x2="1000" y2="300" stroke="#2a3b4d" strokeWidth="1" />

                    {/* Gradient Defs */}
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#137fec" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#137fec" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area Path (Revenue) */}
                    <path
                        d="M0,250 C100,240 150,150 250,180 C350,210 400,100 500,120 C600,140 650,50 750,80 C850,110 900,20 1000,40 V300 H0 Z"
                        fill="url(#chartGradient)"
                    />

                    {/* Line Path (Revenue) */}
                    <path
                        d="M0,250 C100,240 150,150 250,180 C350,210 400,100 500,120 C600,140 650,50 750,80 C850,110 900,20 1000,40"
                        fill="none"
                        stroke="#137fec"
                        strokeWidth="3"
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Line Path (Expenses) */}
                    <path
                        d="M0,280 C80,270 180,250 250,260 C320,270 380,220 500,230 C620,240 680,200 750,210 C820,220 920,180 1000,190"
                        fill="none"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeDasharray="5,5"
                        vectorEffect="non-scaling-stroke"
                    />

                    {/* Hover Tooltip Indicator */}
                    <circle cx="750" cy="80" r="6" fill="#137fec" stroke="white" strokeWidth="2" />
                    <line x1="750" y1="80" x2="750" y2="300" stroke="#2a3b4d" strokeWidth="1" strokeDasharray="2 2" />

                    {/* Tooltip Box */}
                    <g transform="translate(680, 20)">
                        <rect width="140" height="50" rx="4" fill="#1c2a38" stroke="#2a3b4d" />
                        <text x="10" y="20" fontFamily="Inter" fontSize="10" fill="#9ca3af">Oct 24, 2023</text>
                        <text x="10" y="38" fontFamily="Inter" fontSize="14" fontWeight="bold" fill="white">$42,305.00</text>
                    </g>
                </svg>
            </div>
        </div>
    );
}
