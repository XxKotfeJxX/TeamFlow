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

  about: {
    title: "O TeamFlow",
    subtitle:
      "Platforma dla zespołów, które chcą pracować razem, a nie tylko obok siebie.",
    p1: "Tworzymy <strong>TeamFlow</strong> — platformę, która łączy kalendarze, zadania, czaty i wideorozmowy w jednym miejscu.",
    p2: "Pomysł powstał z chęci uczynienia współpracy w zespołach bardziej uporządkowaną i przejrzystą. Wierzymy, że skuteczna komunikacja to klucz do sukcesu każdego projektu.",
    p3: "Naszym celem jest <span class='font-semibold'>produktywność, przejrzystość i prostota</span>. Tworzymy narzędzia, które inspirują, a nie przytłaczają.",
    highlight1Title: "Współpraca bez chaosu",
    highlight1Desc:
      "Dążymy do tego, aby współpraca w zespole była prosta, wygodna i przejrzysta.",
    highlight2Title: "Skupienie na wynikach",
    highlight2Desc: "Każda funkcja TeamFlow pomaga skutecznie osiągać cele.",
    highlight3Title: "Inspiracja do rozwoju",
    highlight3Desc:
      "Budujemy produkt, który motywuje zespoły do wspólnego rozwoju.",
    cta: "Dołącz do zespołu",
  },

  career: {
    title: "Kariera",
    subtitle:
      "Szukamy ludzi, którzy chcą rozwijać się razem z nami. Jeśli pasjonuje Cię tworzenie nowoczesnych narzędzi do pracy zespołowej — dołącz do TeamFlow!",
    frontendTitle: "Frontend Intern",
    frontendDesc: "Tworzenie komponentów w React i optymalizacja UI/UX.",
    backendTitle: "Backend Developer (C++)",
    backendDesc: "Tworzenie REST API, autoryzacji i obsługi danych PostgreSQL.",
    qaTitle: "QA Engineer",
    qaDesc: "Automatyczne testowanie modułów klienckich i serwerowych.",
    applyButton: "Wyślij CV",
  },

  docs: {
    title: "Dokumentacja API",
    version: "Wersja API",

    authTitle: "🔑 Uwierzytelnianie",
    authDesc: "Tokeny JWT, logowanie, rejestracja i odświeżanie tokenów.",

    calendarTitle: "📅 API Kalendarza",
    calendarDesc: "Tworzenie, edycja i usuwanie wydarzeń w kalendarzu zespołu.",

    tasksTitle: "✅ Zadania",
    tasksDesc: "Praca z zadaniami, terminami i punktami zespołowymi.",

    messagesTitle: "💬 Wiadomości",
    messagesDesc: "Czaty tekstowe z możliwością wspominania użytkowników.",
  },

  support: {
    title: "Wsparcie TeamFlow",
    intro:
      "Tutaj znajdziesz odpowiedzi na najczęstsze pytania. Jeśli potrzebujesz pomocy — nasz zespół jest zawsze gotowy 💙",
    noAnswer: "Nie znalazłeś odpowiedzi?",
    contactButton: "Napisz do wsparcia",

    q1: "Jak utworzyć nowy zespół?",
    a1: "Przejdź do swojego profilu, kliknij <b>„Utwórz zespół”</b> i wpisz jego nazwę. Następnie zaproś członków przez email.",

    q2: "Jak zaprosić użytkownika?",
    a2: "W zakładce <b>„Zespół”</b> wybierz opcję „Zaproś” i podaj email. Użytkownik otrzyma zaproszenie na pocztę.",

    q3: "Jak zmienić strefę czasową w kalendarzu?",
    a3: "Przejdź do <b>„Ustawienia profilu”</b> → „Strefa czasowa” i wybierz swój region. Wydarzenia zsynchronizują się automatycznie.",

    q4: "Jak zmienić lub zresetować hasło?",
    a4: "Na ekranie logowania kliknij <b>„Zapomniałem hasła”</b>, wpisz swój email, a wyślemy link do odzyskania dostępu.",

    q5: "Dlaczego nie otrzymałem zaproszenia do zespołu?",
    a5: "Sprawdź folder <b>„Spam”</b> lub poproś o ponowne wysłanie zaproszenia. Jeśli problem nadal występuje — napisz do nas.",

    q6: "Czy mogę korzystać z TeamFlow za darmo?",
    a6: "Tak, plan <b>Base</b> jest darmowy i zawiera podstawowe funkcje: kalendarz, zadania, czaty i tworzenie zespołów.",

    q7: "Jak uaktualnić plan do Pro lub Enterprise?",
    a7: "Przejdź do zakładki <b>„Cennik”</b> i wybierz odpowiedni plan. Płatność odbywa się bezpiecznie przez nasz system.",
  },

  
};
