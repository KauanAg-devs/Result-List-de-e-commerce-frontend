import NewsletterSubscribe from '@/components/footer/newsletter-subscribe'
import Link from 'next/link'

export default function FooterContent(){
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 lg:gap-16 w-full max-w-6xl mx-auto'>
        <section className="flex flex-col text-gray-600 text-center md:text-left">
          <p className="text-base font-semibold text-gray-800 mb-3 md:hidden">Location</p>
          <div className="space-y-1">
            <p className="text-sm">Rua Alexandre Dumas, 1711 - 6°</p>
            <p className="text-sm">andar - Chácara Santo Antônio,</p>
            <p className="text-sm">São Paulo - SP, 04717-004</p>
          </div>
          <p className="text-sm mt-4 font-medium">2024 Compass UOL</p>
        </section>

        <section className="flex flex-col space-y-3 text-gray-600 text-center md:text-left">
          <p className="text-base font-bold text-gray-800 mb-1">Links</p>
          <Link href="#" className="text-sm hover:text-black transition-colors">Home</Link>
          <Link href="#" className="text-sm hover:text-black transition-colors">Shop</Link>
          <Link href="#" className="text-sm hover:text-black transition-colors">About</Link>
          <Link href="#" className="text-sm hover:text-black transition-colors">Contact</Link>
        </section>
            
        <section className="flex flex-col space-y-3 text-gray-600 text-center md:text-left">
          <p className="text-base font-bold text-gray-800 mb-1">Help</p>
          <Link href="#" className="text-sm hover:text-black transition-colors">Payment Options</Link>
          <Link href="#" className="text-sm hover:text-black transition-colors">Returns</Link>
          <Link href="#" className="text-sm hover:text-black transition-colors">Privacy Policies</Link>
        </section>

        <NewsletterSubscribe/>
      </div>
    )
}