import { Inter } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import NavBar from '@/components/NavBar'
import ChatInterface from '@/components/ChatInterface'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'StudyMart - Student Reselling Platform',
  description: 'A trusted marketplace for students to buy and sell pre-owned items',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* Main content */}
          {children}
          <ChatInterface />
        </ThemeProvider>
      </body>
    </html>
  )
}
