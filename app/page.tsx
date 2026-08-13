"use client";

import { useEffect, useRef, useState } from "react";

/* ====== إعدادات أساسية ====== */
const PHONE = "01001050018";
const PHONE_INTL = "+201001050018";
const WA_LINK =
  "https://wa.me/201001050018?text=" +
  encodeURIComponent("مرحباً، أريد الاستفسار عن مشاريع هايد بارك (سي شور رأس الحكمة / هايد بارك التجمع الخامس)");
const WEB3FORMS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY"; // TODO

const CONV_WHATSAPP = "AW-XXXXXXXXXX/WA_LABEL"; // TODO
const CONV_CALL = "AW-XXXXXXXXXX/CALL_LABEL"; // TODO

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const trackWhatsApp = () =>
  window.gtag?.("event", "conversion", { send_to: CONV_WHATSAPP });
const trackCall = () =>
  window.gtag?.("event", "conversion", { send_to: CONV_CALL });

function validatePhone(raw: string): boolean {
  const p = raw.replace(/[\s\-()]/g, "");
  return [
    /^(\+?20)?01[0125][0-9]{8}$/,
    /^\+?9665[0-9]{8}$/,
    /^\+?9715[0-9]{8}$/,
    /^\+?965[0-9]{8}$/,
    /^\+?974[0-9]{8}$/,
    /^\+?973[0-9]{8}$/,
    /^\+?968[0-9]{8}$/,
  ].some((re) => re.test(p));
}

/* ====== المحتوى ====== */
const PROJECTS = [
  {
    id: "seashore",
    tag: "الساحل الشمالي — رأس الحكمة",
    name: "سي شور رأس الحكمة",
    en: "Seashore · Ras El Hekma",
    color: "text-sea",
    img1: "/images/seashore-1.jpg",
    img2: "/images/seashore-2.jpg",
    desc: "قرية هايد بارك الساحلية على 240 فدانًا في الكيلو 210 بقلب خليج رأس الحكمة، بتدرج طبيعي يرتفع حتى 40 مترًا فوق البحر يمنح حوالي 90% من الوحدات إطلالة بحرية. المرحلة الأولى تم تسليمها بالفعل مع افتتاح المنطقة التجارية والشاطئ الخاص واللاجونز — مشروع شغال على أرض الواقع مش على الورق.",
    facts: [
      ["240", "فدان مساحة المشروع"],
      ["5%", "مقدم يبدأ من"],
      ["8 سنوات", "أنظمة سداد حتى"],
      ["90%", "من الوحدات بإطلالة بحرية"],
    ],
    units: [
      ["شاليهات سي شور", "مساحات من حوالي 70 م² بإطلالات بحرية ولاجونز", "أسعار استرشادية تبدأ من ~ 6.2 مليون جنيه"],
      ["شاليهات سي لاين (المرحلة الجديدة)", "غرفة من ~ 8.5 مليون · غرفتين من ~ 11.6 مليون", "3 غرف حتى ~ 14.4 مليون جنيه"],
      ["توين وفيلات", "صفوف أولى بحدائق خاصة", "حسب أحدث برايس ليست"],
    ],
    note: "مرحلة أولى متسلمة + شاطئ ومنطقة تجارية تعمل بالفعل.",
    ideal: "مثالي لمن يريد مصيفًا جاهزًا للاستخدام أو استثمارًا في رأس الحكمة بسعر دخول أقل من متوسط المنطقة.",
  },
  {
    id: "newcairo",
    tag: "القاهرة الجديدة — التسعين الشمالي",
    name: "هايد بارك التجمع الخامس",
    en: "Hyde Park · New Cairo",
    color: "text-leaf",
    img1: "/images/newcairo-1.jpg",
    img2: "/images/newcairo-2.jpg",
    desc: "المشروع الأم لهايد بارك: مدينة متكاملة على أكثر من 1200 فدان على شارع التسعين الشمالي مباشرة، بماستر بلان من Gensler العالمية وحديقة مركزية ضخمة. 7 دقائق من الجامعة الأمريكية، 20 دقيقة من العاصمة الإدارية، وأقل من 30 دقيقة من مطار القاهرة — مجتمع قائم بالفعل بخدماته ومدارسه وناديه ومنطقة Hyde Out الترفيهية.",
    facts: [
      ["1200+", "فدان — مدينة متكاملة"],
      ["5%", "مقدم عند التعاقد"],
      ["8 سنوات", "أنظمة سداد حتى"],
      ["7 دقائق", "من الجامعة الأمريكية"],
    ],
    units: [
      ["شقق تشطيب سوبر لوكس", "من 78 م² — للسكن الأول والاستثمار", "من ~ 9.7 مليون جنيه"],
      ["دوبلكس وبنتهاوس", "مساحات حتى 278 م² بإطلالات على الحديقة", "حسب أحدث برايس ليست"],
      ["تاون وتوين وفيلات", "من 230 حتى 376 م² وسط المساحات الخضراء", "من ~ 14.5 مليون جنيه"],
    ],
    note: "مجتمع قائم ومُسلَّم بمراحله الأولى — معاينة فورية للوحدات.",
    ideal: "مثالي للسكن الدائم للعائلات في قلب التجمع الخامس، أو استثمار إيجاري قوي بجوار الجامعة الأمريكية.",
  },
];

const FAQS = [
  {
    q: "كام سعر الشاليهات في سي شور رأس الحكمة؟",
    a: "الأسعار الاسترشادية للشاليهات في سي شور هايد بارك تبدأ من حوالي 6.2 مليون جنيه، وفي مرحلة سي لاين الجديدة تبدأ شاليهات الغرفة من حوالي 8.5 مليون والغرفتين من 11.6 مليون جنيه، بمقدم 5% وتقسيط حتى 8 سنوات. الأسعار في تحديث مستمر — سجل للحصول على البرايس ليست الرسمية.",
  },
  {
    q: "كام سعر الشقق في هايد بارك التجمع الخامس؟",
    a: "تبدأ أسعار الشقق سوبر لوكس في كمبوند هايد بارك التجمع الخامس من حوالي 9.7 مليون جنيه لمساحات من 78 م²، والتاون هاوس والفيلات من حوالي 14.5 مليون جنيه، بمقدم 5% عند التعاقد وتقسيط حتى 8 سنوات.",
  },
  {
    q: "هل مشاريع هايد بارك متسلمة ولا تحت الإنشاء؟",
    a: "الاثنين فيهم مراحل مُسلَّمة بالفعل: سي شور تم تسليم مرحلته الأولى وافتتاح الشاطئ والمنطقة التجارية، وهايد بارك التجمع مجتمع قائم يسكنه آلاف العائلات مع استمرار طرح مراحل جديدة — يمكنك معاينة الوحدات على الطبيعة قبل الشراء.",
  },
  {
    q: "من هي شركة هايد بارك للتطوير العقاري؟",
    a: "Hyde Park Developments شركة مصرية رائدة تأسست عام 2011، من أقوى مطوري شرق القاهرة، وتتعاون مع بيوت تصميم عالمية مثل Gensler. من مشروعاتها: هايد بارك التجمع الخامس، سي شور رأس الحكمة، وهايد بارك سنترال بأكتوبر — وتُعرف بجداول تسليم منتظمة ومجتمعات تعمل بالفعل.",
  },
  {
    q: "أنهي أنسب ليا: سي شور ولا هايد بارك التجمع؟",
    a: "لو هدفك وحدة مصيفية أو استثمار في رأس الحكمة بسعر دخول تنافسي فاختيارك سي شور. لو بتدور على سكن دائم أو استثمار إيجاري في قلب التجمع الخامس فاختيارك هايد بارك التجمع. سجل بياناتك وهيساعدك مستشارنا تختار حسب ميزانيتك وهدفك.",
  },
];

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [cookiesOk, setCookiesOk] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const popupShown = useRef(false);

  useEffect(() => {
    const show = () => {
      if (popupShown.current || sessionStorage.getItem("hp_popup")) return;
      popupShown.current = true;
      sessionStorage.setItem("hp_popup", "1");
      setPopupOpen(true);
    };
    const t = setTimeout(show, 16000);
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

  useEffect(() => {
    setCookiesOk(!!localStorage.getItem("hp_cookies"));
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in-view")),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <main className="overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 bg-forest/92 backdrop-blur border-b border-white/10">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
          <a href="#" className="text-white font-bold text-lg">
            مشاريع{" "}
            <span className="font-latin text-xl text-brass-2">Hyde Park</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#seashore" className="hover:text-brass-2">سي شور رأس الحكمة</a>
            <a href="#newcairo" className="hover:text-brass-2">هايد بارك التجمع</a>
            <a href="#faq" className="hover:text-brass-2">أسئلة شائعة</a>
            <a href="#register" className="hover:text-brass-2">سجل اهتمامك</a>
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${PHONE_INTL}`}
              onClick={trackCall}
              className="hidden sm:inline-flex rounded-full bg-brass px-4 py-2 text-sm font-semibold text-white hover:bg-brass-2 transition-colors"
            >
              اتصل الآن {PHONE}
            </a>
            <button
              aria-label="القائمة"
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden text-white p-2"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white mb-1.5" />
              <span className="block w-6 h-0.5 bg-white" />
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden bg-forest border-t border-white/10 px-4 py-3 flex flex-col gap-3 text-white/90">
            <a href="#seashore" onClick={() => setMenuOpen(false)}>سي شور رأس الحكمة</a>
            <a href="#newcairo" onClick={() => setMenuOpen(false)}>هايد بارك التجمع</a>
            <a href="#faq" onClick={() => setMenuOpen(false)}>أسئلة شائعة</a>
            <a href="#register" onClick={() => setMenuOpen(false)}>سجل اهتمامك</a>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section
        className="relative min-h-[90vh] flex items-center pt-16"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(22,48,31,.84), rgba(22,48,31,.6) 55%, rgba(22,48,31,.94)), url(/images/hero.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-5xl px-4 py-16 text-center text-white">
          <p className="font-latin text-brass-2 text-2xl mb-4 tracking-[0.18em]">
            HYDE PARK · EST. 2011
          </p>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-[1.4] mb-6">
            مشاريع هايد بارك الجديدة 2026
            <span className="block text-brass-2 mt-3 text-xl md:text-3xl font-semibold">
              سي شور رأس الحكمة بالساحل الشمالي · هايد بارك التجمع الخامس
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/85 md:text-lg mb-9">
            من شاطئ رأس الحكمة إلى قلب التسعين الشمالي — مجتمعات قائمة ومُسلَّمة
            بالفعل، بمقدمات تبدأ من 5% وتقسيط حتى 8 سنوات. اعرف الأسعار
            الاسترشادية واحجز معاينتك مباشرة من المطور.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="#register"
              className="rounded-full bg-brass px-8 py-3.5 font-bold hover:bg-brass-2 transition-colors"
            >
              اطلب البرايس ليست
            </a>
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener"
              onClick={trackWhatsApp}
              className="rounded-full border border-white/40 px-8 py-3.5 font-bold hover:bg-white/10 transition-colors"
            >
              واتساب مباشر
            </a>
          </div>
        </div>
      </section>

      {/* Projects */}
      {PROJECTS.map((p, idx) => (
        <section
          key={p.id}
          id={p.id}
          className={idx % 2 === 0 ? "py-20 bg-linen" : "py-20 bg-linen-2"}
        >
          <div className="mx-auto max-w-6xl px-4">
            <div className="reveal mb-10">
              <p className={`text-sm font-semibold ${p.color} mb-2`}>{p.tag}</p>
              <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b hairline pb-5">
                <h2 className="text-3xl md:text-4xl font-extrabold text-forest">
                  {p.name}
                </h2>
                <span className="font-latin text-xl text-forest/50">{p.en}</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-10 items-start">
              <div className="reveal space-y-6">
                <p className="text-forest/75 leading-relaxed">{p.desc}</p>
                <div className="grid grid-cols-2 gap-4">
                  {p.facts.map(([v, l]) => (
                    <div key={l} className="border-r-2 border-brass pr-3">
                      <div className="text-2xl font-extrabold text-forest">{v}</div>
                      <div className="text-xs text-forest/55 mt-0.5">{l}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-forest/60 italic">{p.ideal}</p>
              </div>
              <div className="reveal grid grid-cols-2 gap-4">
                <img
                  src={p.img1}
                  alt={`${p.name} — هايد بارك`}
                  className="rounded-xl w-full h-72 object-cover col-span-2"
                  loading="lazy"
                />
                <img
                  src={p.img2}
                  alt={`وحدات ${p.name}`}
                  className="rounded-xl w-full h-40 object-cover col-span-2"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="mt-12 grid sm:grid-cols-3 gap-5">
              {p.units.map(([t, a, pr]) => (
                <div
                  key={t}
                  className="reveal rounded-xl bg-white border hairline p-6 flex flex-col"
                >
                  <h3 className="font-bold text-forest mb-2">{t}</h3>
                  <p className="text-sm text-forest/60 flex-1">{a}</p>
                  <div className="mt-4 pt-4 border-t hairline font-semibold text-brass">
                    {pr}
                  </div>
                </div>
              ))}
            </div>
            <p className="reveal text-sm text-forest/55 mt-5">
              {p.note}{" "}
              <span className="text-forest/40">
                * أسعار استرشادية قابلة للتغيير حسب أحدث برايس ليست من المطور.
              </span>
            </p>
            <div className="reveal mt-7">
              <a
                href="#register"
                className="inline-block rounded-full bg-forest text-white px-8 py-3 font-bold hover:bg-forest-2 transition-colors"
              >
                اعرف أسعار {p.name} بالتفصيل
              </a>
            </div>
          </div>
        </section>
      ))}

      {/* Developer */}
      <section className="py-20 bg-forest text-white">
        <div className="mx-auto max-w-4xl px-4 text-center reveal">
          <p className="font-latin text-brass-2 text-2xl mb-3 tracking-[0.18em]">
            HYDE PARK DEVELOPMENTS
          </p>
          <h2 className="text-3xl font-bold mb-5">لماذا تشتري من هايد بارك؟</h2>
          <p className="text-white/80 leading-relaxed mb-7">
            شركة مصرية رائدة منذ 2011، بنت اسمها على مجتمعات تعمل بالفعل لا
            مجرد ماكيتات: هايد بارك التجمع الخامس مدينة قائمة على التسعين
            الشمالي يسكنها آلاف العائلات بماستر بلان من Gensler العالمية، وسي
            شور سلّم مرحلته الأولى وافتتح شاطئه ومنطقته التجارية. سجل تسليمات
            منتظم وأنظمة سداد من الأكثر مرونة في السوق.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm">
            {["هايد بارك التجمع", "سي شور رأس الحكمة", "هايد بارك سنترال", "Hyde Out"].map(
              (x) => (
                <span
                  key={x}
                  className="rounded-full border border-white/25 px-4 py-1.5 text-white/80"
                >
                  {x}
                </span>
              )
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-linen">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-3xl font-bold text-forest text-center mb-10">
            أسئلة شائعة عن مشاريع هايد بارك
          </h2>
          <div className="space-y-3">
            {FAQS.map((f, i) => (
              <div key={f.q} className="reveal rounded-xl bg-white border hairline overflow-hidden">
                <button
                  className="w-full text-right px-5 py-4 font-semibold text-forest flex justify-between items-center gap-3"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{f.q}</span>
                  <span className="text-brass shrink-0">
                    {openFaq === i ? "−" : "+"}
                  </span>
                </button>
                {openFaq === i && (
                  <p className="px-5 pb-5 text-forest/65 leading-relaxed">{f.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead form */}
      <section id="register" className="py-20 bg-forest-2">
        <div className="mx-auto max-w-xl px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-3">
            سجل بياناتك — تصلك البرايس ليست الرسمية
          </h2>
          <p className="text-white/70 text-center mb-8">
            أحدث أسعار سي شور رأس الحكمة وهايد بارك التجمع والعروض الحالية
          </p>
          <LeadForm formLocation="main" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-forest border-t border-white/10 text-white/60 text-sm">
        <div className="mx-auto max-w-6xl px-4 py-10 space-y-5">
          <p className="leading-relaxed">
            منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد لدى
            كبرى شركات التطوير العقاري في مصر. هذه الصفحة ليست الموقع الرسمي
            لشركة هايد بارك للتطوير العقاري (Hyde Park Developments)، وجميع
            الأسماء والعلامات التجارية مملوكة لأصحابها. الأسعار الواردة
            استرشادية وقابلة للتغيير وفق أحدث تحديثات المطور.
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

      {/* Floating buttons */}
      <div className="fixed bottom-24 md:bottom-8 left-4 z-40 flex flex-col gap-3">
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsApp}
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
          className="grid place-items-center w-14 h-14 rounded-full bg-brass text-white shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current" aria-hidden>
            <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.85 21 3 13.15 3 3.5a1 1 0 0 1 1-1H7.5a1 1 0 0 1 1 1c0 1.24.2 2.45.57 3.57a1 1 0 0 1-.24 1.02l-2.21 2.2Z" />
          </svg>
        </a>
      </div>

      {/* Mobile bottom bar */}
      <div className="fixed md:hidden bottom-0 inset-x-0 z-40 bg-forest border-t border-white/10 grid grid-cols-3 text-center text-sm text-white">
        <a href={`tel:${PHONE_INTL}`} onClick={trackCall} className="py-3.5 font-semibold">
          اتصال
        </a>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          onClick={trackWhatsApp}
          className="py-3.5 font-semibold bg-[#25D366]"
        >
          واتساب
        </a>
        <a href="#register" className="py-3.5 font-semibold bg-brass">
          الأسعار
        </a>
      </div>

      {/* Popup */}
      {popupOpen && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 px-4"
          onClick={() => setPopupOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl bg-white p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="إغلاق"
              className="absolute top-3 left-3 text-forest/40 text-xl"
              onClick={() => setPopupOpen(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-forest mb-1 text-center">
              برايس ليست هايد بارك 2026
            </h3>
            <p className="text-sm text-forest/55 text-center mb-5">
              سي شور رأس الحكمة + هايد بارك التجمع — تصلك على واتساب
            </p>
            <LeadForm formLocation="popup" compact />
          </div>
        </div>
      )}

      {/* Cookie consent */}
      {!cookiesOk && (
        <div className="fixed bottom-16 md:bottom-4 inset-x-4 md:inset-x-auto md:left-4 md:max-w-sm z-50 rounded-xl bg-white shadow-2xl border hairline p-4 text-sm text-forest/70">
          نستخدم ملفات تعريف الارتباط لتحسين تجربتك وقياس أداء الحملات
          الإعلانية.{" "}
          <a href="/privacy/" className="text-brass underline">
            سياسة الخصوصية
          </a>
          <button
            className="mt-3 w-full rounded-lg bg-forest text-white py-2 font-semibold"
            onClick={() => {
              localStorage.setItem("hp_cookies", "1");
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

/* ====== Lead form ====== */
function LeadForm({
  formLocation,
  compact = false,
}: {
  formLocation: string;
  compact?: boolean;
}) {
  const [sending, setSending] = useState(false);
  const [err, setErr] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    const fd = new FormData(e.currentTarget);
    if (fd.get("botcheck")) return;

    const name = String(fd.get("name") || "").trim();
    const phone = String(fd.get("phone") || "").trim();
    const whatsapp = String(fd.get("whatsapp") || "").trim();

    if (name.length < 2) return setErr("من فضلك اكتب الاسم");
    if (!validatePhone(phone))
      return setErr("رقم الهاتف غير صحيح — يُقبل الأرقام المصرية والخليجية");
    if (whatsapp && !validatePhone(whatsapp))
      return setErr("رقم الواتساب غير صحيح");

    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: "Lead جديد — مشاريع هايد بارك",
          from_name: "Hyde Park Landing",
          name,
          phone,
          whatsapp: whatsapp || "—",
          project: fd.get("project") || "—",
          source: formLocation,
          page: "hydepark-projects",
        }),
      });
      const data = await res.json();
      if (data.success) window.location.href = "/thank-you/";
      else setErr("حدث خطأ، حاول مرة أخرى أو تواصل واتساب");
    } catch {
      setErr("تعذر الإرسال — تأكد من الاتصال بالإنترنت");
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3.5" noValidate>
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <input
        name="name"
        placeholder="الاسم الكامل"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-forest placeholder:text-forest/40 focus:outline-none focus:border-brass"
      />
      <input
        name="phone"
        inputMode="tel"
        dir="ltr"
        placeholder="رقم الموبايل (مصري أو خليجي)  01001234567"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-forest placeholder:text-forest/40 text-right focus:outline-none focus:border-brass"
      />
      <input
        name="whatsapp"
        inputMode="tel"
        dir="ltr"
        placeholder="رقم واتساب (اختياري — لو مختلف)"
        className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-forest placeholder:text-forest/40 text-right focus:outline-none focus:border-brass"
      />
      {!compact && (
        <select
          name="project"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 bg-white text-forest/70 focus:outline-none focus:border-brass"
          defaultValue=""
        >
          <option value="" disabled>المشروع المطلوب</option>
          <option>سي شور رأس الحكمة</option>
          <option>هايد بارك التجمع الخامس</option>
          <option>الاثنين / استفسار عام</option>
        </select>
      )}
      {err && <p className="text-red-500 text-sm font-semibold">{err}</p>}
      <button
        type="submit"
        disabled={sending}
        className="w-full rounded-xl bg-brass py-3.5 font-bold text-white hover:bg-brass-2 transition-colors disabled:opacity-60"
      >
        {sending ? "جاري الإرسال..." : "إرسال — اعرف الأسعار"}
      </button>
      <p className="text-[11px] text-white/50 text-center leading-relaxed">
        بالضغط على إرسال أنت توافق على{" "}
        <a href="/privacy/" className="underline">سياسة الخصوصية</a> — بياناتك
        تُستخدم فقط للتواصل بخصوص استفسارك العقاري.
      </p>
    </form>
  );
}
