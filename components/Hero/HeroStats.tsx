export default function HeroStats() {
  const stats = [
    {
      value: "15K+",
      label: "Happy Customers",
    },
    {
      value: "99.9%",
      label: "Success Rate",
    },
    {
      value: "24/7",
      label: "Support",
    },
    {
      value: "120+",
      label: "Countries",
    },
  ];

  return (
    <div className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="text-center"
        >
          <h2 className="text-5xl font-black text-lime-400">
            {stat.value}
          </h2>

          <p className="mt-3 text-zinc-400">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}