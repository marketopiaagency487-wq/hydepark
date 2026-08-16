import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

// ====== GOOGLE ADS — PLACEHOLDER (عدّل قبل الرفع) ======
const AW_ID = "AW-XXXXXXXXXX"; // TODO

export const metadata: Metadata = {
  title:
    "ون هايد بارك التجمع الخامس | One Hyde Park — أسعار 2026 ومقدم 5% وخصم كاش 25%",
  description:
    "ون هايد بارك One Hyde Park أحدث مراحل كمبوند هايد بارك التجمع الخامس على التسعين الجنوبي مباشرة. شقق ودوبلكس وسكاي فيلا وتاون هاوس وفيلات مستقلة بأسعار استرشادية تبدأ من 6 مليون جنيه، مقدم 5% وتقسيط حتى 8 سنوات وخصم سداد نقدي حتى 25%. اطلب قائمة الأسعار والبروشور الآن.",
  keywords: [
    "ون هايد بارك",
    "One Hyde Park",
    "هايد بارك التجمع الخامس",
    "كمبوند هايد بارك",
    "أسعار هايد بارك التجمع الخامس",
    "Hyde Park New Cairo",
    "شقق للبيع في التجمع الخامس",
    "فيلات للبيع في القاهرة الجديدة",
    "هايد بارك التسعين الجنوبي",
    "مشاريع هايد بارك 2026",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    title: "ون هايد بارك — أحدث مراحل هايد بارك التجمع الخامس",
    description:
      "أسعار استرشادية تبدأ من 6 مليون جنيه، مقدم 5% وتقسيط 8 سنوات وخصم كاش 25%.",
    type: "website",
    locale: "ar_EG",
    images: ["/images/hero.webp"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-bone text-ink antialiased">
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
