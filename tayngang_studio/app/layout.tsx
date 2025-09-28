'use client'

import { Footer } from '@/components/common/footer'
import { Header } from '@/components/common/header'
import { RouteGuard } from '@/components/common/route-guard'
import { Toaster } from '@/components/ui/sonner'
import { CartProvider } from '@/context/cart-context'
import { LoadingProvider } from '@/context/loading-context'
import { Analytics } from '@vercel/analytics/next'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Playfair_Display } from 'next/font/google'
import { usePathname } from 'next/navigation'
import type React from 'react'
import { Suspense } from 'react'
import './globals.css'

const playfair = Playfair_Display({
	subsets: ['latin', 'vietnamese'],
	variable: '--font-playfair',
	display: 'swap',
})

function RootLayoutClient({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const pathname = usePathname()
	const isAdminRoute = pathname?.startsWith('/admin')

	return (
		<LoadingProvider>
			<CartProvider>
				<RouteGuard>
					{!isAdminRoute && <Header />}
					<Suspense fallback={null}>{children}</Suspense>
					<Analytics />
					{!isAdminRoute && <Footer />}
					<Toaster />
				</RouteGuard>
			</CartProvider>
		</LoadingProvider>
	)
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='vi'>
			<body
				className={`font-sans ${GeistSans.variable} ${GeistMono.variable} ${playfair.variable}`}
			>
				<RootLayoutClient>{children}</RootLayoutClient>
			</body>
		</html>
	)
}
