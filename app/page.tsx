import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// ── Componentes reutilizáveis ─────────────────────────────────────────────────

function SymptomItem({
  icon, title, desc, variant = "default",
}: { icon: string; title: string; desc: string; variant?: "early" | "late" | "default" }) {
  const border =
    variant === "early" ? "border-l-amber-400" :
    variant === "late"  ? "border-l-red-400"   :
                          "border-l-slate-200";
  return (
    <li className={`flex gap-3 bg-white rounded-2xl p-4 shadow-sm border-l-4 ${border}`}>
      <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-semibold text-slate-800 text-base leading-snug">{title}</p>
        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function TreatItem({ icon, title, desc }: { icon: string; title: string; desc: string }) {
  return (
    <li className="flex gap-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 h-full">
      <span className="text-xl flex-shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
      <div>
        <p className="font-semibold text-slate-800 text-base leading-snug">{title}</p>
        <p className="text-slate-500 text-sm mt-0.5 leading-relaxed">{desc}</p>
      </div>
    </li>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-6 mb-3 first:mt-0">
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

// ── Dados ─────────────────────────────────────────────────────────────────────

const stages = [
  {
    n: 1, label: "Estádio 1", title: "Doença inicial", pct: 25,
    color: "bg-emerald-500", border: "border-t-emerald-500", badgeVariant: "stage1" as const,
    desc: "Creatinina dentro do valor de referência. Função renal com perda leve detectada por SDMA ou outros marcadores.",
    chips: ["SDMA elevado", "Sem sintomas óbvios"],
  },
  {
    n: 2, label: "Estádio 2", title: "Doença leve", pct: 50,
    color: "bg-yellow-400", border: "border-t-yellow-400", badgeVariant: "stage2" as const,
    desc: "Creatinina levemente elevada. Poliúria e polidipsia podem começar a aparecer.",
    chips: ["Beber mais água", "Urinar mais"],
    note: "Melhor momento para iniciar a dieta renal — o pet ainda tem bom apetite.",
  },
  {
    n: 3, label: "Estádio 3", title: "Doença moderada", pct: 75,
    color: "bg-orange-500", border: "border-t-orange-500", badgeVariant: "stage3" as const,
    desc: "Creatinina e fósforo elevados. Sintomas mais evidentes: letargia, perda de peso.",
    chips: ["Fósforo alto", "Letargia", "Perda de peso"],
  },
  {
    n: 4, label: "Estádio 4", title: "Doença grave", pct: 100,
    color: "bg-red-600", border: "border-t-red-600", badgeVariant: "stage4" as const,
    desc: "Creatinina muito elevada. Risco de vida: desidratação grave, desequilíbrio eletrolítico, acidose.",
    chips: ["Vômito frequente", "Sem comer", "Desidratação"],
  },
];

const faqs = [
  {
    id: "faq-1",
    q: "Quanto tempo meu pet vai viver com DRC?",
    a: ["Não é possível prever com certeza, pois a velocidade de progressão varia muito entre cada animal. O veterinário pode acompanhar a tendência da creatinina ao longo dos meses para estimar a progressão.", "Com manejo consciente pelo responsável e pelo veterinário, alguns pets com DRC vivem vários anos com qualidade de vida."],
  },
  {
    id: "faq-2",
    q: "Posso restringir a água para o pet urinar menos?",
    a: ["Nunca. Pets com DRC não conseguem concentrar a urina e perdem muita água pelo xixi. Restrição de água causa desidratação grave e piora muito o quadro clínico.", "Deixe sempre água fresca disponível à vontade."],
  },
  {
    id: "faq-3",
    q: "Quando devo iniciar a dieta renal?",
    a: ["O momento ideal é o Estádio 2 ou 3 da IRIS, quando o pet ainda tem bom apetite para aceitar a mudança alimentar.", "A transição deve ser gradual ao longo de semanas: misture progressivamente o alimento renal com o habitual até a substituição completa."],
  },
  {
    id: "faq-4",
    q: "Gatos e cães apresentam os mesmos sinais?",
    a: ["Os sinais são semelhantes, mas há diferenças práticas. Cães urinam fora e bebem água visível — fica mais fácil notar as mudanças. Gatos usam caixinha (observar o número de grumos) e bebem de tigelas grandes, tornando difícil perceber o aumento.", "Gatos também vomitam com menos frequência que cães com DRC avançada."],
  },
  {
    id: "faq-5",
    q: "O que é o SDMA e por que é importante?",
    a: ["O SDMA (dimetilarginina simétrica) é um marcador sanguíneo que detecta DRC quando os rins perderam apenas ~40% da função — muito antes de BUN e creatinina saírem do normal.", "Isso permite intervenção mais precoce e potencialmente melhor prognóstico. Pergunte ao seu veterinário sobre incluí-lo nos exames de rotina do seu pet."],
  },
  {
    id: "faq-6",
    q: "Com que frequência devo levar meu pet ao veterinário?",
    a: ["Para pets mais velhos, visitas anuais com exames de sangue são recomendadas para detectar DRC precocemente — mesmo quando BUN e creatinina ainda estão dentro do normal.", "Para pets já diagnosticados, a frequência depende do estádio e orientação do veterinário."],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">

      {/* MOBILE HEADER — oculto em desktop */}
      <header className="lg:hidden bg-gradient-to-br from-[#550084] to-[#8800cc] text-white px-5 pt-8 pb-7">
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-2xl">
            <img src="/rim.png" alt="" aria-hidden="true" className="w-full h-full object-cover scale-110" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold leading-tight tracking-tight">Doença Renal em Pets</h1>
            <p className="text-sm text-[#e8ccff] mt-1.5">Guia educativo para responsáveis de cães e gatos</p>
          </div>
        </div>
      </header>

      <Tabs defaultValue="rins" className="lg:flex lg:min-h-screen">

        {/* ── SIDEBAR / TAB BAR ── */}
        <TabsList aria-label="Seções do guia">

          {/* Branding — visível apenas em desktop dentro da sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:px-5 lg:py-6 lg:border-b lg:border-slate-100 lg:mb-2 lg:w-full">
            <div className="flex items-center gap-2.5 mb-1">
              <img src="/favicon.png" alt="" aria-hidden="true" className="w-8 h-8 object-contain flex-shrink-0" />
              <span className="font-extrabold text-slate-800 text-sm leading-tight">DRC em Pets</span>
            </div>
            <p className="text-xs text-slate-400 pl-10">Guia para responsáveis</p>
          </div>

          {/* Nav label — desktop only */}
          <p className="hidden lg:block lg:px-5 lg:pb-1 lg:text-xs lg:font-bold lg:text-slate-400 lg:uppercase lg:tracking-widest lg:w-full">
            Seções
          </p>

          <TabsTrigger value="rins"><img src="/favicon.png" alt="" aria-hidden="true" className="w-4 h-4 rounded object-cover inline-block" /> Os Rins</TabsTrigger>
          <TabsTrigger value="sinais"><img src="/sinais.png" alt="" aria-hidden="true" className="w-4 h-4 rounded object-cover inline-block" /> Sinais</TabsTrigger>
          <TabsTrigger value="estadios"><img src="/estadios.png" alt="" aria-hidden="true" className="w-4 h-4 rounded object-cover inline-block" /> Estádios</TabsTrigger>
          <TabsTrigger value="tratamento"><img src="/tratamentro.png" alt="" aria-hidden="true" className="w-4 h-4 rounded object-cover inline-block" /> Tratamento</TabsTrigger>
          <TabsTrigger value="faq"><img src="/duvidas.png" alt="" aria-hidden="true" className="w-4 h-4 rounded object-cover inline-block" /> Dúvidas</TabsTrigger>

          {/* Footer da sidebar — desktop only */}
          <div className="hidden lg:flex lg:flex-col lg:mt-auto lg:px-5 lg:py-5 lg:border-t lg:border-slate-100 lg:w-full">
            <p className="text-xs text-slate-400 leading-relaxed">
              Baseado nas diretrizes da{" "}
              <a href="https://www.iris-kidney.com/what-pet-owners-should-know"
                target="_blank" rel="noopener noreferrer"
                className="text-[#550084] font-semibold hover:underline">
                IRIS
              </a>
              .<br />Não substitui consulta veterinária.
            </p>
          </div>
        </TabsList>

        {/* ── CONTEÚDO ── */}
        <main id="main-content" className="flex-1 min-w-0">

          {/* ───────────── OS RINS ───────────── */}
          <TabsContent value="rins">
            {/* Desktop: header da seção */}
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-[#550084] uppercase tracking-widest">Fundamentos</span>
              <PageTitle>Os rins e como funcionam</PageTitle>
              <p className="text-sm text-slate-500">Entenda o papel dos rins antes de compreender a doença.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              {/* Desktop: 2 colunas */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-4 lg:space-y-0">
                {/* Coluna 1: O néfron */}
                <div className="space-y-4">
                  <SectionTitle>Como os rins funcionam?</SectionTitle>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-xl font-extrabold text-[#550084]"><img src="/nefron.png" alt="" aria-hidden="true" className="w-5 h-5 rounded object-cover inline-block" /> O néfron</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3 text-base text-slate-600 leading-relaxed">
                      <p>Os rins são formados por centenas de milhares de unidades funcionais chamadas <strong className="text-[#550084] font-extrabold text-lg">néfrons</strong>. Cada néfron tem um filtro (o glomérulo) e um canal longo chamado túbulo.</p>
                      <p>Os rins <strong className="text-[#550084] font-extrabold text-lg">filtram o sangue</strong> o tempo todo. Eles removem o excesso de água e as substâncias que o organismo não precisa, formando a urina, enquanto mantêm no sangue componentes importantes, como células sanguíneas e proteínas grandes.</p>
                      <Alert variant="info" icon={<img src="/vocesabia.png" alt="" className="w-6 h-6 object-contain" />} title="Você sabia?">
                        Mais de 99% do que é filtrado retorna ao sangue. A urina é apenas o subproduto desse processo de conservação.
                      </Alert>
                    </CardContent>
                  </Card>
                </div>

                {/* Coluna 2: Outras funções */}
                <div className="space-y-4">
                  <SectionTitle>Outras funções dos rins</SectionTitle>
                  <ul className="space-y-3" aria-label="Funções dos rins além da filtração">
                    <SymptomItem icon="🩸" title="Produção de eritropoetina" desc="Hormônio que estimula a medula óssea a produzir glóbulos vermelhos." />
                    <SymptomItem icon="☀️" title="Ativação da vitamina D" desc="Transforma a vitamina D da dieta na sua forma ativa final (calcitriol)." />
                    <SymptomItem icon="⚖️" title="Regulação do equilíbrio interno" desc="Controla o volume e a composição dos fluidos corporais." />
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── SINAIS ───────────── */}
          <TabsContent value="sinais">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">Reconhecimento</span>
              <PageTitle>Sinais e diagnóstico</PageTitle>
              <p className="text-sm text-slate-500">O que observar no dia a dia e como a doença é confirmada.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <Alert variant="warning" icon="⚠️" title="Atenção">
                A DRC progride lentamente. Quando os primeiros sinais aparecem, os rins já perderam cerca de 2/3 da função.
              </Alert>

              {/* Desktop: 2 colunas de sinais */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>Sinais precoces</SectionTitle>
                  <ul className="space-y-3" aria-label="Sinais precoces de doença renal crônica">
                    <SymptomItem variant="early" icon="🚰" title="Beber mais água (polidipsia)" desc="Cão ou gato refazendo o bebedouro com mais frequência que o normal." />
                    <SymptomItem variant="early" icon="🪣" title="Urinar mais (poliúria)" desc="Em cães: pode urinar dentro de casa. Em gatos: caixinha com mais grumos úmidos, precisando ser limpa com mais frequência." />
                  </ul>
                </div>
                <div>
                  <SectionTitle>Sinais em fase avançada</SectionTitle>
                  <ul className="space-y-3" aria-label="Sinais avançados de doença renal crônica">
                    <SymptomItem variant="late" icon="😴" title="Letargia" desc="Pet mais quieto, sem energia para atividades rotineiras." />
                    <SymptomItem variant="late" icon="🍽️" title="Perda de apetite" desc="Recusa ou diminuição significativa da alimentação." />
                    <SymptomItem variant="late" icon="⚖️" title="Perda de peso e pelo em mau estado" desc="Emagrecimento progressivo e pelagem opaca ou ressecada." />
                    <SymptomItem variant="late" icon="🤢" title="Vômito (principalmente em cães)" desc="Episódios frequentes de vômito são mais comuns em cães do que em gatos." />
                  </ul>
                </div>
              </div>

              <Alert variant="danger" icon="🚨" title="Emergência">
                Se o pet parar de comer, vomitar com frequência e estiver muito desidratado, procure um veterinário imediatamente.
              </Alert>

              <div>
                <SectionTitle>Exames de diagnóstico</SectionTitle>
                {/* Desktop: grid 2x2 */}
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-3" aria-label="Exames diagnósticos para DRC">
                  <TreatItem icon="🧪" title="BUN e Creatinina" desc="Detectados em exames de sangue de rotina. Sobem quando os rins já perderam ~75% da função." />
                  <TreatItem icon="🔬" title="SDMA (novo biomarcador)" desc="Detecta a doença mais cedo — com cerca de 40% de perda de função, antes dos sinais clínicos." />
                  <TreatItem icon="🦴" title="Imagem (raio-X e ultrassom)" desc="Avaliam tamanho, formato e estrutura interna dos rins. Rins menores indicam fibrose." />
                  <TreatItem icon="☁️" title="Fósforo no sangue" desc="Aumenta quando os rins perdem cerca de 85% da função." />
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── ESTÁDIOS ───────────── */}
          <TabsContent value="estadios">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-[#550084] uppercase tracking-widest">Classificação IRIS</span>
              <PageTitle>Estádios da doença renal crônica</PageTitle>
              <p className="text-sm text-slate-500">Quatro estádios progressivos que orientam o tratamento adequado.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <Alert variant="info" icon="📋" title="Classificação IRIS">
                A International Renal Interest Society (IRIS) classifica a DRC em 4 estádios para guiar o tratamento adequado em cada fase.
              </Alert>

              {/* Desktop: grid 2x2 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4" role="list" aria-label="Estádios da DRC segundo a IRIS">
                {stages.map((s) => (
                  <article key={s.n} role="listitem" aria-label={`${s.label}: ${s.title}`}
                    className={`bg-white rounded-2xl shadow-sm border-t-4 ${s.border} p-5 space-y-3`}>
                    <div className="flex items-center gap-2.5">
                      <Badge variant={s.badgeVariant}>{s.label}</Badge>
                      <span className="font-bold text-slate-800 text-base">{s.title}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden" aria-hidden="true">
                      <div className={`h-full ${s.color} rounded-full`} style={{ width: `${s.pct}%` }} />
                    </div>
                    <p className="text-base text-slate-600 leading-relaxed">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.chips.map((c) => (
                        <span key={c} className="bg-slate-100 text-slate-600 text-xs font-medium rounded-full px-2.5 py-0.5">{c}</span>
                      ))}
                    </div>
                    {s.note && <p className="text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2">{s.note}</p>}
                  </article>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* ───────────── TRATAMENTO ───────────── */}
          <TabsContent value="tratamento">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Manejo clínico</span>
              <PageTitle>Tratamento e cuidados</PageTitle>
              <p className="text-sm text-slate-500">O que pode ser feito em casa e o que é prescrito pelo veterinário.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <Alert variant="success" icon="✅" title="Boas notícias">
                Com manejo adequado, alguns cães e gatos com DRC vivem vários anos com boa qualidade de vida.
              </Alert>

              {/* Desktop: 2 colunas */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>Cuidados essenciais em casa</SectionTitle>
                  <ul className="space-y-3" aria-label="Cuidados essenciais em casa">
                    <TreatItem icon="💧" title="Água sempre disponível" desc="Nunca restrinja o acesso à água. O pet com DRC precisa beber muito para compensar a urina diluída. Restringir causa desidratação grave." />
                    <TreatItem icon="🥣" title="Dieta renal específica" desc="Alimentos terapêuticos com baixo fósforo, proteína moderada e baixo sódio. Transição gradual ao longo de semanas. Estudos mostram que gatos com dieta renal vivem até o dobro do tempo." />
                  </ul>

                  <SectionTitle>Cuidados avançados em casa</SectionTitle>
                  <ul className="space-y-3" aria-label="Cuidados avançados em casa">
                    <TreatItem icon="💉" title="Fluidoterapia subcutânea" desc="O responsável pode ser treinado para aplicar soro (Ringer Lactato) sob a pele do pet em casa quando ele não está se hidratando o suficiente." />
                    <TreatItem icon="🍽️" title="Sonda de alimentação (gatos)" desc="Em gatos com DRC avançada, uma sonda gástrica pode ser colocada para facilitar a administração de alimento, água e medicamentos em casa." />
                  </ul>
                </div>

                <div>
                  <SectionTitle>Tratamentos prescritos pelo veterinário</SectionTitle>
                  <ul className="space-y-3" aria-label="Tratamentos médicos para DRC">
                    <TreatItem icon="🧲" title="Quelantes de fósforo" desc="Medicamentos que se ligam ao fósforo no intestino e impedem sua absorção. Devem ser dados na hora da refeição e com orientação veterinária." />
                    <TreatItem icon="🩺" title="Controle da pressão arterial" desc="Hipertensão é complicação tratável. Medicamentos como amlodipina podem ser usados. A medição requer técnica cuidadosa para evitar resultado falso." />
                    <TreatItem icon="🛡️" title="Inibidores do sistema renina-angiotensina" desc="Benazepril (IECA) ou telmisartana (BRA) para reduzir a perda de proteína na urina e proteger os rins." />
                    <TreatItem icon="💊" title="Controle de vômito e apetite" desc="Antieméticos (maropitant, ondansetron) para vômito. Mirtazapina para estimular o apetite em gatos (também reduz vômito)." />
                    <TreatItem icon="🩸" title="Eritropoetina e calcitriol" desc="Usados em casos avançados para tratar anemia e desequilíbrio de cálcio. Requerem acompanhamento especializado." />
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* ───────────── FAQ ───────────── */}
          <TabsContent value="faq">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Perguntas frequentes</span>
              <PageTitle>Dúvidas comuns dos responsáveis</PageTitle>
              <p className="text-sm text-slate-500">Respostas diretas às perguntas mais comuns sobre DRC em pets.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8">
              <SectionTitle>Perguntas frequentes</SectionTitle>
              {/* Desktop: 2 colunas de accordion */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6">
                <Accordion type="single" collapsible className="space-y-2.5">
                  {faqs.slice(0, 3).map((f) => (
                    <AccordionItem key={f.id} value={f.id}>
                      <AccordionTrigger>{f.q}</AccordionTrigger>
                      <AccordionContent>
                        {f.a.map((p, i) => <p key={i} className={i < f.a.length - 1 ? "mb-2" : ""}>{p}</p>)}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                <Accordion type="single" collapsible className="space-y-2.5 mt-2.5 lg:mt-0">
                  {faqs.slice(3).map((f) => (
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
          <p className="lg:hidden text-center text-xs text-slate-400 px-4 pb-6">
            Baseado nas diretrizes da{" "}
            <a href="https://www.iris-kidney.com/what-pet-owners-should-know" target="_blank" rel="noopener noreferrer"
              className="font-semibold text-[#550084] underline-offset-2 hover:underline"
              aria-label="Visitar site da IRIS Kidney (abre em nova aba)">
              IRIS
            </a>
            . Este app é educativo e não substitui a consulta veterinária.
          </p>
        </main>
      </Tabs>
    </div>
  );
}
