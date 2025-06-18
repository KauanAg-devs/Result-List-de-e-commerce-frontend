import { ProductProps } from '@/types/product'
import Link from 'next/link'
export default function Product({colors, name, sku}: ProductProps){


  return (
     <div className="group relative">
            <img src="https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80" />
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link href={`/product/${sku}`}>
                    <span aria-hidden="true" className="absolute inset-0"></span>
                    {name}
                  </Link>
                </h3>
                <div className='flex gap-2'>
                    {colors.map((color, i) => <div title={color} key={i} style={{backgroundColor: color, border: color === 'white' ? '1px solid #ccc' : undefined}} className={`mt-1 rounded-full h-5 w-5`}></div>)}
                </div>
              </div>
              <p className="text-sm font-medium text-gray-900">$35</p>
            </div>
    </div>
  )
}