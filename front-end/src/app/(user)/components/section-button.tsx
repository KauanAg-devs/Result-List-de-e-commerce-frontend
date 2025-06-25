import { SectionButtonProps } from "../types/section-button";

export default function SectionButton({ message, option, icon: Icon, pickedMethod, setPickedMethod }: SectionButtonProps) {
  const isActive = pickedMethod === option;
  
  return (
    <button
      onClick={() => setPickedMethod(option)}
      className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-zinc-900 text-white shadow-md"
          : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-sm"
      }`}
    >
      <Icon 
        size={18} 
        className={`transition-colors duration-200 ${
          isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
        }`}
      />
      
      <span className={`font-medium text-sm ${
        isActive ? "text-white" : "text-gray-700 group-hover:text-gray-900"
      }`}>
        {message}
      </span>
    </button>
  );
};
