"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Headphones,
  Zap,
  CheckCircle,
} from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative z-20 max-w-2xl">

      {/* Badge */}

      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-sm font-semibold text-lime-400 backdrop-blur-xl">

        <Sparkles size={16} />

        Trusted by Thousands of Customers

      </div>

      {/* Title */}

      <h1 className="text-6xl font-black leading-[1.05] tracking-tight lg:text-7xl xl:text-8xl">

        Premium

        <br />

        <span className="text-lime-400">
          Apple IDs
        </span>

      </h1>

      {/* Description */}

      <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-400">

        Buy verified Apple IDs with instant delivery,
        secure payment, premium quality and 24/7 support.

      </p>

      {/* Quick Features */}

      <div className="mt-8 flex flex-wrap gap-4">

        <MiniBadge text="Instant Delivery" />

        <MiniBadge text="USA Accounts" />

        <MiniBadge text="Secure Payment" />

        <MiniBadge text="24/7 Support" />

      </div>

      {/* Buttons */}

      <div className="mt-12 flex flex-wrap gap-5">

        <Link
          href="/products"
          className="
            group
            flex
            items-center
            gap-3
            rounded-2xl
            bg-lime-400
            px-9
            py-5
            text-lg
            font-bold
            text-black
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_45px_rgba(132,255,0,.45)]
          "
        >

          Shop Now

          <ArrowRight
            size={22}
            className="transition group-hover:translate-x-1"
          />

        </Link>

        <Link
          href="/products"
          className="
            rounded-2xl
            border
            border-zinc-700
            bg-white/5
            px-9
            py-5
            text-lg
            transition-all
            duration-300
            hover:border-lime-400
            hover:bg-lime-400/10
          "
        >
          Browse Products
        </Link>

      </div>

      {/* Cards */}

      <div className="mt-14 grid grid-cols-2 gap-5">

        <FeatureCard
          icon={<Zap className="text-lime-400" />}
          title="Instant Delivery"
          text="Receive your Apple ID within seconds."
        />

        <FeatureCard
          icon={<ShieldCheck className="text-lime-400" />}
          title="Secure Payment"
          text="Encrypted & protected checkout."
        />

        <FeatureCard
          icon={<Sparkles className="text-lime-400" />}
          title="Premium Quality"
          text="High quality verified Apple IDs."
        />

        <FeatureCard
          icon={<Headphones className="text-lime-400" />}
          title="24/7 Support"
          text="Professional support whenever you need."
        />

      </div>

    </div>
  );
}

function MiniBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">

      <CheckCircle
        size={15}
        className="text-lime-400"
      />

      {text}

    </div>
  );
}

function FeatureCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div
      className="
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-6
        backdrop-blur-xl
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-lime-400/30
        hover:bg-white/[0.06]
      "
    >

      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-lime-400/10">

        {icon}

      </div>

      <h3 className="text-lg font-bold">

        {title}

      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">

        {text}

      </p>

    </div>
  );
}