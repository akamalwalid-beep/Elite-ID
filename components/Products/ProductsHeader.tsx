"use client";

import { useLanguage } from "@/context/LanguageContext";

type Props = {
  count: number;
  countries: number;
  views: string;
};

export default function ProductsHeader({
  count,
  countries,
  views,
}: Props) {
  const { language } = useLanguage();

  const translations = {
    badge:
      language === "ar"
        ? "المتجر المميز"
        : language === "zh"
        ? "高级商店"
        : "PREMIUM STORE",

    title:
      language === "ar"
        ? "حسابات Apple المميزة"
        : language === "zh"
        ? "高级 Apple ID"
        : "Premium Apple IDs",

    description:
      language === "ar"
        ? "حسابات Apple عالية الجودة لكل دولة مع توصيل فوري ودفع آمن ودعم احترافي."
        : language === "zh"
        ? "适用于各个国家的高质量 Apple ID，快速交付、安全支付和专业支持。"
        : "High-quality Apple IDs for every country with instant delivery, secure payment and professional support.",

    products:
      language === "ar"
        ? "المنتجات"
        : language === "zh"
        ? "产品"
        : "Products",

    views:
      language === "ar"
        ? "المشاهدات"
        : language === "zh"
        ? "浏览量"
        : "Views",

    rating:
      language === "ar"
        ? "متوسط التقييم"
        : language === "zh"
        ? "平均评分"
        : "Average Rating",
  };

  return (
    <>
      <div className="text-center">
        <span
          className="
          rounded-full
          border
          border-lime-400/20
          bg-lime-400/10
          px-5
          py-2
          text-sm
          font-semibold
          text-lime-400
          "
        >
          {translations.badge}
        </span>

        <h2 className="mt-8 text-6xl font-black">
          {translations.title}
        </h2>

        <p
          className="
          mx-auto
          mt-6
          max-w-2xl
          text-xl
          leading-9
          text-zinc-400
          "
        >
          {translations.description}
        </p>
      </div>

      <div
        className="
        mx-auto
        mt-16
        grid
        max-w-6xl
        grid-cols-2
        gap-6
        lg:grid-cols-3
        "
      >
        <StatCard
          value={count}
          label={translations.products}
        />

        <StatCard
          value={views}
          label={translations.views}
        />

        <StatCard
          value="4.9"
          label={translations.rating}
        />
      </div>
    </>
  );
}

function StatCard({
  value,
  label,
}: {
  value: string | number;
  label: string;
}) {
  return (
    <div
      className="
      rounded-3xl
      border
      border-zinc-800
      bg-white/[0.03]
      p-7
      text-center
      backdrop-blur-xl
      "
    >
      <h3 className="text-4xl font-black text-lime-400">
        {value}
      </h3>

      <p className="mt-3 text-zinc-400">
        {label}
      </p>
    </div>
  );
}