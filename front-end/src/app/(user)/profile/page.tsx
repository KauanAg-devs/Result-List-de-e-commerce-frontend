"use client";

import { useState } from "react";
import { SectionButtonType } from "../types/section-button-type";
import { Edit3 } from "lucide-react";

export default function Page() {
  const [pickedMethod, setPickedMethod] =
    useState<SectionButtonType["option"]>("overview");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  const sessionOptions = {
    overview: "overview",
    notifications: "notifications",
    paymentMethods: "paymentMethods",
    chatWithAI: "chatWithAI",
    settings: "settings",
  };

  const SectionButton = ({ message, option }: SectionButtonType) => {
    return (
      <button
        onClick={() => setPickedMethod(option)}
        className={`h-10 w-auto px-3 font-semibold text-sm rounded-md ${
          sessionOptions[pickedMethod] === option
            ? "bg-blue-500 text-white"
            : "hover:bg-zinc-200 text-zinc-500"
        } `}
      >
        {message}
      </button>
    );
  };

  return (
    <div className="w-screen h-screen bg-zinc-50">
      <div className="w-full h-full pr-5 pl-5 pt-5 gap-3 flex flex-col">
        <div className="w-full h-auto bg-white border border-zinc-100 p-3 rounded-sm">
          <div className="flex w-auto gap-5">
            <SectionButton message={"Overview"} option={"overview"} />
            <SectionButton message={"Notifications"} option={"notifications"} />
            <SectionButton
              message={"Payment Methods"}
              option={"paymentMethods"}
            />
            <SectionButton message={"Chat with AI"} option={"chatWithAI"} />
            <SectionButton message={"Settings"} option={"settings"} />
          </div>
        </div>

        <div className="w-1/2 h-auto bg-white border border-zinc-100 p-3 pl-5 rounded-sm">
          <div className="flex flex-col gap-5 pr-2.5">
            <div className="w-full h-auto flex gap-4 items-center">
              <div className="h-24 w-24 border rounded-md flex justify-center items-center overflow-hidden">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#666"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>
              <div>
                <p className="text-xs bg-blue-100 w-14 h-5 text-blue-800 rounded-md justify-center items-center flex font-sans">
                  ADMIN
                </p>
                <p className="mt-3 text-zinc-900 font-extrabold text-xl font-sans">
                  Kauan Barcelos
                </p>
                <p className="text-zinc-300 font-normal text-lg font-sans">
                  User and Seller
                </p>
              </div>
            </div>
            <div className="full h-1 border-t-1"></div>
            <div className="relative w-fit">
              <button className="flex gap-2 items-center font-bold px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700">
                <Edit3 height={15} width={15} />
                Edit
              </button>
              <input
                type="file"
                accept="image/*"
                name="find-image"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
