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
    footerNote:
      "TeamFlow — kompleksowa platforma dla nowoczesnych zespołów, łącząca kalendarz, zadania i komunikację w jednym miejscu.",
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
    ctaTitle: "Dołącz do naszego zespołu!",
    ctaSubtitle:
      "Cenimy inicjatywę, kreatywność i pasję do technologii. Twoja praca pomoże uczynić współpracę zespołową jeszcze wygodniejszą.",
    ctaButton: "Aplikuj teraz",
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

    ctaTitle: "Planuj bez chaosu",
    ctaText:
      "Wypróbuj TeamFlow i przekonaj się, jak łatwo można zarządzać wydarzeniami osobistymi i zespołowymi.",
    ctaButton: "Wypróbuj za darmo",
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

    ctaTitle: "Pozostań skupiony i zrównoważony",
    ctaText:
      "Wypróbuj Tryb Skupienia TeamFlow — spokojne środowisko dla głębokiej pracy i mądrych przerw.",
    ctaButton: "Wypróbuj za darmo",
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
    ctaTitle: "Pozostań skupiony i zrównoważony",
    ctaText:
      "Wypróbuj Tryb Skupienia TeamFlow — spokojne środowisko dla głębokiej pracy i mądrych przerw.",
    ctaButton: "Wypróbuj za darmo",
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
    ctaTitle: "Unikaj chaosu w pracy zespołowej",
    ctaText:
      "Wypróbuj TeamFlow i zobacz, jak uporządkowana współpraca może zwiększyć produktywność Twojego zespołu.",
    ctaButton: "Wypróbuj za darmo",
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

  terms: {
    title: "Warunki korzystania",
    updated:
      "Zaktualizowano: 20 października 2025 — wersja 2.0.1 (“ostrzegaliśmy”)",

    sec1Title: "1. Akceptacja warunków",
    sec1Text: [
      "Korzystając z TeamFlow, akceptujesz te warunki. Jeśli się nie zgadzasz — i tak musisz.",
      "Przeczytaj uważnie (wiemy, że nie przeczytasz, ale musimy to napisać).",
    ],

    sec2Title: "2. Opis usługi",
    sec2Text: [
      "TeamFlow oferuje narzędzia do pracy zespołowej, planowania, komunikacji i lekkiego odkładania terminów.",
      "Możemy w każdej chwili zmienić funkcje, kolory, design lub sens istnienia bez ostrzeżenia.",
    ],

    sec3Title: "3. Rejestracja użytkownika",
    sec3Text: [
      "Aby korzystać z serwisu, musisz utworzyć konto. Nie używaj hasła ‘123456’ ani ‘qwerty’.",
      "Odpowiadasz za bezpieczeństwo swojego hasła. Zapomniałeś? Kliknij „Zapomniałem hasła?”.",
    ],

    sec4Title: "4. Korzystanie z serwisu",
    sec4Text: [
      "Zobowiązujesz się nie szkodzić innym użytkownikom ani reputacji TeamFlow.",
      "Zakazane jest podszywanie się pod innych, rozsyłanie spamu, dyskutowanie o pizzy lub przywoływanie demonów.",
      "W przypadku naruszenia możemy zablokować dostęp i uprzejmie powiedzieć „oczywiście”.",
    ],

    sec5Title: "5. Odpowiedzialność",
    sec5Text: [
      "Staramy się, aby wszystko działało stabilnie, ale nawet serwery czasem idą na obiad.",
      "Nie ponosimy odpowiedzialności za utratę danych ani katastrofy kosmiczne.",
      "Jeśli coś pójdzie nie tak — napisz do nas, przeczytamy przy kawie.",
    ],

    sec6Title: "6. Własność intelektualna",
    sec6Text: [
      "Wszystkie materiały, kod i projekt należą do zespołu TeamFlow.",
      "Nieautoryzowane użycie będzie ukarane surowym spojrzeniem naszego projektanta.",
    ],

    sec7Title: "7. Zmiany warunków",
    sec7Text: [
      "Możemy zmieniać warunki w dowolnym momencie. Zmiany obowiązują natychmiast.",
      "Nie zgadzasz się? Nie korzystaj. Jeśli korzystasz — wszystko w porządku.",
    ],

    sec8Title: "8. Ukryty punkt (nie dla ludzkich oczu)",
    sec8Text: [
      "Akceptując te warunki, potwierdzasz świadomość konsekwencji (i być może oddajesz część swojej duszy).",
      "*gray(Ten punkt ma wyłącznie charakter metafizyczny. Ale kto wie?)",
    ],

    sec9Title: "9. Jurysdykcja",
    sec9Text: [
      "Warunki te podlegają prawom Związku Galaktycznego i zdrowemu rozsądkowi.",
      "W przypadku sporu — zrobimy z tego mema.",
    ],

    sec10Title: "10. Postanowienia końcowe",
    sec10Text: [
      "Korzystanie z platformy oznacza pełną zgodę na wszystkie punkty.",
      "Jeśli to przeczytałeś do końca — miejsce w dziale prawnym czeka.",
    ],

    footer:
      "Z miłością, zespół TeamFlow. „Odpowiadamy za wszystko. I jednocześnie za nic.”",
  },

  privacy: {
    title: "Polityka prywatności",
    updated: "Zaktualizowano: 20 października 2025 — wersja 1.4.7.12(b)",

    sec1Title: "1. Wstęp",
    sec1Text: [
      "My, zespół <strong>TeamFlow</strong>, wiemy, że twoje dane są ważne. Wiemy też, że nikt nie czyta polityk prywatności, ale prawnicy nas zmusili.",
      "Korzystając z platformy, akceptujesz wszystko poniżej — nawet jeśli nie przeczytałeś.",
    ],

    sec2Title: "2. Zbieranie informacji",
    sec2Text: [
      "Zbieramy wszystko. No, prawie wszystko — imię, e-mail, IP, typ przeglądarki i liczbę razy, gdy powiedziałeś 'zrobię to później'.",
      "Dane mogą być zbierane automatycznie, ręcznie, przez API, pliki cookie lub intuicję.",
      "Niektóre dane zbieramy nieświadomie, ale jeśli już — to z dumą je przechowujemy.",
    ],

    sec3Title: "3. Wykorzystanie danych",
    sec3Text: [
      "Używamy danych do ulepszania serwisu, analiz, marketingu i żartów w mediach społecznościowych.",
      "Dane pokazują nam, że automatycznie klikasz 'Zgadzam się'.",
      "Tak, widzimy to. I nie oceniamy.",
    ],

    sec4Title: "4. Przechowywanie i bezpieczeństwo",
    sec4Text: [
      "Twoje dane są przechowywane w supertajnych centrach danych (czasem ich szukamy z GPS).",
      "Używamy szyfrowania, tokenów, SSL, zapór i magii IT, której nauczył nas administrator przy piwie.",
      "Dane są tak bezpieczne, że czasem sami nie możemy się do nich dostać.",
    ],

    sec5Title: "5. Udostępnianie osobom trzecim",
    sec5Text: [
      "Dane udostępniamy tylko zaufanym partnerom — analityce, reklamie lub naszym kotom (jeśli poproszą).",
      "Żaden partner nie może ich nadużywać, jeśli nie przeczytał tej polityki do końca (czyli żaden).",
    ],

    sec6Title: "6. Prawa użytkownika",
    sec6Text: [
      'Możesz poprosić o swoje dane, pisząc na <a href="mailto:privacy@teamflow.com" class="text-violet-600 underline">privacy@teamflow.com</a>. Odpowiemy między 3 dniami a 3 wiecznościami.',
      "Możesz też poprosić o usunięcie danych — zrobimy to, gdy upewnimy się, że mówisz serio.",
    ],

    sec7Title: "7. Aktualizacje polityki",
    sec7Text: [
      "Możemy aktualizować tę politykę w dowolnym momencie, bez ostrzeżenia.",
      "W przypadku dużych zmian powiadomimy cię mailem, dymem lub we śnie.",
    ],

    sec8Title: "8. Ukryty punkt (nie czytaj)",
    sec8Text: [
      "Kontynuując korzystanie z TeamFlow, tymczasowo oddajesz nam swoją cyfrową duszę.",
      "*gray(Ten punkt nie ma skutków prawnych, tylko metafizyczne.)",
    ],

    sec9Title: "9. Postanowienia końcowe",
    sec9Text: [
      "Jeśli dotarłeś aż tutaj — szacunek.",
      "Korzystając z serwisu, akceptujesz wszystkie warunki, nawet te absurdalne. Tak działa Internet.",
    ],

    footer:
      "Z miłością, zespół TeamFlow.<br/>„Nie czytamy twoich danych — one same nam się zwierzają.”",
  },

  profilePage: {
    calendar: "Kalendarz",
    tasks: "Zadania",
    teams: "Zespoły",
    privateProfile:
      "Ten profil jest prywatny. Możesz zobaczyć tylko podstawowe informacje.",
    about: "O użytkowniku",
    nickname: "Nazwa użytkownika",
    email: "Email",
    bio: "Bio",
    skills: "Umiejętności (oddzielone przecinkami)",
    languages: "Języki (oddzielone przecinkami)",
    timezone: "Strefa czasowa",
    cancel: "Anuluj",
    save: "Zapisz",
  },

  profileActivity: {
    title: "Aktywność",
    registered: "Data rejestracji:",
    lastActive: "Ostatnia aktywność:",
  },

  profileSettings: {
    title: "Ustawienia",
    interfaceLang: "Język interfejsu",
    visibility: "Widoczność profilu",
    public: "Publiczny",
    private: "Prywatny",
    comingSoon:
      "Więcej opcji pojawi się wkrótce — np. tryb ciemny, powiadomienia e-mail itp.",
  },

  userTeamsPage: {
    userNotFound: "Nie znaleziono użytkownika",
    pageTitle: "Zespoły użytkownika",
    allTeams: "Wszystkie zespoły",
    myTeams: "Moje zespoły",
    createTeam: "Utwórz zespół",
    searchPlaceholder: "Szukaj zespołu...",
    newTeam: "Nowy zespół",
    teamName: "Nazwa zespołu",
    description: "Opis",
    avatar: "Avatar zespołu",
    create: "Utwórz",
    noTeams: "Nie znaleziono zespołów 😢",
    noDescription: "Brak opisu",
    enterName: "Wprowadź nazwę zespołu",
    teamCreated: "Zespół został utworzony",
    calendarPrefix: "Kalendarz zespołu",
  },

  myTeam: {
    title: "Nasz zespół",
    name: "Andrii Andrusyevych",
    role: "Fullstack Developer",
    bio: `Jestem twórcą i programistą platformy TeamFlow — systemu do skutecznej pracy zespołowej. 
Moim celem jest połączenie kalendarza, zadań, czatu i wideorozmów 
w jednym ekosystemie, w którym zespoły mogą działać szybko i przejrzyście.

Na backendzie używam C++ dla maksymalnej wydajności, 
a na frontendzie React z TypeScriptem, aby tworzyć nowoczesny interfejs. 
Projektuję również bazę danych PostgreSQL 17, wdrażam autentykację JWT 
i opracowuję moduły czatu i kalendarza w czasie rzeczywistym.`,
    stackTitle: "Mój stos technologiczny",
    cpp: "Główna logika backendu i architektura API.",
    react: "Interfejs użytkownika, animacje, logika routingu.",
    postgres: "Złożone struktury relacyjne i optymalizacja zapytań.",
    jwt: "Bezpieczna autentykacja i zarządzanie sesjami.",
    webrtc: "Komunikacja wideo i audio w czasie rzeczywistym.",
    tailwind: "Nowoczesny i elastyczny design bez nadmiaru.",
    aboutProjectTitle: "O TeamFlow",
    aboutProject: `TeamFlow to projekt rozwijający się w kierunku platformy 
nowej generacji do pracy zespołowej. Łączy kalendarz, zadania, czat, 
system punktowy i profile użytkowników w jednym miejscu. 
Celem jest uczynienie współpracy zespołowej nie tylko skuteczną, ale i przyjemną.`,
  },

  tasksPage: {
    title: "Zadania",
    all: "Wszystkie",
    active: "Aktywne",
    done: "Ukończone",
    noTasks: "Brak zadań w tej kategorii",
    forOwner: "Zadania dla {{owner}}",
    notFound: "Nie znaleziono kalendarza lub właściciela",
    statusCompleted: "✅ ukończone",
    statusActive: "🕒 w toku",
    markDone: "Gotowe",
    undo: "Cofnij",
    delete: "Usuń",
    confirmDeleteTitle: "Usunąć zadanie?",
    confirmDeleteText: `"{{title}}" zostanie trwale usunięte.`,
    cancel: "Anuluj",
    confirm: "Usuń",
  },

  monthPage: {
    loading: "⏳ Ładowanie kalendarza...",
    notFound: "Nie znaleziono kalendarza",
    badRequest: "Nieprawidłowe żądanie",
    today: "Dziś",
    previousMonth: "Poprzedni miesiąc",
    nextMonth: "Następny miesiąc",
    previousDay: "Poprzedni dzień",
    nextDay: "Następny dzień",
    goToDay: "Przejdź do dnia",
    goToWeek: "Przejdź do tygodnia",
    months: [
      "Styczeń",
      "Luty",
      "Marzec",
      "Kwiecień",
      "Maj",
      "Czerwiec",
      "Lipiec",
      "Sierpień",
      "Wrzesień",
      "Październik",
      "Listopad",
      "Grudzień",
    ],
  },
};
