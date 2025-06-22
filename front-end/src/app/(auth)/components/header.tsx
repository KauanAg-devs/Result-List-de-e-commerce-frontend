import Image from "next/image";

type HeaderProps = {
  idea: string, 
  message: string
}

export default function Header({idea, message}: HeaderProps) {
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
        {idea}
      </h1>
      <p className="text-gray-600">{message}</p>
    </div>
  );
}
