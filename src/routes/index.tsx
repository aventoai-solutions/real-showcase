import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CreditCard,
  Filter,
  LayoutDashboard,
  LifeBuoy,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Users,
  Wallet,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Business Dashboard — Operations & Analytics Demo" },
      {
        name: "description",
        content:
          "Live demo of a custom business dashboard: revenue analytics, customer growth, order pipeline and daily operations in one control center.",
      },
      { property: "og:title", content: "Business Dashboard — Operations & Analytics Demo" },
      {
        property: "og:description",
        content:
          "Custom dashboard for managing customers, analytics and daily business operations. Built with React, Node.js and PostgreSQL.",
      },
    ],
  }),
  component: DashboardPage,
});

const revenueSeries = [
  { m: "Jan", revenue: 48200, target: 45000 },
  { m: "Feb", revenue: 52900, target: 48000 },
  { m: "Mar", revenue: 49400, target: 51000 },
  { m: "Apr", revenue: 61800, target: 54000 },
  { m: "May", revenue: 67350, target: 58000 },
  { m: "Jun", revenue: 64100, target: 61000 },
  { m: "Jul", revenue: 73900, target: 65000 },
  { m: "Aug", revenue: 81240, target: 69000 },
  { m: "Sep", revenue: 78600, target: 73000 },
  { m: "Oct", revenue: 89100, target: 77000 },
  { m: "Nov", revenue: 96420, target: 82000 },
  { m: "Dec", revenue: 104780, target: 88000 },
];

const ordersSeries = [
  { d: "Mon", completed: 142, refunded: 6 },
  { d: "Tue", completed: 168, refunded: 9 },
  { d: "Wed", completed: 154, refunded: 4 },
  { d: "Thu", completed: 191, refunded: 11 },
  { d: "Fri", completed: 226, refunded: 8 },
  { d: "Sat", completed: 178, refunded: 5 },
  { d: "Sun", completed: 131, refunded: 3 },
];

const channels = [
  { name: "Direct", value: 38, color: "var(--chart-1)" },
  { name: "Organic", value: 27, color: "var(--chart-2)" },
  { name: "Referral", value: 21, color: "var(--chart-3)" },
  { name: "Paid Ads", value: 14, color: "var(--chart-4)" },
];

const retention = [
  { w: "W1", rate: 100 },
  { w: "W2", rate: 82 },
  { w: "W3", rate: 71 },
  { w: "W4", rate: 66 },
  { w: "W5", rate: 63 },
  { w: "W6", rate: 61 },
];

const orders = [
  {
    id: "#ORD-10482",
    customer: "Marcus Reid",
    company: "Northline Supply",
    amount: 4820,
    status: "Paid",
    date: "Aug 25, 14:02",
  },
  {
    id: "#ORD-10481",
    customer: "Amelia Chen",
    company: "Vertex Labs",
    amount: 1290,
    status: "Processing",
    date: "Aug 25, 12:47",
  },
  {
    id: "#ORD-10480",
    customer: "Tomasz Nowak",
    company: "Baltic Freight",
    amount: 9640,
    status: "Paid",
    date: "Aug 25, 11:15",
  },
  {
    id: "#ORD-10479",
    customer: "Priya Nair",
    company: "Solace Interiors",
    amount: 730,
    status: "Refunded",
    date: "Aug 24, 18:33",
  },
  {
    id: "#ORD-10478",
    customer: "Daniel Ferreira",
    company: "Atlas Machining",
    amount: 15400,
    status: "Paid",
    date: "Aug 24, 16:20",
  },
  {
    id: "#ORD-10477",
    customer: "Hannah Wolff",
    company: "Kestrel Media",
    amount: 2210,
    status: "Pending",
    date: "Aug 24, 09:58",
  },
];

const activity = [
  { who: "Sofia Marino", what: "approved invoice INV-2291", when: "6 min ago" },
  { who: "System", what: "nightly PostgreSQL backup completed", when: "1 h ago" },
  { who: "Jonas Weber", what: "added 42 SKUs to Warehouse B", when: "3 h ago" },
  { who: "Stripe Webhook", what: "reconciled 118 payouts", when: "5 h ago" },
  { who: "Lena Ortiz", what: "closed support ticket #4471", when: "Yesterday" },
];

const nav = [
  { label: "Overview", icon: LayoutDashboard, active: true },
  { label: "Customers", icon: Users },
  { label: "Orders", icon: ShoppingCart },
  { label: "Inventory", icon: Package },
  { label: "Payments", icon: CreditCard },
  { label: "Payouts", icon: Wallet },
];

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

function DashboardPage() {
  const [range, setRange] = useState<"7d" | "30d" | "12m">("12m");

  const kpis = useMemo(() => {
    const factor = range === "7d" ? 0.06 : range === "30d" ? 0.24 : 1;
    const total = revenueSeries.reduce((s, r) => s + r.revenue, 0) * factor;
    return [
      {
        label: "Total revenue",
        value: currency(total),
        delta: 12.8,
        sub: "vs previous period",
      },
      {
        label: "Active customers",
        value: Math.round(3184 * (factor === 1 ? 1 : 0.42 + factor)).toLocaleString(),
        delta: 4.6,
        sub: "1,204 recurring",
      },
      {
        label: "Orders processed",
        value: Math.round(18492 * factor).toLocaleString(),
        delta: 9.1,
        sub: "avg 3.4 items / order",
      },
      {
        label: "Refund rate",
        value: "1.9%",
        delta: -0.7,
        sub: "target under 2.5%",
      },
    ];
  }, [range]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar px-4 py-6 lg:flex">
          <div className="flex items-center gap-3 px-2">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground"
              style={{ background: "var(--gradient-emerald)" }}
            >
              NX
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Northex</p>
              <p className="text-xs text-muted-foreground">Operations Suite</p>
            </div>
          </div>

          <nav className="mt-8 space-y-1">
            {nav.map((item) => (
              <button
                key={item.label}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                  item.active
                    ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
                {item.label === "Orders" && (
                  <span className="ml-auto rounded-md bg-primary/15 px-1.5 py-0.5 text-[11px] font-semibold text-primary">
                    12
                  </span>
                )}
              </button>
            ))}
          </nav>

          <div className="mt-auto space-y-1">
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground">
              <Settings className="h-4 w-4" /> Settings
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground">
              <LifeBuoy className="h-4 w-4" /> Support
            </button>
            <div className="mt-4 rounded-xl border border-sidebar-border bg-card p-3">
              <p className="text-xs font-medium">Server health</p>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-[92%] rounded-full bg-primary" />
              </div>
              <p className="mt-2 text-[11px] text-muted-foreground">99.98% uptime · 92 ms avg</p>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b border-border bg-background/85 px-6 py-4 backdrop-blur">
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">Business overview</h1>
              <p className="text-xs text-muted-foreground">
                Tuesday, 25 August · data synced 2 minutes ago
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <div className="relative hidden md:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  placeholder="Search orders, customers…"
                  className="h-9 w-64 rounded-lg border border-input bg-card pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground focus:border-ring"
                />
              </div>
              <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:text-foreground">
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-primary" />
              </button>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-secondary text-xs font-semibold">
                  SM
                </div>
                <div className="hidden leading-tight sm:block">
                  <p className="text-xs font-medium">Sofia Marino</p>
                  <p className="text-[11px] text-muted-foreground">Operations lead</p>
                </div>
              </div>
            </div>
          </header>

          <div className="space-y-6 px-6 py-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex rounded-lg border border-border bg-card p-1">
                {(["7d", "30d", "12m"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setRange(r)}
                    className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                      range === r
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {r === "7d" ? "Last 7 days" : r === "30d" ? "Last 30 days" : "Last 12 months"}
                  </button>
                ))}
              </div>
              <button className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
                <Filter className="h-3.5 w-3.5" /> All channels
              </button>
              <span className="ml-auto flex items-center gap-2 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" /> Live sync
                enabled
              </span>
            </div>

            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {kpis.map((k) => {
                const up = k.delta >= 0;
                return (
                  <div
                    key={k.label}
                    className="rounded-2xl border border-border bg-card p-5"
                    style={{ boxShadow: "var(--shadow-panel)" }}
                  >
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      {k.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{k.value}</p>
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-medium ${
                          up
                            ? "bg-primary/15 text-primary"
                            : "bg-destructive/15 text-destructive"
                        }`}
                      >
                        {up ? (
                          <ArrowUpRight className="h-3 w-3" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3" />
                        )}
                        {Math.abs(k.delta)}%
                      </span>
                      <span className="text-muted-foreground">{k.sub}</span>
                    </div>
                  </div>
                );
              })}
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              <div
                className="rounded-2xl border border-border bg-card p-5 xl:col-span-2"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-sm font-semibold">Revenue vs target</h2>
                    <p className="text-xs text-muted-foreground">
                      Recognised revenue, net of refunds
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[var(--chart-1)]" /> Revenue
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-[var(--chart-2)]" /> Target
                    </span>
                  </div>
                </div>
                <div className="mt-4 h-72">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueSeries} margin={{ left: -18, right: 8, top: 8 }}>
                      <defs>
                        <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="m"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        tickFormatter={(v: number) => `${v / 1000}k`}
                      />
                      <Tooltip
                        cursor={{ stroke: "var(--border)" }}
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                          color: "var(--popover-foreground)",
                        }}
                        formatter={(v: number) => currency(v)}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="var(--chart-1)"
                        strokeWidth={2}
                        fill="url(#rev)"
                      />
                      <Area
                        type="monotone"
                        dataKey="target"
                        stroke="var(--chart-2)"
                        strokeWidth={1.5}
                        strokeDasharray="4 4"
                        fill="transparent"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <h2 className="text-sm font-semibold">Acquisition channels</h2>
                <p className="text-xs text-muted-foreground">Share of new customers</p>
                <div className="mt-2 h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={channels}
                        dataKey="value"
                        innerRadius={54}
                        outerRadius={78}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {channels.map((c) => (
                          <Cell key={c.name} fill={c.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                        formatter={(v: number) => `${v}%`}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <ul className="mt-2 space-y-2">
                  {channels.map((c) => (
                    <li key={c.name} className="flex items-center gap-2 text-xs">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: c.color }}
                      />
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className="ml-auto font-medium">{c.value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="grid gap-4 xl:grid-cols-3">
              <div
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <h2 className="text-sm font-semibold">Orders this week</h2>
                <p className="text-xs text-muted-foreground">Completed vs refunded</p>
                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={ordersSeries} margin={{ left: -22, right: 4 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="d"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "var(--muted)" }}
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                      />
                      <Bar dataKey="completed" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                      <Bar dataKey="refunded" fill="var(--chart-5)" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <h2 className="text-sm font-semibold">Cohort retention</h2>
                <p className="text-xs text-muted-foreground">August signups, weekly</p>
                <div className="mt-4 h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={retention} margin={{ left: -22, right: 8 }}>
                      <CartesianGrid stroke="var(--border)" vertical={false} />
                      <XAxis
                        dataKey="w"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                      />
                      <YAxis
                        domain={[40, 100]}
                        tickLine={false}
                        axisLine={false}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
                        tickFormatter={(v: number) => `${v}%`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: "var(--popover)",
                          border: "1px solid var(--border)",
                          borderRadius: 12,
                          fontSize: 12,
                        }}
                        formatter={(v: number) => `${v}%`}
                      />
                      <Line
                        type="monotone"
                        dataKey="rate"
                        stroke="var(--chart-3)"
                        strokeWidth={2}
                        dot={{ r: 3, fill: "var(--chart-3)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div
                className="rounded-2xl border border-border bg-card p-5"
                style={{ boxShadow: "var(--shadow-panel)" }}
              >
                <h2 className="text-sm font-semibold">Recent activity</h2>
                <p className="text-xs text-muted-foreground">Team and system events</p>
                <ul className="mt-4 space-y-4">
                  {activity.map((a) => (
                    <li key={a.what} className="flex gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      <div className="min-w-0">
                        <p className="text-xs leading-relaxed">
                          <span className="font-medium">{a.who}</span>{" "}
                          <span className="text-muted-foreground">{a.what}</span>
                        </p>
                        <p className="text-[11px] text-muted-foreground">{a.when}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section
              className="rounded-2xl border border-border bg-card"
              style={{ boxShadow: "var(--shadow-panel)" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border px-5 py-4">
                <div>
                  <h2 className="text-sm font-semibold">Recent orders</h2>
                  <p className="text-xs text-muted-foreground">
                    Last 24 hours across all sales channels
                  </p>
                </div>
                <button className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground">
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                      <th className="px-5 py-3 font-medium">Order</th>
                      <th className="px-5 py-3 font-medium">Customer</th>
                      <th className="px-5 py-3 font-medium">Company</th>
                      <th className="px-5 py-3 font-medium">Date</th>
                      <th className="px-5 py-3 font-medium">Status</th>
                      <th className="px-5 py-3 text-right font-medium">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o) => (
                      <tr
                        key={o.id}
                        className="border-b border-border/60 transition-colors last:border-0 hover:bg-accent/40"
                      >
                        <td className="px-5 py-3 font-medium">{o.id}</td>
                        <td className="px-5 py-3">{o.customer}</td>
                        <td className="px-5 py-3 text-muted-foreground">{o.company}</td>
                        <td className="px-5 py-3 text-muted-foreground">{o.date}</td>
                        <td className="px-5 py-3">
                          <StatusPill status={o.status} />
                        </td>
                        <td className="px-5 py-3 text-right font-medium tabular-nums">
                          {currency(o.amount)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <p className="pb-4 text-center text-xs text-muted-foreground">
              Demo environment · React · Node.js · PostgreSQL
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Paid: "bg-primary/15 text-primary",
    Processing: "bg-[color-mix(in_oklab,var(--chart-2)_18%,transparent)] text-[var(--chart-2)]",
    Pending: "bg-[color-mix(in_oklab,var(--chart-3)_18%,transparent)] text-[var(--chart-3)]",
    Refunded: "bg-destructive/15 text-destructive",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${styles[status] ?? "bg-muted text-muted-foreground"}`}
    >
      {status}
    </span>
  );
}
