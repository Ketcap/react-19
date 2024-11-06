import { use } from "react";

const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Slow Component Data"), 5000)
  );

export function SlowComponent() {
  const data = use(fetchData());

  return (
    <div className="p-4 border rounded bg-red-100">
      <h2 className="text-xl font-semibold mb-2">Slow Component</h2>
      <p>{data}</p>
    </div>
  );
}
