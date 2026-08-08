"use client";

import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Zap,
  CheckCircle,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/translations";

export default function HeroContent() {
  const { language } = useLanguage();

  const text = {
    badge:
      language === "ar"
        ? "موثوق من آلاف العملاء"
        : language === "zh"
        ? "受到数千客户信赖"
        : "Trusted by Thousands of Customers",

    description:
      language === "ar"
        ? "اشترِ حسابات Apple موثقة بتوصيل فوري، دفع آمن، جودة ممتازة ودعم 24/7."
        : language === "zh"
        ? "购买经过验证的 Apple ID，快速交付、安全支付、高品质和全天候支持。"
        : "Buy verified Apple IDs with instant delivery, secure payment, premium quality and 24/7 support.",

    shop:
      language === "ar"
        ? "تسوق الآن"
        : language === "zh"
        ? "立即购买"
        : "Shop Now",

    browse:
      language === "ar"
        ? "تصفح المنتجات"
        : language === "zh"
        ? "浏览产品"
        : "Browse Products",

    instant:
      language === "ar"
        ? "توصيل فوري"
        : language === "zh"
        ? "即时交付"
        : "Instant Delivery",

    usa:
      language === "ar"
        ? "حسابات أمريكية"
        : language === "zh"
        ? "美国账号"
        : "USA Accounts",

    secure:
      language === "ar"
        ? "دفع آمن"
        : language === "zh"
        ? "安全支付"
        : "Secure Payment",

    support:
      language === "ar"
        ? "دعم 24/7"
        : language === "zh"
        ? "24/7 支持"
        : "24/7 Support",
  };

  return (
    <div>
      <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-lime-400/20 bg-lime-400/10 px-5 py-2 text-sm font-semibold text-lime-400 backdrop-blur-xl">
        <Sparkles size={16} />

        {text.badge}
      </div>

      <h1 className="text-6xl font-black leading-[1.05] tracking-tight lg:text-7xl xl:text-8xl">
        Premium

        <br />

        <span className="text-lime-400">Apple IDs</span>
      </h1>

      <p className="mt-8 max-w-xl text-xl leading-9 text-zinc-400">
        {text.description}
      </p>

      <div className="mt-8 flex flex-wrap gap-4">
        <MiniBadge text={text.instant} />

        <MiniBadge text={text.usa} />

        <MiniBadge text={text.secure} />

        <MiniBadge text={text.support} />
      </div>

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
          {text.shop}

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
          {text.browse}
        </Link>
      </div>

      <div className="mt-14 grid grid-cols-2 gap-5">
        <FeatureCard
          icon={<Zap className="text-lime-400" />}
          title={text.instant}
          text={
            language === "ar"
              ? "استلم حساب Apple خلال ثوانٍ."
              : language === "zh"
              ? "几秒内收到您的 Apple ID。"
              : "Receive your Apple ID within seconds."
          }
        />

        <FeatureCard
          icon={<ShieldCheck className="text-lime-400" />}
          title={text.secure}
          text={
            language === "ar"
              ? "عملية دفع مشفرة وآمنة."
              : language === "zh"
              ? "加密且安全的结账。"
              : "Encrypted & protected checkout."
          }
        />
      </div>
    </div>
  );
}

function MiniBadge({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-zinc-800 bg-white/[0.03] px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl">
      <CheckCircle size={15} className="text-lime-400" />

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

      <h3 className="text-lg font-bold">{title}</h3>

      <p className="mt-3 text-sm leading-7 text-zinc-400">{text}</p>
    </div>
  );
}