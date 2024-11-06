import { Suspense } from "react";
import { cookies } from "next/headers";
import { ProductList } from "./product-list";
import { UserGreeting } from "./user-greeting";
import { CookieManager } from "./cookie-manager";

async function getUser() {
  const userId = (await cookies()).get("userId")?.value;
  // Simulating a database call
  await new Promise((resolve) => setTimeout(resolve, 500));
  return userId ? { id: userId, name: "John Doe" } : null;
}

async function getProducts(userId: string | undefined) {
  // Simulating a database call with server-side filtering
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const allProducts = [
    { id: 1, name: "Product A", price: 19.99 },
    { id: 2, name: "Product B", price: 29.99 },
    { id: 3, name: "Product C", price: 39.99 },
    { id: 4, name: "Product D", price: 49.99 },
    { id: 5, name: "Product E", price: 59.99 },
  ];
  // Server-side filtering based on user
  return userId ? allProducts : allProducts.filter((p) => p.price < 30);
}

export default async function Page() {
  const user = await getUser();
  const products = await getProducts(user?.id);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <CookieManager />
      <h1 className="text-3xl font-bold mb-4">
        Advanced Server Components Demo
      </h1>
      <Suspense fallback={<div>Loading user data...</div>}>
        <UserGreeting user={user} />
      </Suspense>
      <Suspense fallback={<div>Loading products...</div>}>
        <ProductList products={products} />
      </Suspense>
    </div>
  );
}
