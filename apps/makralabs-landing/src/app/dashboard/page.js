"use client";

const stats = [
  { label: "Total Queries", value: "0", color: "var(--makra-foreground-dark)" },
  { label: "Cost Saved", value: "$0.00", color: "var(--makra-primary-green)" },
  { label: "Active Sessions", value: "1", color: "var(--makra-foreground-dark)" },
];

export default function DashboardPage() {
  return (
    <div className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="makra-page-title mb-8">
          <span className="text-primary">Dashboard</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="makra-card p-6">
              <h3 className="makra-label mb-2">{stat.label}</h3>
              <p
                className="text-3xl font-bold"
                style={{
                  fontFamily: "var(--font-cormorant)",
                  color: stat.color,
                }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="makra-card p-6">
          <h2 className="makra-heading mb-4">Recent Activity</h2>
          <p className="makra-text text-center py-8">
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}
