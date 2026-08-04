import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import HeroLogo from "./HeroLogo";
import HeroStats from "./HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#090909] text-white">

      <HeroBackground />

      <div className="relative z-20 mx-auto flex min-h-screen max-w-7xl items-center justify-between gap-16 px-8">

        <HeroContent />

        <HeroLogo />

      </div>

      <div className="relative z-20 mx-auto max-w-7xl px-8 pb-20">
        <HeroStats />
      </div>

    </section>
  );
}