import Image from "next/image";
export default function Header() {
  return (
    <header className="h-20 border-b border-zinc-800 bg-[#111111]">
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">

       <Image
  src="/images/logo.png"
  alt="Elite ID"
  width={170}
  height={55}
/>

        {/* Menu */}
        <nav className="hidden gap-10 text-white lg:flex">
          <a href="#" className="transition hover:text-[#65ff4a]">
            الرئيسية
          </a>

          <a href="#" className="transition hover:text-[#65ff4a]">
            المنتجات
          </a>

          <a href="#" className="transition hover:text-[#65ff4a]">
            طريقة الشراء
          </a>

          <a href="#" className="transition hover:text-[#65ff4a]">
            الدعم
          </a>

          <a href="#" className="transition hover:text-[#65ff4a]">
            تواصل معنا
          </a>
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">

          <button className="rounded-lg border border-zinc-700 p-2 text-xl text-white transition hover:border-[#65ff4a] hover:text-[#65ff4a]">
            🌙
          </button>

          <button className="rounded-lg border border-zinc-700 p-2 text-xl text-white transition hover:border-[#65ff4a] hover:text-[#65ff4a]">
            🛒
          </button>

          <button className="rounded-xl bg-[#65ff4a] px-5 py-3 font-semibold text-black transition hover:scale-105">
            تسجيل الدخول
          </button>

        </div>

      </div>
    </header>
  );
}