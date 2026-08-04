export type CountryTheme = {
  image: string;
  gradient: string;
  glow: string;
  accent: string;
};

export const countryThemes: Record<string, CountryTheme> = {
  Turkey: {
    image: "/images/products/turkey.png",
    gradient:
      "from-sky-500/20 via-blue-500/10 to-cyan-500/20",
    glow: "bg-sky-400/20",
    accent: "text-sky-400",
  },

  USA: {
    image: "/images/products/usa.png",
    gradient:
      "from-indigo-500/20 via-slate-700/10 to-blue-600/20",
    glow: "bg-indigo-400/20",
    accent: "text-indigo-400",
  },

  China: {
    image: "/images/products/china.png",
    gradient:
      "from-red-500/20 via-rose-500/10 to-orange-500/20",
    glow: "bg-red-400/20",
    accent: "text-red-400",
  },

  Japan: {
    image: "/images/products/japan.png",
    gradient:
      "from-fuchsia-500/20 via-pink-500/10 to-purple-500/20",
    glow: "bg-fuchsia-400/20",
    accent: "text-fuchsia-400",
  },

  Egypt: {
    image: "/images/products/egypt.png",
    gradient:
      "from-zinc-700/20 via-neutral-500/10 to-white/10",
    glow: "bg-white/10",
    accent: "text-white",
  },

  Germany: {
    image: "/images/products/germany.png",
    gradient:
      "from-yellow-500/20 via-orange-500/10 to-red-500/20",
    glow: "bg-yellow-400/20",
    accent: "text-yellow-400",
  },

  UK: {
    image: "/images/products/uk.png",
    gradient:
      "from-blue-600/20 via-indigo-500/10 to-red-500/20",
    glow: "bg-blue-400/20",
    accent: "text-blue-400",
  },

  France: {
    image: "/images/products/france.png",
    gradient:
      "from-blue-500/20 via-white/10 to-red-500/20",
    glow: "bg-blue-400/20",
    accent: "text-blue-400",
  },

  Canada: {
    image: "/images/products/canada.png",
    gradient:
      "from-red-500/20 via-white/10 to-red-700/20",
    glow: "bg-red-400/20",
    accent: "text-red-400",
  },

  Korea: {
    image: "/images/products/korea.png",
    gradient:
      "from-blue-500/20 via-red-500/10 to-white/10",
    glow: "bg-blue-400/20",
    accent: "text-blue-400",
  },

  default: {
    image: "/images/products/default.png",
    gradient:
      "from-lime-500/20 via-lime-400/10 to-emerald-500/20",
    glow: "bg-lime-400/20",
    accent: "text-lime-400",
  },
};