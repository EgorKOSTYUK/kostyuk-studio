import {
  createContext,
  type FormEvent,
  type ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Send,
  X,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  budgetOptions,
  contactMethodOptions,
  contactTimeOptions,
  deadlineOptions,
  legalDocumentVersion,
  serviceOptions,
  type LeadFormData,
  type ServiceId,
} from "@shared/lead-form";

interface LeadFormContextValue {
  openLeadForm: (service?: ServiceId, source?: string) => void;
}

const LeadFormContext = createContext<LeadFormContextValue | undefined>(undefined);
const DRAFT_KEY = "kostyuk-lead-draft";

function createInitialData(): LeadFormData {
  const params = typeof window === "undefined" ? new URLSearchParams() : new URLSearchParams(window.location.search);
  return {
    service: "",
    description: "",
    links: "",
    budget: "",
    deadline: "",
    name: "",
    contactMethod: "telegram",
    contact: "",
    contactTime: "В любое время",
    customTime: "",
    consent: false,
    legalDocumentVersion,
    website: "",
    openedAt: Date.now(),
    source: typeof window === "undefined" ? "Сайт" : document.title,
    pageUrl: typeof window === "undefined" ? "" : window.location.href,
    utmSource: params.get("utm_source") ?? "",
    utmMedium: params.get("utm_medium") ?? "",
    utmCampaign: params.get("utm_campaign") ?? "",
  };
}

function readDraft(): LeadFormData {
  const fallback = createInitialData();
  if (typeof window === "undefined") return fallback;

  try {
    const parsed = JSON.parse(sessionStorage.getItem(DRAFT_KEY) ?? "null") as Partial<LeadFormData> | null;
    return parsed ? { ...fallback, ...parsed, consent: false, legalDocumentVersion, openedAt: Date.now(), website: "" } : fallback;
  } catch {
    return fallback;
  }
}

function ChoiceButton({
  selected,
  onClick,
  title,
  description,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex w-full items-start gap-4 rounded-[20px] border p-4 text-left transition-colors duration-200",
        selected
          ? "border-[#3159f5] bg-[#3159f5] text-white shadow-[0_12px_30px_rgba(49,89,245,0.18)]"
          : "border-black/10 bg-white/60 hover:border-[#3159f5]/35 hover:bg-white dark:border-white/20 dark:bg-white/8 dark:hover:border-[#90a8ff]/45 dark:hover:bg-white/12",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full border transition-colors",
          selected ? "border-white/40 bg-white text-[#3159f5]" : "border-black/14 bg-transparent dark:border-white/18",
        )}
      >
        {selected && <Check className="size-3.5" strokeWidth={3} />}
      </span>
      <span>
        <span className="block font-semibold tracking-[-0.025em]">{title}</span>
        {description && (
          <span className={cn("mt-1 block text-sm leading-5", selected ? "text-white/72" : "text-black/52 dark:text-white/52")}>
            {description}
          </span>
        )}
      </span>
    </button>
  );
}

function FieldLabel({ children, optional = false, htmlFor }: { children: ReactNode; optional?: boolean; htmlFor?: string }) {
  const content = (
    <>
      {children}
      {optional && <span className="ml-2 font-normal text-black/38 dark:text-white/38">необязательно</span>}
    </>
  );

  return htmlFor ? (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold">{content}</label>
  ) : (
    <p className="mb-2 text-sm font-semibold">{content}</p>
  );
}

export function LeadFormProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [data, setData] = useState<LeadFormData>(readDraft);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const budgets = useMemo(
    () => (data.service ? budgetOptions[data.service] : []),
    [data.service],
  );

  useEffect(() => {
    try {
      sessionStorage.setItem(DRAFT_KEY, JSON.stringify(data));
    } catch {
      // The draft remains in React state if session storage is unavailable.
    }
  }, [data]);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("form") === "open") {
      setOpen(true);
    }
  }, []);

  const update = <K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) => {
    setData((current) => ({ ...current, [key]: value }));
    setError("");
  };

  const openLeadForm = (service?: ServiceId, source?: string) => {
    if (submitted) {
      setData(createInitialData());
      setStep(0);
      setSubmitted(false);
    }

    const params = new URLSearchParams(window.location.search);
    setData((current) => ({
      ...current,
      ...(service ? { service, budget: service === current.service ? current.budget : "" } : {}),
      source: source ?? document.title,
      pageUrl: window.location.href,
      utmSource: params.get("utm_source") ?? current.utmSource,
      utmMedium: params.get("utm_medium") ?? current.utmMedium,
      utmCampaign: params.get("utm_campaign") ?? current.utmCampaign,
      openedAt: Date.now(),
      website: "",
    }));
    setError("");
    setOpen(true);
  };

  const closeLeadForm = () => {
    setData((current) => ({ ...current, consent: false }));
    setOpen(false);
  };

  const validateStep = () => {
    if (step === 0 && !data.service) return "Выберите подходящее направление.";
    if (step === 1 && data.description.trim().length < 20) return "Опишите задачу хотя бы в 20 символах.";
    if (step === 2 && !data.budget) return "Выберите ориентир по бюджету.";
    if (step === 2 && !data.deadline) return "Выберите желаемый срок.";
    if (step === 3 && data.name.trim().length < 2) return "Укажите ваше имя.";
    if (step === 3 && data.contact.trim().length < 4) return "Укажите контакт для связи.";
    if (step === 3 && data.contactMethod === "email" && !/^\S+@\S+\.\S+$/.test(data.contact.trim())) return "Проверьте адрес электронной почты.";
    if (step === 3 && data.contactMethod === "phone" && data.contact.replace(/\D/g, "").length < 10) return "Проверьте номер телефона.";
    if (step === 3 && !data.contactTime) return "Выберите удобное время связи.";
    if (step === 3 && data.contactTime === "Другое время" && data.customTime.trim().length < 3) return "Укажите удобное время.";
    if (step === 3 && !data.consent) return "Подтвердите согласие на обработку данных.";
    return "";
  };

  const goNext = () => {
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }
    setStep((current) => Math.min(current + 1, 3));
  };

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    const validationError = validateStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    setError("");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12_000);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({})) as { ok?: boolean; message?: string };
      if (!response.ok || !result.ok) throw new Error(result.message || "Не удалось отправить заявку.");

      setSubmitted(true);
      try {
        sessionStorage.removeItem(DRAFT_KEY);
      } catch {
        // Nothing else is required after a successful submission.
      }
    } catch (caught) {
      const message = caught instanceof Error && caught.name === "AbortError"
        ? "Сервер отвечает слишком долго. Попробуйте ещё раз."
        : caught instanceof Error
          ? caught.message
          : "Не удалось отправить заявку. Попробуйте ещё раз.";
      setError(message);
    } finally {
      window.clearTimeout(timeout);
      setSubmitting(false);
    }
  };

  return (
    <LeadFormContext.Provider value={{ openLeadForm }}>
      {children}
      <Dialog open={open} onOpenChange={(nextOpen) => nextOpen ? setOpen(true) : closeLeadForm()}>
        <DialogContent
          showCloseButton={false}
          className="max-h-[calc(100dvh-1rem)] w-[calc(100%-1rem)] max-w-[760px] overflow-hidden rounded-[26px] border-black/10 bg-[#f4f4ef] p-0 text-[#101214] shadow-[0_30px_100px_rgba(0,0,0,0.32)] dark:border-white/12 dark:bg-[#15181d] dark:text-[#f4f4ef] sm:max-h-[calc(100dvh-2rem)] sm:rounded-[32px]"
        >
          <DialogTitle className="sr-only">Заявка на проект</DialogTitle>
          <DialogDescription className="sr-only">Пошаговая форма заявки в Kostyuk.Studio</DialogDescription>

          {submitted ? (
            <div className="grid min-h-[480px] place-items-center p-6 text-center sm:p-12">
              <div>
                <span className="mx-auto grid size-16 place-items-center rounded-full bg-[#d4ff4f] text-[#101214]">
                  <CheckCircle2 className="size-8" />
                </span>
                <p className="eyebrow mt-7">Готово</p>
                <h2 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.9] tracking-[-0.065em]">Заявка отправлена.</h2>
                <p className="mx-auto mt-6 max-w-md leading-7 text-black/58 dark:text-white/58">Мы получили информацию и учтём выбранное время при связи.</p>
                <button type="button" onClick={closeLeadForm} className="mt-9 rounded-full bg-[#3159f5] px-7 py-4 font-semibold text-white transition-colors hover:bg-[#1f48e0]">
                  Закрыть
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={submit} noValidate>
              <div className="border-b border-black/8 px-5 pb-4 pt-5 dark:border-white/10 sm:px-8 sm:pt-7">
                <div className="flex items-center justify-between gap-5">
                  <div>
                    <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-black/42 dark:text-white/42">Заявка на проект</p>
                    <p className="mt-1 text-sm text-black/52 dark:text-white/52">Шаг {step + 1} из 4</p>
                  </div>
                  <button type="button" onClick={closeLeadForm} className="grid size-10 shrink-0 place-items-center rounded-full border border-black/10 bg-white/70 transition-colors hover:bg-white dark:border-white/12 dark:bg-white/8 dark:hover:bg-white/12" aria-label="Закрыть форму">
                    <X className="size-4" />
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-4 gap-2" aria-hidden="true">
                  {[0, 1, 2, 3].map((index) => (
                    <span key={index} className={cn("h-1 rounded-full transition-colors duration-200", index <= step ? "bg-[#3159f5]" : "bg-black/10 dark:bg-white/12")} />
                  ))}
                </div>
              </div>

              <div className="max-h-[calc(100dvh-225px)] min-h-[390px] overflow-y-auto px-5 py-6 sm:max-h-[calc(100dvh-245px)] sm:min-h-[455px] sm:px-8 sm:py-8">
                {step === 0 && (
                  <div>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Что вы хотите запустить?</h2>
                    <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">Выберите ближайший вариант. Если пока не уверены — разберём задачу вместе.</p>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {serviceOptions.map((option) => (
                        <ChoiceButton
                          key={option.id}
                          selected={data.service === option.id}
                          onClick={() => {
                            update("service", option.id);
                            update("budget", "");
                          }}
                          title={option.title}
                          description={option.description}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {step === 1 && (
                  <div>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Расскажите немного о задаче</h2>
                    <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">Достаточно нескольких предложений — детали уточним на созвоне.</p>
                    <div className="mt-8">
                      <FieldLabel htmlFor="lead-description">Что должно получиться?</FieldLabel>
                      <textarea
                        id="lead-description"
                        value={data.description}
                        onChange={(event) => update("description", event.target.value.slice(0, 1500))}
                        rows={6}
                        maxLength={1500}
                        placeholder="Например: нужен лендинг для новой услуги с формой заявки и подключением аналитики"
                        className="w-full resize-none rounded-[20px] border border-black/10 bg-white/70 px-4 py-4 leading-6 outline-none transition-colors placeholder:text-black/30 focus:border-[#3159f5] dark:border-white/20 dark:bg-white/8 dark:placeholder:text-white/28"
                      />
                      <p className="mt-2 text-right font-mono text-[10px] text-black/35 dark:text-white/35">{data.description.length} / 1500</p>
                    </div>
                    <div className="mt-5">
                      <FieldLabel htmlFor="lead-links" optional>Ссылка на сайт, ТЗ или материалы</FieldLabel>
                      <textarea
                        id="lead-links"
                        value={data.links}
                        onChange={(event) => update("links", event.target.value.slice(0, 800))}
                        rows={3}
                        maxLength={800}
                        placeholder="Можно вставить одну или несколько ссылок. Если материалов нет — пропустите"
                        className="w-full resize-none rounded-[20px] border border-black/10 bg-white/70 px-4 py-4 leading-6 outline-none transition-colors placeholder:text-black/30 focus:border-[#3159f5] dark:border-white/20 dark:bg-white/8 dark:placeholder:text-white/28"
                      />
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Какой ориентир по бюджету и срокам?</h2>
                    <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">Это не финальная смета — ответ поможет предложить реалистичный формат работы.</p>
                    <div className="mt-8">
                      <FieldLabel>Бюджет</FieldLabel>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {budgets.map((budget) => (
                          <ChoiceButton key={budget} selected={data.budget === budget} onClick={() => update("budget", budget)} title={budget} />
                        ))}
                      </div>
                    </div>
                    <div className="mt-7">
                      <FieldLabel>Желаемый срок</FieldLabel>
                      <div className="flex flex-wrap gap-2">
                        {deadlineOptions.map((deadline) => (
                          <button
                            key={deadline}
                            type="button"
                            onClick={() => update("deadline", deadline)}
                            aria-pressed={data.deadline === deadline}
                            className={cn(
                              "rounded-full border px-4 py-3 text-sm font-semibold transition-colors",
                              data.deadline === deadline
                                ? "border-[#3159f5] bg-[#3159f5] text-white"
                                : "border-black/10 bg-white/65 hover:border-[#3159f5]/35 dark:border-white/20 dark:bg-white/8",
                            )}
                          >
                            {deadline}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="font-display text-[clamp(2rem,5vw,3.35rem)] font-semibold leading-[0.94] tracking-[-0.06em]">Как с вами связаться?</h2>
                    <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">Оставьте удобный контакт — никаких рассылок, только ответ по вашей задаче.</p>

                    <div className="mt-8 grid gap-5">
                      <div>
                        <FieldLabel htmlFor="lead-name">Имя</FieldLabel>
                        <input
                          id="lead-name"
                          value={data.name}
                          onChange={(event) => update("name", event.target.value.slice(0, 80))}
                          autoComplete="name"
                          placeholder="Как к вам обращаться?"
                          className="h-13 w-full rounded-[18px] border border-black/10 bg-white/70 px-4 outline-none transition-colors placeholder:text-black/30 focus:border-[#3159f5] dark:border-white/20 dark:bg-white/8 dark:placeholder:text-white/28"
                        />
                      </div>

                      <div>
                        <FieldLabel>Предпочтительный способ связи</FieldLabel>
                        <div className="grid grid-cols-3 gap-2">
                          {contactMethodOptions.map((method) => (
                            <button
                              key={method.id}
                              type="button"
                              onClick={() => {
                                update("contactMethod", method.id);
                                update("contact", "");
                              }}
                              aria-pressed={data.contactMethod === method.id}
                              className={cn(
                                "rounded-[16px] border px-3 py-3 text-sm font-semibold transition-colors",
                                data.contactMethod === method.id
                                  ? "border-[#3159f5] bg-[#3159f5] text-white"
                                  : "border-black/10 bg-white/65 dark:border-white/20 dark:bg-white/8",
                              )}
                            >
                              {method.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div>
                        <FieldLabel htmlFor="lead-contact">Контакт</FieldLabel>
                        <input
                          id="lead-contact"
                          value={data.contact}
                          onChange={(event) => update("contact", event.target.value.slice(0, 120))}
                          inputMode={data.contactMethod === "email" ? "email" : data.contactMethod === "phone" ? "tel" : "text"}
                          autoComplete={data.contactMethod === "email" ? "email" : data.contactMethod === "phone" ? "tel" : "off"}
                          placeholder={data.contactMethod === "telegram" ? "@username или номер телефона" : data.contactMethod === "phone" ? "+7 999 000-00-00" : "name@example.com"}
                          className="h-13 w-full rounded-[18px] border border-black/10 bg-white/70 px-4 outline-none transition-colors placeholder:text-black/30 focus:border-[#3159f5] dark:border-white/20 dark:bg-white/8 dark:placeholder:text-white/28"
                        />
                      </div>

                      <div>
                        <FieldLabel>Когда удобно связаться? <span className="font-normal text-black/38 dark:text-white/38">МСК</span></FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {contactTimeOptions.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => update("contactTime", time)}
                              aria-pressed={data.contactTime === time}
                              className={cn(
                                "rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors",
                                data.contactTime === time
                                  ? "border-[#3159f5] bg-[#3159f5] text-white"
                                  : "border-black/10 bg-white/65 dark:border-white/20 dark:bg-white/8",
                              )}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                        {data.contactTime === "Другое время" && (
                          <input
                            id="lead-custom-time"
                            aria-label="Удобное время связи"
                            value={data.customTime}
                            onChange={(event) => update("customTime", event.target.value.slice(0, 80))}
                            placeholder="Например: будни после 19:30"
                            className="mt-3 h-13 w-full rounded-[18px] border border-black/10 bg-white/70 px-4 outline-none transition-colors placeholder:text-black/30 focus:border-[#3159f5] dark:border-white/20 dark:bg-white/8 dark:placeholder:text-white/28"
                          />
                        )}
                      </div>

                      <div className="flex items-start gap-3 rounded-[18px] border border-black/8 bg-white/45 p-4 text-sm leading-5 text-black/58 dark:border-white/18 dark:bg-white/7 dark:text-white/58">
                        <input
                          id="lead-consent"
                          type="checkbox"
                          checked={data.consent}
                          onChange={(event) => update("consent", event.target.checked)}
                          className="mt-0.5 size-4 shrink-0 accent-[#3159f5]"
                        />
                        <p>
                          <label htmlFor="lead-consent" className="cursor-pointer">Я даю согласие на обработку персональных данных.</label>{" "}
                          <a href="/personal-data-consent" target="_blank" rel="noreferrer" className="font-semibold text-[#3159f5] underline decoration-[#3159f5]/30 underline-offset-2 hover:decoration-[#3159f5] dark:text-[#90a8ff]">Условия согласия</a>
                          {" · "}
                          <a href="/privacy" target="_blank" rel="noreferrer" className="font-semibold text-[#3159f5] underline decoration-[#3159f5]/30 underline-offset-2 hover:decoration-[#3159f5] dark:text-[#90a8ff]">Политика</a>
                        </p>
                      </div>

                      <div className="absolute -left-[9999px]" aria-hidden="true">
                        <label htmlFor="company-website">Сайт компании</label>
                        <input id="company-website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(event) => update("website", event.target.value)} />
                      </div>
                    </div>
                  </div>
                )}

                {error && (
                  <div role="alert" className="mt-5 rounded-[16px] border border-red-500/25 bg-red-500/8 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
                    {error}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-black/8 bg-white/35 px-5 py-4 dark:border-white/10 dark:bg-white/[0.025] sm:px-8">
                <button
                  type="button"
                  onClick={() => setStep((current) => Math.max(current - 1, 0))}
                  disabled={step === 0 || submitting}
                  className="inline-flex items-center gap-2 rounded-full px-3 py-3 text-sm font-semibold text-black/55 transition-opacity disabled:pointer-events-none disabled:opacity-0 dark:text-white/55"
                >
                  <ArrowLeft className="size-4" /> Назад
                </button>

                {step < 3 ? (
                  <button type="button" onClick={goNext} className="inline-flex items-center gap-2 rounded-full bg-[#101214] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#3159f5] dark:bg-white dark:text-[#101214] dark:hover:bg-[#d4ff4f]">
                    Продолжить <ArrowRight className="size-4" />
                  </button>
                ) : (
                  <button type="submit" disabled={submitting} className="inline-flex min-w-[176px] items-center justify-center gap-2 rounded-full bg-[#3159f5] px-6 py-3.5 font-semibold text-white transition-colors hover:bg-[#1f48e0] disabled:cursor-wait disabled:opacity-65">
                    {submitting ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                    {submitting ? "Отправляем" : "Отправить заявку"}
                  </button>
                )}
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </LeadFormContext.Provider>
  );
}

export function useLeadForm() {
  const context = useContext(LeadFormContext);
  if (!context) throw new Error("useLeadForm must be used within LeadFormProvider");
  return context;
}
