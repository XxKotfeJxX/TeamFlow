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

  blog: {
    title: "Blog",
    readMore: "Czytaj dalej",

    post1Title: "5 sposobów, aby uniknąć chaosu w pracy zespołowej",
    post1Date: "10 października 2025",
    post1Excerpt:
      "Jak uporządkować zadania, komunikację i planowanie, aby zespół działał jak jeden organizm.",

    post2Title: "Jak stworzyliśmy kalendarz z podwójnym poziomem dostępu",
    post2Date: "25 września 2025",
    post2Excerpt:
      "Dzielimy się doświadczeniem tworzenia systemu, w którym wydarzenia osobiste nie kolidują z zespołowymi.",

    post3Title: "TeamFlow + GitHub: pierwsza integracja już działa",
    post3Date: "3 września 2025",
    post3Excerpt:
      "Teraz możesz zobaczyć status commitów i pull requestów bezpośrednio w przestrzeni zespołu.",

    post4Title: "Psychologia skupienia: jak nie rozpraszać się w zespole",
    post4Date: "1 sierpnia 2025",
    post4Excerpt:
      "Zbadaliśmy, jak głębokie skupienie pomaga zespołom pracować szybciej i efektywniej.",
  },

  blogCalendar: {
    heroTitle: "Jak stworzyliśmy kalendarz z podwójnym poziomem dostępu",
    heroDate: "25 września 2025 · Zespół TeamFlow",
    heroAlt: "Kalendarz TeamFlow",
    diagramAlt: "Schemat poziomów dostępu",

    intro:
      "W TeamFlow chcieliśmy stworzyć kalendarz, który nie jest tylko listą wydarzeń, ale inteligentnym asystentem zespołu. Główny pomysł — umożliwić zarządzanie <b>osobistymi</b> i <b>zespołowymi</b> wydarzeniami w jednym miejscu, zachowując prywatność.",

    sec1Title: "1. Dwa poziomy widoczności — przejrzyście, ale prywatnie",
    sec1Text:
      "Podzieliliśmy wydarzenia na <b>osobiste</b> (widoczne tylko dla użytkownika) i <b>zespołowe</b> (wspólne dla wszystkich). Inni widzą, że jesteś zajęty, ale nie znają szczegółów prywatnych spotkań.",
    sec1ImgAlt: "Wydarzenia prywatne i zespołowe",

    sec2Title: "2. Automatyczne wykrywanie konfliktów",
    sec2Text:
      "Jeśli dodasz wydarzenie, które pokrywa się z innym, system natychmiast powiadomi o konflikcie.",

    sec3Title: "3. Kolory, tagi i filtry",
    sec3Text:
      "Dodaliśmy wizualne oznaczenia — kolory i tagi, aby łatwo odróżniać „Pracę”, „Prywatne” i „Czas skupienia”.",
    sec3ImgAlt: "Kolory i tagi wydarzeń",

    sec4Title: "4. Potwierdzenie uczestnictwa",
    sec4Text:
      "Podczas tworzenia wydarzenia zespołowego uczestnicy otrzymują zaproszenia z opcją potwierdzenia lub odrzucenia udziału.",
    sec4ImgAlt: "Potwierdzenie uczestnictwa",

    sec5Title: "5. Integracja z innymi narzędziami",
    sec5Text:
      "Planujemy integrację z GitHub, Google Calendar i Notion, aby wszystkie zobowiązania były w jednym miejscu.",

    quote:
      "„Kalendarz to nie tylko lista wydarzeń. To lustro twojej uwagi. Kiedy jest dobrze zorganizowany — zespół działa jak zegar.”",

    backButton: "Powrót do bloga",
  },

  blogFocus: {
    heroTitle: "Psychologia skupienia: jak nie rozpraszać się w zespole",
    heroDate: "1 sierpnia 2025 · Zespół TeamFlow",
    heroAlt: "Skupienie w zespole",
    intro:
      "W erze ciągłych powiadomień i czatów prawdziwą supermocą jest skupienie. Zespoły, które potrafią się koncentrować, osiągają więcej mniejszym wysiłkiem. W TeamFlow zbadaliśmy, jak pomóc ludziom wejść w stan głębokiego skupienia nawet w środowisku zespołowym.",
    introImgAlt: "Skupiony zespół",

    sec1Title: "1. Wejście w „strefę skupienia”",
    sec1Text:
      "Stworzyliśmy tryb 'Focus Mode' — 90 minut pełnego zanurzenia bez rozpraszania. System automatycznie informuje zespół, że jesteś skupiony.",

    sec2Title: "2. Poranne rytuały",
    sec2Text:
      "Krótki poranny check-in pomaga ustalić priorytety. W TeamFlow możesz zaznaczyć główne cele dnia bezpośrednio w kalendarzu.",
    sec2ImgAlt: "Poranne rytuały skupienia",

    sec3Title: "3. Mikropauzy między zadaniami",
    sec3Text:
      "Aby pozostać skupionym, trzeba też umieć się rozluźnić. TeamFlow sugeruje krótkie przerwy między zadaniami: rozciąganie, oddech, zmiana wizualna.",
    sec3ImgAlt: "Mikropauzy między zadaniami",

    sec4Title: "4. Wizualna cisza",
    sec4Text:
      "Uprościliśmy interfejs — minimalizm w kolorach i strukturze pomaga mózgowi odpocząć. W trybie Focus widoczne są tylko zadania, czas i cel.",
    sec4ImgAlt: "Interfejs w trybie skupienia",

    sec5Title: "5. Kultura spokoju w zespole",
    sec5Text:
      "Skupienie to nie tylko narzędzia, ale też kultura. Praktykujemy 'quiet Fridays' — dni bez spotkań i czatów. Wynik: +27% ukończonych zadań i mniej przerwanych sprintów.",

    quote:
      "„Prawdziwe skupienie to nie izolacja, ale świadomy wybór bycia obecnym. My tylko pomagamy stworzyć przestrzeń do tego.”",

    backButton: "Powrót do bloga",
  },

  blogGithub: {
    heroTitle: "TeamFlow + GitHub: pierwsza integracja już działa",
    heroDate: "3 września 2025 · Zespół TeamFlow",
    heroAlt: "Integracja z GitHub",
    intro:
      "Uruchomiliśmy pierwszą wersję integracji z GitHub — teraz możesz zobaczyć aktywność repozytorium, status pull requestów i commitów bezpośrednio w TeamFlow.",
    introImgAlt: "Integracja TeamFlow + GitHub",

    sec1Title: "1. Commity obok zadań",
    sec1Text:
      "GitHub API jest zsynchronizowane z zadaniami TeamFlow. Przy każdym zadaniu widać powiązane commity. Po zamknięciu zadania system sprawdza, czy zmiany zostały wypchnięte.",
    sec1ImgAlt: "Commity w zadaniach TeamFlow",

    sec2Title: "2. Pull Requesty w Twojej przestrzeni",
    sec2Text:
      "Panel “Pull Requests” pokazuje wszystkie otwarte PR-y. Możesz komentować, sprawdzać status CI i akceptować zmiany bez wychodzenia z TeamFlow.",

    sec3Title: "3. Powiadomienia bez szumu",
    sec3Text:
      "Wszystkie zdarzenia GitHub — commity, recenzje, komentarze — pojawiają się w strumieniu aktywności. Widzisz tylko to, co Cię dotyczy.",
    sec3ImgAlt: "Powiadomienia GitHub w TeamFlow",

    sec4Title: "4. Architektura integracji",
    sec4Text:
      "Korzystamy z GitHub REST API i webhooków. Zapytania przechodzą przez bramę API w C++ z autoryzacją OAuth 2.0 i pamięcią podręczną PostgreSQL.",

    sec5Title: "5. Plany na przyszłość",
    sec5Text:
      "Wkrótce wsparcie dla GitLab i Bitbucket. Chcemy, aby TeamFlow było uniwersalnym centrum zarządzania projektami.",

    quote:
      "„Integracja to nie liczba przycisków, lecz czas, który oszczędzasz na przełączaniu się między narzędziami. GitHub + TeamFlow — właśnie o to chodzi.”",

    backButton: "Powrót do bloga",
  },

  blogTeamwork: {
    heroTitle: "5 sposobów, aby uniknąć chaosu w pracy zespołowej",
    heroDate: "10 października 2025 · Zespół TeamFlow",
    heroAlt: "Praca zespołowa",

    sec1Title: "1. Jedno źródło prawdy dla zadań",
    sec1Text:
      "Chaos zaczyna się, gdy każdy prowadzi własną listę zadań. TeamFlow umożliwia wspólną tablicę z terminami, priorytetami i odpowiedzialnymi osobami. To eliminuje zamieszanie i zwiększa przejrzystość.",
    sec1ImgAlt: "Lista zadań TeamFlow",

    sec2Title: "2. Przejrzysty kalendarz wydarzeń",
    sec2Text:
      "Kalendarz łączy wydarzenia osobiste i zespołowe. System automatycznie wykrywa konflikty i pomaga zarządzać priorytetami za pomocą kolorów i tagów.",

    sec3Title: "3. Asynchroniczna komunikacja bez szumu",
    sec3Text:
      "Zamiast niekończących się czatów TeamFlow używa wątków tematycznych, które można zwijać, oznaczać jako „rozwiązane” i łatwo przeglądać ponownie.",
    sec3ImgAlt: "Komunikacja bez szumu",

    sec4Title: "4. Wizualny postęp i punkty zespołu",
    sec4Text:
      "Każde ukończone zadanie dodaje punkty zespołowi. To element grywalizacji, który motywuje do działania. Testujemy system sezonowych wyzwań.",

    sec5Title: "5. Rytuały skupienia",
    sec5Text:
      "Tryb ciszy — 90 minut bez powiadomień i połączeń. Skupienie zwiększa efektywność pracy o 40%.",
    sec5ImgAlt: "Skupienie w pracy",

    quote:
      "„Chaos można uniknąć tylko wtedy, gdy zespół widzi jeden obraz — zadania, wydarzenia, komunikację i wyniki. TeamFlow właśnie w tym pomaga.”",

    backButton: "Powrót do bloga",
  },

  download: {
    title: "Pobierz TeamFlow",
    subtitle:
      "Uzyskaj dostęp do przestrzeni zespołowej w dowolnym miejscu. Pracuj offline, synchronizuj dane natychmiast, bądź w kontakcie bez przeglądarki.",

    windowsDesc:
      "Kompatybilna z Windows 10 i nowszymi. Obsługuje automatyczne aktualizacje i tryb offline.",
    macDesc:
      "Obsługuje Apple Silicon (M1, M2, M3). Zoptymalizowana dla macOS Sonoma i Ventura.",
    mobileTitle: "Urządzenia mobilne",
    mobileDesc:
      "Pobierz aplikację na swój telefon, aby być w kontakcie z zespołem wszędzie.",

    downloadExe: "Pobierz .exe",
    downloadDmg: "Pobierz .dmg",

    qrTitle: "Szybka instalacja",
    qrText:
      "Zeskanuj kod QR, aby natychmiast pobrać wersję mobilną lub otwórz link ręcznie.",
    qrAlt: "Kod QR TeamFlow",
    qrNote: "Kliknij lub zeskanuj — efekt ten sam.",

    techTitle: "Wymagania techniczne",
    req1: "Windows 10+ / macOS 13+ / Android 10+ / iOS 15+",
    req2: "Co najmniej 200 MB wolnego miejsca",
    req3: "Stabilne połączenie internetowe do synchronizacji",
  },

  contact: {
    title: "Skontaktuj się z nami",
    subtitle:
      "Masz pytanie, pomysł lub sugestię? Nasz zespół czyta każdą wiadomość i odpowiada tak szybko, jak to możliwe.",

    emailTitle: "E-mail",
    emailValue: "support@teamflow.app",
    officeTitle: "Biuro",
    officeValue: "Kijów, Ukraina / Zdalnie 🌍",
    hoursTitle: "Godziny pracy",
    hoursValue: "Pn–Pt, 09:00–18:00 (UTC+3)",

    formTitle: "Napisz do nas wiadomość",
    nameLabel: "Imię",
    namePlaceholder: "Twoje imię",
    emailLabel: "E-mail *",
    emailPlaceholder: "example@gmail.com",
    messageLabel: "Wiadomość *",
    messagePlaceholder: "Napisz tutaj swoje pytanie lub komentarz...",
    sendButton: "Wyślij",
    sentMsg: "✅ Wiadomość wysłana! Skontaktujemy się wkrótce.",

    mapTitle: "Znajdź nas na mapie",
  },
};
