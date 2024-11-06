"use client";

import { use } from "react";

function fetchUserData(userId: string) {
  return new Promise<{ id: string; name: string; email: string }>((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: "John Doe", email: "john@example.com" });
    }, 5000);
  });
}

export default function Component() {
  const userId = "123";
  const user = use(fetchUserData(userId));

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Details</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}
