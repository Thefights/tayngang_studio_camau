import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductGallery } from "@/components/product-gallery"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <Header />
      <main>
        <Hero />
        <ProductGallery />
      </main>
      <Footer />
    </div>
  )
}
