"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function UserGreeting({ user }: { user: { name: string } | null }) {
  const [currentState, setCurrentState] = useState(0);
  return (
    <>
      <div>{user ? `Welcome back, ${user.name}` : "Welcome to our store"}</div>
      <div>Current State in client: {currentState}</div>
      <div>
        <Button onClick={() => setCurrentState(currentState + 1)}>
          Increment State
        </Button>
      </div>
    </>
  );
}
