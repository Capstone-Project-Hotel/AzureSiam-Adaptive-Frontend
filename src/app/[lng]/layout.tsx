import "./globals.css";
import type { Metadata } from "next";

import StyledComponentsRegistryAntd from "@/lib/AntdRegistry";
import StyledComponentsRegistry from "@/lib/ScRegistry";

import { ConfigProvider } from "antd";

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin'] })

import { dir } from "i18next";
import { languages } from "../i18n/settings";

import HydrationZustand from "./hydrationZustand";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: "AzureSiam Responsive",
  description: "Hotel Booking Application",
};

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode;
  params: any;
}) {
  return (
    <html lang={lng} dir={dir(lng)}>
      <body>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: '"Noto Sans Thai",sans-serif',
              colorPrimary: "#2A4D69",
            },
          }}
        >
          <StyledComponentsRegistryAntd>
            <StyledComponentsRegistry>
              <HydrationZustand children={children} />
            </StyledComponentsRegistry>
          </StyledComponentsRegistryAntd>
        </ConfigProvider>
      </body>
    </html>
  );
}
