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

  
};
