import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ShoppingCartContent } from "@/components/shopping-cart-content"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <Header />
      <main className="py-8">
        <ShoppingCartContent />
      </main>
      <Footer />
    </div>
  )
}
