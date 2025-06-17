import { FooterProps } from '@/types/footer'
import FooterLogos from '@/components/footer/footer-logos'
import FooterContent from '@/components/footer/footer-content'

export default function Footer(){
  return (
    <footer className='w-full pt-16 md:pt-32 lg:pt-56 pb-4 px-4 md:px-6 lg:px-10 flex flex-col'>
      <FooterLogos/>
      <FooterContent/>
    </footer>
  )
}