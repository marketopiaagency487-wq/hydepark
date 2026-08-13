export const metadata = { title: "من نحن | مشاريع هايد بارك" };
export default function About() {
  return (
    <main className="min-h-screen bg-linen text-forest/80">
      <div className="mx-auto max-w-3xl px-4 py-16 leading-relaxed space-y-5">
        <h1 className="text-3xl font-bold text-forest">من نحن</h1>
        <p>نحن منصة معلومات واستفسارات عقارية مستقلة يديرها فريق مبيعات معتمد بخبرة تتجاوز خمس سنوات في تسويق مشروعات كبرى شركات التطوير العقاري في مصر، ومنها مشروعات هايد بارك في القاهرة الجديدة والساحل الشمالي.</p>
        <p>دورنا هو تزويدك بأحدث المعلومات الدقيقة عن الأسعار والمساحات وأنظمة السداد، ومساعدتك في حجز وحدتك مباشرة من المطور بنفس الأسعار الرسمية ودون أي رسوم إضافية — عمولتنا يتحملها المطور بالكامل ولا تؤثر على سعر وحدتك.</p>
        <p>هذه الصفحة ليست الموقع الرسمي لشركة هايد بارك للتطوير العقاري، وجميع العلامات التجارية مملوكة لأصحابها.</p>
        <p>للتواصل: <a dir="ltr" href="tel:+201001050018" className="text-brass font-semibold">01001050018</a></p>
        <p><a href="/" className="text-brass underline">العودة للصفحة الرئيسية</a></p>
      </div>
    </main>
  );
}
