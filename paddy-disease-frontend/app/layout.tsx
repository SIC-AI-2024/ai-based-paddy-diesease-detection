import RootHeader from "@/components/root/root-header";
import "./globals.css";
import RootFooter from "@/components/root/root-footer";
import { HydrationOverlay } from "@builder.io/react-hydration-overlay";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <RootHeader />
        {children}
        <RootFooter />
      </body>
    </html>
  );
}
