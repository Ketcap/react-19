import { use } from "react";

const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Medium Component Data"), 2000)
  );

export function MediumComponent() {
  const data = use(fetchData());

  return (
    <div className="p-4 border rounded bg-yellow-100">
      <h2 className="text-xl font-semibold mb-2">Medium Component</h2>
      <p>{data}</p>
    </div>
  );
}
