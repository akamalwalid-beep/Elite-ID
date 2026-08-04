export default function HeroBackground() {
  return (
    <>
      {/* Base */}
      <div className="absolute inset-0 bg-[#090909]" />

      {/* Green Glow */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-400/10 blur-[180px]" />

      {/* Secondary Glow */}
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[140px]" />

      {/* Bottom Glow */}
      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-lime-300/10 blur-[120px]" />

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Noise */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "radial-gradient(circle,#ffffff 1px,transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />
    </>
  );
}