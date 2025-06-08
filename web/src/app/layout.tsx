import { PropsWithChildren } from "react";
import "./globals.css";
import Providers from "./providers";

export default function RootLayout({
  children,
}: PropsWithChildren) {
  return (
    <html lang="kr">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
