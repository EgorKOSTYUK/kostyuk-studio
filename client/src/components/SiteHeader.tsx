import { type MouseEvent, useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { useTheme } from "@/contexts/ThemeContext";

const navItems = [
  { label: "Услуги", href: "/#services" },
  { label: "Кейс Vishe.edu", href: "/cases/vishe.edu" },
  { label: "Процесс", href: "/#process" },
  { label: "Стоимость", href: "/#pricing" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useLocation();
  const { openLeadForm } = useLeadForm();
  const { theme, toggleTheme } = useTheme();

  const scrollToSection = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("/#")) return;

    event.preventDefault();
    setOpen(false);
    const sectionId = href.slice(2);
    const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";

    const performScroll = () => {
      const section = document.getElementById(sectionId);
      if (!section) return false;
      section.scrollIntoView({ behavior, block: "start" });
      window.history.replaceState(null, "", `/#${sectionId}`);
      return true;
    };

    if (location === "/") {
      performScroll();
      return;
    }

    setLocation("/");
    window.setTimeout(() => {
      if (!performScroll()) window.setTimeout(performScroll, 80);
    }, 0);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-black/8 bg-[#f4f4ef]/88 backdrop-blur-xl dark:border-white/10 dark:bg-[#101214]/88">
      <div className="container flex h-[72px] items-center justify-between">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/brandmark.svg" alt="" aria-hidden="true" className="h-[33px] w-[37px] shrink-0" />
          <span className="font-display text-[17px] font-semibold tracking-[-0.04em]">Kostyuk.Studio</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Главная навигация">
          {navItems.map((item) =>
            item.href.startsWith("/#") ? (
              <a key={item.label} href={item.href} className="nav-link" onClick={(event) => scrollToSection(event, item.href)}>
                {item.label}
              </a>
            ) : (
              <Link key={item.label} href={item.href} className="nav-link">
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="group grid size-11 place-items-center rounded-full border border-black/10 bg-white/70 transition-colors hover:border-[#3159f5]/35 hover:bg-white dark:border-white/12 dark:bg-white/8 dark:hover:border-[#90a8ff]/45 dark:hover:bg-white/12"
            aria-label={theme === "dark" ? "Включить светлую тему" : "Включить тёмную тему"}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Светлая тема" : "Тёмная тема"}
            onClick={toggleTheme}
          >
            {theme === "dark" ? <Sun className="size-[18px] text-[#d4ff4f]" /> : <Moon className="size-[18px] text-[#3159f5]" />}
          </button>

          <button type="button" onClick={() => openLeadForm(undefined, "Шапка сайта")} className="hidden items-center gap-2 rounded-full bg-[#101214] px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#1f48e0] dark:bg-white dark:text-[#101214] dark:hover:bg-[#d4ff4f] lg:flex">
            Обсудить проект <ArrowUpRight className="size-4" />
          </button>

          <button
            type="button"
            className="grid size-11 place-items-center rounded-full border border-black/10 bg-white/70 dark:border-white/12 dark:bg-white/8 lg:hidden"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/8 bg-[#f4f4ef] px-4 py-5 dark:border-white/10 dark:bg-[#101214] lg:hidden">
          <nav className="flex flex-col gap-1" aria-label="Мобильная навигация">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(event) => item.href.startsWith("/#") ? scrollToSection(event, item.href) : setOpen(false)}
                className="rounded-2xl px-4 py-3 text-lg font-medium tracking-[-0.03em] hover:bg-white dark:hover:bg-white/8"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openLeadForm(undefined, "Мобильное меню");
              }}
              className="mt-3 flex items-center justify-between rounded-2xl bg-[#101214] px-5 py-4 text-white dark:bg-white dark:text-[#101214]"
            >
              Обсудить проект <ArrowUpRight className="size-5" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
