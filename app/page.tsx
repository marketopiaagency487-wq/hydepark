"use client";

import { useEffect, useRef, useState } from "react";

/* ============================================================
   إعدادات أساسية — عدّل قبل الرفع
   ============================================================ */
const PHONE = "01001050018";
const PHONE_INTL = "+201001050018";
const WA_NUM = "201001050018";
const waLink = (msg: string) =>
  `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`;
const WA_DEFAULT = waLink(
  "مرحباً، أريد الاستفسار عن أسعار ون هايد بارك One Hyde Park بكمبوند هايد بارك التجمع الخامس"
);
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // TODO

// Conversion labels — PLACEHOLDERS
const CONV_FORM = "AW-XXXXXXXXXX/FORM_LABEL"; // TODO
const CONV_WHATSAPP = "AW-XXXXXXXXXX/WA_LABEL"; // TODO
const CONV_CALL = "AW-XXXXXXXXXX/CALL_LABEL"; // TODO

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const fire = (label: string) =>
  window.gtag?.("event", "conversion", { send_to: label });
const trackWA = () => fire(CONV_WHATSAPP);
const trackCall = () => fire(CONV_CALL);

/* أكواد الدول */
const COUNTRIES = [
  { c: "EG", d: "+20", n: "مصر", re: /^1[0125][0-9]{8}$/ },
  { c: "SA", d: "+966", n: "السعودية", re: /^5[0-9]{8}$/ },
  { c: "AE", d: "+971", n: "الإمارات", re: /^5[0-9]{8}$/ },
  { c: "KW", d: "+965", n: "الكويت", re: /^[0-9]{8}$/ },
  { c: "QA", d: "+974", n: "قطر", re: /^[0-9]{8}$/ },
  { c: "OM", d: "+968", n: "عُمان", re: /^[0-9]{8}$/ },
  { c: "BH", d: "+973", n: "البحرين", re: /^[0-9]{8}$/ },
  { c: "US", d: "+1", n: "أمريكا", re: /^[0-9]{10}$/ },
];

/* ============================================================
   المحتوى
   ============================================================ */
const HERO_KPIS = [
  ["5%", "مقدم تعاقد"],
  ["8 سنوات", "تقسيط يصل إلى"],
  ["25%", "خصم السداد النقدي"],
];

const DEV_BADGES = [
  "طرح جديد — One Hyde Park",
  "التسليم خلال 4 سنوات",
  "خصم سداد نقدي حتى 25%",
  "وديعة صيانة 7%",
];

const LOCATION_STATS = [
  ["5 دقائق", "عن الجامعة الأمريكية AUC"],
  ["مباشرة", "على شارع التسعين الجنوبي"],
  ["15 دقيقة", "عن العاصمة الإدارية"],
  ["15 دقيقة", "عن مطار القاهرة الدولي"],
];

const UNITS = [
  {
    id: "apartments",
    img: "/images/unit-apartments.webp",
    alt: "شقق للبيع في كمبوند هايد بارك التجمع الخامس — ون هايد بارك",
    badge: "أسعار تبدأ من 6 مليون",
    badgeTone: "bg-park text-white",
    title: "شقق ودوبلكس وسكاي فيلا",
    sub: "شقق للبيع في هايد بارك التجمع الخامس",
    area: "70 – 240 م²",
    rows: [
      ["غرفة واحدة — 70 : 75 م²", "6 – 7 مليون جنيه"],
      ["غرفتان — 105 : 115 م²", "9 – 10 مليون جنيه"],
      ["3 غرف — 130 : 134 م²", "11 – 12 مليون جنيه"],
      ["3 غرف + غرفة مربية — 150 م²", "12 – 13 مليون جنيه"],
      ["بنتهاوس 4 غرف — 175 : 190 م²", "16 – 17 مليون جنيه"],
      ["دوبلكس — 195 : 240 م²", "17 – 18 مليون جنيه"],
      ["سكاي فيلا — 195 : 240 م²", "18 – 19 مليون جنيه"],
    ],
  },
  {
    id: "townhouse",
    img: "/images/unit-townhouse.webp",
    alt: "تاون هاوس وتوين هاوس للبيع في هايد بارك التجمع الخامس",
    badge: "وحدات محدودة",
    badgeTone: "bg-brass text-ink",
    title: "تاون هاوس وتوين هاوس",
    sub: "تاون هاوس للبيع في القاهرة الجديدة",
    area: "196 – 218 م²",
    rows: [
      ["تاون هاوس ميدل — 196 م²", "26 – 27 مليون جنيه"],
      ["تاون هاوس كورنر — 198 م²", "27.5 – 29.5 مليون جنيه"],
      ["توين هاوس — 218 م²", "35.5 – 38 مليون جنيه"],
    ],
  },
  {
    id: "villas",
    img: "/images/unit-villa.webp",
    alt: "فيلات مستقلة للبيع في كمبوند هايد بارك التجمع الخامس",
    badge: "أحدث فيلات الطرح",
    badgeTone: "bg-char text-white",
    title: "فيلات مستقلة Standalone",
    sub: "فيلات للبيع في هايد بارك القاهرة الجديدة",
    area: "220 – 377 م² · SV1 إلى SV6",
    rows: [
      ["SV6 — 220 م²", "43 – 45 مليون جنيه"],
      ["SV5 — 240 م²", "45 – 47 مليون جنيه"],
      ["SV4 — 270 م²", "48 – 51 مليون جنيه"],
      ["SV3 — 285 م²", "52 – 55 مليون جنيه"],
      ["SV2 — 350 م²", "62 – 66 مليون جنيه"],
      ["SV1 — 377 م²", "68 – 73 مليون جنيه"],
    ],
  },
];

const PLANS = [
  {
    tag: "النظام الرئيسي",
    tagTone: "bg-park text-white",
    title: "تقسيط هايد بارك حتى 8 سنوات",
    rows: [
      ["مقدم التعاقد", "5%"],
      ["مدة التقسيط", "حتى 8 سنوات"],
      ["التسليم", "خلال 4 سنوات"],
    ],
  },
  {
    tag: "Core & Shell",
    tagTone: "bg-char text-white",
    title: "نظام الاستلام والتشطيب",
    rows: [
      ["نوع التشطيب", "Core & Shell"],
      ["وديعة الصيانة", "7%"],
      ["مدة الاستلام", "4 سنوات"],
    ],
  },
  {
    tag: "الأعلى خصمًا",
    tagTone: "bg-brass text-ink",
    title: "خصم السداد النقدي (كاش)",
    rows: [
      ["طريقة السداد", "كاش"],
      ["الخصم الفوري", "حتى 25%"],
      ["الميزة", "أعلى خصم عند التعاقد"],
    ],
  },
];

const AMENITIES = [
  ["الحديقة المركزية", "حوالي 600 ألف م² — من أكبر الحدائق الخاصة في مصر"],
  ["نادي هايد بارك الرياضي", "جيم وحمامات سباحة وملاعب متعددة"],
  ["المنطقة التجارية", "مطاعم وكافيهات ومتاجر عالمية داخل الكمبوند"],
  ["Hyde Out الترفيهية", "منطقة ترفيه متكاملة للكبار والأطفال"],
  ["مدارس ومراكز طبية", "خدمات تعليمية وصحية داخل المجتمع"],
  ["Business District", "مقرات إدارية ومكاتب للأعمال"],
  ["مسارات مشي ودراجات", "ممرات آمنة وسط المساحات الخضراء"],
  ["أمن وحراسة 24/7", "بوابات مؤمّنة وكاميرات مراقبة على مدار الساعة"],
];

const WHY = [
  [
    "مجتمع قائم ومأهول — مش على الورق",
    "كمبوند هايد بارك التجمع الخامس يسكنه آلاف العائلات بالفعل، بمراحل مُسلَّمة وخدمات تعمل — تقدر تعاين المشروع على الطبيعة قبل ما تحجز، وده فرق جوهري عن المشروعات اللي لسه في مرحلة الحفر.",
  ],
  [
    "موقع على التسعين الجنوبي مباشرة",
    "الواجهة المباشرة على شارع التسعين الجنوبي بتخلي الوحدة مطلوبة سكنًا وإيجارًا واستثمارًا، وقربها من الجامعة الأمريكية بيضمن طلبًا إيجاريًا ثابتًا طول السنة.",
  ],
  [
    "أطول فترة سداد بأقل مقدم",
    "مقدم 5% فقط وتقسيط يمتد 8 سنوات، وده بيخلي القسط الشهري في متناول شريحة أوسع بكتير مقارنة بمشروعات التجمع الخامس المنافسة.",
  ],
  [
    "خصم كاش يوصل 25%",
    "لو معاك سيولة، خصم السداد النقدي بيوفر عليك ربع قيمة الوحدة تقريبًا — وده من أعلى الخصومات المطروحة حاليًا في القاهرة الجديدة.",
  ],
];

const GALLERY: [string, string][] = [
  ["/images/gallery-1.webp", "فيلات ون هايد بارك على البحيرة — كمبوند هايد بارك التجمع الخامس"],
  ["/images/gallery-2.webp", "فيلا مستقلة في ون هايد بارك التجمع الخامس"],
  ["/images/gallery-3.webp", "تصميمات فيلات هايد بارك القاهرة الجديدة"],
  ["/images/gallery-4.webp", "فيلات للبيع في كمبوند هايد بارك التجمع الخامس"],
  ["/images/gallery-5.webp", "سكاي فيلا ون هايد بارك — هايد بارك التجمع الخامس"],
  ["/images/gallery-6.webp", "تاون هاوس هايد بارك التجمع الخامس"],
  ["/images/gallery-7.webp", "شقق كمبوند هايد بارك التجمع الخامس"],
  ["/images/gallery-8.webp", "ماستر بلان كمبوند هايد بارك التجمع الخامس"],
];

const FAQS = [
  {
    q: "ما هي أسعار ون هايد بارك One Hyde Park بالتجمع الخامس؟",
    a: "تبدأ الأسعار الاسترشادية للشقق في ون هايد بارك من حوالي 6 مليون جنيه لوحدات الغرفة الواحدة (70 : 75 م²)، وتصل السكاي فيلا إلى حوالي 19 مليون جنيه. أما التاون هاوس فيبدأ من حوالي 26 مليون والتوين هاوس من 35.5 مليون، والفيلات المستقلة من 43 حتى 73 مليون جنيه حسب النموذج والمساحة. أسعار هايد بارك التجمع الخامس في تحديث مستمر — سجل بياناتك لتصلك القائمة المحدثة.",
  },
  {
    q: "ما هو نظام تقسيط هايد بارك التجمع الخامس؟",
    a: "نظام السداد في ون هايد بارك يبدأ بمقدم تعاقد 5% وتقسيط يصل إلى 8 سنوات، مع تسليم خلال 4 سنوات بنظام Core & Shell ووديعة صيانة 7%. ويوجد خصم للسداد النقدي يصل إلى 25% عند التعاقد كاش.",
  },
  {
    q: "أين يقع كمبوند هايد بارك التجمع الخامس بالظبط؟",
    a: "يقع كمبوند هايد بارك في قلب التجمع الخامس بالقاهرة الجديدة بواجهة مباشرة على شارع التسعين الجنوبي، على بعد 5 دقائق من الجامعة الأمريكية بالقاهرة و15 دقيقة من العاصمة الإدارية الجديدة ومن مطار القاهرة الدولي، وبالقرب من الطريق الدائري الأوسطي وطريق السويس.",
  },
  {
    q: "كم مساحة كمبوند هايد بارك والحديقة المركزية؟",
    a: "يمتد كمبوند هايد بارك التجمع الخامس على حوالي 1,200 فدان (نحو 6 مليون متر مربع)، وتبلغ مساحة الحديقة المركزية بداخله حوالي 600 ألف متر مربع — وتُعد من أكبر الحدائق الخاصة داخل المجتمعات السكنية في مصر، وتحيط بها أغلب مراحل المشروع بما فيها ون هايد بارك.",
  },
  {
    q: "هل كمبوند هايد بارك التجمع الخامس مُسلَّم ومأهول بالفعل؟",
    a: "نعم — هايد بارك التجمع الخامس مجتمع قائم يسكنه آلاف العائلات بالفعل، بمراحل مُسلَّمة ومنطقة تجارية ونادٍ رياضي ومدارس تعمل على أرض الواقع. وون هايد بارك هي أحدث المراحل المطروحة داخله، ويمكنك معاينة المشروع على الطبيعة قبل الحجز.",
  },
  {
    q: "ما نوع تشطيب وحدات ون هايد بارك؟",
    a: "تُسلَّم وحدات هذه المرحلة بنظام Core & Shell (نصف تشطيب)، وهو ما يمنحك حرية كاملة في تصميم وحدتك بالشكل الذي يناسبك، مع وديعة صيانة 7% من قيمة الوحدة.",
  },
  {
    q: "من هي شركة هايد بارك للتطوير العقاري؟",
    a: "Hyde Park Developments من كبرى شركات التطوير العقاري في السوق المصري منذ 2007، بمحفظة مشروعات تتجاوز 1,500 فدان موزعة بين التجمع الخامس ورأس الحكمة و6 أكتوبر. ومن مشروعاتها: كمبوند هايد بارك التجمع الخامس، سي شور رأس الحكمة، جاردن ليكس أكتوبر، وتاوني.",
  },
];

/* ============================================================ */

export default function Page() {
  const [annOpen, setAnnOpen] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const popupShown = useRef(false);

  useEffect(() => {
    const show = () => {
      if (popupShown.current || sessionStorage.getItem("ohp_popup")) return;
      popupShown.current = true;
      sessionStorage.setItem("ohp_popup", "1");
      setPopupOpen(true);
    };
    const t = setTimeout(show, 18000);
    const onScroll = () => {
      const sc =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      if (sc >= 0.55) show();
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => setCookiesOk(!!localStorage.getItem("ohp_cookies")), []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* schema.org FAQ — يساعد الظهور في نتائج البحث */
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <main className="overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ============ Announcement bar ============ */}
      {annOpen && (
        <div className="fixed top-0 inset-x-0 z-50 bg-brass text-ink text-center text-xs sm:text-sm py-2 px-9">
          <span className="ann-pulse font-semibold">
            طرح جديد — One Hyde Park · خصم السداد النقدي حتى 25%
          </span>
          <button
            aria-label="إغلاق الشريط"
            onClick={() => setAnnOpen(false)}
            className="absolute top-1.5 left-3 text-ink/60 hover:text-ink text-lg leading-none"
          >
            ✕
          </button>
        </div>
      )}

      {/* ============ Header ============ */}
      <header
        className={`fixed inset-x-0 z-40 bg-ink/95 backdrop-blur border-b border-white/10 transition-all ${
          annOpen ? "top-9" : "top-0"
        }`}
      >
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <a href="#top" className="text-white font-bold text-base sm:text-lg leading-tight shrink-0">
            <span className="font-latin italic text-brass-2 text-lg sm:text-xl">One</span>{" "}
            هايد بارك
            <span className="block text-[10px] font-normal text-white/50 tracking-wide">
              فريق مبيعات معتمد
            </span>
          </a>
          <nav className="hidden lg:flex items-center gap-5 text-sm text-white/80">
            <a href="#location" className="hover:text-brass-2 transition-colors">الموقع</a>
            <a href="#units" className="hover:text-brass-2 transition-colors">الوحدات والأسعار</a>
            <a href="#plans" className="hover:text-brass-2 transition-colors">أنظمة السداد</a>
            <a href="#amenities" className="hover:text-brass-2 transition-colors">الخدمات</a>
            <a href="#gallery" className="hover:text-brass-2 transition-colors">الصور</a>
            <a href="#faq" className="hover:text-brass-2 transition-colors">أسئلة شائعة</a>
          </nav>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="hidden sm:inline-flex rounded-full bg-[#25D366] px-4 py-2 text-sm font-semibold text-white"
            >
              واتساب
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="hidden xl:inline-flex rounded-full bg-brass px-4 py-2 text-sm font-semibold text-ink"
            >
              {PHONE}
            </a>
            <button
              aria-label="القائمة"
              onClick={() => setMenuOpen((v) => !v)}
              className="lg:hidden text-white p-2"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="lg:hidden bg-ink border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-white/90">
            {[
              ["location", "الموقع"],
              ["units", "الوحدات والأسعار"],
              ["plans", "أنظمة السداد"],
              ["amenities", "الخدمات"],
              ["gallery", "الصور"],
              ["faq", "أسئلة شائعة"],
            ].map(([id, l]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {l}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* ============ HERO + form ============ */}
      <section
        id="top"
        className={`relative ${annOpen ? "pt-28" : "pt-20"} pb-14 md:pb-20`}
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(26,29,27,.9), rgba(26,29,27,.76) 45%, rgba(26,29,27,.95)), url(/images/hero.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-[1.12fr_1fr] gap-10 items-start">
          {/* copy */}
          <div className="text-white pt-3">
            <p className="inline-block rounded-full border border-brass/50 bg-brass/10 px-4 py-1.5 text-xs sm:text-sm text-brass-2 mb-6">
              أحدث مرحلة داخل كمبوند هايد بارك التجمع الخامس
            </p>
            <h1 className="text-[26px] sm:text-4xl lg:text-5xl font-extrabold leading-[1.35] mb-5">
              <span className="font-latin italic text-brass-2">One Hyde Park</span>
              <span className="block mt-2">
                ون هايد بارك — أحدث مراحل هايد بارك التجمع الخامس
              </span>
            </h1>
            <p className="text-white/85 md:text-lg leading-relaxed mb-8 max-w-xl">
              امتلك شقتك أو فيلتك في كمبوند هايد بارك التجمع الخامس على شارع
              التسعين الجنوبي مباشرة، بأسعار استرشادية تبدأ من 6 مليون جنيه
              ومقدم 5% — داخل مجتمع قائم ومأهول بالفعل تتوسطه حديقة مركزية
              بمساحة 600 ألف متر مربع.
            </p>

            <div className="grid grid-cols-3 gap-2.5 sm:gap-4 mb-8 max-w-lg">
              {HERO_KPIS.map(([v, l]) => (
                <div
                  key={l}
                  className="rounded-xl bg-white/8 border border-white/15 px-2 py-4 text-center backdrop-blur-sm"
                >
                  <div className="text-base sm:text-2xl font-extrabold text-brass-2">
                    {v}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/70 mt-1 leading-tight">
                    {l}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="#lead"
                className="rounded-full bg-brass px-7 py-3 font-bold text-ink hover:bg-brass-2 transition-colors"
              >
                اطلب قائمة الأسعار
              </a>
              <a
                href={WA_DEFAULT}
                target="_blank"
                rel="noopener"
                onClick={trackWA}
                className="rounded-full border border-white/35 px-7 py-3 font-bold text-white hover:bg-white/10 transition-colors"
              >
                واتساب مباشر
              </a>
            </div>
          </div>

          {/* form */}
          <div id="lead" className="scroll-mt-28">
            <div className="rounded-2xl bg-white shadow-2xl p-6 sm:p-7">
              <h2 className="text-lg sm:text-xl font-bold text-ink mb-1.5">
                سجل اهتمامك واستلم البروشور وقائمة الأسعار
              </h2>
              <p className="text-sm text-ink/55 mb-5 leading-relaxed">
                سيتواصل معك مستشار عقاري بأحدث وحدات ون هايد بارك المتاحة
                والأسعار المحدثة
              </p>
              <LeadForm formLocation="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* ============ Developer ============ */}
      <section className="bg-char text-white py-14 md:py-16">
        <div className="mx-auto max-w-5xl px-4 text-center reveal">
          <p className="font-latin text-brass-2 tracking-[0.25em] text-xs sm:text-sm mb-3">
            HYDE PARK DEVELOPMENTS
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-5">
            عن شركة هايد بارك للتطوير العقاري
          </h2>
          <p className="text-white/75 leading-relaxed max-w-3xl mx-auto mb-8">
            من كبرى شركات التطوير العقاري في السوق المصري منذ عام 2007، بمحفظة
            مشروعات تتجاوز 1,500 فدان موزعة بين التجمع الخامس ورأس الحكمة و6
            أكتوبر. ويقف خلف كمبوند هايد بارك التجمع الخامس ماستر بلان من
            Gensler العالمية، ومجتمع قائم بالفعل يسكنه آلاف العائلات بخدماته
            ومدارسه وناديه ومنطقته التجارية. ومن سابقة أعمالها أيضًا: سي شور رأس
            الحكمة، جاردن ليكس أكتوبر، وتاوني.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5 text-sm">
            {DEV_BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-white/85"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Video tour ============ */}
      <section className="py-16 md:py-20 bg-bone">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-park font-semibold text-sm mb-2 reveal">
            جولة ميدانية بالفيديو
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-4 reveal">
            شاهد كمبوند هايد بارك التجمع الخامس من قلب الواقع
          </h2>
          <p className="text-center text-ink/60 max-w-2xl mx-auto mb-9 reveal leading-relaxed">
            استكشف الحديقة المركزية بمساحة 600 ألف متر مربع تقريبًا، والمراحل
            المُسلَّمة والمأهولة بالسكان، والمنطقة التجارية — من خلال جولة
            مصوّرة حديثة داخل المشروع.
          </p>

          <button
            onClick={() => setVideoOpen(true)}
            className="reveal group relative block w-full rounded-2xl overflow-hidden shadow-xl"
            aria-label="تشغيل فيديو الجولة"
          >
            <img
              src="/images/video-poster.webp"
              alt="جولة داخل كمبوند هايد بارك التجمع الخامس — ون هايد بارك"
              className="w-full h-[230px] sm:h-[420px] object-cover"
              loading="lazy"
            />
            <span className="absolute inset-0 bg-ink/35 group-hover:bg-ink/25 transition-colors" />
            <span className="absolute inset-0 grid place-items-center">
              <span className="grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 shadow-lg group-hover:scale-105 transition-transform">
                <svg viewBox="0 0 24 24" className="w-7 h-7 sm:w-8 sm:h-8 fill-park mr-[-3px]" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </span>
          </button>

          <div className="text-center mt-6 reveal">
            <a
              href={waLink("مرحباً، أريد استلام فيديو الجولة الميدانية لكمبوند هايد بارك التجمع الخامس")}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="inline-block rounded-full border-2 border-park text-park px-7 py-2.5 font-semibold hover:bg-park hover:text-white transition-colors"
            >
              اطلب فيديو الجولة عبر واتساب
            </a>
          </div>
        </div>
      </section>

      {/* ============ Location + masterplan ============ */}
      <section id="location" className="py-16 md:py-20 bg-ink text-white scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4 grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal order-2 md:order-1 rounded-2xl overflow-hidden bg-white shadow-xl">
            <img
              src="/images/masterplan.webp"
              alt="ماستر بلان كمبوند هايد بارك التجمع الخامس — موقع ون هايد بارك"
              className="w-full"
              loading="lazy"
            />
          </div>
          <div className="reveal order-1 md:order-2">
            <p className="text-brass-2 font-semibold text-sm mb-2">
              موقع استراتيجي لا يُعوَّض
            </p>
            <h2 className="text-2xl md:text-3xl font-bold mb-5 leading-snug">
              موقع كمبوند هايد بارك — التسعين الجنوبي بالقاهرة الجديدة
            </h2>
            <p className="text-white/75 leading-relaxed mb-7">
              يتميز كمبوند هايد بارك التجمع الخامس بواجهة مباشرة على شارع
              التسعين الجنوبي، وقرب تام من أهم المحاور الرئيسية والطريق الدائري
              الأوسطي ومطار القاهرة الدولي والعاصمة الإدارية الجديدة — ما يجعله
              من أقوى المواقع سكنًا واستثمارًا في القاهرة الجديدة.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {LOCATION_STATS.map(([v, l]) => (
                <div key={l} className="border-r-2 border-brass pr-3">
                  <div className="text-lg sm:text-xl font-extrabold text-brass-2">{v}</div>
                  <div className="text-xs text-white/65 mt-1 leading-tight">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ Units & prices ============ */}
      <section id="units" className="py-16 md:py-20 bg-bone-2 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-park font-semibold text-sm mb-2 reveal">
            الوحدات والمساحات — الطرح الجديد
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-3 reveal">
            أسعار ومساحات ون هايد بارك التجمع الخامس 2026
          </h2>
          <p className="text-center text-ink/55 max-w-2xl mx-auto mb-10 reveal leading-relaxed">
            تضم مرحلة One Hyde Park شققًا ودوبلكس وسكاي فيلا وتاون هاوس وتوين
            هاوس وفيلات مستقلة. الأسعار التالية استرشادية — سجل بياناتك لتصلك
            قائمة الوحدات المتاحة والأسعار الرسمية المحدثة.
          </p>

          <div className="grid lg:grid-cols-3 gap-6">
            {UNITS.map((u) => (
              <div
                key={u.id}
                className="reveal rounded-2xl bg-white border hairline overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={u.img}
                    alt={u.alt}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold shadow ${u.badgeTone}`}
                  >
                    {u.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-bold text-lg text-ink">{u.title}</h3>
                  <p className="text-xs text-ink/45 mt-1">{u.sub}</p>
                  <p className="text-sm text-park font-semibold mt-2 mb-4">
                    {u.area}
                  </p>
                  <ul className="space-y-2.5 flex-1">
                    {u.rows.map(([a, p]) => (
                      <li
                        key={a}
                        className="flex justify-between gap-3 text-sm border-b hairline pb-2.5 last:border-0"
                      >
                        <span className="text-ink/70">{a}</span>
                        <span className="text-ink font-semibold whitespace-nowrap">
                          {p}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#lead"
                    className="mt-6 block text-center rounded-xl bg-ink text-white py-3 font-semibold hover:bg-char-2 transition-colors"
                  >
                    اطلب قائمة الوحدات والأسعار
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs text-ink/45 text-center mt-6 leading-relaxed max-w-3xl mx-auto">
            * جميع الأسعار والمساحات وأنظمة السداد المذكورة استرشادية وقابلة
            للتغيير وفقًا لتحديثات الشركة المطورة وتوافر الوحدات وقت الحجز.
          </p>
        </div>
      </section>

      {/* ============ Payment plans ============ */}
      <section id="plans" className="py-16 md:py-20 bg-bone scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-park font-semibold text-sm mb-2 reveal">
            أنظمة السداد والخصومات
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            أنظمة سداد وتقسيط هايد بارك التجمع الخامس
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((p) => (
              <div
                key={p.title}
                className="reveal rounded-2xl bg-white border hairline p-6 flex flex-col shadow-sm"
              >
                <span
                  className={`self-start rounded-full px-3 py-1 text-xs font-semibold mb-4 ${p.tagTone}`}
                >
                  {p.tag}
                </span>
                <h3 className="font-bold text-lg text-ink mb-5">{p.title}</h3>
                <dl className="space-y-3 flex-1">
                  {p.rows.map(([k, v]) => (
                    <div
                      key={k}
                      className="flex justify-between gap-3 text-sm border-b hairline pb-3 last:border-0"
                    >
                      <dt className="text-ink/60">{k}</dt>
                      <dd className="text-ink font-bold">{v}</dd>
                    </div>
                  ))}
                </dl>
                <a
                  href="#lead"
                  className="mt-6 block text-center rounded-xl border-2 border-park text-park py-2.5 font-semibold hover:bg-park hover:text-white transition-colors"
                >
                  اطلب تفاصيل النظام
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Amenities ============ */}
      <section id="amenities" className="py-16 md:py-20 bg-bone-2 scroll-mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-center text-park font-semibold text-sm mb-2 reveal">
            الخدمات والمرافق
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            خدمات ومرافق كمبوند هايد بارك التجمع الخامس
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AMENITIES.map(([t, d]) => (
              <div
                key={t}
                className="reveal rounded-xl bg-white border hairline p-5 hover:border-park/40 transition-colors"
              >
                <div className="w-9 h-0.5 bg-brass mb-3" />
                <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                <p className="text-sm text-ink/60 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Why invest ============ */}
      <section className="py-16 md:py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-park font-semibold text-sm mb-2 reveal">
            مميزات الاستثمار
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-10 reveal">
            لماذا تشتري في هايد بارك التجمع الخامس؟
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {WHY.map(([t, d], i) => (
              <div key={t} className="reveal flex gap-4">
                <div className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-park text-white font-bold">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-ink mb-1.5">{t}</h3>
                  <p className="text-sm text-ink/65 leading-relaxed">{d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Gallery ============ */}
      <section id="gallery" className="py-16 md:py-20 bg-char scroll-mt-24">
        <div className="mx-auto max-w-5xl px-4">
          <p className="text-center text-brass-2 font-semibold text-sm mb-2 reveal">
            معرض الصور
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-white text-center mb-9 reveal">
            صور ون هايد بارك وكمبوند هايد بارك التجمع الخامس
          </h2>

          <div className="reveal relative rounded-2xl overflow-hidden shadow-2xl bg-white">
            <img
              src={GALLERY[slide][0]}
              alt={GALLERY[slide][1]}
              className="w-full h-[240px] sm:h-[480px] object-cover"
              loading="lazy"
            />
            <button
              aria-label="الصورة السابقة"
              onClick={() => setSlide((s) => (s - 1 + GALLERY.length) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 right-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❯
            </button>
            <button
              aria-label="الصورة التالية"
              onClick={() => setSlide((s) => (s + 1) % GALLERY.length)}
              className="absolute top-1/2 -translate-y-1/2 left-3 grid place-items-center w-11 h-11 rounded-full bg-white/90 text-ink text-xl hover:bg-white shadow"
            >
              ❮
            </button>
            <p className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-ink/85 to-transparent text-white text-xs sm:text-sm px-4 pt-8 pb-3 text-center">
              {GALLERY[slide][1]}
            </p>
          </div>

          <div className="flex justify-center gap-2 mt-5 flex-wrap">
            {GALLERY.map((g, i) => (
              <button
                key={g[0]}
                aria-label={`صورة ${i + 1}`}
                onClick={() => setSlide(i)}
                className={`h-2.5 rounded-full transition-all ${
                  i === slide ? "w-7 bg-brass" : "w-2.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-8 reveal">
            <a
              href="#lead"
              className="inline-block rounded-full bg-brass px-8 py-3 font-bold text-ink hover:bg-brass-2 transition-colors"
            >
              اطلب بروشور المشروع والأسعار
            </a>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" className="py-16 md:py-20 bg-bone scroll-mt-24">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-ink text-center mb-9">
            أسئلة شائعة عن ون هايد بارك وهايد بارك التجمع الخامس
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div
                key={f.q}
                className="reveal rounded-xl bg-white border hairline overflow-hidden"
              >
                <button
                  className="w-full text-right px-5 py-4 font-semibold text-ink flex justify-between items-center gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="text-park shrink-0 text-lg">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-ink/65 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ Final CTA ============ */}
      <section className="py-16 md:py-20 bg-park text-white">
        <div className="mx-auto max-w-3xl px-4 text-center reveal">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            جاهز لمعرفة تفاصيل One Hyde Park؟
          </h2>
          <p className="text-white/85 mb-8 leading-relaxed">
            تواصل معنا الآن للحصول على قائمة الوحدات المتاحة في ون هايد بارك
            وأحدث خطط السداد وخصم السداد النقدي.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="rounded-full bg-white text-park px-7 py-3 font-bold hover:bg-bone transition-colors"
            >
              اتصل بالمستشار العقاري
            </a>
            <a
              href={WA_DEFAULT}
              target="_blank"
              rel="noopener"
              onClick={trackWA}
              className="rounded-full bg-[#25D366] px-7 py-3 font-bold text-white"
            >
              تحدث عبر واتساب
            </a>
            <a
              href="#lead"
              className="rounded-full border border-white/50 px-7 py-3 font-bold hover:bg-white/10 transition-colors"
            >
              احجز وحدتك الآن
            </a>
          </div>
        </div>
      </section>

      {/* ============ Footer ============ */}
      <footer className="bg-ink border-t border-white/10 text-white/60 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
          <p className="leading-relaxed">
            منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد لدى
            كبرى شركات التطوير العقاري في مصر. هذه الصفحة ليست الموقع الرسمي
            لشركة هايد بارك للتطوير العقاري (Hyde Park Developments) ولا تتبعها
            إداريًا، وجميع الأسماء والعلامات التجارية مملوكة لأصحابها. الأسعار
            والمساحات الواردة استرشادية وقابلة للتغيير وفق أحدث تحديثات المطور.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/about/" className="hover:text-brass-2">من نحن</a>
            <a href="/privacy/" className="hover:text-brass-2">سياسة الخصوصية</a>
            <a href="/disclaimer/" className="hover:text-brass-2">إخلاء المسئولية</a>
            <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="hover:text-brass-2">
              {PHONE}
            </a>
          </div>
          <p>© 2026 جميع الحقوق محفوظة.</p>
        </div>
      </footer>

      {/* ============ Floating buttons ============ */}
      <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col gap-3">
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          aria-label="تواصل واتساب"
          className="wa-pulse grid place-items-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.33 4.95L2 22l5.3-1.39a9.87 9.87 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.83 9.83 0 0 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.34c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.25 8.23Zm4.52-6.16c-.25-.13-1.47-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.13-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29Z" />
          </svg>
        </a>
        <a
          href={`tel:${PHONE_INTL}`}
          onClick={trackCall}
          aria-label="اتصال هاتفي"
          className="grid place-items-center w-14 h-14 rounded-full bg-brass text-ink shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
          </svg>
        </a>
      </div>

      {/* ============ Mobile bottom bar ============ */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-ink border-t border-white/10 grid grid-cols-3 text-center text-sm text-white">
        <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="py-3.5 font-semibold">
          اتصال
        </a>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="py-3.5 font-semibold bg-[#25D366]"
        >
          واتساب
        </a>
        <a href="#lead" className="py-3.5 font-semibold bg-brass text-ink">
          احجز الآن
        </a>
      </div>

      {/* ============ Video modal ============ */}
      {videoOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/85 px-4"
          onClick={() => setVideoOpen(false)}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <button
              aria-label="إغلاق"
              onClick={() => setVideoOpen(false)}
              className="mb-3 text-white/70 hover:text-white text-2xl block mr-auto"
            >
              ✕
            </button>
            <video
              controls
              autoPlay
              playsInline
              poster="/images/video-poster.webp"
              className="w-full rounded-xl bg-black"
            >
              <source src="/video/tour.mp4" type="video/mp4" />
              متصفحك لا يدعم تشغيل الفيديو.
            </video>
            <p className="text-center text-white/50 text-xs mt-3">
              ضع ملف الفيديو في <code>public/video/tour.mp4</code>
            </p>
          </div>
        </div>
      )}

      {/* ============ Popup ============ */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 relative max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="إغلاق"
              className="absolute top-3 left-3 text-ink/40 text-xl"
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <span className="inline-block rounded-full bg-brass/20 text-brass px-3 py-1 text-xs font-semibold mb-3">
              خصم السداد النقدي حتى 25%
            </span>
            <h3 className="text-xl font-bold text-ink mb-1.5">
              قائمة أسعار ون هايد بارك 2026
            </h3>
            <p className="text-sm text-ink/55 mb-5">
              سجل رقمك وهنبعتلك البروشور وأحدث أسعار هايد بارك التجمع الخامس على
              واتساب
            </p>
            <LeadForm formLocation="popup" compact />
          </div>
        </div>
      )}

      {/* ============ Cookie consent ============ */}
      {!cookiesOk && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:max-w-sm z-50 rounded-xl bg-white shadow-2xl border hairline p-4 text-sm text-ink/70">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الحملات
          الإعلانية.{" "}
          <a href="/privacy/" className="text-park underline">
            سياسة الخصوصية
          </a>
          <button
            className="mt-3 w-full rounded-lg bg-ink text-white py-2 font-semibold"
            onClick={() => {
              localStorage.setItem("ohp_cookies", "1");
              setCookiesOk(true);
            }}
          >
            موافق
          </button>
        </div>
      )}
    </main>
  );
}

/* ============================================================
   Lead form — كود دولة + تحقق + رسالة نجاح داخل الصفحة
   ============================================================ */
function LeadForm({
  formLocation,
  compact = false,
}: {
  formLocation: string;
  compact?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");
  const [dial, setDial] = useState("+20");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;

    const name = String(fd.get("name") || "").trim();
    const raw = String(fd.get("phone") || "").replace(/[\s\-()]/g, "");
    const local = raw.replace(/^0+/, "");
    const country = COUNTRIES.find((c) => c.d === dial)!;

    if (name.length < 2) return setErr("من فضلك اكتب الاسم بالكامل");
    if (!country.re.test(local))
      return setErr(`رقم غير صحيح — تأكد من رقم ${country.n}`);

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Lead جديد — ون هايد بارك One Hyde Park",
          from_name: "One Hyde Park Landing",
          name,
          phone: `${dial}${local}`,
          country: country.n,
          unit: fd.get("unit") || "—",
          source: formLocation,
          page: "one-hyde-park",
        }),
      });
      const data = await res.json();
      if (data.success) {
        fire(CONV_FORM);
        setDone(true);
      } else {
        setErr("حدث خطأ، حاول مرة أخرى أو تواصل عبر واتساب");
      }
    } catch {
      setErr("تعذر الإرسال — تأكد من الاتصال بالإنترنت");
    } finally {
      setSending(false);
    }
  }

  if (done)
    return (
      <div className="text-center py-4">
        <div className="mx-auto grid place-items-center w-14 h-14 rounded-full bg-park text-white text-2xl mb-4">
          ✓
        </div>
        <h3 className="text-lg font-bold text-ink mb-2">
          تم استلام طلبك بنجاح!
        </h3>
        <p className="text-sm text-ink/60 leading-relaxed mb-5">
          شكرًا لتواصلك — سيتصل بك مستشار عقاري هاتفيًا أو عبر واتساب لتأكيد
          تفاصيل ون هايد بارك والأسعار.
        </p>
        <a
          href={WA_DEFAULT}
          target="_blank"
          rel="noopener"
          onClick={trackWA}
          className="block rounded-xl bg-[#25D366] text-white py-3 font-bold"
        >
          تواصل عبر واتساب مباشرة
        </a>
        <p className="text-[11px] text-ink/40 mt-4">
          خصوصية تامة — بياناتك تُستخدم فقط للتواصل بخصوص استفسارك العقاري
        </p>
      </div>
    );

  return (
    <form onSubmit={submit} className="space-y-3.5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

      <input
        name="name"
        placeholder="الاسم بالكامل"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 focus:outline-none focus:border-park"
      />

      <div className="flex gap-2" dir="rtl">
        <select
          aria-label="كود الدولة"
          value={dial}
          onChange={(e) => setDial(e.target.value)}
          className="w-28 shrink-0 rounded-xl border border-slate-300 px-2 py-3 bg-white text-ink text-sm focus:outline-none focus:border-park"
        >
          {COUNTRIES.map((c) => (
            <option key={c.c} value={c.d}>
              {c.c} {c.d}
            </option>
          ))}
        </select>
        <input
          name="phone"
          inputMode="tel"
          dir="ltr"
          placeholder="رقم الموبايل"
          className="flex-1 rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink placeholder:text-ink/40 text-right focus:outline-none focus:border-park"
        />
      </div>

      {!compact && (
        <select
          name="unit"
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-ink/70 focus:outline-none focus:border-park"
        >
          <option value="" disabled>
            نوع الوحدة المطلوبة
          </option>
          <option>شقة (غرفة – 3 غرف)</option>
          <option>دوبلكس / بنتهاوس / سكاي فيلا</option>
          <option>تاون هاوس / توين هاوس</option>
          <option>فيلا مستقلة</option>
          <option>استفسار عام / استثمار</option>
        </select>
      )}

      {err && <p className="text-red-600 text-sm font-semibold">{err}</p>}

      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-brass py-3.5 font-bold text-ink hover:bg-brass-2 transition-colors disabled:opacity-60"
      >
        {sending ? "جاري الإرسال..." : "احجز وحدتك الآن"}
      </button>

      <p className="text-[11px] text-ink/45 text-center leading-relaxed">
        بالضغط على إرسال أنت توافق على{" "}
        <a href="/privacy/" className="underline">سياسة الخصوصية</a> — بياناتك
        تُستخدم فقط للتواصل بخصوص استفسارك العقاري.
      </p>
    </form>
  );
}
