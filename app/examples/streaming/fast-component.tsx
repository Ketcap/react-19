import { use } from "react";

const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve("Fast Component Data"), 500)
  );

export function FastComponent() {
  const data = use(fetchData());

  return (
    <div className="p-4 border rounded bg-green-100">
      <h2 className="text-xl font-semibold mb-2">Fast Component</h2>
      <p>{data}</p>
    </div>
  );
}
