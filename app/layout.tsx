import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";
import {ThemeProvider} from "@/components/ThemeProvider";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Tech Ticketing App",
  description: "Tech Ticketing Application Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true} className={inter.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          <nav className='flex flex-col items-center border-b mb-5 px-6 py-3'>
            <div className='max-w-6xl w-full'>
              <MainNav />
            </div>
          </nav>
          <main className='flex flex-col items-center '>
            <div className='max-w-6xl w-full'>{children}</div>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
