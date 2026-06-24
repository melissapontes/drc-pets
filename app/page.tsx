import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

// ── Componentes reutilizáveis ─────────────────────────────────────────────────

function SymptomItem({
  icon, title, desc, variant = "default",
}: { icon: React.ReactNode; title: string; desc: string; variant?: "early" | "late" | "default" }) {
  const border =
    variant === "early" ? "border-l-amber-400" :
    variant === "late"  ? "border-l-red-400"   :
                          "border-l-slate-200";
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

// ── Dados ─────────────────────────────────────────────────────────────────────

const stages = [
  {
    n: 1, label: "Estágio 1", title: "Doença inicial", pct: 25,
    color: "bg-emerald-500", border: "border-t-emerald-500", badgeVariant: "stage1" as const,
    desc: "Creatinina dentro do valor de referência. Função renal com perda leve detectada por SDMA ou outros marcadores.",
    chips: ["SDMA elevado", "Sem sintomas óbvios"],
  },
  {
    n: 2, label: "Estágio 2", title: "Doença leve", pct: 50,
    color: "bg-yellow-400", border: "border-t-yellow-400", badgeVariant: "stage2" as const,
    desc: "Creatinina levemente elevada. Poliúria e polidipsia podem começar a aparecer.",
    chips: ["Beber mais água", "Urinar mais"],
    note: "Melhor momento para iniciar a dieta renal — o pet ainda tem bom apetite.",
  },
  {
    n: 3, label: "Estágio 3", title: "Doença moderada", pct: 75,
    color: "bg-orange-500", border: "border-t-orange-500", badgeVariant: "stage3" as const,
    desc: "Creatinina e fósforo elevados. Sintomas mais evidentes: letargia, perda de peso.",
    chips: ["Fósforo alto", "Letargia", "Perda de peso"],
  },
  {
    n: 4, label: "Estágio 4", title: "Doença grave", pct: 100,
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
    a: ["O momento ideal é o Estágio 2 ou 3 da IRIS, quando o pet ainda tem bom apetite para aceitar a mudança alimentar.", "A transição deve ser gradual ao longo de semanas: misture progressivamente o alimento renal com o habitual até a substituição completa."],
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
    a: ["Para pets mais velhos, visitas anuais com exames de sangue são recomendadas para detectar DRC precocemente — mesmo quando BUN e creatinina ainda estão dentro do normal.", "Para pets já diagnosticados, a frequência depende do estágio e orientação do veterinário."],
  },
];

// ── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-white">

      {/* MOBILE HEADER — oculto em desktop */}
      <header className="lg:hidden text-white overflow-hidden flex items-center" style={{ backgroundImage: "url('/bgHero2.png')", backgroundSize: "cover", backgroundPosition: "right center", minHeight: "200px" }}>
        <div className="w-3/5 px-4 py-6 text-left">
          <h1 className="text-2xl font-extrabold leading-tight tracking-tight">Doença renal crônica em<br />cães e gatos</h1>
          <p className="text-sm text-[#e8ccff] mt-2">Guia educativo para responsáveis</p>
        </div>
        <div className="w-2/5 flex-shrink-0" />
      </header>

      <Tabs defaultValue="rins" className="lg:flex lg:min-h-screen">

        {/* ── SIDEBAR / TAB BAR ── */}
        <TabsList aria-label="Seções do guia">

          {/* Branding — visível apenas em desktop dentro da sidebar */}
          <div className="hidden lg:flex lg:flex-col lg:px-5 lg:py-6 lg:border-b lg:border-slate-100 lg:mb-2 lg:w-full">
            <div className="flex items-center gap-2.5 mb-1">
              <img src="/rim.png" alt="" aria-hidden="true" className="w-8 h-8 object-contain flex-shrink-0" />
              <span className="font-extrabold text-slate-800 text-sm leading-tight">DRC em Pets</span>
            </div>
            <p className="text-xs text-slate-400 pl-10">Guia para responsáveis</p>
          </div>

          {/* Nav label — desktop only */}
          <p className="hidden lg:block lg:px-5 lg:pb-1 lg:text-xs lg:font-bold lg:text-slate-400 lg:uppercase lg:tracking-widest lg:w-full">
            Seções
          </p>

          <TabsTrigger value="rins"><img src="/rim.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> Os Rins</TabsTrigger>
          <TabsTrigger value="sinais"><img src="/sinais.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> Sinais</TabsTrigger>
          <TabsTrigger value="estadios"><img src="/estadios.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> Estágios</TabsTrigger>
          <TabsTrigger value="tratamento"><img src="/tratamentro.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> Tratamento</TabsTrigger>
          <TabsTrigger value="faq"><img src="/duvidas.png" alt="" aria-hidden="true" className="w-6 h-6 rounded object-cover inline-block" /> Dúvidas</TabsTrigger>

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
            <p className="text-xs font-semibold text-[#550084] mt-2">Feito por @minutonefrovet</p>
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
                  {/* Card 1: O néfron */}
                  <Card className="overflow-hidden">
                    {/* Retângulo 1 — imagem: largura 100%, altura 200px */}
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgnefron.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
                    </div>
                    {/* Retângulo 2 — texto: largura 100%, altura automática */}
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">O néfron</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">Os rins são formados por centenas de milhares de unidades funcionais chamadas <strong className="text-[#550084] font-extrabold text-lg">néfrons</strong>. Cada néfron tem um filtro (o glomérulo) e um canal longo chamado túbulo.</p>
                    </div>
                  </Card>

                  {/* Card 2: Filtram o sangue */}
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgsangue.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <p className="text-base text-slate-600 leading-relaxed text-left">Os rins <strong className="text-[#550084] font-extrabold text-lg">filtram o sangue</strong> o tempo todo. Eles removem o excesso de água e as substâncias que o organismo não precisa, formando a urina, enquanto mantêm no sangue componentes importantes, como células sanguíneas e proteínas grandes.</p>
                    </div>
                  </Card>

                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgvocesabia.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">Você sabia?</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">Mais de 99% do que é filtrado retorna ao sangue. A urina é apenas o subproduto desse processo de conservação.</p>
                    </div>
                  </Card>
                </div>

                {/* Coluna 2: Outras funções */}
                <div className="space-y-4">
                  <SectionTitle>Outras funções dos rins</SectionTitle>
                  <ul className="space-y-3" aria-label="Funções dos rins além da filtração">
                    <SymptomItem icon={<img src="/gota.png" alt="" className="w-12 h-12 object-contain" />} title="Produção de eritropoetina" desc="Hormônio que estimula a medula óssea a produzir glóbulos vermelhos." />
                    <SymptomItem icon={<img src="/comida.png" alt="" className="w-12 h-12 object-contain" />} title="Ativação da vitamina D" desc="Transforma a vitamina D da dieta na sua forma ativa final (calcitriol)." />
                    <SymptomItem icon={<img src="/focinho.png" alt="" className="w-16 h-16 object-contain" />} title="Regulação do equilíbrio interno" desc="Controla o volume e a composição dos fluidos corporais." />
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
              <div className="rounded-xl p-6 bg-amber-50 text-amber-900 text-center">
                <p className="text-6xl font-extrabold">75%</p>
                <p className="text-xl mt-2">dos rins podem já ter perdido sua função antes dos sinais se tornarem evidentes.</p>
              </div>

              {/* Desktop: 2 colunas de sinais */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>Sinais precoces</SectionTitle>
                  <div className="space-y-3">
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgAgua.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">Beber mais água (polidipsia)</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">Seu pet passa a visitar o bebedouro mais vezes e você percebe que precisa encher a vasilha de água com mais frequência do que antes.</p>
                    </div>
                  </Card>
                  <Card className="overflow-hidden">
                    <div className="w-full h-[200px]" style={{ backgroundImage: "url('/bgUrina.png')", backgroundSize: "cover", backgroundPosition: "center" }} />
                    <div className="p-5">
                      <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">Urinar mais (poliúria)</h3>
                      <p className="text-base text-slate-600 leading-relaxed text-left">Cães: podem começar a pedir para sair mais vezes ou voltar a urinar dentro de casa, mesmo quando antes não faziam isso.<br />Gatos: caixinha com mais grumos úmidos, precisando ser limpa com mais frequência.</p>
                    </div>
                  </Card>
                  </div>
                </div>
                <div>
                  <SectionTitle>Sinais em fase avançada</SectionTitle>
                  <ul className="space-y-3" aria-label="Sinais avançados de doença renal crônica">
                    <SymptomItem variant="late" icon={<img src="/apatia.png" alt="" className="w-16 h-16 object-contain" />} title="Letargia" desc="Pet mais quieto, sem energia para atividades rotineiras." />
                    <SymptomItem variant="late" icon={<img src="/pratoCheio.png" alt="" className="w-12 h-12 object-contain" />} title="Perda de apetite" desc="Recusa ou diminuição significativa da alimentação." />
                    <SymptomItem variant="late" icon={<img src="/peso.png" alt="" className="w-16 h-16 object-contain" />} title="Perda de peso" desc="Emagrecimento progressivo mesmo se alimentando." />
                    <SymptomItem variant="late" icon={<img src="/pelo.png" alt="" className="w-16 h-16 object-contain" />} title="Pelo em mau estado" desc="Pelagem opaca, ressecada ou com queda excessiva." />
                    <SymptomItem variant="late" icon={<img src="/vomito.png" alt="" className="w-16 h-16 object-contain" />} title="Vômitos" desc="Episódios frequentes de vômitos." />
                  </ul>
                </div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-sm flex flex-col bg-white">
                <div className="h-44 overflow-hidden" style={{ background: "#FFF1F1" }}>
                  <img src="/bgajuda.png" alt="" aria-hidden="true" className="w-full h-full object-contain scale-[1.6] origin-center" />
                </div>
                <div className="px-5 py-5 text-center bg-white">
                  <p className="font-bold text-xl mb-1" style={{ color: "#880304" }}>Sinais de alerta</p>
                  <p className="text-lg" style={{ color: "#880304" }}>Se o pet parar de comer, apresentar vômitos frequentes ou sinais de desidratação, entre em contato com o médico veterinário o quanto antes.</p>
                </div>
              </div>

            </div>
          </TabsContent>

          {/* ───────────── ESTÁDIOS ───────────── */}
          <TabsContent value="estadios">
            <div className="hidden lg:block bg-white border-b border-slate-100 px-8 py-6">
              <span className="text-xs font-bold text-[#550084] uppercase tracking-widest">Classificação IRIS</span>
              <PageTitle>Estágios da doença renal crônica</PageTitle>
              <p className="text-sm text-slate-500">Quatro estágios progressivos que orientam o tratamento adequado.</p>
            </div>

            <div className="px-4 pt-5 pb-14 lg:px-8 lg:py-8 space-y-6">
              <Card className="overflow-hidden">
                <div className="p-5">
                  <h3 className="text-xl font-extrabold text-[#550084] mb-2 text-left">Conheça as fases da DRC</h3>
                  <p className="text-base text-slate-600 leading-relaxed text-left">A DRC é dividida em 4 estágios. Saber em qual fase o pet está ajuda o veterinário a definir metas individualizadas e permite que o responsável acompanhe sua evolução de forma mais clara e participativa.</p>
                </div>
              </Card>

              <div className="flex mx-auto" style={{ maxWidth: '340px' }}>
                <img src="/bgestadio.jpeg" alt="Estágios da DRC" className="block object-contain flex-shrink-0" style={{ width: '200px' }} />
                <div className="relative flex-1 ml-3">
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '13%', transform: 'translateY(-50%)', color: '#10b981' }}>Doença inicial</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '37%', transform: 'translateY(-50%)', color: '#3b82f6' }}>Doença leve</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '62%', transform: 'translateY(-50%)', color: '#ef4444' }}>Doença moderada</span>
                  <span className="absolute text-xl font-bold leading-tight" style={{ top: '86%', transform: 'translateY(-50%)', color: '#f97316' }}>Doença avançada</span>
                </div>
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
              {/* Card destacado — boas notícias */}
              <div className="rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
                <div className="h-56 bg-[#E8F5E9] overflow-hidden">
                  <img src="/bgcaoegato.png" alt="" aria-hidden="true" className="w-full h-full object-contain scale-[1.6] origin-center" />
                </div>
                <div className="px-5 py-5 text-center">
                  <p className="font-semibold text-slate-700 text-lg leading-snug">
                    Com manejo adequado, alguns cães e gatos com DRC vivem vários anos com boa qualidade de vida.
                  </p>
                </div>
              </div>

              {/* Desktop: 2 colunas */}
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 space-y-6 lg:space-y-0">
                <div>
                  <SectionTitle>Cuidados essenciais em casa</SectionTitle>
                  <ul className="space-y-3" aria-label="Cuidados essenciais em casa">
                    <TreatItem title="Água sempre disponível" desc="Nunca restrinja o acesso à água. O pet com DRC precisa beber água livremente para compensar as perdas pela urina. Restringir pode causar desidratação, agravando o quadro." color="#028ff9" textWhite imgIcon="/gotaBranca.png" />
                    <TreatItem title="Dieta especial" desc="Alimentos terapêuticos com restrições de fósforo e sódio, além de quantidade moderada de proteína de alta qualidade. Transição gradual ao longo de semanas." color="#eb733a" textWhite imgIcon="/comidaBranca.png" imgSize="w-20 h-20" />
                  </ul>

                  {/* Card quadrado destacado — estudo dieta renal */}
                  <div className="mt-3 rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col">
                    <div className="h-44 bg-[#FDEBD3]">
                      <img src="/bggato.png" alt="Gato" className="w-full h-full object-cover" />
                    </div>
                    <p className="px-5 py-5 text-center font-bold text-slate-800 text-xl leading-snug">
                      Alguns estudos mostram que cuidar da dieta pode proporcionar maior longevidade ao animal.
                    </p>
                  </div>

                  <SectionTitle>Cuidados avançados em casa</SectionTitle>
                  <ul className="space-y-3" aria-label="Cuidados avançados em casa">
                    <TreatItem title="Fluidoterapia subcutânea" desc="O responsável pode ser treinado para aplicar soro sob a pele do pet em casa quando ele não está se hidratando o suficiente." color="#03ab94" textWhite />
                    <TreatItem title="Sonda de alimentação (gatos)" desc="Em gatos com DRC avançada, uma sonda gástrica pode ser colocada para facilitar a administração de alimento, água e medicamentos em casa." color="#2e1360" textWhite />
                  </ul>
                </div>

                <div>
                  <SectionTitle>Tratamentos prescritos pelo veterinário</SectionTitle>
                  <ul className="space-y-3" aria-label="Tratamentos médicos para DRC">
                    <TreatItem title="Quelantes de fósforo" desc="Medicamentos que se ligam ao fósforo no intestino e impedem sua absorção. Devem ser dados na hora da refeição e com orientação veterinária." color="#87c522" textWhite />
                    <TreatItem title="Controle da pressão arterial" desc="Hipertensão é complicação tratável. Medicamentos como amlodipina podem ser usados. A medição requer técnica cuidadosa para evitar resultado falso." color="#c02c8c" textWhite />
                    <TreatItem title="Inibidores do sistema renina-angiotensina" desc="Benazepril (IECA) ou telmisartana (BRA) para reduzir a perda de proteína na urina e proteger os rins." color="#74629f" textWhite />
                    <TreatItem title="Controle de vômito e apetite" desc="Antieméticos (maropitant, ondansetron) para vômito. Mirtazapina para estimular o apetite em gatos (também reduz vômito)." color="#0c88a9" textWhite />
                    <TreatItem title="Eritropoetina" desc="Usada em casos avançados para tratar anemia. Requer acompanhamento especializado." color="#97150b" textWhite />
                    <TreatItem title="Calcitriol" desc="Usado em casos avançados para corrigir o desequilíbrio de cálcio. Requer acompanhamento especializado." color="#8c7ca1" textWhite />
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
          <div className="lg:hidden text-center text-xs text-slate-400 px-4 pb-6 space-y-1">
            <p>
              Baseado nas diretrizes da{" "}
              <a href="https://www.iris-kidney.com/what-pet-owners-should-know" target="_blank" rel="noopener noreferrer"
                className="font-semibold text-[#550084] underline-offset-2 hover:underline"
                aria-label="Visitar site da IRIS Kidney (abre em nova aba)">
                IRIS
              </a>
              . Este app é educativo e não substitui a consulta veterinária.
            </p>
            <p className="font-semibold text-[#550084]">Feito por @minutonefrovet</p>
          </div>
        </main>
      </Tabs>
    </div>
  );
}
