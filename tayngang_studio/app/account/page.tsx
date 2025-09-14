import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AccountDashboard } from "@/components/account-dashboard"

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <Header />
      <main className="py-8">
        <AccountDashboard />
      </main>
      <Footer />
    </div>
  )
}
