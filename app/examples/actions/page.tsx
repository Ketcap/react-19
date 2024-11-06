"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function updateName(name: string) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return { success: true, message: `Name updated to ${name}` };
}

export default function Component() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = () => {
    startTransition(async () => {
      const result = await updateName(name);
      setMessage(result.message);
    });
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow space-y-4">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter new name"
      />
      <Button onClick={handleSubmit} disabled={isPending}>
        {isPending ? "Updating..." : "Update Name"}
      </Button>
      {message && <p className="text-green-600">{message}</p>}
    </div>
  );
}
