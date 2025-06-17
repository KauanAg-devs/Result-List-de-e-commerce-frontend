import { HeaderProps } from '@/types/header'

export default  function Header({ children }: HeaderProps){
  return (
    <header className='bg-white'>
    {children}
    </header>
  )
}