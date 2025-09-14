import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#EAEAEA]">
      <Header />
      <main className="py-16">
        <LoginForm />
      </main>
      <Footer />
    </div>
  )
}
