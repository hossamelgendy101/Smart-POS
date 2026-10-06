import { useState } from 'react'
import './App.css'

const navigation = [
  ['لوحة التحكم', '⌂'], ['المبيعات', '▣'], ['المشتريات', '↙'],
  ['الأصناف والمخزون', '▤'], ['العملاء والموردين', '♙'], ['الخزائن', '▥'], ['المصروفات', '−'],
]
const transactions = [
  ['#INV-1048', 'سوبر ماركت الأمل', 'بيع نقدي', '4,850.00', 'منذ 12 دقيقة', 'مكتملة'],
  ['#INV-1047', 'مؤسسة النور التجارية', 'بيع آجل', '2,430.00', 'منذ 36 دقيقة', 'مكتملة'],
  ['#PUR-0321', 'شركة الرواد للتوريدات', 'فاتورة شراء', '8,790.00', 'منذ ساعة', 'قيد المراجعة'],
  ['#INV-1046', 'أحمد محمد', 'بيع نقدي', '680.00', 'منذ ساعتين', 'مكتملة'],
]

function App() {
  const [activePage, setActivePage] = useState('لوحة التحكم')
  const [period, setPeriod] = useState('اليوم')

  return (
    <div className="app-shell" dir="rtl">
      <aside className="sidebar"><div className="brand"><div className="brand-mark">S</div><div><strong>سمارت</strong><span>نظام إدارة المبيعات</span></div></div><div className="branch-switcher"><span className="branch-dot" /><div><small>الفرع الحالي</small><strong>الفرع الرئيسي</strong></div><span className="chevron">⌄</span></div><p className="menu-label">القائمة الرئيسية</p><nav className="main-nav">{navigation.map(([label, icon]) => <button className={activePage === label ? 'nav-item active' : 'nav-item'} key={label} onClick={() => setActivePage(label)}><span className="nav-icon">{icon}</span><span>{label}</span>{label === 'المبيعات' && <b>12</b>}</button>)}</nav><p className="menu-label reports-label">التقارير والإعدادات</p><nav className="main-nav"><button className="nav-item" onClick={() => setActivePage('التقارير')}><span className="nav-icon">▥</span><span>التقارير</span></button><button className="nav-item" onClick={() => setActivePage('الإعدادات')}><span className="nav-icon">⚙</span><span>الإعدادات</span></button></nav><div className="sidebar-footer"><div className="user-avatar">م</div><div><strong>محمد أحمد</strong><span>مدير النظام</span></div><span className="more">•••</span></div></aside>
      <main className="main-content"><header className="topbar"><div className="breadcrumb"><span>الرئيسية</span><i>/</i><strong>{activePage}</strong></div><div className="top-actions"><button className="icon-button" aria-label="الإشعارات">♢<span className="notification-dot" /></button><div className="date-chip">الثلاثاء، ١٥ سبتمبر ٢٠٢٦ <span>⌄</span></div></div></header>{activePage === 'المبيعات' ? <SalesPage /> : activePage !== 'لوحة التحكم' ? <ModulePage page={activePage} /> : <div className="page-content">
        <section className="welcome-row"><div><p className="eyebrow">نظرة عامة على النشاط</p><h1>صباح الخير، محمد <span>✦</span></h1><p className="subheading">إليك ملخص أداء الفرع اليوم.</p></div><button className="primary-button" onClick={() => setActivePage('فاتورة مبيعات')}>＋ فاتورة مبيعات جديدة</button></section>
        <div className="dashboard-toolbar"><div className="period-tabs">{['اليوم', 'هذا الأسبوع', 'هذا الشهر'].map((item) => <button className={period === item ? 'selected' : ''} key={item} onClick={() => setPeriod(item)}>{item}</button>)}</div><button className="outline-button">تصفية النتائج <span>≡</span></button></div>
        <section className="stats-grid"><StatCard className="revenue" icon="↗" trend="+12.5%" title="إجمالي المبيعات" value="24,680" unit="ج.م" note="مقارنة بالفترة السابقة" /><StatCard className="invoices" icon="▣" trend="+8.2%" title="عدد الفواتير" value="128" unit="فاتورة" note="مقارنة بالفترة السابقة" /><StatCard className="customers" icon="♙" trend="+4.7%" title="عملاء جدد" value="36" unit="عميل" note="مقارنة بالفترة السابقة" /><StatCard className="stock" icon="!" trend="يحتاج مراجعة" title="أصناف منخفضة المخزون" value="14" unit="صنف" note="تحتاج إلى إعادة طلب" warning /></section>
        <section className="content-grid"><article className="panel chart-panel"><PanelHeading title="حركة المبيعات" subtitle={`إجمالي المبيعات خلال ${period}`} /><div className="chart-legend"><span><i className="legend-dot sales-dot" /> المبيعات</span><span><i className="legend-dot target-dot" /> المستهدف</span></div><div className="chart"><div className="y-axis"><span>30k</span><span>20k</span><span>10k</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i /><i /><i /><i /></div><svg viewBox="0 0 640 200" preserveAspectRatio="none" aria-label="رسم بياني للمبيعات"><path className="target-line" d="M0,130 C70,120 100,148 165,110 S250,125 315,95 S405,120 470,84 S550,96 640,58" /><path className="sales-area" d="M0,170 C70,160 105,133 165,145 S245,103 315,128 S400,74 470,102 S555,36 640,70 L640,200 L0,200 Z" /><path className="sales-line" d="M0,170 C70,160 105,133 165,145 S245,103 315,128 S400,74 470,102 S555,36 640,70" /></svg><div className="x-axis"><span>السبت</span><span>الأحد</span><span>الإثنين</span><span>الثلاثاء</span><span>الأربعاء</span><span>الخميس</span><span>الجمعة</span></div></div></div></article><article className="panel payment-panel"><PanelHeading title="طرق الدفع" subtitle="توزيع مبيعات اليوم" /><div className="donut-wrap"><div className="donut"><div className="donut-hole"><strong>24.6k</strong><span>إجمالي المبيعات</span></div></div></div><div className="payment-list"><span><i className="cash" /> نقدي <b>52%</b></span><span><i className="card" /> بطاقة بنكية <b>28%</b></span><span><i className="wallet" /> محافظ إلكترونية <b>20%</b></span></div></article></section>
        <section className="panel transactions-panel"><div className="panel-heading"><div><h2>آخر العمليات</h2><p>أحدث الفواتير والحركات المسجلة</p></div><button className="text-button">عرض كل العمليات ←</button></div><div className="table-wrap"><table><thead><tr><th>رقم العملية</th><th>العميل / المورد</th><th>نوع العملية</th><th>القيمة</th><th>التوقيت</th><th>الحالة</th></tr></thead><tbody>{transactions.map(([id, customer, type, amount, time, status]) => <tr key={id}><td><strong>{id}</strong></td><td>{customer}</td><td><span className="operation-type">{type}</span></td><td><strong>{amount} <small>ج.م</small></strong></td><td className="muted">{time}</td><td><span className={status === 'مكتملة' ? 'status complete' : 'status review'}>{status}</span></td></tr>)}</tbody></table></div></section>
      </div>}</main>
    </div>
  )
}

function StatCard({ className, icon, trend, title, value, unit, note, warning }: { className: string; icon: string; trend: string; title: string; value: string; unit: string; note: string; warning?: boolean }) {
  return <article className={`stat-card ${className}`}><div className="stat-top"><span className="stat-icon">{icon}</span><span className={warning ? 'trend warning' : 'trend positive'}>{trend}</span></div><p>{title}</p><strong>{value} <small>{unit}</small></strong><span className="stat-note">{note}</span></article>
}

function PanelHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="panel-heading"><div><h2>{title}</h2><p>{subtitle}</p></div><button className="more-button">•••</button></div>
}

const products = [
  { name: 'زيت عباد الشمس 1 لتر', code: '10248', price: 78, stock: 42 },
  { name: 'سكر أبيض فاخر 1 كجم', code: '10412', price: 36, stock: 86 },
  { name: 'أرز مصري فاخر 1 كجم', code: '10509', price: 32, stock: 24 },
  { name: 'شاي العروسة 250 جرام', code: '10822', price: 64, stock: 18 },
]

function SalesPage() {
  const [search, setSearch] = useState('')
  const [cart, setCart] = useState([{ ...products[0], quantity: 1 }])
  const filteredProducts = products.filter((product) => product.name.includes(search) || product.code.includes(search))
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0)
  const tax = subtotal * 0.14

  const addProduct = (product: (typeof products)[number]) => {
    setCart((items) => items.some((item) => item.code === product.code)
      ? items.map((item) => item.code === product.code ? { ...item, quantity: item.quantity + 1 } : item)
      : [...items, { ...product, quantity: 1 }])
  }

  return <div className="page-content sales-page"><section className="sales-title"><div><p className="eyebrow">نقطة البيع</p><h1>فاتورة مبيعات جديدة</h1><p className="subheading">أنشئ فاتورة بيع وسجّل العملية في خزينة الفرع.</p></div><div className="invoice-number"><span>رقم الفاتورة</span><strong>#INV-1049</strong></div></section><div className="sales-layout"><section className="panel product-panel"><div className="sales-toolbar"><div><h2>اختيار الأصناف</h2><p>ابحث بالاسم أو كود الصنف لإضافته للفاتورة</p></div><button className="outline-button">▦ مسح الباركود</button></div><label className="search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="ابحث عن صنف..." /></label><div className="product-grid">{filteredProducts.map((product) => <button className="product-card" key={product.code} onClick={() => addProduct(product)}><span className="product-thumb">▦</span><strong>{product.name}</strong><small>كود: {product.code}</small><div><b>{product.price.toFixed(2)} ج.م</b><em>متاح: {product.stock}</em></div></button>)}</div></section><section className="panel invoice-panel"><div className="sales-toolbar"><div><h2>تفاصيل الفاتورة</h2><p>راجع الأصناف والكميات قبل الحفظ</p></div><button className="clear-button" onClick={() => setCart([])}>مسح الكل</button></div><select className="customer-select" defaultValue=""><option value="" disabled>اختيار العميل (اختياري)</option><option>عميل نقدي</option><option>سوبر ماركت الأمل</option><option>مؤسسة النور التجارية</option></select><div className="cart-list">{cart.length === 0 ? <div className="empty-cart">لم تتم إضافة أصناف بعد</div> : cart.map((item) => <div className="cart-row" key={item.code}><div><strong>{item.name}</strong><small>{item.price.toFixed(2)} ج.م للوحدة</small></div><div className="quantity-control"><button onClick={() => setCart((items) => items.map((entry) => entry.code === item.code ? { ...entry, quantity: Math.max(1, entry.quantity - 1) } : entry))}>−</button><b>{item.quantity}</b><button onClick={() => addProduct(item)}>＋</button></div><strong>{(item.price * item.quantity).toFixed(2)} <small>ج.م</small></strong></div>)}</div><div className="invoice-summary"><span>الإجمالي قبل الضريبة <b>{subtotal.toFixed(2)} ج.م</b></span><span>ضريبة القيمة المضافة (14%) <b>{tax.toFixed(2)} ج.م</b></span><div className="total-row"><strong>الإجمالي النهائي</strong><strong>{(subtotal + tax).toFixed(2)} <small>ج.م</small></strong></div></div><div className="payment-actions"><button className="secondary-button">حفظ كمسودة</button><button className="primary-button">حفظ وطباعة الفاتورة</button></div></section></div></div>
}

const moduleContent: Record<string, { eyebrow: string; title: string; description: string; action: string; columns: string[]; rows: string[][] }> = {
  'المشتريات': { eyebrow: 'إدارة التوريد', title: 'فواتير المشتريات', description: 'تابع المشتريات والموردين وحركة التوريد في الفرع.', action: '＋ فاتورة شراء', columns: ['رقم الفاتورة', 'المورد', 'التاريخ', 'القيمة', 'الحالة'], rows: [['#PUR-0321', 'شركة الرواد للتوريدات', '15 سبتمبر 2026', '8,790.00 ج.م', 'قيد المراجعة'], ['#PUR-0320', 'مؤسسة الخير', '14 سبتمبر 2026', '12,450.00 ج.م', 'مكتملة'], ['#PUR-0319', 'شركة النخبة', '13 سبتمبر 2026', '6,180.00 ج.م', 'مكتملة']] },
  'الأصناف والمخزون': { eyebrow: 'إدارة المخزون', title: 'الأصناف والمخزون', description: 'راقب الكميات والأسعار وحدود إعادة الطلب في كل مخزن.', action: '＋ إضافة صنف', columns: ['كود الصنف', 'اسم الصنف', 'التصنيف', 'الرصيد', 'حالة المخزون'], rows: [['10248', 'زيت عباد الشمس 1 لتر', 'زيوت', '42 قطعة', 'متوفر'], ['10412', 'سكر أبيض فاخر 1 كجم', 'بقالة', '86 قطعة', 'متوفر'], ['10509', 'أرز مصري فاخر 1 كجم', 'بقالة', '7 قطع', 'منخفض'], ['10822', 'شاي العروسة 250 جرام', 'مشروبات', '18 قطعة', 'متوفر']] },
  'العملاء والموردين': { eyebrow: 'دليل العلاقات', title: 'العملاء والموردين', description: 'إدارة الحسابات والأرصدة وبيانات التعاملات التجارية.', action: '＋ إضافة جهة', columns: ['الاسم', 'النوع', 'رقم الهاتف', 'الرصيد', 'آخر تعامل'], rows: [['سوبر ماركت الأمل', 'عميل', '01012345678', '4,850.00 ج.م', 'اليوم'], ['مؤسسة النور التجارية', 'عميل', '01198765432', '2,430.00 ج.م', 'اليوم'], ['شركة الرواد للتوريدات', 'مورد', '01255554876', '8,790.00 ج.م', 'منذ ساعة']] },
  'الخزائن': { eyebrow: 'الإدارة المالية', title: 'الخزائن والحسابات', description: 'تابع أرصدة الخزائن وحركة القبض والصرف اليومية.', action: '＋ حركة مالية', columns: ['الخزينة', 'المسؤول', 'الرصيد الحالي', 'آخر حركة', 'الحالة'], rows: [['الخزينة الرئيسية', 'محمد أحمد', '86,420.00 ج.م', 'إيداع مبيعات', 'نشطة'], ['خزينة المعرض', 'أحمد علي', '24,680.00 ج.م', 'بيع نقدي', 'نشطة'], ['البنك الأهلي', 'النظام', '148,200.00 ج.م', 'تحويل بنكي', 'نشطة']] },
  'المصروفات': { eyebrow: 'المصروفات التشغيلية', title: 'سجل المصروفات', description: 'صنّف المصروفات وتابع تأثيرها على هامش الربح.', action: '＋ تسجيل مصروف', columns: ['رقم القيد', 'البيان', 'التصنيف', 'القيمة', 'التاريخ'], rows: [['#EXP-0089', 'فاتورة كهرباء المعرض', 'خدمات', '1,250.00 ج.م', '15 سبتمبر 2026'], ['#EXP-0088', 'مصاريف نقل وتوصيل', 'تشغيل', '480.00 ج.م', '14 سبتمبر 2026'], ['#EXP-0087', 'مستلزمات مكتبية', 'إداري', '365.00 ج.م', '12 سبتمبر 2026']] },
  'التقارير': { eyebrow: 'مركز التحليل', title: 'التقارير والتحليلات', description: 'قراءة أوضح للمبيعات والأرباح والمخزون وحركة الخزينة.', action: 'تصدير التقرير', columns: ['التقرير', 'الفترة', 'آخر تحديث', 'النتيجة', 'الإجراء'], rows: [['تقرير المبيعات اليومية', 'اليوم', 'منذ 5 دقائق', '24,680.00 ج.م', 'عرض'], ['هامش الربح التفصيلي', 'هذا الشهر', 'منذ ساعة', '18.4%', 'عرض'], ['كشف حركة المخزون', 'هذا الشهر', 'أمس', '1,248 حركة', 'عرض']] },
  'الإعدادات': { eyebrow: 'تهيئة النظام', title: 'إعدادات النظام', description: 'تحكم في بيانات الفرع والمستخدمين والضرائب والطباعة.', action: 'حفظ التغييرات', columns: ['الإعداد', 'الوصف', 'القيمة الحالية', 'الحالة', ''], rows: [['بيانات الفرع', 'اسم وعنوان الفرع الرئيسي', 'الفرع الرئيسي', 'مكتمل', 'تعديل'], ['الضرائب', 'ضريبة القيمة المضافة', '14%', 'مفعلة', 'تعديل'], ['الفواتير', 'قالب الطباعة الافتراضي', 'A4 - عربي', 'مفعل', 'تعديل']] },
}

function ModulePage({ page }: { page: string }) {
  const content = moduleContent[page] ?? moduleContent['التقارير']
  const [search, setSearch] = useState('')
  const [notice, setNotice] = useState('')
  const rows = content.rows.filter((row) => row.join(' ').includes(search))
  return <div className="page-content module-page"><section className="module-title"><div><p className="eyebrow">{content.eyebrow}</p><h1>{content.title}</h1><p className="subheading">{content.description}</p></div><button className="primary-button" onClick={() => setNotice(`تم فتح نموذج: ${content.action.replace('＋ ', '')}`)}>{content.action}</button></section><section className="module-metrics"><div><span>إجمالي السجلات</span><strong>{content.rows.length + 124}</strong></div><div><span>حركات اليوم</span><strong>36</strong></div><div><span>يحتاج مراجعة</span><strong className="metric-warning">{page === 'الأصناف والمخزون' ? '7' : '3'}</strong></div><div><span>آخر مزامنة</span><strong className="metric-time">منذ 5 دقائق</strong></div></section><section className="panel module-table-panel"><div className="module-table-head"><div><h2>قائمة {content.title}</h2><p>بيانات محدثة من الفرع الرئيسي</p></div><label className="module-search"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="بحث في السجلات..." /></label></div><div className="table-wrap"><table><thead><tr>{content.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`}><span className={cell === 'منخفض' || cell === 'قيد المراجعة' ? 'status review' : cell === 'مكتملة' || cell === 'متوفر' || cell === 'نشطة' || cell === 'مفعلة' || cell === 'مفعل' ? 'status complete' : ''}>{cell}</span></td>)}</tr>)}</tbody></table></div>{rows.length === 0 && <div className="empty-module">لا توجد نتائج مطابقة للبحث</div>}</section>{notice && <button className="module-toast" onClick={() => setNotice('')}>{notice} <span>×</span></button>}</div>
}

export default App
