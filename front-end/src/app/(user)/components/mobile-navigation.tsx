'use client'
import { Bell, CreditCard, MapPin, MessageSquare, Package, Settings, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function MobileNavigation({ pickedMethod, setPickedMethod }) {
  const scrollRef = useRef(null);
  const [currentDot, setCurrentDot] = useState(0);

  const sections = [
    { key: 'overview', label: 'Visão Geral', icon: User },
    { key: 'orders', label: 'Pedidos', icon: Package },
    { key: 'addresses', label: 'Endereços', icon: MapPin },
    { key: 'paymentMethods', label: 'Pagamento', icon: CreditCard },
    { key: 'notifications', label: 'Notificações', icon: Bell },
    { key: 'settings', label: 'Config.', icon: Settings },
    { key: 'chatWithAI', label: 'IA', icon: MessageSquare }
  ];

  // Sync dot with picked method
  useEffect(() => {
    const index = sections.findIndex(section => section.key === pickedMethod);
    if (index !== -1) {
      setCurrentDot(index);
    }
  }, [pickedMethod]);

  // Simple scroll tracking for dots
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const handleScroll = () => {
      const itemWidth = 101; // button width + gap
      const scrollLeft = scrollContainer.scrollLeft;
      const index = Math.round(scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
      setCurrentDot(clampedIndex);
    };

    scrollContainer.addEventListener('scroll', handleScroll);
    return () => scrollContainer.removeEventListener('scroll', handleScroll);
  }, []);

  const handleButtonClick = (sectionKey) => {
    setPickedMethod(sectionKey);
  };

  const handleDotClick = (index) => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      scrollContainer.scrollTo({
        left: index * 101,
        behavior: 'smooth'
      });
    }
    setPickedMethod(sections[index].key);
  };

  return (
    <div className="bg-white/90 backdrop-blur-xl border border-gray-200 rounded-2xl p-4 mb-6 shadow-lg md:hidden">
      <div 
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto pb-2 -mx-2 px-2"
        style={{ 
          scrollbarWidth: 'none', 
          msOverflowStyle: 'none',
          scrollSnapType: 'x mandatory'
        }}
      >
        {sections.map((section) => {
          const isActive = pickedMethod === section.key;
          const Icon = section.icon;

          return (
            <button 
              key={section.key}
              onClick={() => handleButtonClick(section.key)}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 min-w-[85px] flex-shrink-0 ${
                isActive 
                  ? "bg-blue-600 text-white shadow-lg scale-105" 
                  : "hover:bg-gray-50 text-gray-600 active:bg-gray-100"
              }`}
              style={{ scrollSnapAlign: 'center' }}
            >
              <Icon size={20} />
              <span className="text-xs font-medium text-center leading-tight">
                {section.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Scroll indicators */}
      <div className="flex justify-center mt-4">
        <div className="flex gap-2">
          {sections.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDotClick(i)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i === currentDot
                  ? 'bg-blue-600 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}