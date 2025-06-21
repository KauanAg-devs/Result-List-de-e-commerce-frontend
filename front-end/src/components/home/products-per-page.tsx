import { ProductsPerPageProps } from "@/types/home/products-per-page";

export default function ProductsPerPage({
  showFilterInput,
  filteredProductsLength,
  setProductsPerPage,
  productsPerPage,
}: ProductsPerPageProps) {
  return (
    <div className="mx-auto relative flex z-1 justify-center">
      <div
        className={`absolute transition-all duration-300 ease-in-out mx-auto max-w-md w-96 mt-3 ${
          showFilterInput
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Items per page
            </label>
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              {filteredProductsLength} total
            </div>
          </div>

          <div className="relative">
            <select
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(+e.target.value)}
              className="w-full appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-3 pr-10 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:bg-gray-100 transition-colors duration-200"
            >
              <option value="2">2 items</option>
              <option value="4">4 items</option>
              <option value="6">6 items</option>
              <option value="8">8 items</option>
            </select>

            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex-1 bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(productsPerPage / 8) * 100}%` }}
              />
            </div>
            <span className="text-xs text-gray-500 font-medium">
              {productsPerPage}/8
            </span>
          </div>

          <div className="mt-3 flex gap-1">
            {[2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => {
                  setProductsPerPage(num);
                }}
                className={`flex-1 px-2 py-1.5 text-xs rounded-md font-medium transition-all duration-200 ${
                  productsPerPage === num
                    ? "bg-blue-500 text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
