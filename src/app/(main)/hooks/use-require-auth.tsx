import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/auth-context";

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  if (process.env.NEXT_PUBLIC_MOCK_MODE === "true") {
    setLoading(false);
    return;
  }

  if (isAuthenticated === null) { 
    setLoading(true);
    return;
  } 

  if (!isAuthenticated) {
    router.push("/signin");
  }

  setLoading(false);
}, [isAuthenticated, router]);


  return { loading, isAuthenticated };
}
