import FooterLogos from "@/components/layout-client/footer/footer-logos";
import FooterContent from "@/components/layout-client/footer/footer-content";

export default function Footer() {
  return (
    <footer className="w-full pt-16 md:pt-32 lg:pt-56 pb-4 px-4 md:px-6 lg:px-10 flex flex-col bg-gray-5">
      <FooterLogos />
      <FooterContent />
    </footer>
  );
}
