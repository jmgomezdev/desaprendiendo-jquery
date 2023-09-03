import Menu from "@/components/Menu";
import { TailwindIndicator } from "@/components/TailwindIndicator";
import { ThemeProvider } from "@/components/ThemeProvider";
import { fontSans } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export const metadata = {
  title: "Desaprediendo Jquery",
  description: "Aprendiendo React desaprendiendo Jquery",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-background min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="container relative mx-auto flex min-h-screen flex-col">
            <Menu />
            <div className="flex-1">{children}</div>
            {/* <SiteFooter /> */}
          </div>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
