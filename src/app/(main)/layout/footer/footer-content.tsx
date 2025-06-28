import Link from "next/link";
import FooterSection from "@main/layout/footer/footer-section";
import NewsletterSubscribe from "@main/layout/footer/newsletter-subscribe";

export default function FooterContent() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl mx-auto bg-gray-5">
      <section className="flex flex-col text-gray-600 text-center md:text-left">
        <p className="text-base font-semibold text-gray-800 mb-3 md:hidden">
          Location
        </p>
        <div className="space-y-1">
          <p className="text-sm">Rua Alexandre Dumas, 1711 - 6°</p>
          <p className="text-sm">andar - Chácara Santo Antônio,</p>
          <p className="text-sm">São Paulo - SP, 04717-004</p>
        </div>
        <p className="text-sm mt-4 font-medium">2024 Compass UOL</p>
      </section>

      <FooterSection title="Links" sectionKey="links">
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Home
        </Link>
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Shop
        </Link>
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          About
        </Link>
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Contact
        </Link>
      </FooterSection>

      <FooterSection title="Help" sectionKey="help">
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Payment Options
        </Link>
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Returns
        </Link>
        <Link
          href="#"
          className="block text-sm hover:text-black transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-300 rounded px-2 py-1 -mx-2"
        >
          Privacy Policies
        </Link>
      </FooterSection>

      <NewsletterSubscribe />

      <div className="w-full col-span-full flex justify-center flex-col">
        <div className="w-full border-b"></div>
        <p className="py-4 mx-auto px-4 w-full text-zinc-400">
          2023 Compass. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}
