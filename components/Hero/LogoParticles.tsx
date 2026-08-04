export default function LogoParticles() {
  return (
    <>
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-lime-300 shadow-[0_0_15px_#84ff00]"
          style={{
            width: `${4 + (i % 3) * 2}px`,
            height: `${4 + (i % 3) * 2}px`,
            left: `${15 + Math.random() * 70}%`,
            top: `${15 + Math.random() * 70}%`,
            animation: `float${i % 4} ${8 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.7}s`,
          }}
        />
      ))}
    </>
  );
}