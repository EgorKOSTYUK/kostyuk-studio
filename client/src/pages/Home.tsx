import { Link } from "wouter";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Code2,
  Compass,
  Layers3,
  Palette,
  Sparkles,
  TimerReset,
  Workflow,
} from "lucide-react";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useLeadForm } from "@/contexts/LeadFormContext";

const services = [
  {
    number: "01",
    icon: Compass,
    title: "Лендинги",
    price: "от 79 000 ₽",
    timing: "от 7 рабочих дней",
    description:
      "Компактные одностраничные сайты для запуска услуги, продукта, рекламной кампании или проверки новой идеи.",
    tags: ["Структура и прототип", "UX/UI", "Яндекс Метрика"],
  },
  {
    number: "02",
    icon: Layers3,
    title: "Сайты для бизнеса",
    price: "от 189 000 ₽",
    timing: "от 25 рабочих дней",
    description:
      "Создаём многостраничные сайты с индивидуальной структурой, дизайном, формами заявок и удобным управлением контентом.",
    tags: ["До 7 страниц", "Индивидуальный дизайн", "CMS"],
  },
  {
    number: "03",
    icon: Workflow,
    title: "Сайты с автоматизацией",
    price: "от 299 000 ₽",
    timing: "от 35 рабочих дней",
    description:
      "Создаём сайты с калькуляторами стоимости, онлайн-записью, подтверждением номера и передачей заявок в CRM.",
    tags: ["Калькулятор стоимости", "CRM", "SMS или онлайн-запись"],
  },
  {
    number: "04",
    icon: Code2,
    title: "Веб-сервисы и платформы",
    price: "проектирование от 249 000 ₽",
    timing: "разработка — по этапам",
    description:
      "Проектируем и создаём цифровые продукты с личными кабинетами, пользовательскими ролями, бизнес-процессами, платежами и интеграциями.",
    tags: ["Роли и кабинеты", "Бизнес-логика", "Поэтапная оценка"],
  },
  {
    number: "05",
    icon: Palette,
    title: "Графический дизайн по подписке",
    price: "от 34 900 ₽ / месяц",
    timing: "первый вариант — до 2 рабочих дней",
    description:
      "Регулярно создаём баннеры, посты, stories, карточки, обложки, простую инфографику и презентационные материалы.",
    tags: ["8 или 16 задач", "До 2 раундов правок", "Единый стиль"],
  },
];

const process = [
  {
    step: "01",
    title: "Диагностика",
    text: "Разбираемся в задаче бизнеса, аудитории и результате, который должен дать новый продукт.",
  },
  {
    step: "02",
    title: "Границы",
    text: "До начала работ фиксируем объём, этапы, сроки, стоимость и то, что не входит в проект.",
  },
  {
    step: "03",
    title: "Проектирование",
    text: "Продумываем пользовательские сценарии, структуру и прототип до начала разработки.",
  },
  {
    step: "04",
    title: "Разработка и запуск",
    text: "Собираем продукт, проверяем ключевые сценарии, подключаем аналитику и публикуем.",
  },
  {
    step: "05",
    title: "Поддержка и доработки",
    text: "Остаёмся на связи, при необходимости устраняем ошибки и добавляем новые функции.",
  },
];

const principles = [
  "Погружаемся в задачу, проектируем, разрабатываем и запускаем продукт",
  "До начала работ фиксируем объём, этапы, сроки и стоимость",
  "Правки собираем в ограниченные консолидированные раунды",
  "При необходимости устраняем ошибки после запуска",
  "Не обещаем неподтверждённые продажи или бизнес-показатели",
  "Новые функции оцениваем и согласуем до начала работ",
];

export default function Home() {
  const { openLeadForm } = useLeadForm();

  return (
    <div id="top" className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden border-b border-black/8 dark:border-white/10">
          <div className="hero-grid pointer-events-none absolute inset-0 opacity-45" />
          <div className="container relative pb-18 pt-12 md:pb-24 md:pt-20 lg:pb-28">
            <div className="grid items-end gap-10 lg:grid-cols-[1.22fr_0.78fr] lg:gap-14">
              <div className="reveal-up">
                <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/65 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur dark:bg-white/8">
                  <span className="size-2 rounded-full bg-[#3159f5]" />
                  Цифровая студия · Москва
                </div>
                <h1 className="mt-7 max-w-5xl font-display text-[clamp(3.75rem,8.1vw,8.8rem)] font-semibold leading-[0.81] tracking-[-0.085em]">
                  Вашей идее
                  <span className="block font-serif italic font-normal text-[#3159f5]">пора</span>
                  работать.
                </h1>
                <p className="mt-9 max-w-2xl text-[clamp(1.05rem,1.45vw,1.35rem)] leading-[1.55] text-black/62">
                  Превратим задачу вашего бизнеса в продуманный цифровой продукт — от первого сайта до сложной веб-платформы.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button type="button" onClick={() => openLeadForm(undefined, "Первый экран")} className="group inline-flex items-center justify-center gap-3 rounded-full bg-[#101214] px-6 py-4 font-semibold text-white transition-colors duration-200 hover:bg-[#3159f5] dark:bg-white/8 dark:ring-1 dark:ring-white/12 dark:hover:bg-[#3159f5]">
                    Рассказать о задаче
                    <ArrowUpRight className="size-5" />
                  </button>
                  <a href="#services" className="inline-flex items-center justify-center gap-3 rounded-full border border-black/12 bg-white/60 px-6 py-4 font-semibold transition-all duration-200 hover:bg-white dark:bg-white/8 dark:hover:bg-white/12">
                    Посмотреть, что мы создаём <ArrowRight className="size-5" />
                  </a>
                </div>
              </div>

              <div className="reveal-up-delayed space-y-3">
                <div className="inline-flex rounded-full bg-[#d4ff4f] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.14em] shadow-sm md:text-xs md:tracking-[0.16em]">
                  От идеи до запуска
                </div>
                <div className="theme-fixed-light rounded-[28px] border border-black/10 bg-white/92 p-5 shadow-[0_28px_60px_rgba(20,25,42,0.13)] md:rounded-[32px] md:p-7 lg:p-8">
                  <div className="flex items-center justify-between border-b border-black/8 pb-4 md:pb-5">
                    <div className="flex gap-2">
                      <span className="size-2 rounded-full bg-[#3159f5]" />
                      <span className="size-2 rounded-full bg-black/12" />
                      <span className="size-2 rounded-full bg-[#d4ff4f]" />
                    </div>
                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/32 md:text-[10px] md:tracking-[0.18em]">product system / 01</span>
                  </div>
                  <div className="grid grid-cols-[1fr_auto] gap-5 py-5 md:py-7">
                    <div>
                      <p className="font-display text-3xl font-semibold leading-[0.92] tracking-[-0.06em] md:text-5xl">Из задачи —<br />в систему.</p>
                      <p className="mt-3 max-w-[250px] text-sm leading-5 text-black/48 md:mt-4 md:leading-6">Структура, дизайн, разработка и запуск в одном процессе.</p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-full border border-black/10 md:size-16">
                      <img src="/brandmark.svg" alt="" aria-hidden="true" className="h-[25px] w-[28px] md:h-[29px] md:w-[33px]" />
                    </span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 md:gap-2">
                    {["Задача", "Логика", "Продукт", "Запуск"].map((label, index) => (
                      <div key={label} className={`rounded-xl px-2 py-3 md:rounded-2xl md:p-3 ${index === 2 ? "bg-[#3159f5] text-white" : index === 3 ? "bg-[#d4ff4f]" : "bg-black/[0.045]"}`}>
                        <span className={`font-mono text-[8px] md:text-[10px] ${index === 2 ? "text-white/55" : "text-black/32"}`}>0{index + 1}</span>
                        <p className="mt-4 text-[10px] font-semibold leading-3 md:mt-7 md:text-xs">{label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-[0.86fr_1.14fr]">
                  <div className="rounded-[22px] bg-[#3159f5] p-5 text-white shadow-xl md:p-6">
                    <p className="font-display text-2xl font-semibold leading-6 tracking-[-0.05em]">Сайты, сервисы и платформы</p>
                    <p className="mt-3 text-sm leading-5 text-white/75">От идеи до запуска, поддержки и доработок.</p>
                  </div>
                  <div className="rounded-[22px] border border-transparent bg-[#101214] p-5 text-white shadow-[0_20px_50px_rgba(20,25,42,0.18)] dark:border-white/12 md:p-6">
                    <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.15em] text-white/38"><span>Рабочий контур</span><span>04 / 04</span></div>
                    <div className="mt-6 space-y-3">
                      {["UX/UI", "Development", "Integrations"].map((label, index) => (
                        <div key={label} className="flex items-center gap-3">
                          <span className={`size-2.5 rounded-full ${index === 1 ? "bg-[#d4ff4f]" : "bg-[#3159f5]"}`} />
                          <span className="text-xs font-medium text-white/72">{label}</span><span className="h-px flex-1 bg-white/10" /><Check className="size-3.5 text-white/45" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 grid border-y border-black/10 py-6 md:grid-cols-3 md:divide-x md:divide-black/10 lg:mt-24">
              <div className="py-4 md:px-6 md:first:pl-0">
                <p className="font-display text-xl font-semibold tracking-[-0.04em]">Полный цикл</p>
                <p className="mt-2 text-sm leading-6 text-black/55">Погружаемся в задачу, проектируем, разрабатываем и запускаем продукт.</p>
              </div>
              <div className="py-4 md:px-6">
                <p className="font-display text-xl font-semibold tracking-[-0.04em]">Понятный процесс</p>
                <p className="mt-2 text-sm leading-6 text-black/55">До начала работ фиксируем объём, этапы, сроки и стоимость.</p>
              </div>
              <div className="py-4 md:px-6 md:last:pr-0">
                <p className="font-display text-xl font-semibold tracking-[-0.04em]">Поддержка и доработки</p>
                <p className="mt-2 text-sm leading-6 text-black/55">Остаёмся на связи, при необходимости устраняем ошибки и добавляем новые функции.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="container py-24 md:py-32">
          <div className="grid gap-10 lg:grid-cols-[0.65fr_1.35fr]">
            <div>
              <p className="eyebrow">Что мы создаём</p>
              <h2 className="section-title mt-5">Подбираем формат под задачу, а не наоборот.</h2>
              <p className="mt-6 max-w-md leading-7 text-black/58">
                Можно начать с компактного лендинга, разработать сайт с автоматизацией или запустить полноценную платформу. Состав работ определяем после разбора задачи.
              </p>
            </div>

            <div className="border-t border-black/12">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <article key={service.number} className="service-row group grid gap-5 border-b border-black/12 py-8 md:grid-cols-[72px_1fr_210px] md:py-10">
                    <div className="flex items-start justify-between md:block">
                      <span className="font-mono text-xs text-black/38">{service.number}</span>
                      <span className="mt-5 hidden size-11 place-items-center rounded-full bg-white shadow-sm transition-all duration-200 group-hover:bg-[#3159f5] group-hover:text-white dark:bg-white/8 md:grid">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <div>
                      <h3 className="font-display text-3xl font-semibold tracking-[-0.055em] md:text-4xl">{service.title}</h3>
                      <p className="mt-3 max-w-xl leading-7 text-black/58">{service.description}</p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {service.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-black/10 bg-white/70 px-3 py-1.5 text-xs font-medium text-black/60 dark:bg-white/6">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="md:text-right">
                      <p className="text-xl font-semibold leading-6 tracking-[-0.04em]">{service.price}</p>
                      <p className="mt-2 text-sm leading-5 text-black/45">{service.timing}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-[#101214] text-white">
          <div className="container py-24 md:py-32">
            <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
              <div>
                <p className="eyebrow text-[#90a8ff]">Главный кейс</p>
                <h2 className="mt-5 font-display text-[clamp(3.8rem,7vw,7.4rem)] font-semibold leading-[0.88] tracking-[-0.075em]">
                  <span className="vishe-wordmark block">Vishe.edu</span>
                  <span className="block font-serif italic font-normal text-[#90a8ff]">две роли,</span>
                  один продукт.
                </h2>
                <p className="mt-7 max-w-xl text-lg leading-8 text-white/60">
                  Образовательный маркетплейс с профилями, курсами, расписанием, сообщениями и звонками, учебными материалами, цифровыми товарами, тарифами и внутренним балансом.
                </p>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {[{ n: "2", l: "роли" }, { n: "2 года", l: "разработки" }, { n: "1", l: "единая экосистема" }].map((stat) => (
                    <div key={stat.l} className="rounded-2xl border border-white/12 bg-white/[0.04] p-4">
                      <p className="font-display text-2xl font-semibold tracking-[-0.05em] md:text-3xl">{stat.n}</p>
                      <p className="mt-1 text-xs leading-4 text-white/45">{stat.l}</p>
                    </div>
                  ))}
                </div>
                <Link href="/cases/vishe.edu" className="group mt-9 inline-flex items-center gap-3 font-semibold text-[#d4ff4f]">
                  Изучить кейс
                  <span className="grid size-10 place-items-center rounded-full border border-[#d4ff4f]/35 transition-colors duration-200 group-hover:bg-[#d4ff4f] group-hover:text-[#101214]">
                    <ArrowRight className="size-4" />
                  </span>
                </Link>
              </div>

              <div className="space-y-3">
                <div className="rounded-[28px] border border-white/12 bg-white/[0.055] p-5 shadow-2xl md:rounded-[32px] md:p-7">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4 md:pb-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/38 md:text-[10px] md:tracking-[0.18em]">Архитектура продукта</p>
                    <div className="flex gap-1.5"><span className="size-2 rounded-full bg-[#3159f5]" /><span className="size-2 rounded-full bg-[#d4ff4f]" /></div>
                  </div>
                  <div className="mt-5 grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 md:mt-7 md:gap-4">
                    <div className="min-w-0 rounded-2xl bg-[#3159f5] p-4 md:p-5">
                      <span className="font-mono text-[9px] text-white/50 md:text-[10px]">ROLE / 01</span>
                      <p className="mt-5 whitespace-nowrap font-display text-xl font-semibold tracking-[-0.04em] min-[360px]:text-sm min-[420px]:text-base md:text-2xl">Студент</p>
                      <p className="mt-3 text-[11px] leading-5 text-white/60 md:text-xs">Курсы · материалы · занятия</p>
                    </div>
                    <div className="min-w-0 rounded-2xl bg-[#d4ff4f] p-4 text-[#101214] md:p-5">
                      <span className="font-mono text-[9px] text-black/38 md:text-[10px]">ROLE / 02</span>
                      <p className="mt-5 whitespace-nowrap font-display text-xl font-semibold tracking-[-0.04em] min-[360px]:text-sm min-[420px]:text-base md:text-2xl">Преподаватель</p>
                      <p className="mt-3 text-[11px] leading-5 text-black/52 md:text-xs">Расписание · ученики · тарифы</p>
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[9px] font-semibold uppercase tracking-[0.08em] text-white/42 md:gap-2 md:text-[10px] md:tracking-[0.12em]">
                    <span className="rounded-xl border border-white/10 px-1 py-3">Сообщения</span><span className="rounded-xl border border-white/10 px-1 py-3">Платежи</span><span className="rounded-xl border border-white/10 px-1 py-3">Контент</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-[20px] bg-[#3159f5] p-4 md:rounded-[22px] md:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-white/45 md:text-[10px]">Система</p>
                    <p className="mt-6 font-display text-2xl font-semibold leading-[0.92] tracking-[-0.05em] md:text-3xl">2 роли.<br />1 ядро.</p>
                  </div>
                  <div className="rounded-[20px] bg-[#d4ff4f] p-4 text-[#101214] md:rounded-[22px] md:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.13em] text-black/40 md:text-[10px]">Контуры</p>
                    <p className="mt-6 text-sm font-semibold leading-4 md:text-lg md:leading-5">Marketplace + Learning + Social</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="container py-24 md:py-32">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
            <div className="min-w-0">
              <p className="eyebrow">Как работаем</p>
              <h2 className="section-title process-title mt-5">Сначала уменьшаем неопределённость.</h2>
              <p className="mt-6 max-w-md leading-7 text-black/58">
                Самая дорогая ошибка — быстро разработать не тот продукт. Поэтому каждый проект проходит через ясные контрольные точки.
              </p>
            </div>

            <div className="process-list relative min-w-0">
              <div className="absolute bottom-0 left-[23px] top-0 w-px bg-black/10" />
              {process.map((item, index) => (
                <div key={item.step} className="process-step relative grid gap-5 pb-10 pl-16 md:grid-cols-[0.55fr_1fr] md:pb-14" tabIndex={0}>
                  <span className={`process-marker absolute left-0 top-0 grid size-12 place-items-center rounded-full border text-xs font-mono ${index === 0 ? "is-default" : ""}`}>
                    {item.step}
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-[-0.045em]">{item.title}</h3>
                  <p className="leading-7 text-black/58">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="pricing" className="theme-section border-y border-black/8 bg-white/55">
          <div className="container py-24 md:py-32">
            <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
              <div>
                <p className="eyebrow">Понятная точка входа</p>
                <h2 className="section-title mt-5">Стоимость зависит от типа задачи.</h2>
                <p className="mt-6 max-w-md leading-7 text-black/58">
                  Для сайтов и регулярного дизайна показываем стартовую цену. Сложный цифровой продукт сначала проектируем, а затем фиксируем стоимость каждого этапа разработки.
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-[30px] bg-[#3159f5] p-7 text-white shadow-[0_28px_70px_rgba(49,89,245,0.22)] md:p-9">
                  <TimerReset className="size-7" />
                  <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-white/55">Лендинг</p>
                  <p className="mt-3 font-display text-5xl font-semibold tracking-[-0.065em]">от 79 000 ₽</p>
                  <p className="mt-5 leading-7 text-white/70">Для одной услуги, продукта или рекламной кампании. Первый запуск — от 7 рабочих дней.</p>
                </div>

                <div className="rounded-[30px] border border-black/10 bg-[#101214] p-7 text-white md:p-9">
                  <Code2 className="size-7 text-[#d4ff4f]" />
                  <p className="mt-14 text-sm font-semibold uppercase tracking-[0.16em] text-white/45">Веб-сервис или платформа</p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/42">Проектирование</p>
                    <p className="mt-2 whitespace-nowrap font-display text-[clamp(2.35rem,3.35vw,3.65rem)] font-semibold leading-none tracking-[-0.065em]">от 249&nbsp;000&nbsp;₽</p>
                  </div>
                  <p className="mt-5 leading-7 text-white/62">Роли, сценарии, прототип, техническая концепция и смета разработки по этапам.</p>
                </div>

                <div className="rounded-[30px] border border-black/8 bg-[#d4ff4f] p-7 md:col-span-2 md:p-9">
                  <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-end">
                    <div>
                      <Palette className="size-7" />
                      <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-black/45">Графический дизайн по подписке</p>
                      <p className="mt-3 font-display text-4xl font-semibold tracking-[-0.06em]">Основа — 34 900 ₽</p>
                      <p className="mt-2 text-sm text-black/55">до 8 стандартных задач в месяц</p>
                    </div>
                    <div className="border-t border-black/12 pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                      <p className="font-display text-4xl font-semibold tracking-[-0.06em]">Поток — 59 900 ₽</p>
                      <p className="mt-2 text-sm text-black/55">до 16 стандартных задач в месяц</p>
                      <p className="mt-5 leading-7 text-black/60">Одна задача одновременно, до двух раундов правок. Первый вариант — до двух рабочих дней после полного брифа.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-x-8 gap-y-4 border-t border-black/10 pt-8 md:grid-cols-2">
              {principles.map((item) => (
                <div key={item} className="flex items-start gap-3 py-2 text-sm font-medium text-black/66">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-[#d4ff4f]"><Check className="size-3" strokeWidth={3} /></span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container py-24 md:py-32">
          <div className="theme-soft-panel relative overflow-hidden rounded-[34px] border border-black/8 bg-[#e8edff] p-8 md:p-14 lg:p-16">
            <div className="pointer-events-none absolute -right-28 -top-28 size-[420px] rounded-full bg-[#3159f5]/18 blur-3xl" />
            <div className="relative grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] dark:bg-white/10">
                  <Sparkles className="size-4 text-[#3159f5]" />
                  Подходим друг другу?
                </div>
                <h2 className="mt-6 max-w-4xl font-display text-[clamp(3rem,6vw,6.4rem)] font-semibold leading-[0.9] tracking-[-0.07em]">
                  Не продаём лишние экраны. Собираем необходимую систему.
                </h2>
              </div>
              <div>
                <p className="text-lg leading-8 text-black/60">Приходите с задачей, идеей или существующим сайтом. За 20 минут определим подходящий формат: лендинг, сайт для бизнеса, автоматизация или проектирование веб-платформы.</p>
                <button type="button" onClick={() => openLeadForm(undefined, "Блок «Подходим друг другу?»")} className="group mt-7 inline-flex items-center gap-3 font-semibold text-[#1f48e0]">
                  Рассказать о задаче <ArrowUpRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
