"use client";

import { useState, useEffect, startTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function CookieManager() {
  const router = useRouter();
  const [hasCookie, setHasCookie] = useState(false);

  useEffect(() => {
    setHasCookie(document.cookie.includes("userId"));
  }, []);

  const addCookie = () => {
    startTransition(() => {
      document.cookie = `userId=123; path=/; max-age=3600`;
      setHasCookie(true);
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  const removeCookie = () => {
    startTransition(() => {
      document.cookie = `userId=; path=/; max-age=0`;
      setHasCookie(false);
      // Refresh the current route and fetch new data from the server without
      // losing client-side browser or React state.
      router.refresh();
    });
  };

  return (
    <div className="flex gap-4 mb-4">
      <Button onClick={addCookie} disabled={hasCookie}>
        Add Cookie (Log In)
      </Button>
      <Button onClick={removeCookie} disabled={!hasCookie}>
        Remove Cookie (Log Out)
      </Button>
    </div>
  );
}
