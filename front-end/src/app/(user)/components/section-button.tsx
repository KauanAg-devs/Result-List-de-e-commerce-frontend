export const SectionButton = ({ message, option, pickedMethod, setPickedMethod, icon: Icon }) => {
  const isActive = pickedMethod === option;
  return (
    <button
      onClick={() => setPickedMethod(option)}
      className={`h-12 px-6 font-semibold text-sm rounded-xl flex items-center gap-3 transition-all duration-200 ${
        isActive
          ? "bg-blue-600 text-white shadow-lg"
          : "hover:bg-zinc-100 text-zinc-600 bg-white border border-zinc-200"
      }`}
    >
      <Icon size={18} />
      {message}
    </button>
  );
};