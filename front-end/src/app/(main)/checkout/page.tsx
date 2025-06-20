'use server'

import CheckoutPage from "@/components/checkout/checkout";
import { cookies } from 'next/headers'

const handleIsAuthenticated = async () => {
  const cookieStore = await cookies() 
  const accessToken = cookieStore.get('access_token')
  const refreshToken = cookieStore.get('refresh_token')

  return !!(accessToken && refreshToken)
}

export default async function Page() {
  const isAuthenticated = await handleIsAuthenticated()

  return <CheckoutPage isAuthenticated={isAuthenticated} />
}
