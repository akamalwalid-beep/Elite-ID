import Image from "next/image";

export default function HeroLogo() {
  return (
    <div className="relative flex w-full items-center justify-center overflow-visible">

      {/* Main Glow */}
      <div className="absolute h-[1200px] w-[1200px] rounded-full bg-lime-400/10 blur-[260px]" />

      <div className="absolute h-[900px] w-[900px] rounded-full bg-lime-400/10 blur-[180px]" />

      <div className="absolute h-[650px] w-[650px] rounded-full border border-lime-400/10" />

      {/* Rotating Ring */}
      <div className="absolute h-[1300px] w-[1300px] rounded-full border border-lime-400/10 animate-spin [animation-duration:60s]" />

      {/* Second Ring */}
      <div className="absolute h-[900px] w-[900px] rounded-full border border-lime-400/10 animate-spin [animation-duration:35s] [animation-direction:reverse]" />

      {/* Floating Particles */}

      <span className="absolute left-[15%] top-[20%] h-3 w-3 animate-pulse rounded-full bg-lime-300 shadow-[0_0_25px_#84ff00]" />

      <span
        className="absolute left-[70%] top-[18%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_20px_#84ff00]"
        style={{
          animation: "float1 10s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[80%] top-[60%] h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_30px_#84ff00]"
        style={{
          animation: "float2 12s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[20%] top-[70%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_20px_#84ff00]"
        style={{
          animation: "float3 14s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[55%] top-[10%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_20px_#84ff00]"
        style={{
          animation: "float4 15s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[10%] top-[45%] h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_30px_#84ff00]"
        style={{
          animation: "float5 18s ease-in-out infinite",
        }}
      />

      <span
        className="absolute left-[90%] top-[40%] h-2 w-2 rounded-full bg-lime-300 shadow-[0_0_25px_#84ff00]"
        style={{
          animation: "float6 16s ease-in-out infinite",
        }}
      />

      {/* Logo */}

      <Image
        src="/images/hero-logo.png"
        alt="Elite ID"
        width={2000}
        height={2000}
        priority
        className="
          relative
          z-20
          w-[850px]
          max-w-none
          h-auto
          animate-pulse
          transition-all
          duration-700
          hover:scale-105
          drop-shadow-[0_0_90px_rgba(132,255,0,.95)]
        "
      />
    </div>
  );
}