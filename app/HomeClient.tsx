"use client";
import { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { translations, type Lang } from "./translations";

// ── Componentes reutilizáveis ─────────────────────────────────────────────────

function SymptomItem({
  icon, title, desc, variant = "default",
}: { icon: React.ReactNode; title: string; desc: string; variant?: "early" | "late" | "default" }) {
  return (
    <li className="flex gap-3 items-center bg-white rounded-2xl p-4 shadow-sm">
      <span className="flex-shrink-0 w-16 flex items-center justify-center" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-semibold text-slate-800 text-lg leading-snug">{title}</p>
        <p className="text-slate-500 text-base mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function TreatItem({ title, desc, color, textWhite, imgIcon, imgSize }: { icon?: string; title: string; desc: string; color?: string; textWhite?: boolean; imgIcon?: string; imgSize?: string }) {
  return (
    <li className="rounded-2xl overflow-hidden shadow-sm" style={{ background: color ?? "#ffffff" }}>
      <div className="px-4 py-4 flex items-center gap-3">
        {imgIcon && (
          <div className="w-16 flex-shrink-0 flex items-center justify-center">
            <img src={imgIcon} alt="" aria-hidden="true" className={`object-contain ${imgSize ?? "w-16 h-16"}`} />
          </div>
        )}
        <div>
          <p className={`font-bold text-xl leading-snug ${textWhite ? "text-white" : "text-slate-800"}`}>{title}</p>
          <p className={`text-lg mt-1 leading-relaxed ${textWhite ? "text-white/90" : "text-slate-600"}`}>{desc}</p>
        </div>
      </div>
    </li>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-base text-[#550084] uppercase tracking-widest mt-6 mb-3 first:mt-0 text-center">
      {children}
    </h2>
  );
}

function PageTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-extrabold text-slate-800 mb-1 leading-tight">
      {children}
    </h2>
  );
}

const LANGS: Lang[] = ["pt", "es", "en"];

function LangToggle({ lang, onChange, className = "" }: { lang: Lang; onChange: (l: Lang) => void; className?: string }) {
  const base = "px-2.5 py-1 text-xs font-bold rounded-md transition-colors";
  return (
    <div className={`inline-flex items-center gap-1 rounded-lg bg-white/20 p-0.5 ${className}`} role="group" aria-label="Idioma / Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => onChange(l)}
          aria-pressed={lang === l}
          className={`${base} ${lang === l ? "bg-white text-[#550084]" : "text-white hover:bg-white/20"}`}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default function HomeClient() {
  const [lang, setLang] = useState<Lang>("pt");

  useEffect(() => {
    const isLang = (v: string | null): v is Lang => v === "pt" || v === "es" || v === "en";
    const urlLang = new URLSearchParams(window.location.search).get("lang");
    const saved = localStorage.getItem("lang");

    let initial: Lang;
    if (isLang(urlLang)) {
      initial = urlLang;             // 1º: link explícito (?lang=en)
    } else if (isLang(saved)) {
      initial = saved;               // 2º: escolha anterior do usuário
    } else {
      const nav = (navigator.language || "").toLowerCase();  // 3º: idioma do aparelho
      initial = nav.startsWith("es") ? "es" : nav.startsWith("pt") ? "pt" : "en";
    }

    setLang(initial);
    document.documentElement.lang = initial === "es" ? "es" : initial === "en" ? "en" : "pt-BR";
  }, []);

  const changeLang = (l: Lang) => {
    setLang(l);
    localStorage.setItem("lang", l);
    document.documentElement.lang = l === "es" ? "es" : l === "en" ? "en" : "pt-BR";
  };

  const t = translations[lang];

  return (
    <div className="min-h-screen bg-white">

      {/* MOBILE HEADER — oculto em desktop */}
      <header className="lg:hidden text-white overflow-hidden flex items-center relative" style={{ backgroundImage: "url('/bgHero2.png')", backgroundSize: "cover", backgroundPosition: "right center", minHeight: "200px" }}>
        <div className="w-3/5 px-4 py-6 text-left">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">{t.header.title1}<br />{t.header.title2}</h1>
          <p className="text-sm text-[#e8ccff] mt-2">{t.header.subtitle}</p>
        </div>
        <div className="w-2/5 flex-shrink-0" />
        <LangToggle lang={lang} onChange={changeLang} className="absolute top-3 right-3" />
      </header>

      <Tabs defaultValue="rins" className="lg:flex lg:min-h-screen">

        {/* ── SIDEBAR / TAB BAR ── */}
        <TabsList aria-label={t.nav.ariaSections}>

          {/* Branding — visível apenas em desktop dentro da sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:px-5 lg:py-6 lg:border-b lg:border-slate-100 lg:mb-2 lg:w-full">
            <div className="flex items-center justify-between gap-2.5 mb-1">
              <div className="flex items-center gap-2.5">
                <img src="/rim.png" alt="" aria-hidden="true" className="w-8 h-8 object-contain flex-shrink-0" />
                <span className="font-extrabold text-slate-800 text-sm leading-tight">{t.brand.name}</span>
              </div>
              <div className="inline-flex items-center gap-1 rounded-lg bg-slate-100 p-0.5">
                {LANGS.map((l) => (
                  <button key={l} type="button" onClick={() => changeLang(l)} aria-pressed={lang === l} className={`px-2 py-0.5 text-xs font-bold rounded-md transition-colors ${lang === l ? "bg-[#550084] text-white" : "text-slate-500 hover:bg-slate-200"}`}>{l.toUpperCase()}</button>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 pl-10">{t.brand.tagline}</p>
          </div>

          {/* Nav label — desktop only */}
          <p className="hidden lg:block lg:px-5 lg:pb-1 lg:text-xs lg:font-bold lg:text-slate-400 lg:uppercase lg:tracking-widest lg:w-full">
            {t.nav.label}
          </p>

          <TabsTrigger value="rins"><img src="/rim.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> {t.nav.rins}</TabsTrigger>
          <TabsTrigger value="sinais"><img src="/sinais.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> {t.nav.sinais}</TabsTrigger>
          <TabsTrigger value="estadios"><img src="/estadios.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> {t.nav.estadios}</TabsTrigger>
          <TabsTrigger value="tratamento"><img src="/tratamentro.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> {t.nav.tratamento}</TabsTrigger>
          <TabsTrigger value="faq"><img src="/duvidas.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> {t.nav.faq}</TabsTrigger>

          {/* Footer da sidebar — desktop only */}
          <div className="hidden lg:flex lg:flex-col lg:mt-auto lg:px-5 lg:py-5 lg:border-t lg:border-slate-100 lg:w-full">
            <p className="text-xs text-slate-400 leading-relaxed">
              {t.footer.basedOn}{" "}
              <a href="https://www.iris-kidney.com/what-pet-owners-should-know"
                target="_blank" rel="noopener noreferrer"
                className="text-[#550084] font-semibold hover:underline">
                IRIS
              </a>
              .<br />{t.footer.notReplace}
            </p>
            <p className="text-xs font-semibold text-[#550084] mt-2">{t.footer.madeBy}</p>
          </div>
        </TabsList>

        {/* ── CONTEÚDO ── */}
        <main id="main-content" className="flex-1 min-w-0">

          {/* ───────────── OS RINS ───────────── */}
          <TabsContent value="rins">
            {/* Desktop: header da seção */}
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-[#550084] uppercase tracking-widest">{t.rins.kicker}</span>
              <PageTitle>{t.rins.pageTitle}</PageTitle>
              <p className="text-sm text-slate-500">{t.rins.pageSubtitle}</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              {/* Desktop: 2 colunas */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
                {/* Coluna 1: O néfron */}
                <div className="space-y-4">
                  <SectionTitle>{t.rins.sectionHow}</SectionTitle>
                  {/* Card 1: O néfron */}
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgnefron.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">{t.rins.nephronTitle}</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: t.rins.nephronHtml }} />
                    </div>
                  </Card>

                  {/* Card 2: Filtram o sangue */}
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgsangue.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <p className="text-base text-slate-600 leading-relaxed text-left" dangerouslySetInnerHTML={{ __html: t.rins.bloodHtml }} />
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgvocesabia.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">{t.rins.didYouKnowTitle}</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">{t.rins.didYouKnowText}</p>
                    </div>
                  </Card>
                </div>

                {/* Coluna 2: Outras funções */}
                <div className="space-y-4">
                  <SectionTitle>{t.rins.sectionOther}</SectionTitle>
                  <ul className="space-y-3" aria-label={t.rins.ariaOther}>
                    <SymptomItem icon={<img src="/gota.png" alt="" className="w-12 h-12 object-contain" />} title={t.rins.epoTitle} desc={t.rins.epoDesc} />
                    <SymptomItem icon={<img src="/comida.png" alt="" className="w-12 h-12 object-contain" />} title={t.rins.vitDTitle} desc={t.rins.vitDDesc} />
                    <SymptomItem icon={<img src="/focinho.png" alt="" className="w-16 h-16 object-contain" />} title={t.rins.balanceTitle} desc={t.rins.balanceDesc} />
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── SINAIS ───────────── */}
          <TabsContent value="sinais">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">{t.sinais.kicker}</span>
              <PageTitle>{t.sinais.pageTitle}</PageTitle>
              <p className="text-sm text-slate-500">{t.sinais.pageSubtitle}</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <div className="rounded-xl p-6 bg-amber-50 text-amber-900 text-center">
                <p className="text-6xl font-extrabold">75%</p>
                <p className="text-xl mt-2">{t.sinais.statText}</p>
              </div>

              {/* Desktop: 2 colunas de sinais */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>{t.sinais.sectionEarly}</SectionTitle>
                  <div className="space-y-3">
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgAgua.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">{t.sinais.thirstTitle}</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">{t.sinais.thirstDesc}</p>
                    </div>
                  </Card>
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgUrina.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">{t.sinais.peeTitle}</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left whitespace-pre-line">{t.sinais.peeDesc}</p>
                    </div>
                  </Card>
                  </div>
                </div>
                <div>
                  <SectionTitle>{t.sinais.sectionLate}</SectionTitle>
                  <ul className="space-y-3" aria-label={t.sinais.ariaLate}>
                    <SymptomItem variant="late" icon={<img src="/apatia.png" alt="" className="w-16 h-16 object-contain" />} title={t.sinais.lethargyTitle} desc={t.sinais.lethargyDesc} />
                    <SymptomItem variant="late" icon={<img src="/pratoCheio.png" alt="" className="w-12 h-12 object-contain" />} title={t.sinais.appetiteTitle} desc={t.sinais.appetiteDesc} />
                    <SymptomItem variant="late" icon={<img src="/peso.png" alt="" className="w-16 h-16 object-contain" />} title={t.sinais.weightTitle} desc={t.sinais.weightDesc} />
                    <SymptomItem variant="late" icon={<img src="/pelo.png" alt="" className="w-16 h-16 object-contain" />} title={t.sinais.coatTitle} desc={t.sinais.coatDesc} />
                    <SymptomItem variant="late" icon={<img src="/vomito.png" alt="" className="w-16 h-16 object-contain" />} title={t.sinais.vomitTitle} desc={t.sinais.vomitDesc} />
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white">
                <div className="h-44 overflow-hidden" style={{ background: "#FFF1F1" }}>
                  <img src="/bgajuda.png" alt="" aria-hidden="true" className="w-full h-full object-contain scale-[1.6] origin-center" />
                </div>
                <div className="px-5 py-5 text-center bg-white">
                  <p className="font-bold text-xl mb-1" style={{ color: "#880304" }}>{t.sinais.alertTitle}</p>
                  <p className="text-lg" style={{ color: "#880304" }}>{t.sinais.alertText}</p>
                </div>
              </div>

            </div>
          </TabsContent>

          {/* ───────────── ESTÁDIOS ───────────── */}
          <TabsContent value="estadios">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-[#550084] uppercase tracking-widest">{t.estadios.kicker}</span>
              <PageTitle>{t.estadios.pageTitle}</PageTitle>
              <p className="text-sm text-slate-500">{t.estadios.pageSubtitle}</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <Card className="overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">{t.estadios.cardTitle}</h3>
                  <p className="text-base text-slate-600 leading-relaxed text-left">{t.estadios.cardText}</p>
                </div>
              </Card>

              <div className="flex mx-auto" style={{ maxWidth: '340px' }}>
                <img src="/bgestadio.jpeg" alt={t.estadios.imgAlt} className="block object-contain flex-shrink-0" style={{ width: '200px' }} />
                <div className="relative flex-1 ml-3">
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '13%', transform: 'translateY(-50%)', color: '#10b981' }}>{t.estadios.phaseInitial}</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '37%', transform: 'translateY(-50%)', color: '#3b82f6' }}>{t.estadios.phaseMild}</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '62%', transform: 'translateY(-50%)', color: '#ef4444' }}>{t.estadios.phaseModerate}</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '86%', transform: 'translateY(-50%)', color: '#f97316' }}>{t.estadios.phaseAdvanced}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── TRATAMENTO ───────────── */}
          <TabsContent value="tratamento">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">{t.tratamento.kicker}</span>
              <PageTitle>{t.tratamento.pageTitle}</PageTitle>
              <p className="text-sm text-slate-500">{t.tratamento.pageSubtitle}</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              {/* Card destacado — boas notícias */}
              <div className="rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
                <div className="h-56 bg-[#E8F5E9] overflow-hidden">
                  <img src="/bgcaoegato.png" alt="" aria-hidden="true" className="w-full h-full object-contain scale-[1.6] origin-center" />
                </div>
                <div className="px-5 py-5 text-center">
                  <p className="font-semibold text-slate-700 text-lg leading-snug">
                    {t.tratamento.goodNews}
                  </p>
                </div>
              </div>

              {/* Desktop: 2 colunas */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>{t.tratamento.sectionEssential}</SectionTitle>
                  <ul className="space-y-3" aria-label={t.tratamento.ariaEssential}>
                    <TreatItem title={t.tratamento.waterTitle} desc={t.tratamento.waterDesc} color="#028ff9" textWhite imgIcon="/gotaBranca.png" />
                    <TreatItem title={t.tratamento.dietTitle} desc={t.tratamento.dietDesc} color="#eb733a" textWhite imgIcon="/comidaBranca.png" imgSize="w-20 h-20" />
                  </ul>

                  {/* Card quadrado destacado — estudo dieta renal */}
                  <div className="mt-3 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
                    <div className="h-44 bg-[#FDEBD3]">
                      <img src="/bggato.png" alt="" aria-hidden="true" className="w-full h-full object-cover" />
                    </div>
                    <p className="px-5 py-5 text-center font-bold text-slate-800 text-xl leading-snug">
                      {t.tratamento.dietHighlight}
                    </p>
                  </div>

                  <SectionTitle>{t.tratamento.sectionAdvanced}</SectionTitle>
                  <ul className="space-y-3" aria-label={t.tratamento.ariaAdvanced}>
                    <TreatItem title={t.tratamento.fluidTitle} desc={t.tratamento.fluidDesc} color="#03ab94" textWhite />
                    <TreatItem title={t.tratamento.tubeTitle} desc={t.tratamento.tubeDesc} color="#2e1360" textWhite />
                  </ul>
                </div>

                <div>
                  <SectionTitle>{t.tratamento.sectionPrescribed}</SectionTitle>
                  <ul className="space-y-3" aria-label={t.tratamento.ariaPrescribed}>
                    <TreatItem title={t.tratamento.vomitTitle} desc={t.tratamento.vomitDesc} color="#0c88a9" textWhite />
                    <TreatItem title={t.tratamento.appetiteTitle} desc={t.tratamento.appetiteDesc} color="#eb7239" textWhite />
                    <TreatItem title={t.tratamento.binderTitle} desc={t.tratamento.binderDesc} color="#87c522" textWhite />
                    <TreatItem title={t.tratamento.pressureTitle} desc={t.tratamento.pressureDesc} color="#c02c8c" textWhite />
                    <TreatItem title={t.tratamento.proteinTitle} desc={t.tratamento.proteinDesc} color="#74629f" textWhite />
                    <TreatItem title={t.tratamento.epoTitle} desc={t.tratamento.epoDesc} color="#97150b" textWhite />
                  </ul>
                </div>
              </div>

              {/* Dica — saúde bucal e rins */}
              <div className="rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
                <div className="h-44 overflow-hidden" style={{ background: "#EAF7F5" }}>
                  <img src="/escova.svg" alt="" aria-hidden="true" className="w-full h-full object-contain scale-[1.7] origin-center" />
                </div>
                <div className="px-5 py-5">
                  <p className="font-bold text-xl mb-1" style={{ color: "#04695a" }}>
                    {t.tratamento.tipTitle}
                  </p>
                  <p className="text-lg leading-relaxed" style={{ color: "#04695a" }}>
                    {t.tratamento.tipText}
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── FAQ ───────────── */}
          <TabsContent value="faq">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{t.faqSection.kicker}</span>
              <PageTitle>{t.faqSection.pageTitle}</PageTitle>
              <p className="text-sm text-slate-500">{t.faqSection.pageSubtitle}</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8">
              <SectionTitle>{t.faqSection.title}</SectionTitle>
              {/* Desktop: 2 colunas de accordion */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <Accordion type="single" collapsible className="space-y-2.5">
                  {t.faqs.slice(0, 3).map((f) => (
                    <AccordionItem key={f.id} value={f.id}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>
                        {f.a.map((p, i) => <p key={i} className={i < f.a.length - 1 ? "mb-2" : ""}>{p}</p>)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="space-y-2.5 mt-2.5 lg:mt-0">
                  {t.faqs.slice(3).map((f) => (
                    <AccordionItem key={f.id} value={f.id}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>
                        {f.a.map((p, i) => <p key={i} className={i < f.a.length - 1 ? "mb-2" : ""}>{p}</p>)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </TabsContent>

          {/* FONTE — mobile only (desktop tem na sidebar) */}
          <div className="lg:hidden text-center text-xs text-slate-400 px-4 pb-6 space-y-1">
            <p>
              {t.footer.basedOn}{" "}
              <a href="https://www.iris-kidney.com/what-pet-owners-should-know" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-[#550084] underline-offset-2 hover:underline"
                aria-label={t.footer.irisAria}>
                IRIS
              </a>
              {t.footer.mobileNote}
            </p>
            <p className="font-semibold text-[#550084]">{t.footer.madeBy}</p>
          </div>
        </main>
      </Tabs>
    </div>
  );
}
