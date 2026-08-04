import AddProductForm from "@/components/admin/AddProductForm";

export default function AddProductPage() {
  return (
    <main className="min-h-screen bg-[#090909] p-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-8">
          <h1 className="text-5xl font-bold">
            Add Product
          </h1>

          <p className="mt-2 text-zinc-400">
            Create a new product.
          </p>
        </div>

        <AddProductForm />

      </div>
    </main>
  );
}