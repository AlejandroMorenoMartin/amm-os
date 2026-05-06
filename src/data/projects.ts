export interface Project {
  slug: string;
  name: string;
  date: string;
  synopsis: { es: string; en: string };
  challenge: { es: string; en: string };
  role: string;
  goal: { es: string; en: string };
  status: string;
  // Project page data
  resources: { github?: string; live?: string; disabled?: ('github' | 'live')[] };
  metrics: { value: string; description: { es: string; en: string } }[];
  update: string;
  ownership: string;
  manifesto: { es: string; en: string };
  image: string;
  research: { es: string; en: string };
  decisions: { es: string; en: string };
  system: { es: string; en: string };
  lessons: { es: string; en: string };
}

export const projects: Project[] = [
  {
    slug: 'amm-os',
    name: 'AMM_OS.app',
    date: '02/2026',
    synopsis: {
      es: 'Portfolio que transforma la narrativa de diseño en una experiencia técnica funcional.',
      en: 'Portfolio that transforms the design narrative into a functional technical experience.',
    },
    challenge: {
      es: 'La incapacidad de los portfolios estáticos para validar la viabilidad técnica y el pensamiento sistémico de un diseñador.',
      en: 'The inability of static portfolios to validate the technical viability and systemic thinking of a designer.',
    },
    role: 'AI Product Designer.',
    goal: {
      es: 'Crear un entorno que demuestre autonomía total, cerrando la brecha entre el concepto visual y el código de producción.',
      en: 'Create an environment that demonstrates total autonomy, closing the gap between visual concept and production code.',
    },
    status: 'Beta',
    resources: {
      github: 'https://github.com/AlejandroMorenoMartin/amm-os',
      live: 'https://alejandromorenomartin.com',
      disabled: ['github'],
    },
    metrics: [
      {
        value: '100/100',
        description: {
          es: 'Lighthouse en producción. Assets servidos desde Vercel Edge, cero dependencias innecesarias en el critical path.',
          en: 'Lighthouse in production. Assets served from Vercel Edge, zero unnecessary dependencies in the critical path.',
        },
      },
      {
        value: '+4min',
        description: {
          es: 'Sesión media según Vercel Analytics. El visitante explora en profundidad, no rebota.',
          en: 'Average session via Vercel Analytics. The visitor explores in depth, not bouncing.',
        },
      },
    ],
    update: '04/26/2026',
    ownership: 'Arquitectura de información, Diseño de producto, Estrategia de producto, Diseño de interacción, Desarrollo React/Vite.',
    manifesto: {
      es: 'El diseño de producto es la suma de la estrategia visual y la viabilidad técnica.',
      en: 'Product design is the sum of visual strategy and technical viability.',
    },
    image: '/placeholder-image.webp',
    research: {
      es: 'Identifiqué que los perfiles técnicos y de producto ignoran los portfolios que no demuestran una comprensión profunda de las limitaciones y posibilidades del código real. La terminal actúa como un filtro de afinidad.',
      en: 'I identified that technical and product profiles ignore portfolios that don\'t demonstrate a deep understanding of real code constraints and possibilities. The terminal acts as an affinity filter.',
    },
    decisions: {
      es: 'Opté por una arquitectura de información de 3 capas progresivas para evitar el agobio visual. Cada decisión técnica (como el uso de Turborepo) se tomó pensando en la escalabilidad futura de mis propios productos.',
      en: 'I opted for a 3-layer progressive information architecture to avoid visual overload. Every technical decision (such as using Turborepo) was made with the future scalability of my own products in mind.',
    },
    system: {
      es: 'Construcción de un lenguaje visual basado en la rejilla de la consola clásica, utilizando componentes atómicos en React y tipografías monoespaciadas para garantizar una estética coherente y un rendimiento extremo.',
      en: 'Built a visual language based on the classic console grid, using atomic React components and monospaced typography to guarantee a coherent aesthetic and extreme performance.',
    },
    lessons: {
      es: 'La primera versión era demasiado críptica. Aprendí que incluso en un entorno técnico, la usabilidad es innegociable. La v1.2 equilibra la nostalgia de la terminal con las convenciones modernas de UX.',
      en: 'The first version was too cryptic. I learned that even in a technical environment, usability is non-negotiable. v1.2 balances terminal nostalgia with modern UX conventions.',
    },
  },
  {
    slug: 'senzo',
    name: 'SENZO.studio',
    date: '01/2026',
    synopsis: {
      es: 'Plataforma digital inmersiva para un estudio de efectos visuales de alta gama.',
      en: 'Immersive digital platform for a high-end visual effects studio.',
    },
    challenge: {
      es: 'Transmitir la calidad cinematográfica y el detalle técnico del estudio sin comprometer el rendimiento y la velocidad de carga de la web.',
      en: 'Conveying the cinematic quality and technical detail of the studio without compromising web performance and load speed.',
    },
    role: 'AI Product Designer.',
    goal: {
      es: 'Crear una interfaz minimalista y de alto rendimiento que actúe como un lienzo para el portfolio de VFX, optimizando la narrativa visual.',
      en: 'Create a minimalist, high-performance interface that acts as a canvas for the VFX portfolio, optimizing the visual narrative.',
    },
    status: 'In Progress',
    resources: {
      github: 'https://github.com/AlejandroMorenoMartin/senzo-web',
      live: 'https://www.senzostudio.com',
      disabled: ['github'],
    },
    metrics: [
      {
        value: '95+',
        description: {
          es: 'Performance Score en Lighthouse. Sitio con carga de vídeo intensiva que mantiene el score gracias a lazy-loading y optimización de codecs.',
          en: 'Performance Score on Lighthouse. A video-heavy site that holds the score through lazy-loading and codec optimisation.',
        },
      },
      {
        value: '-40%',
        description: {
          es: 'Reducción en tiempo de carga de vídeo respecto al baseline inicial, medido en waterfall de DevTools tras optimizar el pipeline.',
          en: 'Reduction in video load time from the initial baseline, measured via DevTools waterfall after optimising the pipeline.',
        },
      },
    ],
    update: '04/26/2026',
    ownership: 'UX/UI Design, Creative Development, Video Pipeline Optimization, SEO Strategy.',
    manifesto: {
      es: 'La interfaz debe ser invisible: si el usuario nota el diseño antes que el trabajo de VFX, hemos fallado.',
      en: 'The interface must be invisible: if the user notices the design before the VFX work, we have failed.',
    },
    image: '/placeholder-image.webp',
    research: {
      es: 'El análisis de la competencia reveló un patrón de webs pesadas con tiempos de carga excesivos. Los usuarios (directores y productores) necesitan ver calidad de inmediato sin fricciones técnicas.',
      en: 'Competitive analysis revealed a pattern of heavy websites with excessive load times. Users (directors and producers) need to see quality immediately without technical friction.',
    },
    decisions: {
      es: 'Implementé un sistema de navegación por gestos y transiciones fluidas para mantener la inmersión. Elegí una arquitectura de "video-first" con carga perezosa (lazy-loading) inteligente para asegurar fluidez.',
      en: 'I implemented a gesture-based navigation system and fluid transitions to maintain immersion. I chose a "video-first" architecture with intelligent lazy-loading to ensure smoothness.',
    },
    system: {
      es: 'Paleta cromática en negros profundos y grises neutros para resaltar el color de los renders. Tipografía técnica suiza para transmitir precisión y profesionalismo.',
      en: 'Chromatic palette in deep blacks and neutral greys to highlight the colour of renders. Swiss technical typography to convey precision and professionalism.',
    },
    lessons: {
      es: 'Optimizar codecs de vídeo para web conservando la fidelidad del máster cinematográfico fue el mayor reto. Aprendí que el rendimiento es la mejor herramienta de UX en sitios con alta carga visual.',
      en: 'Optimising video codecs for web while preserving cinematic master fidelity was the biggest challenge. I learned that performance is the best UX tool on visually heavy sites.',
    },
  },
  {
    slug: 'casa-del-aire',
    name: 'CASA_DEL_AIRE.app',
    date: '01/2026',
    synopsis: {
      es: 'Experiencia digital informativa y nexo de reservas para alojamiento rural boutique.',
      en: 'Informative digital experience and booking hub for boutique rural accommodation.',
    },
    challenge: {
      es: 'Generar confianza y deseo de reserva mediante la exposición detallada de la propiedad, gestionando la salida del usuario hacia una API externa sin romper la experiencia de marca.',
      en: 'Generate trust and booking desire through detailed property exposure, managing the user\'s exit to an external API without breaking the brand experience.',
    },
    role: 'AI Product Designer.',
    goal: {
      es: 'Diseñar una interfaz que combine la calidez de un entorno rural con una arquitectura técnica capaz de sincronizar datos de disponibilidad en tiempo real.',
      en: 'Design an interface that combines the warmth of a rural setting with a technical architecture capable of synchronizing availability data in real time.',
    },
    status: 'In Progress',
    resources: {
      github: 'https://github.com/AlejandroMorenoMartin/casa-aire-web',
      live: 'https://www.casadelaire.es',
      disabled: ['github'],
    },
    metrics: [
      {
        value: '+18%',
        description: {
          es: 'CTR al botón de reserva respecto a la web anterior, medido con heatmaps y analytics de conversión.',
          en: 'Booking button CTR compared to the previous site, measured via heatmaps and conversion analytics.',
        },
      },
      {
        value: '98',
        description: {
          es: 'Lighthouse en producción. Logrado con imágenes WebP, fuentes locales y cero JS bloqueante en el critical path.',
          en: 'Lighthouse in production. Achieved with WebP images, local fonts, and zero render-blocking JS in the critical path.',
        },
      },
    ],
    update: '01/26/2025',
    ownership: 'UX Strategy, API Integration, Frontend Development, Copywriting.',
    manifesto: {
      es: 'La tecnología debe ser el puente, no la barrera, entre el usuario y la tranquilidad del entorno rural.',
      en: 'Technology must be the bridge, not the barrier, between the user and the tranquillity of the rural environment.',
    },
    image: '/placeholder-image.webp',
    research: {
      es: 'El análisis de usuarios demostró que la mayor fricción ocurre cuando el usuario es redirigido para pagar. Identifiqué que necesitábamos "precargar" la confianza del usuario mediante una transparencia total en la información de la casa.',
      en: 'User analysis showed that the greatest friction occurs when the user is redirected to pay. I identified that we needed to "pre-load" user trust through full transparency in the property information.',
    },
    decisions: {
      es: 'Implementé una capa de consumo de API que permite mostrar disponibilidad y precios dentro de mi entorno antes de la redirección final. Esto reduce la ansiedad de salida y mantiene la coherencia visual.',
      en: 'I implemented an API consumption layer that allows displaying availability and prices within my environment before the final redirect. This reduces exit anxiety and maintains visual coherence.',
    },
    system: {
      es: 'Lenguaje visual orgánico con una paleta de colores tierra y una tipografía serif clásica. Estructura modular en bloques para permitir que la información sea digerible tanto en móvil como en escritorio.',
      en: 'Organic visual language with an earthy colour palette and classic serif typography. Modular block structure to allow information to be digestible on both mobile and desktop.',
    },
    lessons: {
      es: 'Trabajar con APIs de terceros me enseñó la importancia de gestionar los estados de error y de carga. Un sistema que "falla elegantemente" es mucho más rentable que uno que simplemente se rompe.',
      en: 'Working with third-party APIs taught me the importance of managing error and loading states. A system that "fails elegantly" is far more valuable than one that simply breaks.',
    },
  },
  {
    slug: 'sazon',
    name: 'SAZON.app',
    date: '05/2026',
    synopsis: {
      es: 'Plataforma social para la gestión inteligente de recetas y el intercambio de cultura culinaria.',
      en: 'Social platform for intelligent recipe management and culinary culture exchange.',
    },
    challenge: {
      es: 'La fragmentación de la información culinaria y la falta de herramientas que fomenten una colaboración real y organizada entre cocineros.',
      en: 'The fragmentation of culinary information and the lack of tools that foster real, organized collaboration among cooks.',
    },
    role: 'AI Product Designer & Founder',
    goal: {
      es: 'Centralizar el conocimiento gastronómico en una interfaz social que priorice la utilidad técnica sobre el ruido algorítmico.',
      en: 'Centralize gastronomic knowledge in a social interface that prioritizes technical utility over algorithmic noise.',
    },
    status: 'In Progress',
    resources: {
      github: 'https://github.com/AlejandroMorenoMartin/sazon-app',
      live: 'https://sazon.app',
      disabled: ['github', 'live'],
    },
    metrics: [
      {
        value: '65%',
        description: {
          es: 'Retención semanal, el doble del estándar del sector. Medido en dashboard interno.',
          en: 'Weekly retention, double the industry benchmark. Measured in the internal dashboard.',
        },
      },
      {
        value: '12min',
        description: {
          es: 'Sesión media. El Modo Cocina engancha al usuario en el flujo real de preparación, no en el browse.',
          en: 'Average session. Cooking Mode keeps users engaged in the actual preparation flow, not just browsing.',
        },
      },
    ],
    update: '05/01/2026',
    ownership: 'Product Strategy, UX Architecture, Full-stack Development, Community Design.',
    manifesto: {
      es: 'Cocinar es un acto social; la tecnología debe ser el ingrediente que facilite la conexión, no una distracción.',
      en: 'Cooking is a social act; technology must be the ingredient that facilitates connection, not a distraction.',
    },
    image: '/placeholder-image.webp',
    research: {
      es: 'Identifiqué que los usuarios encuentran las apps de recetas demasiado estáticas y las redes sociales demasiado caóticas para cocinar. Existe un vacío entre "guardar una idea" y "ejecutar un plato".',
      en: 'I identified that users find recipe apps too static and social networks too chaotic for cooking. There is a gap between "saving an idea" and "executing a dish".',
    },
    decisions: {
      es: 'Implementé un "Modo Cocina" que separa la interfaz de lectura de la de interacción social. Prioricé una arquitectura de datos flexible que permite versionar recetas, aceptando que la cocina siempre está en constante cambio.',
      en: 'I implemented a "Cooking Mode" that separates the reading interface from the social interaction one. I prioritised a flexible data architecture that allows recipe versioning, accepting that cooking is always in constant flux.',
    },
    system: {
      es: 'Creación de un sistema de diseño modular que permite visualizar ingredientes y pasos de forma jerárquica. Iconografía personalizada para acciones culinarias y un sistema de "tokens" de color para diferenciar tipos de dieta.',
      en: 'Created a modular design system that allows hierarchical visualisation of ingredients and steps. Custom iconography for culinary actions and a colour "token" system to differentiate diet types.',
    },
    lessons: {
      es: 'Gestionar una comunidad requiere más que buenas funciones; requiere reglas de diseño que incentiven el contenido de calidad. Aprendí que la simplicidad en la carga de datos es el factor #1 para evitar el abandono del usuario.',
      en: 'Managing a community requires more than good features; it requires design rules that incentivise quality content. I learned that simplicity in data entry is the #1 factor in preventing user abandonment.',
    },
  },
  {
    slug: 'forma',
    name: 'FORMA.app',
    date: '05/2026',
    synopsis: {
      es: 'Plataforma de análisis biométrico para la optimización del rendimiento deportivo y la salud física.',
      en: 'Biometric analysis platform for optimizing athletic performance and physical health.',
    },
    challenge: {
      es: 'La saturación de datos complejos sin contexto que genera fatiga informativa y falta de acción clara en el usuario.',
      en: 'The saturation of complex, context-free data that generates information fatigue and lack of clear action for the user.',
    },
    role: 'AI Product Designer & Founder',
    goal: {
      es: 'Traducir métricas biométricas avanzadas en recomendaciones accionables para mejorar la recuperación y el desempeño de atletas de todos los niveles.',
      en: 'Translate advanced biometric metrics into actionable recommendations to improve recovery and performance for athletes of all levels.',
    },
    status: 'In Progress',
    resources: {
      github: 'https://github.com/AlejandroMorenoMartin/forma-app',
      live: 'https://forma.app',
      disabled: ['github', 'live'],
    },
    metrics: [
      {
        value: '85%',
        description: {
          es: 'Daily login rate medido en backend. Indicador de adherencia real, no de uso ocasional.',
          en: 'Daily login rate measured in the backend. An indicator of real adherence, not occasional use.',
        },
      },
      {
        value: '-20%',
        description: {
          es: 'Reducción de carga cognitiva en tests de usabilidad con SUS score, tras implementar Smart-Insights.',
          en: 'Reduction in cognitive load in SUS score usability tests, after implementing Smart-Insights.',
        },
      },
    ],
    update: '05/01/2026',
    ownership: 'Data Visualization, Mobile UX, Biometric Analysis, Interaction Design.',
    manifesto: {
      es: 'El dato por sí solo es ruido; la interpretación del dato es la verdadera ventaja competitiva.',
      en: 'Data alone is noise; interpreting data is the true competitive advantage.',
    },
    image: '/placeholder-image.webp',
    research: {
      es: 'El análisis de usuarios reveló que los amateurs se sienten abrumados por los gráficos técnicos, mientras que los profesionales demandan profundidad. Identifiqué la necesidad de una jerarquía de datos bajo demanda para satisfacer ambos perfiles.',
      en: 'User analysis revealed that amateurs feel overwhelmed by technical charts, while professionals demand depth. I identified the need for an on-demand data hierarchy to satisfy both profiles.',
    },
    decisions: {
      es: 'Implementé un sistema de "Smart-Insights" que prioriza la información crítica (sueño, carga de entrenamiento) mediante un código de colores semántico, eliminando la necesidad de que el usuario interprete números aislados.',
      en: 'I implemented a "Smart-Insights" system that prioritises critical information (sleep, training load) through a semantic colour code, eliminating the need for the user to interpret isolated numbers.',
    },
    system: {
      es: 'Interfaz de alto contraste optimizada para su uso en exteriores, con una arquitectura de componentes reactivos que se adaptan a la intensidad del entrenamiento del usuario en tiempo real.',
      en: 'High-contrast interface optimised for outdoor use, with a reactive component architecture that adapts to the user\'s training intensity in real time.',
    },
    lessons: {
      es: 'Diseñar para la salud requiere una precisión extrema en el tono de voz. Aprendí que la visualización de datos debe ser motivadora y no solo informativa para asegurar la adherencia a largo plazo.',
      en: 'Designing for health requires extreme precision in tone of voice. I learned that data visualisation must be motivating and not just informative to ensure long-term adherence.',
    },
  },
];
