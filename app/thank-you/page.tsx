"use client";
import { useEffect } from "react";
// نسخة احتياطية: الفورم بيسجل التحويل داخل الصفحة مباشرة،
// وده بديل لو حبيت تحوّل المستخدم لصفحة شكر منفصلة
const CONV_FORM = "AW-XXXXXXXXXX/FORM_LABEL"; // TODO
declare global { interface Window { gtag?: (...a: unknown[]) => void } }
export default function ThankYou() {
  useEffect(() => { window.gtag?.("event", "conversion", { send_to: CONV_FORM }); }, []);
  return (
    <main className="min-h-screen grid place-items-center bg-ink px-4 text-center text-white">
      <div>
        <div className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-park text-3xl mb-6">✓</div>
        <h1 className="text-3xl font-bold mb-3">تم استلام طلبك بنجاح</h1>
        <p className="text-white/75 mb-8 max-w-md mx-auto">سيتواصل معك مستشارنا العقاري خلال دقائق بتفاصيل ون هايد بارك والأسعار المحدثة.</p>
        <a href="https://wa.me/201001050018" className="inline-block rounded-full bg-[#25D366] px-8 py-3.5 font-bold">تواصل واتساب الآن</a>
        <p className="mt-6"><a href="/" className="text-brass-2 underline">العودة للصفحة الرئيسية</a></p>
      </div>
    </main>
  );
}
