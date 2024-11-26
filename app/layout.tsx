import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Ticketing App",
  description: "Tech Ticketing Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
