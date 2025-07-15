"use client";
import {
  Bell,
  CreditCard,
  MapPin,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavigationProps } from "@user/types/navigation";

export function MobileNavigation({
  pickedMethod = "overview",
  setPickedMethod,
}: NavigationProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentDot, setCurrentDot] = useState(0);

  const sections = [
    { key: "overview", label: "Visão Geral", icon: User },
    { key: "addresses", label: "Endereços", icon: MapPin },
    { key: "paymentMethods", label: "Pagamento", icon: CreditCard },
    { key: "notifications", label: "Notificações", icon: Bell },
    { key: "settings", label: "Config.", icon: Settings },
    { key: "chatWithAI", label: "IA", icon: MessageSquare },
  ];

  useEffect(() => {
    const index = sections.findIndex((section) => section.key === pickedMethod);
    if (index !== -1) {
      setCurrentDot(index);
    }
  }, [pickedMethod]);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollTimeout: NodeJS.Timeout;
    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const itemWidth = 105;
        const scrollLeft = scrollContainer.scrollLeft;
        const index = Math.round(scrollLeft / itemWidth);
        const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
        setCurrentDot(clampedIndex);
      }, 50);
    };

    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const handleButtonClick = (sectionKey: string) => {
    setPickedMethod(sectionKey);
    const index = sections.findIndex((section) => section.key === sectionKey);
    if (index !== -1 && scrollRef.current) {
      scrollRef.current.scrollTo({
        left: index * 105,
        behavior: "smooth",
      });
    }
  };

  const handleDotClick = (index: number) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        left: index * 105,
        behavior: "smooth",
      });
    }
    setPickedMethod(sections[index].key);
  };

  return (
    <div className="bg-white/95 backdrop-blur-xl border border-gray-100 p-5 mb-6 shadow-xl shadow-gray-100/50 md:hidden">

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto pb-3 -mx-2 px-2 scroll-smooth"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          scrollSnapType: "x mandatory",
        }}
      >
        {sections.map((section) => {
          const isActive = pickedMethod === section.key;
          const Icon = section.icon;

          return (
            <button
              key={section.key}
              onClick={() => handleButtonClick(section.key)}
              className={`group flex flex-col items-center gap-2.5  rounded-2xl transition-all duration-300 min-w-[89px] flex-shrink-0 relative ${isActive && "scale-105 transform"}`}
              style={{ scrollSnapAlign: "center" }}
            >
          

              <div
                className={`relative transition-transform duration-300 ${
                  isActive
                    ? "transform scale-110"
                    : "group-hover:scale-105 group-active:scale-95"
                }`}
              >
                <Icon
                  size={22}
                  className={`text-zinc-600 mt-1 transition-all duration-300`}
                />
              </div>

              <span
                className={`text-xs font-semibold text-center leading-tight transition-all duration-300 text-gray-600 group-hover:text-gray-700`}
              >
                {section.label}
              </span>


            </button>
          );
        })}
      </div>

      <div className="flex justify-center mt-2">
        <div className="flex gap-2.5 bg-gray-100/60 p-2 rounded-full">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`transition-all duration-300 rounded-full ${
                i === currentDot
                  ? "w-2.5 h-2.5 bg-gradient-to-r from-zinc-500 to-zinc-600 shadow-sm"
                  : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400 active:bg-gray-500 hover:scale-110"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
