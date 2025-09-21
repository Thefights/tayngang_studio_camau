"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Search, User } from "lucide-react"

export function AdminHeader() {
  return (
    <header className="bg-white border-b border-[#5A3E2B]/10 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-serif text-[#5A3E2B]">Dashboard</h1>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
            <Input
              placeholder="Tìm kiếm..."
              className="pl-10 w-64 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white"
            />
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="sm" className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="sm" className="text-[#5A3E2B] hover:bg-[#5A3E2B]/10">
            <User className="w-5 h-5 mr-2" />
            Admin
          </Button>
        </div>
      </div>
    </header>
  )
}
