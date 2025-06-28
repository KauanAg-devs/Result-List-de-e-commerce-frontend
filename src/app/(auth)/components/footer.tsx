import Link from "next/link";

type FooterProps = {
  accountQuestion: string,
  idea: string,
  redirectTo: string
}
export default function Footer({accountQuestion, idea, redirectTo}: FooterProps) {
  return (
    <div className="mt-8 text-center">
      <p className="text-sm text-gray-600">
        {accountQuestion}{" "}
        <Link href={redirectTo} className="cursor-pointer font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-200">
         {idea}
        </Link>
      </p>
    </div>
  );
}
