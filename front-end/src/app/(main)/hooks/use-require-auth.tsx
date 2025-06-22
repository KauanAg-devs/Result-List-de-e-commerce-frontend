import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@main/contexts/auth-context";

export function useRequireAuth() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === null) {
      setLoading(true);
    } else if (!isAuthenticated) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [isAuthenticated, router]);

  return { loading };
}
