"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type GateOpts = {
  status: "loading" | "authenticated" | "unauthenticated";
  isLoggingIn: boolean;
  onAlreadyAuthenticatedPath?: string;
};

export function useLoginGate({
  status,
  isLoggingIn,
  onAlreadyAuthenticatedPath = "/access-denied",
}: GateOpts) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated" && !isLoggingIn) {
      router.replace(onAlreadyAuthenticatedPath);
    }
  }, [status, isLoggingIn, router, onAlreadyAuthenticatedPath, callbackUrl]);
}
