// app/layout.tsx
import './globals.css'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Your App',
  description: 'Sidebar example',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="flex h-screen">
        <SidebarProvider>
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">
            <SidebarTrigger />
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}
