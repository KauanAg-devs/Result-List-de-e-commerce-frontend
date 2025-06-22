import Image from "next/image";

export default function Header() {
  return (
    <div className="text-center mb-10">
      <Image
        src="logo-img.svg"
        width={70}
        height={70}
        className="mx-auto m-5"
        alt="logo"
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Sign in to your account
      </h1>
      <p className="text-gray-600">Welcome back! Please enter your details.</p>
    </div>
  );
}
