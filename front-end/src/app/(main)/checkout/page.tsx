'use server'

import Checkout from "@/components/checkout/checkout";
import { handleIsAuthenticated } from "@/utils/isAuthenticated"


export default async function Page() {
  const isAuthenticated = await handleIsAuthenticated()

  return <Checkout isAuthenticated={isAuthenticated} />
}
