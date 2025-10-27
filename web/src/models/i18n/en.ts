export default {
  footer: {
    product: "Product",
    features: "Features",
    pricing: "Pricing",
    download: "Download",
    company: "Company",
    about: "About us",
    blog: "Blog",
    career: "Career",
    support: "Support",
    help: "Help",
    contact: "Contact",
    docs: "Documentation",
    followUs: "Follow us",
    langLabel: "Website language",
    rights: "All rights reserved",
    privacy: "Privacy Policy",
    terms: "Terms of Use",
  },

  header: {
    product: "Product",
    overview: "Overview",
    features: "Features",
    pricing: "Pricing",

    company: "Company",
    about: "About",
    team: "Team",
    career: "Career",

    resources: "Resources",
    blog: "Blog",
    support: "Support",
    docs: "Documentation",

    mySpace: "My Space",
    calendar: "Calendar",
    tasks: "Tasks",
    teams: "Teams",

    login: "Login",
    register: "Sign up",
    logout: "Logout",
    menu: "Menu",
  },

  home: {
    heroTitle: "Teamwork — <highlight>without chaos</highlight>",
    heroText:
      "TeamFlow brings together tasks, calendars, chats, and tools in one workspace for productive collaboration.",
    tryFree: "Try for free",
    learnMore: "Learn more",

    features: [
      {
        title: "Powerful task manager",
        desc: "Flexible Kanban, deadlines, assignments, and progress tracking — all in one view.",
      },
      {
        title: "Interactive calendars",
        desc: "Personal and team events with synchronization. Work and plan effortlessly.",
      },
      {
        title: "Built-in chat and calls",
        desc: "Communicate in real time with group calls and instant messaging.",
      },
    ],

    ctaTitle: "Ready to join TeamFlow?",
    ctaText:
      "Sign up today and start managing your projects like a professional.",
    createAccount: "Create an account",
  },

  overview: {
    heroTitle: "Teamwork without chaos",
    heroText:
      "Calendar, tasks, chats, and calls — all in one place. Work in sync with your team anywhere.",
    tryFree: "Try for free",
    demo: "Demo mode",

    whyTitle: "Why TeamFlow?",
    features: [
      {
        title: "Smart calendar",
        desc: "Plan events without conflicts between personal and team schedules.",
      },
      {
        title: "Motivating tasks",
        desc: "Complete tasks, earn points, and level up your team.",
      },
      {
        title: "Noise-free communication",
        desc: "Discuss everything using built-in chats — no external messengers needed.",
      },
      {
        title: "Secure platform",
        desc: "JWT tokens, encryption, and access control ensure your safety.",
      },
    ],

    ctaTitle: "Ready to try TeamFlow?",
    ctaText: "Start collaborating more effectively today.",
    join: "Join now",
  },

  features: {
    title: "TeamFlow Features",
    sections: [
      {
        title: "Calendar",
        points: [
          "Personal and team calendars in one place.",
          "Conflict checking between events.",
          "Colors, priorities, tags, and participation confirmations.",
        ],
      },
      {
        title: "Tasks",
        points: [
          "Task lists for a day, week, or sprint.",
          "Point and achievement system.",
          "Comments, deadlines, and collaboration tools.",
        ],
      },
      {
        title: "Communication",
        points: [
          "Text chats for teams and projects.",
          "Instant messages, mentions, and reactions (coming soon).",
          "No need for external messengers.",
        ],
      },
      {
        title: "Security",
        points: [
          "Authentication via JWT tokens.",
          "Password hashing and encrypted connections.",
          "Access control for private data.",
        ],
      },
      {
        title: "Integrations",
        points: [
          "GitHub — automatic task updates based on commits.",
          "Code editors — real-time collaboration (planned).",
          "Google Calendar, Slack — future integrations.",
        ],
      },
      {
        title: "Tech Stack",
        points: [
          "Frontend: React + TypeScript",
          "Backend: C++",
          "Database: PostgreSQL 17",
        ],
      },
    ],
    footerNote:
      "TeamFlow — the all-in-one workspace for modern teams to plan, collaborate, and succeed together.",
  },

  pricing: {
    title: "TeamFlow Pricing",
    currentPlan: "Your current plan",
    select: "Select",
    free: "Free",
    perMonth: "/month",
    perYear: "or ${{price}}/year",
    studentDiscount: "Student discount available",
    plans: [
      {
        name: "Base",
        priceMonth: 0,
        priceYear: 0,
        features: [
          "Limited number of boards",
          "Limited chats",
          "Task automation — unavailable",
          "Team support — unavailable",
        ],
      },
      {
        name: "Lite",
        priceMonth: 5,
        priceYear: 50,
        studentDiscount: true,
        features: [
          "Unlimited boards",
          "Chats",
          "Task automation",
          "Team support — unavailable",
        ],
      },
      {
        name: "Pro",
        priceMonth: 10,
        priceYear: 100,
        studentDiscount: true,
        features: [
          "Unlimited boards",
          "Chats",
          "Task automation",
          "Team support",
          "Advanced analytics",
        ],
      },
      {
        name: "Enterprise",
        priceMonth: 45,
        priceYear: 450,
        features: [
          "Unlimited boards",
          "Chats",
          "Task automation",
          "Team support",
          "Advanced analytics",
          "Multiple accounts per subscription",
          "Priority support",
        ],
      },
    ],
  },

  payment: {
    title: "Payment for plan",
    card: "Card",
    paypal: "PayPal",
    nameLabel: "Cardholder name",
    namePlaceholder: "Same Doe",
    numberLabel: "Card number",
    expiryLabel: "Expiry date",
    cvvLabel: "CVV",
    invalidCard: "Invalid card number (Luhn check)",
    invalidDate: "Invalid card date (check expiry)",
    nameError: "Enter cardholder name",
    numberError: "Invalid card number",
    luhnError: "Invalid card number (Luhn check)",
    expiryError: "Invalid expiry date",
    cvvError: "CVV must be 3 digits",
    payButton: "Pay",
    redirectInfo: "You will be redirected to PayPal to complete payment.",
    redirectButton: "Go to PayPal",
    close: "Close",
  },

  confirm: {
    title: "Confirmation",
    message:
      "Your current plan includes more features. Are you sure you want to switch to <b>{plan}</b>?",
    yes: "Yes",
    no: "No",
  },

  about: {
    title: "About TeamFlow",
    subtitle:
      "A platform for teams that want to work together, not just side by side.",
    p1: "We are building <strong>TeamFlow</strong> — a workspace that unites calendars, tasks, chats, and video calls in one place.",
    p2: "The idea came from the desire to make teamwork more organized and transparent. We believe that effective communication is the key to any project's success.",
    p3: "Our focus is on <span class='font-semibold'>productivity, transparency, and simplicity</span>. We aim to create tools that inspire, not overwhelm.",
    highlight1Title: "Collaboration without chaos",
    highlight1Desc:
      "We strive to make teamwork simple, convenient, and transparent.",
    highlight2Title: "Focus on results",
    highlight2Desc:
      "Every feature in TeamFlow helps you achieve your goals faster.",
    highlight3Title: "Inspired growth",
    highlight3Desc:
      "We build a product that motivates teams to grow and improve together.",
    cta: "Join the team",
  },

  career: {
    title: "Career",
    subtitle:
      "We’re looking for people who want to grow with us. If you’re passionate about building modern tools for teamwork — join TeamFlow!",
    frontendTitle: "Frontend Intern",
    frontendDesc: "Developing React components and optimizing UI/UX.",
    backendTitle: "Backend Developer (C++)",
    backendDesc:
      "Building REST APIs, authentication, and PostgreSQL data processing.",
    qaTitle: "QA Engineer",
    qaDesc: "Automated testing of client and server modules.",
    applyButton: "Send Resume",
    ctaTitle: "Join Our Team!",
    ctaSubtitle:
      "We value initiative, creativity, and passion for technology. Your work will help make teamwork smoother for thousands of users.",
    ctaButton: "Apply Now",
  },

  docs: {
    title: "API Documentation",
    version: "API Version",

    authTitle: "🔑 Authentication",
    authDesc: "JWT tokens, login, registration, and token refresh.",

    calendarTitle: "📅 Calendar API",
    calendarDesc: "Create, update, and delete events in team calendars.",

    tasksTitle: "✅ Tasks",
    tasksDesc: "Manage tasks, deadlines, and team rewards.",

    messagesTitle: "💬 Messages",
    messagesDesc: "Text chats with user mentions and real-time updates.",
  },

  support: {
    title: "TeamFlow Support",
    intro:
      "Here you’ll find answers to common questions. If you need help — our team is always here for you 💙",
    noAnswer: "Didn’t find your answer?",
    contactButton: "Contact support",

    q1: "How to create a new team?",
    a1: "Go to your profile, click <b>“Create Team”</b>, and enter its name. Then invite members via email.",

    q2: "How to invite a user?",
    a2: "In the <b>“Team”</b> tab, select “Invite” and enter the user’s email. They’ll receive an email invitation.",

    q3: "How to change the timezone in the calendar?",
    a3: "Go to <b>“Profile Settings”</b> → “Timezone” and choose your region. Events will sync automatically.",

    q4: "How to change or reset my password?",
    a4: "On the login form, click <b>“Forgot password”</b>, enter your email, and we’ll send a recovery link.",

    q5: "Why didn’t I receive a team invitation?",
    a5: "Check your <b>Spam</b> folder or ask the sender to resend it. If the issue remains — contact us.",

    q6: "Can I use TeamFlow for free?",
    a6: "Yes, the <b>Base</b> plan is completely free and includes calendar, tasks, chats, and team creation.",

    q7: "How to upgrade to Pro or Enterprise?",
    a7: "Go to the <b>“Pricing”</b> tab and select the desired plan. Payment is processed securely through our system.",
  },

  blog: {
    title: "Blog",
    readMore: "Read more",

    post1Title: "5 Ways to Avoid Chaos in Teamwork",
    post1Date: "October 10, 2025",
    post1Excerpt:
      "How to structure tasks, communication, and planning so your team works as one unit.",

    post2Title: "How We Built a Dual-Access Calendar",
    post2Date: "September 25, 2025",
    post2Excerpt:
      "We share our experience developing a system where personal events don’t conflict with team ones.",

    post3Title: "TeamFlow + GitHub: First Integration Is Live",
    post3Date: "September 3, 2025",
    post3Excerpt:
      "Now you can view commits and pull request statuses directly inside your workspace.",

    post4Title: "The Psychology of Focus: Staying on Track in a Team",
    post4Date: "August 1, 2025",
    post4Excerpt:
      "We explored how deep focus helps teams work faster and with higher quality.",
  },

  blogCalendar: {
    heroTitle: "How We Built a Dual-Access Calendar",
    heroDate: "September 25, 2025 · TeamFlow Team",
    heroAlt: "TeamFlow Calendar",
    diagramAlt: "Access level diagram",

    intro:
      "At TeamFlow, we wanted to build a calendar that’s more than just a list of events — a smart assistant for your team. The main idea was to let users manage <b>personal</b> and <b>team</b> events in one place, without losing privacy.",

    sec1Title: "1. Two visibility levels — transparent yet private",
    sec1Text:
      "We divided events into <b>personal</b> (visible only to you) and <b>team</b> (shared with everyone). Others can see when you’re busy, but not the private event details.",
    sec1ImgAlt: "Private and team events",

    sec2Title: "2. Automatic conflict detection",
    sec2Text:
      "If you create an event that overlaps with another, the system immediately notifies you — so meetings don’t collide.",

    sec3Title: "3. Colors, tags, and filters",
    sec3Text:
      "We added visual markers like colors and tags. You can easily distinguish between “Work”, “Personal”, and “Focus time”.",
    sec3ImgAlt: "Event colors and tags",

    sec4Title: "4. Participation confirmation",
    sec4Text:
      "When a team event is created, participants receive invitations where they can confirm or decline attendance.",
    sec4ImgAlt: "Participation confirmation",

    sec5Title: "5. Integration with other tools",
    sec5Text:
      "We plan to integrate with GitHub, Google Calendar, and Notion — keeping everything in one workspace.",

    quote:
      "“A calendar isn’t just a list of events. It’s a mirror of your attention. When organized right, a team runs like clockwork.”",

    backButton: "Back to blog",
    ctaTitle: "Plan without chaos",
    ctaText:
      "Try TeamFlow and discover how easy it is to manage personal and team events seamlessly.",
    ctaButton: "Try for free",
  },

  blogFocus: {
    heroTitle: "The Psychology of Focus: Staying on Track in a Team",
    heroDate: "August 1, 2025 · TeamFlow Team",
    heroAlt: "Team focus",
    intro:
      "In the age of endless chats and notifications, focus is the ultimate superpower. Teams that master it achieve more with less effort. At TeamFlow, we explored how to help people enter deep focus — even in a collaborative environment.",
    introImgAlt: "Focused team",

    sec1Title: "1. Entering the Focus Zone",
    sec1Text:
      "We created 'Focus Mode' — 90 minutes of total immersion without distractions. The system automatically notifies teammates that you’re focusing to prevent interruptions.",

    sec2Title: "2. Morning Rituals",
    sec2Text:
      "A short team check-in helps align priorities. In TeamFlow, you can mark your daily goals right in the calendar.",
    sec2ImgAlt: "Morning focus rituals",

    sec3Title: "3. Microbreaks Between Tasks",
    sec3Text:
      "To stay focused, you must also rest. TeamFlow suggests short microbreaks — stretching, breathing, or refreshing visuals.",
    sec3ImgAlt: "Microbreaks between tasks",

    sec4Title: "4. Visual Silence",
    sec4Text:
      "We simplified the interface — minimal colors and structure reduce visual noise. In Focus Mode, only tasks, time, and goals remain.",
    sec4ImgAlt: "Focus mode interface",

    sec5Title: "5. Team Culture of Calm",
    sec5Text:
      "Focus is not only tools but also culture. We practice 'quiet Fridays' — days without meetings or chats. Result: +27% more completed tasks and fewer sprint breaks.",

    quote:
      "“True focus isn’t isolation — it’s a conscious choice to be present. We simply help create the space for it.”",

    backButton: "Back to blog",

    ctaTitle: "Stay focused, stay balanced",
    ctaText:
      "Try TeamFlow Focus Mode — a calm environment for deep work and smart breaks.",
    ctaButton: "Try it free",
  },

  blogGithub: {
    heroTitle: "TeamFlow + GitHub: the first integration is live",
    heroDate: "September 3, 2025 · TeamFlow Team",
    heroAlt: "GitHub integration",
    intro:
      "We’ve launched our first GitHub integration — now you can see repo activity, pull requests, and commit status directly in TeamFlow. One step closer to a workflow without tab chaos.",
    introImgAlt: "TeamFlow + GitHub integration",

    sec1Title: "1. Commits next to tasks",
    sec1Text:
      "GitHub API is synchronized with TeamFlow tasks. Each task displays related commits. When you close a task, TeamFlow checks if changes are already pushed.",
    sec1ImgAlt: "Commits in TeamFlow tasks",

    sec2Title: "2. Pull Requests in your workspace",
    sec2Text:
      "The Pull Requests panel shows all open PRs. You can comment, review CI status, and even merge without leaving TeamFlow.",

    sec3Title: "3. Noise-free notifications",
    sec3Text:
      "All GitHub events — commits, reviews, comments — appear in your activity feed. Only relevant updates are shown.",
    sec3ImgAlt: "GitHub notifications in TeamFlow",

    sec4Title: "4. Integration architecture",
    sec4Text:
      "We use the GitHub REST API and webhooks. Each request goes through our C++ API Gateway with OAuth 2.0 and PostgreSQL caching.",

    sec5Title: "5. What’s next",
    sec5Text:
      "Next up: GitLab and Bitbucket. Our goal is to make TeamFlow the universal project management hub.",

    quote:
      "“Integration isn’t about more buttons — it’s about less switching. GitHub + TeamFlow is exactly that.”",

    backButton: "Back to blog",
    ctaTitle: "Stay focused, stay balanced",
    ctaText:
      "Try TeamFlow Focus Mode — a calm environment for deep work and smart breaks.",
    ctaButton: "Try it free",
  },

  blogTeamwork: {
    heroTitle: "5 Ways to Avoid Chaos in Teamwork",
    heroDate: "October 10, 2025 · TeamFlow Team",
    heroAlt: "Team collaboration",

    sec1Title: "1. One Source of Truth for Tasks",
    sec1Text:
      "Chaos begins when everyone keeps their own list. TeamFlow lets you create a shared task board with deadlines, priorities, and assignees. It keeps the process transparent.",
    sec1ImgAlt: "TeamFlow task list",

    sec2Title: "2. Transparent Event Calendar",
    sec2Text:
      "Our calendar combines personal and team events. You can see when teammates are busy, and the system prevents conflicts. Colors and tags help prioritize.",

    sec3Title: "3. Asynchronous Communication Without Noise",
    sec3Text:
      "Instead of endless chats, TeamFlow uses topic threads that can be collapsed, marked as 'resolved', and revisited anytime.",
    sec3ImgAlt: "Noise-free communication",

    sec4Title: "4. Visual Progress and Team Points",
    sec4Text:
      "Every completed task earns your team points. This light gamification motivates progress. Seasonal challenges are coming soon.",

    sec5Title: "5. Focus Rituals",
    sec5Text:
      "‘Focus Mode’ — 90 minutes without notifications or calls. Research shows it boosts productivity by 40%.",
    sec5ImgAlt: "Work focus",

    quote:
      "“Chaos disappears when the whole team sees one picture — tasks, events, communication, and results. TeamFlow makes it happen.”",

    backButton: "Back to blog",
    ctaTitle: "Plan without chaos",
    ctaText:
      "Try TeamFlow and discover how easy it is to manage personal and team events seamlessly.",
    ctaButton: "Try for free",
  },

  download: {
    title: "Download TeamFlow",
    subtitle:
      "Access your team space anywhere. Work offline, sync instantly, and stay connected — even without a browser.",

    windowsDesc:
      "Compatible with Windows 10 and newer. Includes auto-updates and offline mode.",
    macDesc:
      "Supports Apple Silicon (M1, M2, M3). Optimized for macOS Sonoma and Ventura.",
    mobileTitle: "Mobile Devices",
    mobileDesc:
      "Download the app on your phone to stay connected with your team anywhere.",

    downloadExe: "Download .exe",
    downloadDmg: "Download .dmg",

    qrTitle: "Quick Install",
    qrText:
      "Scan the QR code to download the mobile version instantly or open the link manually.",
    qrAlt: "TeamFlow QR code",
    qrNote: "Tap or scan — same result.",

    techTitle: "Technical Requirements",
    req1: "Windows 10+ / macOS 13+ / Android 10+ / iOS 15+",
    req2: "At least 200 MB of free storage",
    req3: "Stable internet connection for sync",
  },

  contact: {
    title: "Contact Us",
    subtitle:
      "Got a question, idea, or suggestion? Our team reads every message and replies as soon as possible.",

    emailTitle: "Email",
    emailValue: "support@teamflow.app",
    officeTitle: "Office",
    officeValue: "Kyiv, Ukraine / Remote 🌍",
    hoursTitle: "Working Hours",
    hoursValue: "Mon–Fri, 09:00–18:00 (UTC+3)",

    formTitle: "Send Us a Message",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email *",
    emailPlaceholder: "example@gmail.com",
    messageLabel: "Message *",
    messagePlaceholder: "Write your question or feedback here...",
    sendButton: "Send",
    sentMsg: "✅ Message sent! We’ll get back to you soon.",

    mapTitle: "We’re on the map",
  },

  terms: {
    title: "Terms of Service",
    updated: "Updated: October 20, 2025 — version 2.0.1 (“we warned you”)",

    sec1Title: "1. Acceptance of Terms",
    sec1Text: [
      "By using TeamFlow, you agree to these Terms. If you disagree — you’ll probably still have to agree anyway.",
      "Please read carefully (we know you won’t, but we must say this).",
    ],

    sec2Title: "2. Service Description",
    sec2Text: [
      "TeamFlow provides tools for teamwork, scheduling, chatting, and minor procrastination.",
      "We may change the design, features, colors, or even purpose of existence without notice.",
    ],

    sec3Title: "3. User Registration",
    sec3Text: [
      "To use the service, you must create an account. Please don’t use ‘123456’ or ‘qwerty’.",
      "You’re responsible for keeping your password safe. Forgot it? Click ‘Forgot password?’ and try again.",
    ],

    sec4Title: "4. Use of Service",
    sec4Text: [
      "You agree not to harm other users or our reputation.",
      "It’s forbidden to impersonate others, send spam, discuss pizza, or summon demons.",
      "If you break the rules — we may suspend your access and politely say ‘sure’.",
    ],

    sec5Title: "5. Liability",
    sec5Text: [
      "We do our best to keep things running, but even servers take lunch breaks.",
      "We’re not responsible for data loss, downtime, or cosmic events.",
      "If something goes wrong, write to us — we’ll read it while making coffee.",
    ],

    sec6Title: "6. Intellectual Property",
    sec6Text: [
      "All materials, code, and designs belong to TeamFlow.",
      "Unauthorized use will be punished by a disapproving look from our designer.",
    ],

    sec7Title: "7. Changes to Terms",
    sec7Text: [
      "We can update these Terms at any time. Changes take effect immediately.",
      "If you disagree — stop using the service. If not — everything’s fine.",
    ],

    sec8Title: "8. Hidden Clause (Not for Human Eyes)",
    sec8Text: [
      "By agreeing, you confirm awareness of consequences (and possibly grant us temporary metaphysical control).",
      "*gray(This clause is purely metaphysical. Or is it?)",
    ],

    sec9Title: "9. Jurisdiction",
    sec9Text: [
      "These Terms are governed by the laws of the Galactic Union and common sense.",
      "In case of disputes — we’ll make a meme about it.",
    ],

    sec10Title: "10. Final Provisions",
    sec10Text: [
      "Using the Platform means full and unconditional agreement.",
      "If you read this far — you should probably join our legal team.",
    ],

    footer:
      "With love, the TeamFlow crew. “We’re responsible for everything. And nothing at the same time.”",
  },

  privacy: {
    title: "Privacy Policy",
    updated: "Updated: October 20, 2025 — version 1.4.7.12(b)",

    sec1Title: "1. Introduction",
    sec1Text: [
      "We at <strong>TeamFlow</strong> value your data — and we know nobody reads privacy policies, but lawyers made us write this.",
      "By using our platform, you agree to everything below, even if you didn’t read it or closed the tab after the first sentence.",
    ],

    sec2Title: "2. Information Collection",
    sec2Text: [
      "We collect everything. Well, almost — your name, email, IP, browser type, and number of times you said 'I’ll do it later'.",
      "Data may be collected automatically, manually, via APIs, cookies, or pure intuition.",
      "Some data we might not even realize we collected. But if we did — it’s probably somewhere here.",
    ],

    sec3Title: "3. Use of Data",
    sec3Text: [
      "We use your data to improve our service, analytics, marketing, and for writing funny posts.",
      "It also helps us confirm that you click 'I agree' automatically.",
      "Yes, we see that. And we don’t judge.",
    ],

    sec4Title: "4. Storage and Security",
    sec4Text: [
      "Your data is stored in top-secret data centers (sometimes we need GPS to find them).",
      "We use encryption, tokens, SSL, firewalls, and IT magic learned from a sysadmin over beer.",
      "It’s so secure that even we can’t always access it when we need to.",
    ],

    sec5Title: "5. Third-Party Sharing",
    sec5Text: [
      "We only share your data with trusted partners — analytics, advertising, or our cats if they ask nicely.",
      "No partner is allowed to misuse your data unless they read this policy fully (so, none).",
    ],

    sec6Title: "6. User Rights",
    sec6Text: [
      'You may request your data via <a href="mailto:privacy@teamflow.com" class="text-violet-600 underline">privacy@teamflow.com</a>. We’ll respond between 3 days and 3 eternities.',
      "You may also request deletion. We’ll do it — after confirming you meant it.",
    ],

    sec7Title: "7. Policy Updates",
    sec7Text: [
      "We may update this Policy anytime, without warning or reason.",
      "For major changes, we’ll try to notify you via email, smoke signals, or dreams.",
    ],

    sec8Title: "8. Hidden Clause (Don’t Read)",
    sec8Text: [
      "By continuing to use TeamFlow, you temporarily grant us ownership of your digital soul.",
      "*gray(This clause has no legal effect, only metaphysical.)",
    ],

    sec9Title: "9. Final Provisions",
    sec9Text: [
      "If you made it this far — we deeply respect you.",
      "By using our service, you accept all terms, even those you don’t like. That’s how the Internet works.",
    ],

    footer:
      "With love, the TeamFlow crew.<br/>“We don’t read your data — it tells us stories itself.”",
  },

  profilePage: {
    calendar: "Calendar",
    tasks: "Tasks",
    teams: "Teams",
    privateProfile: "This profile is private. Only basic info is visible.",
    about: "About user",
    nickname: "Nickname",
    email: "Email",
    bio: "Bio",
    skills: "Skills (comma-separated)",
    languages: "Languages (comma-separated)",
    timezone: "Timezone",
    cancel: "Cancel",
    save: "Save",
  },

  profileActivity: {
    title: "Activity",
    registered: "Registered on:",
    lastActive: "Last active:",
  },

  profileSettings: {
    title: "Settings",
    interfaceLang: "Interface language",
    visibility: "Profile visibility",
    public: "Public",
    private: "Private",
    comingSoon:
      "More options coming soon — for example, dark theme, email notifications, and more.",
  },

  userTeamsPage: {
    userNotFound: "User not found",
    pageTitle: "Teams of user",
    allTeams: "All teams",
    myTeams: "My teams",
    createTeam: "Create team",
    searchPlaceholder: "Search for a team...",
    newTeam: "New team",
    teamName: "Team name",
    description: "Description",
    avatar: "Team avatar",
    create: "Create",
    noTeams: "No teams found 😢",
    noDescription: "No description",
    enterName: "Please enter a team name",
    teamCreated: "Team created",
    calendarPrefix: "Team calendar",
  },

  myTeam: {
    title: "Our Team",
    name: "Andrii Andrusyevych",
    role: "Fullstack Developer",
    bio: `I’m the creator and developer of TeamFlow — a platform for efficient team collaboration. 
My goal is to merge calendar, task management, chat, and video calling 
into one ecosystem where teams can work seamlessly and transparently.

On the backend, I use C++ for maximum performance, 
and on the frontend — React with TypeScript to build a clean, animated UI. 
I also design the PostgreSQL 17 database, implement JWT authentication, 
and develop real-time modules for chat and calendar synchronization.`,

    stackTitle: "My Tech Stack",
    cpp: "Core backend logic and API architecture.",
    react: "Frontend UI, animations, and routing logic.",
    postgres: "Complex relational structures and query optimization.",
    jwt: "Secure authentication and session management.",
    webrtc: "Real-time video and audio communication.",
    tailwind: "Modern, flexible design without bloat.",

    aboutProjectTitle: "About TeamFlow",
    aboutProject: `TeamFlow is a personal project evolving into a new-generation 
teamwork platform. It unites calendar, task management, chat, 
point system, and user profiles into a single ecosystem. 
The goal — to make teamwork not only productive but enjoyable.`,
  },

  tasksPage: {
    title: "Tasks",
    all: "All",
    active: "Active",
    done: "Completed",
    noTasks: "No tasks in this category",
    forOwner: "Tasks for {{owner}}",
    notFound: "Calendar or owner not found",
    statusCompleted: "✅ completed",
    statusActive: "🕒 in progress",
    markDone: "Done",
    undo: "Undo",
    delete: "Delete",
    confirmDeleteTitle: "Delete task?",
    confirmDeleteText: `"{{title}}" will be permanently deleted.`,
    cancel: "Cancel",
    confirm: "Delete",
  },

  monthPage: {
    loading: "⏳ Loading calendar...",
    notFound: "Calendar not found",
    badRequest: "Invalid request",
    today: "Today",
    previousMonth: "Previous month",
    nextMonth: "Next month",
    previousDay: "Previous day",
    nextDay: "Next day",
    goToDay: "Go to day",
    goToWeek: "Go to week",
    months: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },

  createItemModal: {
    tabMain: "Main",
    tabParticipants: "Participants",
    tabSettings: "Settings",

    fieldTitle: "Title",
    fieldDescription: "Description",
    fieldColor: "Color",
    fieldType: "Type",
    fieldStart: "Start",
    fieldEnd: "End",
    fieldDuration: "Duration",

    typeTask: "Task",
    typeEvent: "Event",

    errorTitleRequired: "Please enter a title",
    errorInvalidDate: "Start date cannot be after end date",

    actionFixDate: "Fix",
    actionSave: "Save",
    actionSelectParticipants: "Select participants",
    actionYou: "(you)",

    settingsNote: "Settings (recurrence, status, etc.)",
  },

  taskModal: {
    tabMain: "Main",
    tabParticipants: "Participants",
    tabSettings: "Settings",

    owner: "owner",
    noParticipants: "No participants assigned",
    settingsUnavailable: "Settings are not available yet",
    participantsEdit: "Edit participants",
    participantsSelect: "Select participants",
    profile: "Profile",
    message: "Message",
    save: "Save",
    dueDate: "Due date",
  },

  
};
