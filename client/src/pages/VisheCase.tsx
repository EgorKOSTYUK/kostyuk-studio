import { Link } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CircleDollarSign,
  GraduationCap,
  MessagesSquare,
  Network,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLeadForm } from "@/contexts/LeadFormContext";

const capabilities = [
  { icon: UsersRound, title: "Две роли", text: "Отдельные рабочие контуры студента и преподавателя со своими правами и сценариями." },
  { icon: ShieldCheck, title: "Модерация", text: "Профессиональный статус преподавателя и управление состояниями профиля." },
  { icon: CalendarDays, title: "Обучение", text: "Курсы, рабочий график, календарь, предстоящие и завершённые занятия." },
  { icon: MessagesSquare, title: "Коммуникация", text: "Подписки, мессенджер, группы, медиатека, аудио- и видеосвязь." },
  { icon: GraduationCap, title: "Контент", text: "Учебники во встроенном просмотрщике, карточки, публикации и цифровые товары." },
  { icon: CircleDollarSign, title: "Монетизация", text: "Тарифы обеих ролей, цены, внутренний баланс и история транзакций." },
];

const studentFlow = ["Выбирает язык и формат", "Изучает преподавателя", "Подписывается и общается", "Записывается на урок", "Покупает доступ или материал"];
const teacherFlow = ["Заполняет профиль и образование", "Выбирает курсы и цены", "Настраивает рабочий график", "Ведёт учеников и уроки", "Публикует и продаёт материалы"];

export default function VisheCase() {
  const { openLeadForm } = useLeadForm();

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-black/8 bg-[#101214] text-white">
          <div className="case-glow pointer-events-none absolute inset-0" />
          <div className="container relative pb-20 pt-12 md:pb-28 md:pt-20">
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-white/55 transition-colors hover:text-white">
              <ArrowLeft className="size-4" /> На главную
            </Link>

            <div className="mt-12 grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="reveal-up">
                <div className="flex flex-wrap gap-2">
                  {["EdTech", "Marketplace", "Social product", "Web platform"].map((tag) => (
                    <span key={tag} className="rounded-full border border-white/14 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/65">{tag}</span>
                  ))}
                </div>
                <h1 className="vishe-wordmark mt-7 text-[clamp(4.4rem,9.5vw,10rem)] font-semibold leading-[0.8]">Vishe.edu</h1>
                <p className="mt-8 max-w-2xl text-[clamp(1.2rem,2vw,1.65rem)] leading-[1.4] tracking-[-0.025em] text-white/70">
                  Двухсторонняя образовательная платформа, где студенты находят обучение, а преподаватели управляют курсами, контентом и монетизацией.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 reveal-up-delayed">
                <div className="rounded-[26px] bg-[#3159f5] p-6">
                  <p className="font-display text-5xl font-semibold tracking-[-0.065em]">2</p>
                  <p className="mt-10 text-sm leading-5 text-white/65">связанные пользовательские роли</p>
                </div>
                <div className="rounded-[26px] bg-[#d4ff4f] p-6 text-[#101214]">
                  <p className="font-display text-5xl font-semibold tracking-[-0.065em]">2 года</p>
                  <p className="mt-10 text-sm leading-5 text-black/55">разработки до публичного запуска</p>
                </div>
                <div className="col-span-2 rounded-[26px] border border-white/12 bg-white/[0.05] p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/42">Роль Kostyuk.Studio</p>
                  <p className="mt-3 text-lg leading-7 text-white/76">Проектирование и разработка платформы с нуля до первой публичной версии.</p>
                </div>
              </div>
            </div>

            <div className="mt-16 overflow-hidden rounded-[34px] border border-white/12 bg-white/[0.04] p-2 shadow-2xl md:mt-24">
              <img src="/media/vishe-dashboard.webp" alt="Главная страница личного кабинета студента Vishe.edu" className="w-full rounded-[28px]" />
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="eyebrow">Исходная задача</p>
              <h2 className="section-title mt-5">Не сайт. Цифровая среда для двух сторон рынка.</h2>
            </div>
            <div className="grid gap-8 text-lg leading-8 text-black/62 md:grid-cols-2">
              <p>Студенту нужен понятный путь от выбора преподавателя до общения, записи, обучения и покупки материала. Каждое действие должно учитывать доступ, тариф и состояние другой стороны.</p>
              <p>Преподавателю требуется рабочее место для управления профилем, программами, ценами, графиком, учениками, публикациями и цифровыми товарами.</p>
            </div>
          </div>

          <div className="mt-18 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map(({ icon: Icon, title, text }) => (
              <article key={title} className="theme-card rounded-[26px] border border-black/8 bg-white/65 p-6 transition-colors duration-200 hover:bg-white">
                <span className="grid size-11 place-items-center rounded-full bg-[#e5eaff] text-[#3159f5]"><Icon className="size-5" /></span>
                <h3 className="mt-8 font-display text-2xl font-semibold tracking-[-0.045em]">{title}</h3>
                <p className="mt-3 leading-7 text-black/56">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="theme-section border-y border-black/8 bg-white/60">
          <div className="container py-24 md:py-32">
            <div className="max-w-3xl">
              <p className="eyebrow">Архитектура продукта</p>
              <h2 className="section-title mt-5">Два опыта опираются на общее ядро.</h2>
              <p className="mt-6 text-lg leading-8 text-black/58">Регистрация, профили, сообщения, занятия, контент и финансы нельзя разрабатывать изолированно: состояния одного модуля меняют возможности другого.</p>
            </div>
            <div className="mt-12 overflow-hidden rounded-[30px] border border-black/8 bg-white p-4 shadow-[0_25px_70px_rgba(20,25,42,0.08)] md:p-8">
              <img src="/media/vishe-product-map.png" alt="Схема пользовательских контуров платформы Vishe.edu" className="w-full" />
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2">
            <article className="rounded-[32px] bg-[#3159f5] p-7 text-white md:p-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-white/55">Опыт студента</span>
                <GraduationCap className="size-7" />
              </div>
              <ol className="mt-12 space-y-0">
                {studentFlow.map((item, index) => (
                  <li key={item} className="grid grid-cols-[42px_1fr] items-center gap-3 border-t border-white/16 py-5 first:border-t-0">
                    <span className="font-mono text-xs text-white/42">0{index + 1}</span>
                    <span className="text-lg font-medium tracking-[-0.025em]">{item}</span>
                  </li>
                ))}
              </ol>
            </article>

            <article className="rounded-[32px] bg-[#101214] p-7 text-white md:p-10">
              <div className="flex items-center justify-between">
                <span className="eyebrow text-white/45">Рабочее место преподавателя</span>
                <Network className="size-7 text-[#d4ff4f]" />
              </div>
              <ol className="mt-12 space-y-0">
                {teacherFlow.map((item, index) => (
                  <li key={item} className="grid grid-cols-[42px_1fr] items-center gap-3 border-t border-white/12 py-5 first:border-t-0">
                    <span className="font-mono text-xs text-white/35">0{index + 1}</span>
                    <span className="text-lg font-medium tracking-[-0.025em]">{item}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </section>

        <section className="theme-soft-section overflow-hidden bg-[#e7ebff]">
          <div className="container py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
              <div>
                <p className="eyebrow">Структурированный marketplace</p>
                <h2 className="section-title mt-5">Курс — это данные, а не свободный текст.</h2>
                <p className="mt-6 text-lg leading-8 text-black/58">Преподаватель выбирает язык, программу, индивидуальный или групповой формат, цену, длительность и размер группы. Те же параметры формируют карточку для студента.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 md:items-start">
                <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white p-2 shadow-xl">
                  <img src="/media/vishe-course-settings.webp" alt="Настройка языковых программ и цен преподавателя" className="w-full rounded-[22px]" />
                </div>
                <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white p-2 shadow-xl">
                  <img src="/media/vishe-courses.webp" alt="Каталог языковых программ глазами студента" className="w-full rounded-[22px]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="grid gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-black/8 bg-white p-2 shadow-[0_28px_70px_rgba(20,25,42,0.12)]">
              <img src="/media/vishe-product-editor.webp" alt="Редактор публикации и цифрового товара преподавателя" className="w-full rounded-[24px]" />
            </div>
            <div>
              <p className="eyebrow">Контент и монетизация</p>
              <h2 className="section-title mt-5">Публикация превращается в цифровой товар.</h2>
              <p className="mt-6 text-lg leading-8 text-black/58">В одном редакторе преподаватель создаёт бесплатный пост или включает режим товара. Тогда появляются цена и защищённая ссылка, которая открывается ученику после покупки.</p>
              <div className="mt-8 border-l-2 border-[#3159f5] pl-5">
                <p className="font-semibold tracking-[-0.025em]">Социальная механика помогает развивать аудиторию, а коммерческая — монетизировать экспертизу внутри того же профиля.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="theme-section border-y border-black/8 bg-white/55">
          <div className="container py-24 md:py-32">
            <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <p className="eyebrow">Результат</p>
                <h2 className="section-title mt-5">От идеи до публичной версии.</h2>
              </div>
              <div>
                <p className="text-[clamp(1.45rem,2.4vw,2.15rem)] leading-[1.42] tracking-[-0.035em] text-black/76">За два года в одном веб-продукте были объединены две роли, маркетплейс, социальные связи, коммуникации, расписание, образовательный контент и финансовые сценарии.</p>
                <p className="mt-7 leading-7 text-black/50">Продукт только начал привлекать аудиторию, поэтому мы не приписываем разработке неподтверждённый рост продаж или регистраций. Проверяемый результат этапа — запущенная функциональная платформа.</p>
              </div>
            </div>

            <div className="case-proof-card mt-14 overflow-hidden rounded-[30px] border border-transparent bg-[#101214] p-7 text-white md:p-10">
              <p className="case-proof-kicker text-xs font-semibold uppercase tracking-[0.18em] text-white/42">Что подтверждает этот проект</p>
              <p className="mt-5 max-w-5xl font-display text-[clamp(2.2rem,4vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.06em]">Небольшая команда может спроектировать и довести до запуска сложный продукт с ролями, данными и зависимыми сценариями.</p>
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="rounded-[34px] bg-[#d4ff4f] p-8 text-[#101214] md:p-14 lg:flex lg:items-end lg:justify-between lg:gap-14">
            <div>
              <p className="eyebrow">Планируете платформу?</p>
              <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.1rem,6vw,6.2rem)] font-semibold leading-[0.88] tracking-[-0.075em]">Начните с ролей и первой версии, а не со всех функций сразу.</h2>
            </div>
            <button type="button" onClick={() => openLeadForm("platform", "Кейс Vishe.edu")} className="group mt-9 inline-flex shrink-0 items-center gap-3 rounded-full bg-[#101214] px-6 py-4 font-semibold text-white lg:mt-0">
              Обсудить продукт <ArrowUpRight className="size-5" />
            </button>
          </div>

          <Link href="/" className="group mx-auto mt-12 flex w-fit items-center gap-3 font-semibold text-black/55 hover:text-black">
            <ArrowLeft className="size-4" /> Все услуги Kostyuk.Studio
            <ArrowRight className="size-4 opacity-0" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
