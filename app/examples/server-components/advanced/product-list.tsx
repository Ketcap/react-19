export function ProductList({
  products,
}: {
  products: { id: number; name: string; price: number }[];
}) {
  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.price}</p>
        </div>
      ))}
    </div>
  );
}
