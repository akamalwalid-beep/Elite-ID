export default function HeroStats() {
  const stats = [
    {
      value: "99.9%",
      label: "Success Rate",
    },
    {
      value: "24/7",
      label: "Support",
    },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="
            rounded-3xl
            border
            border-white/10
            bg-white/5
            p-8
            text-center
            backdrop-blur-xl
          "
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