import { Hero } from "@/components/hero";
import { ProductGallery } from "@/components/product-gallery";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main>
        <Hero />
        <ProductGallery />
      </main>
    </div>
  );
}
