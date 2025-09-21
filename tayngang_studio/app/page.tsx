import { Hero } from "@/components/hero";
import { ProductFeatureGallery } from "@/components/product-feature-gallery";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <main>
        <Hero />
        <ProductFeatureGallery />
      </main>
    </div>
  );
}
