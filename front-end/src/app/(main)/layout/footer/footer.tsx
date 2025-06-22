import FooterContent from "@main/layout/footer/footer-content";
import FooterLogos from "@main/layout/footer/footer-logos";

export default function Footer() {
  return (
    <footer className="w-full pt-16 md:pt-32 lg:pt-56 pb-4 px-4 md:px-6 lg:px-10 flex flex-col bg-gray-5">
      <FooterLogos />
      <FooterContent />
    </footer>
  );
}
