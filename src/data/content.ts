export type Lang = 'en' | 'de'

export interface Project {
  name: string
  role: string
  summary: string
  highlights: string[]
  stack: string[]
  repos: { label: string; url: string }[]
  status?: string
}

export interface Job {
  title: string
  company: string
  location: string
  period: string
  bullets: string[]
}

export interface Content {
  nav: { about: string; projects: string; experience: string; skills: string; contact: string }
  hero: {
    name: string
    title: string
    lead: string
    cta: string
    ctaSecondary: string
  }
  facts: { label: string; value: string }[]
  about: { heading: string; paragraphs: string[] }
  projects: { heading: string; intro: string; items: Project[]; viewCode: string; archived: string }
  experience: { heading: string; items: Job[] }
  education: { heading: string; degree: string; school: string; period: string }
  skills: { heading: string; groups: { label: string; items: string }[] }
  certifications: { heading: string; items: string[] }
  languages: { heading: string; items: { name: string; level: string }[] }
  contact: {
    heading: string
    lead: string
    email: string
    linkedin: string
    github: string
    cv: string
  }
  footer: string
}

const shared = {
  email: 'thetarekakel@gmail.com',
  linkedin: 'https://www.linkedin.com/in/tarek-akel-3b988a15b',
  github: 'https://github.com/tarekakel',
  gh: (repo: string) => `https://github.com/tarekakel/${repo}`,
}

export const en: Content = {
  nav: { about: 'About', projects: 'Projects', experience: 'Experience', skills: 'Skills', contact: 'Contact' },
  hero: {
    name: 'Tarek Akel',
    title: 'Senior Full Stack Software Engineer',
    lead:
      'I build and lead enterprise systems for insurance, logistics and government — .NET, Java Spring Boot, Python and Angular on the front, Kubernetes and cloud underneath. Ten years in, now relocating to Germany.',
    cta: 'See projects',
    ctaSecondary: 'Get in touch',
  },
  facts: [
    { label: 'Based in', value: 'Abu Dhabi, UAE' },
    { label: 'Relocating to', value: 'Germany (any region)' },
    { label: 'Availability', value: '1-month notice period' },
    { label: 'Work permit', value: 'EU Blue Card eligible' },
    { label: 'Experience', value: '10+ years, 3 as tech lead' },
    { label: 'Languages', value: 'English C1 · German A1 · Arabic native' },
  ],
  about: {
    heading: 'About',
    paragraphs: [
      'I have spent the last decade shipping software that regulated organisations depend on: underwriting and claims systems for an insurer, freight and warehouse platforms for a national port operator, and digital services for government. The common thread is systems where correctness, auditability and uptime matter more than novelty.',
      'My core stack is C#/.NET and Angular, with production experience in Java Spring Boot and Python (Django, FastAPI-style REST). I design microservice architectures, own CI/CD and Kubernetes deployments, and have led a five-person team through the move from manual releases to automated testing and pipelines.',
      'Since 2024 I have been applying LLMs in production — retrieval-augmented generation, document pipelines and computer-vision annotation — for government digital services. I am looking for a senior engineering or tech-lead role in Germany and am actively learning German.',
    ],
  },
  projects: {
    heading: 'Selected projects',
    intro: 'Independent work outside my day job. Each one is a complete, running system, not a tutorial.',
    viewCode: 'Source',
    archived: 'Earlier work',
    items: [
      {
        name: 'AML sanctions screening platform',
        role: 'Solo — design, backend, frontend',
        summary:
          'Compliance tool that screens customers against sanctions and PEP lists with fuzzy name matching, then records every search and analyst decision for audit.',
        highlights: [
          'Trigram similarity search in PostgreSQL (pg_trgm) with weighted scoring across first name, last name and nationality; configurable auto-reject threshold',
          'Full audit trail: each screening persists the query, every candidate match and its component scores, and the analyst’s accept/reject decision',
          'Bulk import of watch-list persons, templated Excel export of matches, role-based access with JWT',
          'Angular 18 front end with Tailwind, modular Django apps for customers, documents, sanctions and a risk matrix',
        ],
        stack: ['Python', 'Django REST Framework', 'PostgreSQL', 'Angular 18', 'Tailwind CSS', 'JWT'],
        repos: [
          { label: 'Backend', url: shared.gh('AML_BACKEND') },
          { label: 'Frontend', url: shared.gh('AML_FRONTEND') },
        ],
      },
      {
        name: 'E-commerce platform',
        role: 'Solo — architecture, API, storefront',
        summary:
          'A storefront and order system built as a reference for how I structure .NET services: clean architecture, explicit validation, structured logging and a separate identity service.',
        highlights: [
          '.NET 10 solution split into Domain, Application, Infrastructure and Shared projects; EF Core with PostgreSQL',
          'Product catalogue, categories, carts, multi-currency orders and order-status history as first-class domain entities',
          'FluentValidation on every command, Serilog to Seq for structured logs, Scrutor for convention-based DI, OpenAPI docs generated from XML comments',
          'Angular 21 storefront with server-side rendering for SEO and first-paint performance',
        ],
        stack: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'Angular 21 SSR', 'Serilog', 'FluentValidation'],
        repos: [{ label: 'Storefront', url: shared.gh('ecommerce-frontend') }],
        status: 'In progress',
      },
      {
        name: 'Identity management service',
        role: 'Solo',
        summary:
          'Standalone authentication and user-management service that issues and validates JWTs for the platforms above, plus an earlier single-sign-on implementation.',
        highlights: [
          'JWT bearer authentication, refresh flow and role claims; same layered structure as the e-commerce API so services stay consistent',
          'Designed to be deployed once and reused by multiple front ends and APIs',
        ],
        stack: ['C#', '.NET 10', 'JWT', 'FluentValidation', 'Serilog'],
        repos: [
          { label: 'Identity service', url: shared.gh('Identity_Mgmt') },
          { label: 'SSO', url: shared.gh('SSO') },
        ],
      },
      {
        name: 'RAG and LLM agent lab',
        role: 'Solo',
        summary:
          'Working examples of the retrieval-augmented generation patterns I use at work: vector-store retrieval, tool-using agents, few-shot prompting and document question answering, including fully local models.',
        highlights: [
          'RetrievalQA over a Deep Lake vector store wrapped as a tool for a ReAct agent',
          'PDF question answering, article summarisation, translation chains and semantic few-shot example selection with LangChain',
          'Local inference with GPT4All and llama.cpp for cases where data cannot leave the machine',
        ],
        stack: ['Python', 'LangChain', 'OpenAI', 'Deep Lake', 'llama.cpp', 'GPT4All'],
        repos: [{ label: 'Source', url: shared.gh('rag_project') }],
      },
      {
        name: '.NET API starter template',
        role: 'Solo',
        summary:
          'The opinionated starting point I clone for new C# services: layering, validation, logging and OpenAPI wired up so a team can start on domain logic on day one.',
        highlights: [],
        stack: ['C#', 'ASP.NET Core'],
        repos: [{ label: 'Source', url: shared.gh('API_TEMPLATE') }],
      },
    ],
  },
  experience: {
    heading: 'Experience',
    items: [
      {
        title: 'Senior Software Developer',
        company: 'Tatweer MEA',
        location: 'Abu Dhabi, UAE',
        period: 'Mar 2025 – present',
        bullets: [
          'Lead system design and delivery of government digital solutions in Python, .NET Core and Angular; own the architecture and technical roadmap.',
          'Apply GenAI in production — LLMs, RAG and CVAT-based annotation — to support government digital services.',
          'Built and deployed a Spring Boot microservices patient-management system on AWS with Docker, API Gateway and gRPC/REST integration.',
          'Built real-time GIS dashboards (Leaflet, Mapbox, Esri ArcGIS) with SignalR live updates and high-volume marker clustering.',
          'Implemented CI/CD pipelines and Kubernetes deployments, cutting deployment time and failure rate.',
        ],
      },
      {
        title: 'Senior Full Stack Developer',
        company: 'Alsager National Insurance Company (ASNIC)',
        location: 'Dubai, UAE',
        period: 'Dec 2023 – Mar 2025',
        bullets: [
          'Developed large-scale insurance systems — underwriting, policy issuance, claims — with Angular 15, .NET Core and Oracle in a microservices architecture.',
          'Integrated UAE Pass, RTA and EVG government APIs for digital authentication and e-government services.',
          'Led a five-person development team; introduced automated testing and CI/CD, improving release frequency and code quality.',
          'Built a customer portal and internal tools that automated claims and policy management, reducing manual processing.',
        ],
      },
      {
        title: 'Senior Full Stack Developer',
        company: 'Abu Dhabi Ports',
        location: 'Abu Dhabi, UAE',
        period: 'Jul 2022 – Nov 2023',
        bullets: [
          'Designed logistics web applications (freight and warehouse services) with Angular and .NET Core.',
          'Improved backend performance and API response times by 40% through query tuning, caching and asynchronous processing.',
          'Integrated RabbitMQ for asynchronous processing; implemented security and compliance improvements aligned with ISO standards.',
        ],
      },
      {
        title: 'Full Stack Developer',
        company: 'Technologica',
        location: 'Dubai, UAE',
        period: 'Oct 2021 – Jul 2022',
        bullets: [
          'Delivered web applications with .NET Core 6 and Angular 13; built background services and integrated MongoDB and Node.js APIs.',
          'Contributed to Android app development and AI proof-of-concept features.',
        ],
      },
      {
        title: 'Software Engineer (remote)',
        company: 'SAMD Software Solution',
        location: 'Damascus, Syria',
        period: 'Feb 2021 – Sep 2021',
        bullets: ['Built Python-based 2D/3D modelling tools with PyQt5 and Panda3D in a cross-functional remote team.'],
      },
      {
        title: 'Information Analyst',
        company: 'Syriatel Telecom',
        location: 'Damascus, Syria',
        period: 'Jan 2019 – Feb 2021',
        bullets: [
          'Developed sales and BI systems with ASP.NET, Oracle, Power BI and OBIEE; built ETL pipelines and KPI dashboards for executive reporting.',
        ],
      },
    ],
  },
  education: {
    heading: 'Education',
    degree: 'B.Sc. Control and Automation Engineering',
    school: 'Damascus University',
    period: '2012 – 2017',
  },
  skills: {
    heading: 'Skills',
    groups: [
      { label: 'Languages', items: 'C#, Java, Python, TypeScript, JavaScript, SQL' },
      { label: 'Backend', items: 'ASP.NET Core, .NET 6–10, Spring Boot, Django, Flask, Node.js, SignalR, gRPC, REST, SOAP' },
      { label: 'Frontend', items: 'Angular 13–21, React, HTML5, CSS3, Tailwind, Bootstrap, Flutter' },
      { label: 'Architecture', items: 'Microservices, clean architecture, DDD, event-driven systems, API Gateway, RabbitMQ, MQTT' },
      { label: 'Cloud & DevOps', items: 'AWS, Azure, Docker, Kubernetes, GitHub Actions, Azure DevOps, CI/CD, Firebase' },
      { label: 'Data', items: 'SQL Server, Oracle, PostgreSQL, MongoDB, vector databases, EF Core, Power BI, OBIEE' },
      { label: 'AI / GenAI', items: 'LLMs, RAG, LangChain, LlamaIndex, CVAT, YOLO, OpenCV' },
      { label: 'GIS', items: 'Mapbox, Leaflet, Esri ArcGIS' },
    ],
  },
  certifications: {
    heading: 'Certifications',
    items: [
      'Certified Kubernetes Administrator course — Udemy, 2024',
      'ITIL 4 Foundation',
      'Prompt Engineering for AI Systems — Dubai Future Foundation, 2025',
      'Talking to AI: Prompt Engineering for Project Managers — PMI, 2025',
      'AWS Fundamentals, Docker Hands-on, Agile Transformation & Scaled Agile — Udemy',
    ],
  },
  languages: {
    heading: 'Languages',
    items: [
      { name: 'Arabic', level: 'Native' },
      { name: 'English', level: 'Full professional proficiency (C1)' },
      { name: 'German', level: 'A1, in active study' },
    ],
  },
  contact: {
    heading: 'Contact',
    lead: 'Open to senior engineer and tech-lead roles in Germany, on-site or hybrid. I can start within one month of an offer.',
    email: shared.email,
    linkedin: shared.linkedin,
    github: shared.github,
    cv: 'Download CV (PDF)',
  },
  footer: 'Tarek Akel · Built with React, Vite and Tailwind · Hosted on GitHub Pages',
}

export const de: Content = {
  nav: { about: 'Profil', projects: 'Projekte', experience: 'Berufserfahrung', skills: 'Kenntnisse', contact: 'Kontakt' },
  hero: {
    name: 'Tarek Akel',
    title: 'Senior Full Stack Software Engineer',
    lead:
      'Ich entwickle und verantworte Unternehmenssysteme für Versicherungen, Logistik und Behörden – .NET, Java Spring Boot, Python und Angular, darunter Kubernetes und Cloud. Zehn Jahre Erfahrung, jetzt Umzug nach Deutschland.',
    cta: 'Projekte ansehen',
    ctaSecondary: 'Kontakt aufnehmen',
  },
  facts: [
    { label: 'Wohnort', value: 'Abu Dhabi, VAE' },
    { label: 'Umzug nach', value: 'Deutschland (bundesweit)' },
    { label: 'Verfügbarkeit', value: '1 Monat Kündigungsfrist' },
    { label: 'Arbeitserlaubnis', value: 'Blaue Karte EU möglich' },
    { label: 'Erfahrung', value: '10+ Jahre, davon 3 als Tech Lead' },
    { label: 'Sprachen', value: 'Englisch C1 · Deutsch A1 · Arabisch Muttersprache' },
  ],
  about: {
    heading: 'Profil',
    paragraphs: [
      'In den letzten zehn Jahren habe ich Software geliefert, auf die regulierte Organisationen angewiesen sind: Underwriting- und Schadensysteme für einen Versicherer, Fracht- und Lagerplattformen für einen nationalen Hafenbetreiber und digitale Dienste für Behörden. Gemeinsam ist ihnen, dass Korrektheit, Nachvollziehbarkeit und Verfügbarkeit wichtiger sind als Neuheit.',
      'Mein Kernstack ist C#/.NET mit Angular, ergänzt durch Produktionserfahrung in Java Spring Boot und Python (Django, REST). Ich entwerfe Microservice-Architekturen, verantworte CI/CD und Kubernetes-Deployments und habe ein fünfköpfiges Team von manuellen Releases zu automatisierten Tests und Pipelines geführt.',
      'Seit 2024 setze ich LLMs produktiv ein – Retrieval-Augmented Generation, Dokumenten-Pipelines und Computer-Vision-Annotation – für digitale Behördendienste. Ich suche eine Senior- oder Tech-Lead-Position in Deutschland und lerne aktiv Deutsch.',
    ],
  },
  projects: {
    heading: 'Ausgewählte Projekte',
    intro: 'Eigenständige Arbeiten neben dem Beruf. Jedes Projekt ist ein vollständiges, lauffähiges System – kein Tutorial.',
    viewCode: 'Quellcode',
    archived: 'Frühere Arbeiten',
    items: [
      {
        name: 'AML-Sanktionsprüfung',
        role: 'Allein – Design, Backend, Frontend',
        summary:
          'Compliance-Werkzeug, das Kunden per unscharfer Namenssuche gegen Sanktions- und PEP-Listen prüft und jede Suche sowie jede Analystenentscheidung revisionssicher protokolliert.',
        highlights: [
          'Trigramm-Ähnlichkeitssuche in PostgreSQL (pg_trgm) mit gewichteter Bewertung von Vorname, Nachname und Nationalität; konfigurierbare Schwelle für automatische Ablehnung',
          'Vollständiger Audit-Trail: jede Prüfung speichert die Anfrage, alle Kandidaten mit Teilwerten und die Annahme-/Ablehnungsentscheidung des Analysten',
          'Massenimport von Listenpersonen, Excel-Export von Treffern per Vorlage, rollenbasierter Zugriff mit JWT',
          'Angular-18-Frontend mit Tailwind, modulare Django-Apps für Kunden, Dokumente, Sanktionen und Risikomatrix',
        ],
        stack: ['Python', 'Django REST Framework', 'PostgreSQL', 'Angular 18', 'Tailwind CSS', 'JWT'],
        repos: [
          { label: 'Backend', url: shared.gh('AML_BACKEND') },
          { label: 'Frontend', url: shared.gh('AML_FRONTEND') },
        ],
      },
      {
        name: 'E-Commerce-Plattform',
        role: 'Allein – Architektur, API, Storefront',
        summary:
          'Shop- und Bestellsystem als Referenz dafür, wie ich .NET-Services strukturiere: Clean Architecture, explizite Validierung, strukturiertes Logging und ein separater Identity-Service.',
        highlights: [
          '.NET-10-Lösung aufgeteilt in Domain, Application, Infrastructure und Shared; EF Core mit PostgreSQL',
          'Produktkatalog, Kategorien, Warenkörbe, Bestellungen in mehreren Währungen und Statusverlauf als eigenständige Domänenentitäten',
          'FluentValidation für jeden Command, Serilog nach Seq für strukturierte Logs, Scrutor für konventionsbasierte DI, OpenAPI-Doku aus XML-Kommentaren',
          'Angular-21-Storefront mit Server-Side Rendering für SEO und schnelle erste Darstellung',
        ],
        stack: ['C#', '.NET 10', 'EF Core', 'PostgreSQL', 'Angular 21 SSR', 'Serilog', 'FluentValidation'],
        repos: [{ label: 'Storefront', url: shared.gh('ecommerce-frontend') }],
        status: 'In Arbeit',
      },
      {
        name: 'Identity-Management-Service',
        role: 'Allein',
        summary:
          'Eigenständiger Authentifizierungs- und Benutzerverwaltungsdienst, der JWTs für die obigen Plattformen ausstellt und prüft, plus eine frühere Single-Sign-On-Implementierung.',
        highlights: [
          'JWT-Bearer-Authentifizierung, Refresh-Flow und Rollen-Claims; gleiche Schichtstruktur wie die E-Commerce-API, damit Services konsistent bleiben',
          'Einmal deployen, von mehreren Frontends und APIs wiederverwenden',
        ],
        stack: ['C#', '.NET 10', 'JWT', 'FluentValidation', 'Serilog'],
        repos: [
          { label: 'Identity-Service', url: shared.gh('Identity_Mgmt') },
          { label: 'SSO', url: shared.gh('SSO') },
        ],
      },
      {
        name: 'RAG- und LLM-Agenten-Labor',
        role: 'Allein',
        summary:
          'Lauffähige Beispiele der Retrieval-Augmented-Generation-Muster, die ich beruflich einsetze: Vektor-Retrieval, werkzeugnutzende Agenten, Few-Shot-Prompting und Dokumenten-Q&A, auch mit rein lokalen Modellen.',
        highlights: [
          'RetrievalQA über einen Deep-Lake-Vektorspeicher, als Tool für einen ReAct-Agenten gekapselt',
          'PDF-Fragen, Artikelzusammenfassung, Übersetzungsketten und semantische Few-Shot-Beispielauswahl mit LangChain',
          'Lokale Inferenz mit GPT4All und llama.cpp, wenn Daten die Maschine nicht verlassen dürfen',
        ],
        stack: ['Python', 'LangChain', 'OpenAI', 'Deep Lake', 'llama.cpp', 'GPT4All'],
        repos: [{ label: 'Quellcode', url: shared.gh('rag_project') }],
      },
      {
        name: '.NET-API-Starter-Template',
        role: 'Allein',
        summary:
          'Der Ausgangspunkt, den ich für neue C#-Services klone: Schichten, Validierung, Logging und OpenAPI sind verdrahtet, damit ein Team ab Tag eins an der Fachlogik arbeiten kann.',
        highlights: [],
        stack: ['C#', 'ASP.NET Core'],
        repos: [{ label: 'Quellcode', url: shared.gh('API_TEMPLATE') }],
      },
    ],
  },
  experience: {
    heading: 'Berufserfahrung',
    items: [
      {
        title: 'Senior Software Developer',
        company: 'Tatweer MEA',
        location: 'Abu Dhabi, VAE',
        period: '03/2025 – heute',
        bullets: [
          'Leitung von Systemdesign und Umsetzung digitaler Behördenlösungen in Python, .NET Core und Angular; Verantwortung für Architektur und technische Roadmap.',
          'Produktiver Einsatz von GenAI – LLMs, RAG und CVAT-basierte Annotation – für digitale Behördendienste.',
          'Aufbau und Deployment eines Spring-Boot-Microservice-Systems zur Patientenverwaltung auf AWS mit Docker, API Gateway und gRPC/REST-Integration.',
          'Echtzeit-GIS-Dashboards (Leaflet, Mapbox, Esri ArcGIS) mit SignalR-Live-Updates und Clustering großer Markermengen.',
          'Einführung von CI/CD-Pipelines und Kubernetes-Deployments; kürzere Deployment-Zeiten und weniger Fehlschläge.',
        ],
      },
      {
        title: 'Senior Full Stack Developer',
        company: 'Alsager National Insurance Company (ASNIC)',
        location: 'Dubai, VAE',
        period: '12/2023 – 03/2025',
        bullets: [
          'Entwicklung großer Versicherungssysteme – Underwriting, Policierung, Schadenbearbeitung – mit Angular 15, .NET Core und Oracle in einer Microservice-Architektur.',
          'Integration der Behörden-APIs UAE Pass, RTA und EVG für digitale Authentifizierung und E-Government-Dienste.',
          'Führung eines fünfköpfigen Entwicklungsteams; Einführung automatisierter Tests und CI/CD mit höherer Release-Frequenz und besserer Codequalität.',
          'Kundenportal und interne Werkzeuge zur Automatisierung von Schaden- und Policenverwaltung; weniger manuelle Bearbeitung.',
        ],
      },
      {
        title: 'Senior Full Stack Developer',
        company: 'Abu Dhabi Ports',
        location: 'Abu Dhabi, VAE',
        period: '07/2022 – 11/2023',
        bullets: [
          'Entwurf von Logistik-Webanwendungen (Fracht- und Lagerdienste) mit Angular und .NET Core.',
          'Backend-Performance und API-Antwortzeiten um 40 % verbessert durch Query-Tuning, Caching und asynchrone Verarbeitung.',
          'RabbitMQ für asynchrone Verarbeitung integriert; Sicherheits- und Compliance-Verbesserungen nach ISO-Standards umgesetzt.',
        ],
      },
      {
        title: 'Full Stack Developer',
        company: 'Technologica',
        location: 'Dubai, VAE',
        period: '10/2021 – 07/2022',
        bullets: [
          'Webanwendungen mit .NET Core 6 und Angular 13; Hintergrunddienste sowie Anbindung von MongoDB und Node.js-APIs.',
          'Mitarbeit an Android-App-Entwicklung und KI-Proof-of-Concepts.',
        ],
      },
      {
        title: 'Software Engineer (remote)',
        company: 'SAMD Software Solution',
        location: 'Damaskus, Syrien',
        period: '02/2021 – 09/2021',
        bullets: ['Python-basierte 2D/3D-Modellierungswerkzeuge mit PyQt5 und Panda3D in einem funktionsübergreifenden Remote-Team.'],
      },
      {
        title: 'Information Analyst',
        company: 'Syriatel Telecom',
        location: 'Damaskus, Syrien',
        period: '01/2019 – 02/2021',
        bullets: [
          'Vertriebs- und BI-Systeme mit ASP.NET, Oracle, Power BI und OBIEE; ETL-Pipelines und KPI-Dashboards für das Management-Reporting.',
        ],
      },
    ],
  },
  education: {
    heading: 'Ausbildung',
    degree: 'B.Sc. Regelungs- und Automatisierungstechnik',
    school: 'Universität Damaskus',
    period: '2012 – 2017',
  },
  skills: {
    heading: 'Kenntnisse',
    groups: [
      { label: 'Sprachen', items: 'C#, Java, Python, TypeScript, JavaScript, SQL' },
      { label: 'Backend', items: 'ASP.NET Core, .NET 6–10, Spring Boot, Django, Flask, Node.js, SignalR, gRPC, REST, SOAP' },
      { label: 'Frontend', items: 'Angular 13–21, React, HTML5, CSS3, Tailwind, Bootstrap, Flutter' },
      { label: 'Architektur', items: 'Microservices, Clean Architecture, DDD, ereignisgesteuerte Systeme, API Gateway, RabbitMQ, MQTT' },
      { label: 'Cloud & DevOps', items: 'AWS, Azure, Docker, Kubernetes, GitHub Actions, Azure DevOps, CI/CD, Firebase' },
      { label: 'Daten', items: 'SQL Server, Oracle, PostgreSQL, MongoDB, Vektordatenbanken, EF Core, Power BI, OBIEE' },
      { label: 'KI / GenAI', items: 'LLMs, RAG, LangChain, LlamaIndex, CVAT, YOLO, OpenCV' },
      { label: 'GIS', items: 'Mapbox, Leaflet, Esri ArcGIS' },
    ],
  },
  certifications: {
    heading: 'Zertifikate',
    items: [
      'Certified Kubernetes Administrator (Kurs) — Udemy, 2024',
      'ITIL 4 Foundation',
      'Prompt Engineering for AI Systems — Dubai Future Foundation, 2025',
      'Talking to AI: Prompt Engineering for Project Managers — PMI, 2025',
      'AWS Fundamentals, Docker Hands-on, Agile Transformation & Scaled Agile — Udemy',
    ],
  },
  languages: {
    heading: 'Sprachen',
    items: [
      { name: 'Arabisch', level: 'Muttersprache' },
      { name: 'Englisch', level: 'Verhandlungssicher (C1)' },
      { name: 'Deutsch', level: 'A1, in aktivem Aufbau' },
    ],
  },
  contact: {
    heading: 'Kontakt',
    lead: 'Offen für Senior-Engineer- und Tech-Lead-Positionen in Deutschland, vor Ort oder hybrid. Verfügbar innerhalb eines Monats nach Zusage.',
    email: shared.email,
    linkedin: shared.linkedin,
    github: shared.github,
    cv: 'Lebenslauf herunterladen (PDF)',
  },
  footer: 'Tarek Akel · Erstellt mit React, Vite und Tailwind · Gehostet auf GitHub Pages',
}

export const content: Record<Lang, Content> = { en, de }
