'use server'

import Checkout from "@/components/checkout/checkout";
import {cookies} from 'next/headers'

export default async function Page() {
  const accessToken = (await cookies()).get('access_token');
  const isAuthenticated = !!accessToken;
  return <Checkout isAuthenticated={isAuthenticated} />
}
