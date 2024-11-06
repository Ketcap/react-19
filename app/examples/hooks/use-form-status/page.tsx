"use client";

import { useFormStatus } from "react-dom";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Submitting..." : "Submit"}
    </Button>
  );
}

async function submitForm(formData: FormData) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  console.log("Form submitted:", Object.fromEntries(formData));
}

export default function Component() {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Form Status Example</h1>
      <form
        action={async (formData) => {
          await submitForm(formData);
          formRef.current?.reset();
        }}
        ref={formRef}
        className="space-y-4"
      >
        <Input type="text" name="name" placeholder="Name" required />
        <Input type="email" name="email" placeholder="Email" required />
        <SubmitButton />
      </form>
    </div>
  );
}
