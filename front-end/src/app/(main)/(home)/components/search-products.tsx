import { ChangeEvent, useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface SearchProductsProps {
  onBlur?: () => void;
  autoFocus?: boolean;
  onFocus?: () => void;
}

export default function SearchProducts({ onBlur, autoFocus }: SearchProductsProps) {
  const [inputValue, setInputValue] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    setSearchFocused(false)
    router.replace(
      inputValue === "" ? "/" : `/?search=${encodeURIComponent(inputValue)}`
    );
    router.refresh();
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const relatedTarget = e.relatedTarget as HTMLElement;
    const currentContainer = e.currentTarget.closest('[data-search-container]');
    
    if (onBlur && (!relatedTarget || !currentContainer?.contains(relatedTarget))) {
      setSearchFocused(false);
      onBlur();
    } else {
      setSearchFocused(false);
    }
  };

  return (
    <div className="w-full sm:px-4 md:px-6 relative z-50">
      {searchFocused && (
        <div className="fixed inset-0 bg-white z-40" />
      )}

      <div className="relative max-w-2xl mx-auto z-50">
        <div
          data-search-container
          className="flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl border border-gray-200 focus-within:bg-white focus-within:border-blue-400 focus-within:ring-2 sm:focus-within:ring-4 focus-within:ring-blue-100 transition-all duration-200 shadow-sm bg-white"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              const input = e.currentTarget.querySelector("input");
              input?.focus();
            }
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Buscar produtos..."
            value={inputValue}
            onFocus={() => setSearchFocused(true)}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            className="flex-1 min-w-0 outline-none bg-transparent text-gray-700 text-sm sm:text-base placeholder-gray-400 font-medium"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />

          {inputValue && (
            <button
              onClick={() => setInputValue("")}
              className="ml-1 sm:ml-2 p-1.5 sm:p-1 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors duration-200 flex-shrink-0 relative z-10"
              aria-label="Clear search"
              type="button"
            >
              <svg
                className="w-4 h-4 sm:w-4 sm:h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}

          <button
            onClick={handleSearch}
            className="ml-1 sm:ml-2 p-1.5 hover:bg-gray-200 active:bg-gray-300 rounded-full transition-colors duration-200 flex-shrink-0 relative z-10"
            aria-label="Search"
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="18"
              height="18"
              className="fill-gray-500 hover:fill-blue-500 transition-colors duration-200"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
