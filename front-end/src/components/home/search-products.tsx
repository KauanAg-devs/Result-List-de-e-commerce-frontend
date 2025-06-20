import { SearchProductsProps } from '@/types/home/search-products'

export default function SearchProducts({ setShowFilterInput, searchTerm, setSearchTerm }: SearchProductsProps) {

  return (
    <div className="flex px-4 py-3 rounded-md border-2 border-zinc-500 overflow-hidden w-96 md:max-w-md mx-auto">
        <input 
          type="text" 
          placeholder="Search Products..."
          value={searchTerm}
          onChange={(e)=> setSearchTerm(e.target.value)}
          className="w-full outline-none bg-transparent text-gray-600 text-sm" 
        />
        <div className='flex gap-3'>
          <svg onClick={() => setShowFilterInput((prev: any) => !prev)} className='cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#718096" width='24px'>
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M18 7H17M17 7H16M17 7V6M17 7V8M12.5 5H6C5.5286 5 5.29289 5 5.14645 5.14645C5 5.29289 5 5.5286 5 6V7.96482C5 8.2268 5 8.35779 5.05916 8.46834C5.11833 8.57888 5.22732 8.65154 5.4453 8.79687L8.4688 10.8125C9.34073 11.3938 9.7767 11.6845 10.0133 12.1267C10.25 12.5688 10.25 13.0928 10.25 14.1407V19L13.75 17.25V14.1407C13.75 13.0928 13.75 12.5688 13.9867 12.1267C14.1205 11.8765 14.3182 11.6748 14.6226 11.4415M20 7C20 8.65685 18.6569 10 17 10C15.3431 10 14 8.65685 14 7C14 5.34315 15.3431 4 17 4C18.6569 4 20 5.34315 20 7Z" stroke="#464455" strokeLinecap="round" strokeLinejoin="round"></path>
            </g>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" className="fill-gray-600 cursor-pointer">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </div>
      </div>
  )
}
