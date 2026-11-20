const bcrypt = require('bcryptjs');

const defaultPasswordHash = bcrypt.hashSync('adminpassword123', 10);

const initialData = {
  user: {
    _id: 'usr_admin_default_01',
    name: 'Admin Developer',
    email: 'admin@portfolio.com',
    password: defaultPasswordHash,
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  profile: {
    _id: 'prof_01',
    name: 'Muhammad Yasin',
    designation: 'Full Stack Web & App Developer',
    headline: 'Building Digital Experiences That Make a Difference.',
    shortIntro: 'I build modern, scalable and user-focused web and mobile applications, transforming ideas into powerful digital products.',
    location: 'Balochistan, Pakistan',
    availabilityStatus: 'Available for Freelance & Collaboration',
    isAvailable: true,
    email: 'contact@yasinportfolio.dev',
    phone: '+92 312 3456789',
    whatsapp: '+92 312 3456789',
    resumeUrl: '/uploads/Muhammad_Yasin_FullStack_Resume.pdf',
    avatar: '/designer_headshot.jpg',
    heroBadgeText: 'Senior Full Stack Specialist',
    yearsOfExperience: 5,
    completedProjects: 45,
    technologiesCount: 28,
    clientSatisfaction: 99,
    updatedAt: new Date().toISOString()
  },
  about: {
    _id: 'abt_01',
    title: 'About Me',
    subtitle: 'Crafting thoughtful digital solutions with precision, passion & purpose.',
    bioParagraph1: "I am a passionate Full Stack Web & Mobile App Developer based in Balochistan, Pakistan. With over 5 years of hands-on experience, I specialize in crafting performant web platforms, resilient REST/GraphQL APIs, and cross-platform mobile apps that drive business growth.",
    bioParagraph2: "My journey started with a fascination for clean user interfaces and architectural symmetry. Today, I build end-to-end products from pixel-perfect frontend interactions to robust distributed database systems, focusing on performance, modular code, and thoughtful UX.",
    developmentPhilosophy: "I believe great software is where uncompromising engineering meets minimalist design. Every line of code should have a purpose, and every interface should feel effortless and intuitive.",
    journeyStory: "Over the past several years, I have collaborated with forward-thinking startups and established businesses globally, delivering scalable SaaS products, mobile applications, and enterprise dashboards. My engineering focus centers around React, Node.js, Next.js, React Native, and high-performance MongoDB/PostgreSQL architectures.",
    stats: [
      { label: 'Projects Completed', value: '45+', counter: 45 },
      { label: 'Years Experience', value: '5+', counter: 5 },
      { label: 'Technologies Mastered', value: '28+', counter: 28 },
      { label: 'Client Satisfaction', value: '99%', counter: 99 }
    ],
    updatedAt: new Date().toISOString()
  },
  skills: [
    { _id: 'skl_01', name: 'React.js', category: 'Frontend Development', proficiency: 96, icon: 'Atom', level: 'Expert', isFeatured: true },
    { _id: 'skl_02', name: 'Next.js', category: 'Frontend Development', proficiency: 92, icon: 'Layers', level: 'Expert', isFeatured: true },
    { _id: 'skl_03', name: 'TypeScript', category: 'Frontend Development', proficiency: 90, icon: 'FileCode', level: 'Advanced', isFeatured: true },
    { _id: 'skl_04', name: 'Tailwind CSS', category: 'Frontend Development', proficiency: 98, icon: 'Palette', level: 'Master', isFeatured: true },
    { _id: 'skl_05', name: 'HTML5 & CSS3', category: 'Frontend Development', proficiency: 99, icon: 'Code', level: 'Master', isFeatured: false },
    { _id: 'skl_06', name: 'Redux Toolkit / Zustand', category: 'Frontend Development', proficiency: 88, icon: 'Cpu', level: 'Advanced', isFeatured: false },
    { _id: 'skl_07', name: 'Node.js', category: 'Backend Development', proficiency: 94, icon: 'Server', level: 'Expert', isFeatured: true },
    { _id: 'skl_08', name: 'Express.js', category: 'Backend Development', proficiency: 95, icon: 'Globe', level: 'Expert', isFeatured: true },
    { _id: 'skl_09', name: 'REST & GraphQL APIs', category: 'Backend Development', proficiency: 92, icon: 'Workflow', level: 'Expert', isFeatured: true },
    { _id: 'skl_10', name: 'JWT & OAuth Auth', category: 'Backend Development', proficiency: 90, icon: 'ShieldCheck', level: 'Advanced', isFeatured: false },
    { _id: 'skl_11', name: 'Microservices & WebSockets', category: 'Backend Development', proficiency: 85, icon: 'Zap', level: 'Advanced', isFeatured: false },
    { _id: 'skl_12', name: 'React Native', category: 'Mobile App Development', proficiency: 91, icon: 'Smartphone', level: 'Expert', isFeatured: true },
    { _id: 'skl_13', name: 'Android Studio / Kotlin', category: 'Mobile App Development', proficiency: 82, icon: 'TabletSmartphone', level: 'Intermediate', isFeatured: true },
    { _id: 'skl_14', name: 'Expo & Mobile CI/CD', category: 'Mobile App Development', proficiency: 88, icon: 'CloudUpload', level: 'Advanced', isFeatured: false },
    { _id: 'skl_15', name: 'MongoDB & Mongoose', category: 'Databases', proficiency: 95, icon: 'Database', level: 'Expert', isFeatured: true },
    { _id: 'skl_16', name: 'PostgreSQL & Prisma', category: 'Databases', proficiency: 87, icon: 'HardDrive', level: 'Advanced', isFeatured: true },
    { _id: 'skl_17', name: 'Redis Caching', category: 'Databases', proficiency: 84, icon: 'Zap', level: 'Advanced', isFeatured: false },
    { _id: 'skl_18', name: 'MySQL', category: 'Databases', proficiency: 86, icon: 'Columns', level: 'Advanced', isFeatured: false },
    { _id: 'skl_19', name: 'JavaScript (ES6+)', category: 'Programming Languages', proficiency: 98, icon: 'Code2', level: 'Master', isFeatured: true },
    { _id: 'skl_20', name: 'TypeScript', category: 'Programming Languages', proficiency: 92, icon: 'Binary', level: 'Expert', isFeatured: true },
    { _id: 'skl_21', name: 'Python', category: 'Programming Languages', proficiency: 80, icon: 'Terminal', level: 'Intermediate', isFeatured: false },
    { _id: 'skl_22', name: 'Java / SQL', category: 'Programming Languages', proficiency: 82, icon: 'FileText', level: 'Intermediate', isFeatured: false },
    { _id: 'skl_23', name: 'Git & GitHub', category: 'Tools & Technologies', proficiency: 95, icon: 'GitBranch', level: 'Expert', isFeatured: true },
    { _id: 'skl_24', name: 'Docker & Containers', category: 'Tools & Technologies', proficiency: 82, icon: 'Box', level: 'Intermediate', isFeatured: false },
    { _id: 'skl_25', name: 'Postman & API Testing', category: 'Tools & Technologies', proficiency: 92, icon: 'Send', level: 'Advanced', isFeatured: false },
    { _id: 'skl_26', name: 'Vercel / Render / AWS', category: 'Tools & Technologies', proficiency: 88, icon: 'Cloud', level: 'Advanced', isFeatured: true }
  ],
  services: [
    {
      _id: 'srv_01',
      title: 'Full Stack Web Development',
      slug: 'full-stack-web-development',
      icon: 'Monitor',
      shortDescription: 'End-to-end web applications built with modern React, Node.js, and MongoDB architectures.',
      description: 'Complete full stack web application engineering from database design to reactive user interfaces. High code modularity, automated testing, secure authentication, and seamless user experiences.',
      deliverables: [
        'Single Page & Multi-Page Web Applications',
        'Secure JWT / OAuth Authentication Systems',
        'Dynamic State Management & Server Synchronization',
        'Production Deployment with CI/CD Pipelines'
      ],
      order: 1
    },
    {
      _id: 'srv_02',
      title: 'Responsive Website Development',
      slug: 'responsive-website-development',
      icon: 'Laptop',
      shortDescription: 'Pixel-perfect, fluid, and mobile-friendly marketing, portfolio, and corporate websites.',
      description: 'Crafting editorial and high-converting websites optimized across all desktop, tablet, and mobile breakpoints. Fast loading times, pristine accessibility, and buttery smooth animations.',
      deliverables: [
        'Mobile-First Responsive Layouts',
        'Cross-Browser & Cross-Device Compatibility',
        'Core Web Vitals & Lighthouse Optimization',
        'SEO Metadata & Semantic Structure'
      ],
      order: 2
    },
    {
      _id: 'srv_03',
      title: 'Android & Mobile App Development',
      slug: 'android-app-development',
      icon: 'Smartphone',
      shortDescription: 'High-performance native and cross-platform mobile apps for Android and iOS using React Native.',
      description: 'Cross-platform mobile applications with smooth 60fps animations, offline data caching, camera and push notification integration, and native platform integrations.',
      deliverables: [
        'React Native Cross-Platform Apps',
        'Offline Caching & State Synchronization',
        'Push Notifications & Native Module Bridges',
        'Play Store & App Store Deployment'
      ],
      order: 3
    },
    {
      _id: 'srv_04',
      title: 'Backend & API Development',
      slug: 'backend-api-development',
      icon: 'Server',
      shortDescription: 'Scalable, secure, and documented RESTful and GraphQL backend microservices and APIs.',
      description: 'Engineered backend architectures in Node.js and Express that withstand heavy traffic loads. Built with strict input validation, rate limiting, token rotation, and clear API documentation.',
      deliverables: [
        'RESTful & GraphQL API Design',
        'Role-Based Access Control (RBAC)',
        'Rate Limiting & Security Middlewares',
        'Swagger / Postman API Documentation'
      ],
      order: 4
    },
    {
      _id: 'srv_05',
      title: 'Database Design & Optimization',
      slug: 'database-design',
      icon: 'Database',
      shortDescription: 'Clean relational and document database modeling, index optimization, and data security.',
      description: 'Comprehensive schema design for MongoDB and PostgreSQL. Includes indexing strategies, aggregation pipelines, data backup routines, and query performance benchmarking.',
      deliverables: [
        'Normalized & Document Schemas',
        'Aggregation Pipelines & Index Tuning',
        'Automated Migrations & Backup Workflows',
        'Data Security & Encryption at Rest'
      ],
      order: 5
    },
    {
      _id: 'srv_06',
      title: 'Admin Dashboard & CMS Development',
      slug: 'admin-dashboard-development',
      icon: 'LayoutDashboard',
      shortDescription: 'Custom, intuitive, and feature-rich administrative portals and content management systems.',
      description: 'Tailored administrative dashboards that empower non-technical team members to manage content, monitor analytics, handle orders, and control app permissions with ease.',
      deliverables: [
        'Custom Content Management Systems (CMS)',
        'Data Visualization & Real-Time Metrics',
        'File Upload Previews & Cloud Storage',
        'Granular User Permissions & Activity Logs'
      ],
      order: 6
    },
    {
      _id: 'srv_07',
      title: 'Website Maintenance & Optimization',
      slug: 'website-maintenance',
      icon: 'Wrench',
      shortDescription: 'Ongoing performance tuning, security patching, dependency upgrades, and uptime monitoring.',
      description: 'Keep your digital products operating at peak performance with scheduled security patches, speed audits, dependency refreshes, and bug resolution.',
      deliverables: [
        'Performance Audits & Speed Tuning',
        'Security Vulnerability Patching',
        'Node.js & React Dependency Upgrades',
        'Continuous Uptime & Error Tracking'
      ],
      order: 7
    }
  ],
  projects: [
    {
      _id: 'prj_01',
      title: 'AuraPay — Global Fintech Platform',
      slug: 'aurapay-fintech-platform',
      category: 'Full Stack',
      shortDescription: 'An enterprise multi-currency digital payment gateway with real-time analytics, biometric auth, and ledger reconciliation.',
      description: 'AuraPay is a full-featured fintech web and mobile application supporting seamless cross-border transactions, virtual card creation, and multi-tier fraud detection. Features high-throughput processing, end-to-end encryption, and an ultra-modern editorial UI.',
      thumbnail: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['React 18', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JWT', 'Redis'],
      liveUrl: 'https://example.com/aurapay-demo',
      githubUrl: 'https://github.com/example/aurapay-platform',
      isFeatured: true,
      year: '2025',
      client: 'Aura Financial Inc.',
      order: 1
    },
    {
      _id: 'prj_02',
      title: 'PulseFit — AI Mobile Fitness Companion',
      slug: 'pulsefit-ai-mobile-fitness',
      category: 'Mobile App',
      shortDescription: 'Cross-platform mobile application delivering personalized dynamic workout regimens and computer-vision posture tracking.',
      description: 'PulseFit delivers real-time telemetry, personalized AI workout scheduling, voice guidance, and integration with health wearables. Built with React Native and Node.js microservices for instantaneous response times and offline synchronization.',
      thumbnail: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['React Native', 'Expo', 'TypeScript', 'Node.js', 'MongoDB', 'TensorFlow Lite'],
      liveUrl: 'https://example.com/pulsefit-demo',
      githubUrl: 'https://github.com/example/pulsefit-mobile',
      isFeatured: true,
      year: '2024',
      client: 'Pulse Dynamics Lab',
      order: 2
    },
    {
      _id: 'prj_03',
      title: 'Verve Studio — Editorial E-Commerce',
      slug: 'verve-studio-editorial-ecommerce',
      category: 'Frontend',
      shortDescription: 'High-aesthetic luxury fashion and design marketplace featuring 3D product previews and instant checkout.',
      description: 'Designed for a contemporary luxury apparel brand, Verve Studio integrates smooth page choreography, instantaneous cart management, algorithmic size recommendation, and Stripe Payment Intents.',
      thumbnail: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['Next.js', 'React', 'Tailwind CSS', 'Framer Motion', 'Stripe API', 'Zustand'],
      liveUrl: 'https://example.com/vervestudio-demo',
      githubUrl: 'https://github.com/example/verve-ecommerce',
      isFeatured: true,
      year: '2024',
      client: 'Verve Atelier Paris',
      order: 3
    },
    {
      _id: 'prj_04',
      title: 'NexusCMS — Headless Content Architecture',
      slug: 'nexuscms-headless-content-system',
      category: 'Backend',
      shortDescription: 'High-throughput Node.js microservice API providing multi-tenant content management, webhooks, and Redis caching.',
      description: 'A distributed content management engine powering hundreds of consumer-facing pages. Includes dynamic schema builders, edge cache invalidation, automated WebP image resizing, and audit log generation.',
      thumbnail: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['Node.js', 'Express', 'MongoDB', 'Redis', 'Docker', 'JWT', 'Helmet'],
      liveUrl: 'https://example.com/nexuscms-api',
      githubUrl: 'https://github.com/example/nexuscms-core',
      isFeatured: true,
      year: '2024',
      client: 'Open Source / Enterprise',
      order: 4
    },
    {
      _id: 'prj_05',
      title: 'DevPulse — Developer Collaboration Hub',
      slug: 'devpulse-developer-collaboration-hub',
      category: 'Full Stack',
      shortDescription: 'Real-time collaborative code review, snippet sharing, and architectural discussion platform with live web sockets.',
      description: 'DevPulse brings distributed engineering teams together with real-time markdown docs, syntax highlighted diffs, integrated terminal logs, and interactive kanban sprint workflows.',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['React', 'TypeScript', 'Socket.io', 'Node.js', 'MongoDB', 'Tailwind CSS'],
      liveUrl: 'https://example.com/devpulse-demo',
      githubUrl: 'https://github.com/example/devpulse-hub',
      isFeatured: false,
      year: '2023',
      client: 'DevSquad Collective',
      order: 5
    },
    {
      _id: 'prj_06',
      title: 'UrbanCart — Grocery Delivery Android App',
      slug: 'urbancart-grocery-delivery-app',
      category: 'Mobile App',
      shortDescription: 'Hyperlocal grocery ordering Android application with GPS driver tracking, instant cart checkout, and wallet management.',
      description: 'Engineered for high-volume grocery logistics, UrbanCart features live route tracking via Google Maps SDK, biometric instant payments, push order status updates, and catalog caching.',
      thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
      screenshots: [
        'https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=1200&auto=format&fit=crop'
      ],
      technologies: ['React Native', 'Redux', 'Node.js', 'Google Maps API', 'MongoDB', 'Socket.io'],
      liveUrl: 'https://example.com/urbancart-app',
      githubUrl: 'https://github.com/example/urbancart-mobile',
      isFeatured: false,
      year: '2023',
      client: 'Urban Retail Network',
      order: 6
    }
  ],
  experiences: [
    {
      _id: 'exp_01',
      type: 'experience',
      title: 'Senior Full Stack Developer',
      organization: 'VentureScale Technologies',
      location: 'Remote / Global',
      period: '2023 — Present',
      description: 'Lead engineering of scalable web applications and enterprise portals using React, Node.js, and MongoDB. Spearheaded architectural migration from monolithic codebase to modular microservices, boosting response times by 42%. Mentored 6 junior engineers and set coding standards.',
      skillsUsed: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'System Architecture', 'CI/CD'],
      order: 1
    },
    {
      _id: 'exp_02',
      type: 'experience',
      title: 'Full Stack & Mobile Engineer',
      organization: 'CloudSphere Solutions',
      location: 'Islamabad / Remote',
      period: '2021 — 2023',
      description: 'Architected and shipped 14+ client web platforms and cross-platform mobile apps for Android and iOS. Built secure RESTful APIs with Express, designed MongoDB aggregation pipelines, and implemented realtime notifications via WebSockets.',
      skillsUsed: ['React Native', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
      order: 2
    },
    {
      _id: 'exp_03',
      type: 'experience',
      title: 'Frontend Web Developer',
      organization: 'Innovate Studio',
      location: 'Quetta, Balochistan',
      period: '2019 — 2021',
      description: 'Crafted pixel-perfect, accessible, and high-performance client websites and interactive dashboards. Partnered directly with UI/UX designers to translate Figma design tokens into fluid, component-driven React applications.',
      skillsUsed: ['JavaScript (ES6+)', 'React', 'HTML5/CSS3', 'Git', 'Responsive Design'],
      order: 3
    },
    {
      _id: 'exp_04',
      type: 'education',
      title: 'Bachelor of Science in Computer Science (BSCS)',
      organization: 'University of Balochistan',
      location: 'Balochistan, Pakistan',
      period: '2016 — 2020',
      description: 'Comprehensive study of Algorithms, Data Structures, Software Engineering Principles, Database Management Systems, Computer Networks, and Object-Oriented Programming. Graduated with honors and led the collegiate coding club.',
      skillsUsed: ['Data Structures', 'Algorithms', 'DBMS', 'Software Engineering', 'OOP'],
      order: 4
    },
    {
      _id: 'exp_05',
      type: 'certification',
      title: 'Meta Certified Senior Front-End Developer',
      organization: 'Meta / Coursera',
      location: 'Credential Verified',
      period: '2023',
      description: 'Advanced credential validating expertise in React architecture, modern JavaScript patterns, web performance tuning, accessibility (WCAG), and state management best practices.',
      skillsUsed: ['React', 'Web Performance', 'Accessibility', 'Testing'],
      order: 5
    },
    {
      _id: 'exp_06',
      type: 'certification',
      title: 'MongoDB Certified Node.js Developer Associate',
      organization: 'MongoDB University',
      location: 'Credential Verified',
      period: '2022',
      description: 'Certified expertise in document modeling, schema design, aggregation pipeline optimization, connection pooling, and enterprise database security.',
      skillsUsed: ['MongoDB', 'Schema Design', 'Aggregation Pipelines', 'Node.js'],
      order: 6
    }
  ],
  testimonials: [
    {
      _id: 'tst_01',
      name: 'Alexander Wright',
      designation: 'CTO, Aura Financial',
      company: 'Aura Financial Inc.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: 'Working with Yasin was a game changer for our fintech platform. His attention to detail, architectural foresight, and speed of delivery exceeded all expectations. The code is modular, well-documented, and production-tested.',
      project: 'AuraPay Platform',
      order: 1
    },
    {
      _id: 'tst_02',
      name: 'Elena Rostova',
      designation: 'Head of Product',
      company: 'Verve Atelier',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: 'Yasin elevated our digital presence into a true luxury experience. The micro-animations and typography hierarchy matched our brand vision down to the pixel. Plus, our site loading speeds improved dramatically.',
      project: 'Verve Studio E-Commerce',
      order: 2
    },
    {
      _id: 'tst_03',
      name: 'Tariq Al-Mansoor',
      designation: 'Co-Founder & CEO',
      company: 'Pulse Dynamics Lab',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      rating: 5,
      content: 'Exceptional full-stack and mobile developer. He built our React Native mobile application from scratch and integrated complex real-time telemetry. Reliable, proactive, and deeply dedicated to excellence.',
      project: 'PulseFit Mobile App',
      order: 3
    }
  ],
  messages: [
    {
      _id: 'msg_01',
      name: 'Sarah Jenkins',
      email: 'sarah.j@techventures.io',
      subject: 'Inquiry: SaaS Dashboard Project',
      service: 'Full Stack Web Development',
      message: 'Hi Yasin, I reviewed your work on AuraPay and was blown away by the quality. We are looking for a senior full stack developer to help build our next-generation B2B analytics platform. Are you available for a 3-month contract?',
      status: 'unread',
      isStarred: true,
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString()
    },
    {
      _id: 'msg_02',
      name: 'David Chen',
      email: 'david@zenithapps.co',
      subject: 'Mobile App Collaboration',
      service: 'Android App Development',
      message: 'Greetings! We are developing a cross-platform mobile application and need an experienced React Native specialist for custom native modules and performance tuning. Looking forward to discussing terms.',
      status: 'read',
      isStarred: false,
      createdAt: new Date(Date.now() - 3600000 * 28).toISOString()
    }
  ],
  settings: {
    _id: 'set_01',
    siteTitle: 'DYMAS ALFIN — Personal Portfolio',
    siteTagline: 'Designing digital products that are clear, usable, and conversion focused.',
    metaDescription: 'Personal portfolio showcasing selected digital products, UI/UX systems, and full-stack applications.',
    keywords: 'UI/UX Designer, Product Designer, Full Stack Developer, React, Portfolio',
    ogImage: '/designer_headshot.jpg',
    canonicalUrl: 'https://portfolio.dev',
    allowRobotsIndex: true,
    author: 'DYMAS ALFIN',
    twitterHandle: '@portfolio',
    socialLinks: {
      dribbble: 'https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations',
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
      twitter: 'https://twitter.com',
      whatsapp: 'https://wa.me/923123456789',
      behance: 'https://behance.net',
      youtube: 'https://youtube.com'
    },
    theme: {
      primaryBg: '#FFFFFF',
      secondaryBg: '#FAFAFA',
      primaryText: '#000000',
      secondaryText: '#737373',
      accentColor: '#000000',
      headingFont: 'Syne, sans-serif',
      bodyFont: 'Plus Jakarta Sans, sans-serif',
      animationPreference: 'smooth'
    },
    enableAnimations: true,
    allowMessages: true,
    updatedAt: new Date().toISOString()
  }
};

module.exports = initialData;
