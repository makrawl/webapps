"use client";

export default function Dashboard() {
  return (
    <div className="min-h-screen px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <h1
          className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
          style={{
            fontFamily: "var(--font-cormorant)",
            color: "var(--makra-foreground-dark)",
          }}
        >
          <span style={{ color: "var(--makra-primary-green)" }}>Dashboard</span>
        </h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: "var(--makra-background-light-100)",
              border: "1px solid var(--makra-background-light-200)",
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-100)",
              }}
            >
              Total Queries
            </p>
            <p
              className="text-3xl font-bold"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-foreground-dark)",
              }}
            >
              0
            </p>
          </div>

          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: "var(--makra-background-light-100)",
              border: "1px solid var(--makra-background-light-200)",
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-100)",
              }}
            >
              Cost Saved
            </p>
            <p
              className="text-3xl font-bold"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-primary-green)",
              }}
            >
              $0.00
            </p>
          </div>

          <div
            className="rounded-lg p-6"
            style={{
              backgroundColor: "var(--makra-background-light-100)",
              border: "1px solid var(--makra-background-light-200)",
            }}
          >
            <p
              className="text-sm font-medium mb-1"
              style={{
                fontFamily: "var(--font-open-sans)",
                color: "var(--makra-foreground-dark-100)",
              }}
            >
              Active Sessions
            </p>
            <p
              className="text-3xl font-bold"
              style={{
                fontFamily: "var(--font-cormorant)",
                color: "var(--makra-foreground-dark)",
              }}
            >
              1
            </p>
          </div>
        </div>

        {/* Recent Activity */}
        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: "var(--makra-background-light-100)",
            border: "1px solid var(--makra-background-light-200)",
          }}
        >
          <h2
            className="text-xl font-semibold mb-4"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark)",
            }}
          >
            Recent Activity
          </h2>
          <p
            className="text-base text-center py-8"
            style={{
              fontFamily: "var(--font-open-sans)",
              color: "var(--makra-foreground-dark-100)",
            }}
          >
            No recent activity to display.
          </p>
        </div>
      </div>
    </div>
  );
}
