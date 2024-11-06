import { use, Suspense } from "react";

function fetchUserData(userId: string) {
  return new Promise<{ name: string; email: string; userId: string }>(
    (resolve) => {
      setTimeout(() => {
        resolve({ name: "John Doe", email: "john@example.com", userId });
      }, 2000);
    }
  );
}

function UserData({ userId }: { userId: string }) {
  const user = use(fetchUserData(userId));

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">User Data</h2>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

export default function Component() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Use Hook Example</h1>
      <Suspense
        fallback={<div className="text-center">Loading user data...</div>}
      >
        <UserData userId="123" />
      </Suspense>
    </div>
  );
}
