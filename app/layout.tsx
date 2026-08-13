import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ====== GOOGLE ADS — PLACEHOLDER (عدّل قبل الرفع) ======
const AW_ID = "AW-XXXXXXXXXX"; // TODO

export const metadata: Metadata = {
  title:
    "مشاريع هايد بارك 2026 | سي شور رأس الحكمة وهايد بارك التجمع الخامس — الأسعار وأنظمة السداد",
  description:
    "اعرف أسعار مشاريع هايد بارك Hyde Park الجديدة 2026: قرية سي شور رأس الحكمة بالساحل الشمالي بمقدم 5% وتقسيط 8 سنوات ووحدات جاهزة بالمرحلة الأولى، وكمبوند هايد بارك التجمع الخامس على التسعين الشمالي مباشرة بشقق وفيلات بمقدم 5%. سجل الآن واحصل على البرايس ليست الرسمية.",
  keywords: [
    "سي شور هايد بارك",
    "سي شور رأس الحكمة",
    "Seashore Hyde Park",
    "Seashore North Coast",
    "هايد بارك التجمع الخامس",
    "كمبوند هايد بارك",
    "Hyde Park New Cairo",
    "أسعار هايد بارك",
    "شاليهات رأس الحكمة",
    "شقق للبيع في التجمع الخامس",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "مشاريع هايد بارك 2026 — سي شور رأس الحكمة وهايد بارك التجمع",
    description:
      "أسعار وأنظمة سداد مشاريع هايد بارك في الساحل الشمالي والقاهرة الجديدة.",
    type: "website",
    locale: "ar_EG",
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-linen text-forest antialiased">
        {children}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${AW_ID}`} strategy="afterInteractive" />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${AW_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
