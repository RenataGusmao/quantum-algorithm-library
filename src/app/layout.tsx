import "./globals.css";
import { Header } from "@/components/layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          fontFamily: "Arial, sans-serif",
          backgroundColor: "#f8fafc",
          color: "#111827",
        }}
      >
        <Header />
        <main
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "24px",
          }}
        >
          {children}
        </main>
      </body>
    </html>
  );
}