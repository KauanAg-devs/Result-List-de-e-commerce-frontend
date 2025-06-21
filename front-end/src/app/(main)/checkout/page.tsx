'use server'

import Checkout from "@/components/checkout/checkout";
import { cookies } from 'next/headers'

const handleIsAuthenticated = async () => {
  const cookieStore = await cookies() 
  const accessToken = cookieStore.get('access_token')

  return !!(accessToken)
}

export default async function Page() {
  const isAuthenticated = await handleIsAuthenticated()

  return <Checkout isAuthenticated={isAuthenticated} />
}
