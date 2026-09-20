import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useLeadForm } from "@/contexts/LeadFormContext";
import { Link } from "wouter";

const CONTACT_EMAIL = "kostyukstudio@gmail.com";

export default function SiteFooter() {
  const { openLeadForm } = useLeadForm();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(resetTimer.current), []);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
    } catch {
      const field = document.createElement("textarea");
      field.value = CONTACT_EMAIL;
      field.setAttribute("readonly", "");
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.appendChild(field);
      field.select();
      document.execCommand("copy");
      field.remove();
    }

    setCopied(true);
    window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopied(false), 2200);
  };

  return (
    <footer id="contact" className="bg-[#101214] text-white">
      <div className="container py-20 md:py-28">
        <div className="grid gap-14 lg:grid-cols-[1.35fr_0.65fr] lg:items-end">
          <div>
            <p className="eyebrow text-[#90a8ff]">Есть задача?</p>
            <h2 className="mt-5 max-w-4xl font-display text-[clamp(3.1rem,7vw,7.6rem)] font-semibold leading-[0.86] tracking-[-0.075em]">
              Давайте найдём рабочий масштаб.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62">
              На первом разговоре разберём задачу и определим подходящий формат: лендинг, сайт для бизнеса, автоматизация или проектирование веб-платформы.
            </p>
          </div>

          <div className="lg:pb-2">
            <button
              type="button"
              onClick={() => openLeadForm(undefined, "Блок «Есть задача?»")}
              className="group flex w-full items-center justify-between rounded-[28px] bg-[#3159f5] p-6 text-left text-xl font-semibold tracking-[-0.035em] transition-colors duration-200 hover:bg-[#4166f7]"
            >
              Рассказать о задаче
              <span className="grid size-12 place-items-center rounded-full bg-white text-[#101214]">
                <ArrowUpRight className="size-5" />
              </span>
            </button>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm leading-6 text-white/45">
              <span>Или напишите на</span>
              <a href={`mailto:${CONTACT_EMAIL}?subject=Новый проект для Kostyuk.Studio`} className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white">{CONTACT_EMAIL}</a>
              <button
                type="button"
                onClick={copyEmail}
                className="inline-flex min-w-[112px] items-center justify-center gap-1.5 rounded-full border border-white/14 bg-white/6 px-3 py-1 text-xs font-semibold text-white/72 transition-colors duration-200 hover:border-white/28 hover:bg-white/10 hover:text-white"
                aria-label={copied ? "Email скопирован" : "Скопировать email"}
              >
                {copied ? <Check className="size-3.5 text-[#d4ff4f]" /> : <Copy className="size-3.5" />}
                <span aria-live="polite">{copied ? "Скопировано" : "Скопировать"}</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid gap-7 border-t border-white/12 pt-8 text-sm text-white/52 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-3">
              <img src="/brandmark.svg" alt="" aria-hidden="true" className="h-[33px] w-[37px] shrink-0" />
              <p className="font-semibold text-white">Kostyuk.Studio</p>
            </div>
            <p className="mt-2">Москва · работаем удалённо</p>
          </div>
          <div>
            <p>Сайты · веб-продукты · графический дизайн</p>
            <p className="mt-2">Россия и международные проекты</p>
          </div>
          <div className="md:text-right">
            <p>© {new Date().getFullYear()} Kostyuk.Studio</p>
            <div className="mt-2 flex flex-col items-start gap-2 md:items-end">
              <Link href="/privacy" className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50">Политика персональных данных</Link>
              <Link href="/personal-data-consent" className="text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/50">Согласие на обработку данных</Link>
              <a href="#top" className="text-white transition-opacity hover:opacity-70">Наверх ↑</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
