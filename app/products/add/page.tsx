import AddProductForm from "@/components/admin/AddProductForm";

export default function AddProductPage() {
  return (
    <main className="min-h-screen text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">

          <h1 className="text-5xl font-bold">
            Add Product
          </h1>

          <p className="mt-3 text-zinc-500">
            Create a new Elite ID product.
          </p>

        </div>

        <AddProductForm />

      </div>
    </main>
  );
}