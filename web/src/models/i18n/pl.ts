export default {
  footer: {
    product: "Produkt",
    features: "Funkcje",
    pricing: "Ceny",
    download: "Pobierz",
    company: "Firma",
    about: "O nas",
    blog: "Blog",
    career: "Kariera",
    support: "Wsparcie",
    help: "Pomoc",
    contact: "Kontakt",
    docs: "Dokumentacja",
    followUs: "Śledź nas",
    langLabel: "Język strony",
    rights: "Wszelkie prawa zastrzeżone",
    privacy: "Polityka prywatności",
    terms: "Warunki korzystania",
  },

  header: {
    product: "Produkt",
    overview: "Przegląd",
    features: "Funkcje",
    pricing: "Ceny",

    company: "Firma",
    about: "O nas",
    team: "Zespół",
    career: "Kariera",

    resources: "Zasoby",
    blog: "Blog",
    support: "Wsparcie",
    docs: "Dokumentacja",

    mySpace: "Moja przestrzeń",
    calendar: "Kalendarz",
    tasks: "Zadania",
    teams: "Zespoły",

    login: "Zaloguj się",
    register: "Zarejestruj się",
    logout: "Wyloguj się",
    menu: "Menu",
  },

  home: {
    heroTitle: "Praca zespołowa — <highlight>bez chaosu</highlight>",
    heroText:
      "TeamFlow łączy zadania, kalendarze, czaty i narzędzia w jednej przestrzeni do produktywnej pracy zespołowej.",
    tryFree: "Wypróbuj za darmo",
    learnMore: "Dowiedz się więcej",

    features: [
      {
        title: "Potężny menedżer zadań",
        desc: "Elastyczny Kanban, terminy, przypisania i śledzenie postępów — wszystko w jednym miejscu.",
      },
      {
        title: "Interaktywne kalendarze",
        desc: "Wydarzenia osobiste i zespołowe z synchronizacją. Pracuj i planuj z łatwością.",
      },
      {
        title: "Wbudowany czat i połączenia",
        desc: "Komunikuj się w czasie rzeczywistym z obsługą rozmów grupowych i wiadomości.",
      },
    ],

    ctaTitle: "Gotowy dołączyć do TeamFlow?",
    ctaText:
      "Zarejestruj się dziś i zacznij zarządzać swoimi projektami jak profesjonalista.",
    createAccount: "Utwórz konto",
  },

  overview: {
    heroTitle: "Praca zespołowa bez chaosu",
    heroText:
      "Kalendarz, zadania, czaty i połączenia — wszystko w jednym miejscu. Pracuj synchronicznie z zespołem gdziekolwiek jesteś.",
    tryFree: "Wypróbuj za darmo",
    demo: "Tryb demo",

    whyTitle: "Dlaczego TeamFlow?",
    features: [
      {
        title: "Inteligentny kalendarz",
        desc: "Planuj wydarzenia bez konfliktów między harmonogramem osobistym a zespołowym.",
      },
      {
        title: "Motywujące zadania",
        desc: "Wykonuj zadania, zdobywaj punkty i rozwijaj zespół.",
      },
      {
        title: "Komunikacja bez hałasu",
        desc: "Rozmawiaj w wbudowanych czatach bez potrzeby zewnętrznych komunikatorów.",
      },
      {
        title: "Bezpieczna platforma",
        desc: "Tokeny JWT, szyfrowanie i kontrola dostępu zapewniają bezpieczeństwo.",
      },
    ],

    ctaTitle: "Gotowy wypróbować TeamFlow?",
    ctaText: "Zacznij pracować z zespołem efektywniej już dziś.",
    join: "Dołącz",
  },

  features: {
    title: "Funkcje TeamFlow",
    sections: [
      {
        title: "Kalendarz",
        points: [
          "Kalendarz osobisty i zespołowy w jednym miejscu.",
          "Sprawdzanie konfliktów między wydarzeniami.",
          "Kolory, priorytety, tagi i potwierdzenia udziału.",
        ],
      },
      {
        title: "Zadania",
        points: [
          "Listy zadań na dzień, tydzień lub sprint.",
          "System punktów i osiągnięć.",
          "Komentarze, terminy i wspólna praca.",
        ],
      },
      {
        title: "Komunikacja",
        points: [
          "Czaty tekstowe dla zespołów i projektów.",
          "Wiadomości błyskawiczne, wzmianki i reakcje (w przygotowaniu).",
          "Bez potrzeby używania zewnętrznych komunikatorów.",
        ],
      },
      {
        title: "Bezpieczeństwo",
        points: [
          "Uwierzytelnianie przez tokeny JWT.",
          "Haszowanie haseł i szyfrowane połączenia.",
          "Kontrola dostępu do danych prywatnych.",
        ],
      },
      {
        title: "Integracje",
        points: [
          "GitHub — automatyczne aktualizacje zadań na podstawie commitów.",
          "Edytory kodu — wspólna praca w czasie rzeczywistym (planowane).",
          "Google Calendar, Slack — przyszłe integracje.",
        ],
      },
      {
        title: "Stos technologiczny",
        points: [
          "Frontend: React + TypeScript",
          "Backend: C++",
          "Baza danych: PostgreSQL 17",
        ],
      },
    ],
  },

  pricing: {
    title: "Cennik TeamFlow",
    currentPlan: "Twój obecny plan",
    select: "Wybierz",
    free: "Darmowy",
    perMonth: "/miesiąc",
    perYear: "lub ${{price}}/rok",
    studentDiscount: "Dostępna zniżka studencka",
    plans: [
      {
        name: "Base",
        priceMonth: 0,
        priceYear: 0,
        features: [
          "Ograniczona liczba tablic",
          "Ograniczone czaty",
          "Automatyzacja zadań — niedostępna",
          "Wsparcie zespołów — niedostępne",
        ],
      },
      {
        name: "Lite",
        priceMonth: 5,
        priceYear: 50,
        studentDiscount: true,
        features: [
          "Nieograniczone tablice",
          "Czaty",
          "Automatyzacja zadań",
          "Wsparcie zespołów — niedostępne",
        ],
      },
      {
        name: "Pro",
        priceMonth: 10,
        priceYear: 100,
        studentDiscount: true,
        features: [
          "Nieograniczone tablice",
          "Czaty",
          "Automatyzacja zadań",
          "Wsparcie zespołów",
          "Zaawansowana analityka",
        ],
      },
      {
        name: "Enterprise",
        priceMonth: 45,
        priceYear: 450,
        features: [
          "Nieograniczone tablice",
          "Czaty",
          "Automatyzacja zadań",
          "Wsparcie zespołów",
          "Zaawansowana analityka",
          "Wiele kont w subskrypcji",
          "Priorytetowe wsparcie",
        ],
      },
    ],
  },

  payment: {
    title: "Płatność za plan",
    card: "Karta",
    paypal: "PayPal",
    nameLabel: "Imię właściciela karty",
    namePlaceholder: "Jan Kowalski",
    numberLabel: "Numer karty",
    expiryLabel: "Data ważności",
    cvvLabel: "CVV",
    invalidCard: "Nieprawidłowy numer karty (sprawdzenie Luhna)",
    invalidDate: "Karta nieważna (sprawdź datę ważności)",
    nameError: "Wprowadź imię właściciela karty",
    numberError: "Nieprawidłowy numer karty",
    luhnError: "Nieprawidłowy numer karty (sprawdzenie Luhna)",
    expiryError: "Nieprawidłowa data ważności",
    cvvError: "CVV musi zawierać 3 cyfry",
    payButton: "Zapłać",
    redirectInfo: "Zostaniesz przekierowany do PayPal, aby zakończyć płatność.",
    redirectButton: "Przejdź do PayPal",
    close: "Zamknij",
  },

  confirm: {
    title: "Potwierdzenie",
    message:
      "Twój obecny plan ma więcej funkcji. Czy na pewno chcesz przejść na <b>{plan}</b>?",
    yes: "Tak",
    no: "Nie",
  },
};
