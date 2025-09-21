"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Login attempt:", formData);
      setIsLoading(false);
      // Redirect to account page or previous page
      window.location.href = "/account";
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl font-serif text-[#5A3E2B] mb-2">Đăng nhập</h1>
        <p className="text-[#5A3E2B]/70">Chào mừng bạn quay trở lại!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        <Card className="p-8 bg-white border-[#5A3E2B]/10 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Label htmlFor="email" className="text-[#5A3E2B] font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="pl-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white transition-all duration-300 focus:ring-2 focus:ring-[#5A3E2B]/20"
                  placeholder="your@email.com"
                />
              </div>
            </motion.div>

            {/* Password Field */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Label htmlFor="password" className="text-[#5A3E2B] font-medium">
                Mật khẩu
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#5A3E2B]/50" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="pl-10 pr-10 border-[#5A3E2B]/20 focus:border-[#5A3E2B] bg-white transition-all duration-300 focus:ring-2 focus:ring-[#5A3E2B]/20"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5A3E2B]/50 hover:text-[#5A3E2B] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </motion.div>

            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.rememberMe}
                  onCheckedChange={(checked) =>
                    handleInputChange("rememberMe", checked as boolean)
                  }
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-[#5A3E2B]/80 cursor-pointer"
                >
                  Ghi nhớ đăng nhập
                </Label>
              </div>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-[#87C1D8] hover:text-[#5A3E2B] transition-colors"
              >
                Quên mật khẩu?
              </Link>
            </motion.div>

            {/* Login Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#5A3E2B] hover:bg-[#5A3E2B]/90 text-white py-3 text-base font-medium transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Đang đăng nhập...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Đăng nhập
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </Button>
            </motion.div>

            {/* Divider */}
            <motion.div
              className="relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <Separator className="bg-[#5A3E2B]/10" />
              <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-sm text-[#5A3E2B]/60">
                hoặc
              </span>
            </motion.div>

            {/* Social Login */}
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full border-[#5A3E2B]/20 text-[#5A3E2B] hover:bg-[#5A3E2B]/5 bg-white transition-all duration-300 hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Đăng nhập với Google
              </Button>
            </motion.div>
          </form>

          {/* Register Link */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <p className="text-[#5A3E2B]/70">
              Chưa có tài khoản?{" "}
              <Link
                href="/auth/register"
                className="text-[#87C1D8] hover:text-[#5A3E2B] font-medium transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </motion.div>
        </Card>
      </motion.div>
    </div>
  );
}
