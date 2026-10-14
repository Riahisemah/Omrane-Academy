/**
 * French copy — the reference dictionary. Its shape defines `Messages`;
 * every other language must provide exactly the same keys.
 */
export const fr = {
  meta: {
    dir: 'ltr' as 'ltr' | 'rtl',
    ogLocale: 'fr_FR',
    /** Shown on the switcher: the *other* language, in that language. */
    switchLabel: 'العربية',
    switchShort: 'عربي',
    switchAria: 'Afficher le site en arabe',
  },

  brand: {
    slogan: 'Le chemin vers la réussite',
    area: 'El Omrane Supérieur',
    city: 'Tunis',
    country: 'Tunisie',
  },

  nav: {
    home: 'Accueil',
    programmes: 'Programmes',
    approach: 'Notre approche',
    about: 'À propos',
    contact: 'Contact',
    cta: 'Nous contacter',
    mainAria: 'Navigation principale',
    mobileAria: 'Navigation mobile',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    skip: 'Aller au contenu',
    homeAria: 'Omrane Academy — accueil',
    breadcrumbAria: 'Fil d’Ariane',
  },

  common: {
    learnMore: 'En savoir plus',
    seeOnMap: 'Voir sur la carte',
    mapsNewTab: '(ouvre Google Maps dans un nouvel onglet)',
    newTab: '(nouvel onglet)',
    whatsapp: 'WhatsApp',
    whatsappNewTab: '(ouvre WhatsApp dans un nouvel onglet)',
    facebook: 'Facebook',
    facebookPage: 'Page Omrane Academy',
    facebookNewTab: '(ouvre Facebook dans un nouvel onglet)',
  },

  footer: {
    tagline: 'Soutien scolaire du primaire au lycée et initiation à l’informatique.',
    siteHeading: 'Le site',
    pagesAria: 'Pages du site',
    findUs: 'Où nous trouver',
    photos: 'Photographies :',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },

  cta: {
    title: 'Préparons ensemble la réussite de demain.',
    text: 'Vous souhaitez en savoir plus sur nos programmes et les prochaines étapes ? Contactez-nous pour échanger.',
    button: 'Contacter Omrane Academy',
  },

  home: {
    seoTitle: 'Omrane Academy — Soutien scolaire et informatique à El Omrane Supérieur, Tunis',
    seoDescription:
      'Omrane Academy, projet de centre éducatif à El Omrane Supérieur (Tunis) : soutien scolaire pour le primaire, le collège et le lycée, et initiation à l’informatique.',
    eyebrow: 'ACCOMPAGNEMENT SCOLAIRE & NUMÉRIQUE',
    title: 'Chaque élève a le potentiel de réussir.',
    lead: 'Un accompagnement adapté au primaire, au collège et au lycée, pour progresser avec confiance et développer de nouvelles compétences.',
    ctaPrograms: 'Découvrir nos programmes',
    ctaContact: 'Nous contacter',
    heroAlt: 'Des lycéens attentifs en classe ; une élève, cahiers à la main, sourit en écoutant',
    programs: {
      title: 'Des solutions pour apprendre et progresser.',
      intro: 'Trois accompagnements, pensés pour chaque étape de la scolarité et pour l’ouverture au numérique.',
      primaire: {
        title: 'Soutien scolaire — Primaire',
        text: 'Accompagner les élèves dans l’apprentissage des fondamentaux et les aider à construire des bases solides.',
      },
      collegeLycee: {
        title: 'Soutien scolaire — Collège & Lycée',
        text: 'Renforcer les acquis, mieux comprendre les cours et préparer les évaluations avec davantage de confiance.',
      },
      informatique: {
        title: 'Initiation à l’informatique',
        text: 'Découvrir les outils numériques, apprendre les bases de l’informatique et développer de nouvelles compétences.',
      },
    },
    approach: {
      title: 'Apprendre à son rythme. Progresser avec confiance.',
      intro: 'Trois principes guident notre manière d’accompagner les élèves, quel que soit leur niveau.',
      imageAlt: 'Trois jeunes travaillent ensemble autour d’une table, ordinateurs ouverts, dans une ambiance détendue',
      link: 'Découvrir notre approche',
    },
    about: {
      title: 'Bienvenue chez Omrane Academy',
      text: 'Omrane Academy est un projet de centre éducatif à El Omrane Supérieur, Tunis. Notre ambition est de proposer un environnement accueillant où les élèves peuvent renforcer leurs connaissances scolaires et découvrir les outils numériques.',
      imageAlt: 'Une salle de classe lumineuse : des élèves à leur table écoutent l’enseignant au tableau',
      link: 'En savoir plus sur le projet',
    },
    contact: {
      title: 'Une question ? Écrivez-nous.',
      text: 'Indiquez-nous le niveau de l’élève et ce que vous recherchez. Nous pourrons ainsi échanger sur ses besoins et sur nos programmes.',
      direct: 'Ou écrivez-nous directement',
    },
  },

  programs: {
    primaire: {
      title: 'Soutien scolaire — Primaire',
      level: 'Primaire',
      short: 'Primaire',
      summary:
        'Accompagner les élèves dans l’apprentissage des fondamentaux et les aider à construire des bases solides.',
      aims: [
        'Reprendre calmement les notions vues en classe',
        'Consolider les fondamentaux, étape par étape',
        'Prendre de bonnes habitudes de travail',
        'Gagner en assurance face aux exercices',
      ],
      imageAlt: 'Des enfants de primaire concentrés sur leurs exercices autour d’une table de classe',
    },
    college: {
      title: 'Soutien scolaire — Collège',
      level: 'Collège',
      short: 'Collège',
      summary:
        'Renforcer les acquis, mieux comprendre les cours et préparer les évaluations avec davantage de confiance.',
      aims: [
        'Clarifier les points du cours restés flous',
        'Combler progressivement les lacunes',
        'Apprendre à s’organiser et à réviser',
        'Préparer les évaluations sereinement',
      ],
      imageAlt: 'Une collégienne souriante prend des notes dans son cahier',
    },
    lycee: {
      title: 'Soutien scolaire — Lycée',
      level: 'Lycée',
      short: 'Lycée',
      summary:
        'Approfondir les notions, gagner en méthode et aborder les échéances importantes avec davantage de sérénité.',
      aims: [
        'Approfondir la compréhension des notions',
        'Travailler la méthode et la rigueur',
        'Structurer ses révisions dans la durée',
        'Aborder les examens avec plus de confiance',
      ],
      imageAlt: 'Des lycéens révisent ensemble autour d’une table, livres et ordinateurs ouverts',
    },
    informatique: {
      title: 'Initiation à l’informatique',
      level: 'Tous niveaux',
      short: 'Informatique',
      summary:
        'Découvrir les outils numériques, apprendre les bases de l’informatique et développer de nouvelles compétences.',
      aims: [
        'Prendre en main l’ordinateur et ses outils',
        'Comprendre les notions de base de l’informatique',
        'Adopter de bons réflexes pour un usage sûr',
        'Gagner en autonomie avec le numérique',
      ],
      imageAlt: 'Deux jeunes apprennent ensemble devant un écran d’ordinateur',
    },
  },

  principles: [
    {
      title: 'Comprendre avant de mémoriser',
      text: 'Nous prenons le temps d’expliquer le sens des notions, pour que l’élève sache les réutiliser plutôt que simplement les réciter.',
      detail:
        'Une notion comprise se retient mieux et se transfère plus facilement d’un exercice à l’autre. Nous privilégions les questions, les exemples concrets et la reformulation par l’élève lui-même.',
    },
    {
      title: 'Un accompagnement adapté',
      text: 'Chaque élève avance différemment. Les explications et les exercices s’ajustent à son niveau, à ses difficultés et à son rythme.',
      detail:
        'Partir de là où en est l’élève, et non de là où il « devrait » être : c’est le point de départ d’un accompagnement utile. Le dialogue avec la famille aide à mieux cerner ses besoins.',
    },
    {
      title: 'Développer l’autonomie',
      text: 'S’organiser, chercher, vérifier son travail : des habitudes qui servent en classe comme à la maison.',
      detail:
        'L’objectif n’est pas de faire à la place de l’élève, mais de l’aider à acquérir des méthodes qu’il pourra appliquer seul, au fil de sa scolarité.',
    },
  ],

  programmesPage: {
    seoTitle: 'Programmes : soutien scolaire et initiation à l’informatique',
    seoDescription:
      'Soutien scolaire pour le primaire, le collège et le lycée, et initiation à l’informatique : découvrez les programmes d’Omrane Academy à El Omrane Supérieur, Tunis.',
    crumb: 'Programmes',
    title: 'Des programmes pour chaque étape de la scolarité.',
    intro:
      'Du primaire au lycée, et pour celles et ceux qui souhaitent découvrir l’informatique : voici les accompagnements que propose Omrane Academy à El Omrane Supérieur, Tunis.',
    jumpAria: 'Aller à un programme',
    aimsTitle: 'Ce que l’accompagnement vise',
    ask: 'Poser une question sur ce programme',
    practicalTitle: 'Matières, horaires et modalités',
    practical: [
      'Omrane Academy est un projet en cours de préparation. Les matières proposées, les horaires, le format des séances et les tarifs seront précisés ultérieurement.',
      'Pour être informé ou pour partager les besoins de votre enfant, le plus simple est de nous écrire via le formulaire de contact.',
    ],
  },

  approachPage: {
    seoTitle: 'Notre approche pédagogique',
    seoDescription:
      'Comprendre avant de mémoriser, un accompagnement adapté et le développement de l’autonomie : la philosophie d’apprentissage d’Omrane Academy, El Omrane Supérieur, Tunis.',
    crumb: 'Notre approche',
    title: 'Apprendre à son rythme. Progresser avec confiance.',
    intro:
      'Bien accompagner un élève, c’est d’abord l’aider à comprendre, puis lui donner les moyens d’avancer par lui-même. Voici les principes qui guident notre manière de travailler.',
    principlesHeading: 'Nos principes',
    valuesTitle: 'Un cadre bienveillant et exigeant.',
    values: [
      'La confiance se construit dans un climat serein : un élève qui ose poser ses questions et se tromper apprend davantage. Nous voulons offrir ce cadre, tout en gardant une exigence de travail régulier.',
      'Les progrès dépendent de nombreux facteurs, et chaque parcours est différent. Notre rôle est d’accompagner l’élève avec sérieux et attention, en restant en dialogue avec sa famille.',
    ],
    stepsTitle: 'Les premières étapes',
    steps: [
      { title: 'Vous nous contactez', text: 'Par le formulaire, vous nous indiquez le niveau de l’élève et ce que vous recherchez.' },
      {
        title: 'Nous échangeons',
        text: 'Nous prenons le temps de comprendre la situation de l’élève : ses points forts, ses difficultés, ses attentes.',
      },
      {
        title: 'Nous vous orientons',
        text: 'Nous vous présentons l’accompagnement qui nous paraît le plus adapté, pour que vous puissiez décider en connaissance de cause.',
      },
    ],
  },

  aboutPage: {
    seoTitle: 'À propos',
    seoDescription:
      'Omrane Academy est un projet de centre éducatif à El Omrane Supérieur, Tunis : soutien scolaire et initiation à l’informatique dans un environnement accueillant.',
    crumb: 'À propos',
    ambitionTitle: 'Notre ambition',
    ambitionText:
      'Notre devise, « Le chemin vers la réussite », résume ce que nous voulons offrir : un accompagnement qui aide chaque élève à avancer, pas à pas.',
    ambitions: [
      {
        title: 'Renforcer les connaissances scolaires',
        text: 'Aider les élèves du primaire, du collège et du lycée à consolider leurs acquis et à mieux comprendre leurs cours.',
      },
      {
        title: 'Ouvrir au numérique',
        text: 'Permettre de découvrir les outils informatiques et d’en acquérir les bases, pour un usage plus autonome et plus sûr.',
      },
      {
        title: 'Être un lieu de proximité',
        text: 'Proposer aux familles du quartier un environnement accueillant, facile d’accès, où l’on vient apprendre sereinement.',
      },
    ],
    placeTitle: 'Ancré à El Omrane Supérieur.',
    placeText:
      'Le projet s’adresse en premier lieu aux familles d’El Omrane Supérieur et des quartiers voisins de Tunis, pour un accompagnement proche de chez elles.',
  },

  contactPage: {
    seoTitle: 'Contact',
    seoDescription:
      'Contactez Omrane Academy, projet de centre éducatif à El Omrane Supérieur, Tunis, pour toute question sur le soutien scolaire ou l’initiation à l’informatique.',
    crumb: 'Contact',
    title: 'Parlons de vos besoins.',
    intro:
      'Une question sur nos programmes, sur le niveau de votre enfant ou sur les prochaines étapes du projet ? Remplissez le formulaire ci-dessous.',
    formAria: 'Formulaire de contact',
    direct: 'Nous écrire directement',
    hint: 'Indiquez de préférence le niveau et la classe de l’élève : cela nous aidera à vous répondre plus précisément.',
  },

  form: {
    required: 'Les champs marqués d’un astérisque (*) sont obligatoires.',
    optional: '(facultatif)',
    name: 'Nom et prénom',
    phone: 'Numéro de téléphone',
    email: 'Adresse e-mail',
    level: 'Niveau scolaire concerné',
    levelPlaceholder: 'Sélectionnez un niveau',
    service: 'Service souhaité',
    servicePlaceholder: 'Sélectionnez un service',
    message: 'Message',
    messagePlaceholder: 'Par exemple : la classe de l’élève, ses besoins, vos questions…',
    honeypot: 'Ne pas remplir',
    levels: { primaire: 'Primaire', college: 'Collège', lycee: 'Lycée', autre: 'Autre / non concerné' },
    services: { soutien: 'Soutien scolaire', informatique: 'Initiation à l’informatique', indecis: 'Je ne sais pas encore' },
    errors: {
      nameMissing: 'Indiquez votre nom et prénom.',
      nameShort: 'Le nom saisi semble incomplet.',
      phoneMissing: 'Indiquez un numéro de téléphone pour que nous puissions vous rappeler.',
      phoneInvalid: 'Saisissez un numéro valide, par exemple 20 123 456 ou +216 20 123 456.',
      emailInvalid: 'Cette adresse e-mail n’est pas valide. Vous pouvez aussi laisser ce champ vide.',
      levelMissing: 'Choisissez le niveau scolaire concerné.',
      serviceMissing: 'Choisissez le service qui vous intéresse.',
      messageMissing: 'Décrivez brièvement votre demande.',
      messageShort: 'Ajoutez quelques mots de plus pour décrire votre demande.',
      messageLong: (max: number) => `Le message ne doit pas dépasser ${max} caractères.`,
      summary: (count: number) =>
        count === 1 ? 'Un champ est à corriger avant l’envoi.' : `${count} champs sont à corriger avant l’envoi.`,
    },
    privacyNote: 'Vos informations servent uniquement à répondre à votre demande.',
    privacyLink: 'Politique de confidentialité',
    submit: 'Envoyer ma demande',
    submitting: 'Envoi en cours…',
    sendError:
      'L’envoi n’a pas abouti. Vérifiez votre connexion Internet puis réessayez ; vos informations sont conservées dans le formulaire.',
    whatsappNoticeTitle: 'Envoi par WhatsApp.',
    whatsappNotice: 'Après validation, WhatsApp s’ouvre avec votre demande déjà rédigée : il vous suffit d’appuyer sur « Envoyer ».',
    whatsappReadyTitle: 'Votre message est prêt dans WhatsApp',
    whatsappReadyText: 'WhatsApp s’est ouvert avec votre demande déjà rédigée.',
    whatsappReadyStrong: 'Appuyez sur « Envoyer » dans WhatsApp',
    whatsappReadyEnd: 'pour nous la transmettre : tant que ce n’est pas fait, nous ne l’avons pas reçue.',
    whatsappFallback: 'WhatsApp ne s’est pas ouvert ? Utilisez le bouton ci-dessous.',
    openWhatsapp: 'Ouvrir WhatsApp',
    editRequest: 'Modifier ma demande',
    demoNoticeTitle: 'Version de démonstration.',
    demoNotice:
      'Ce formulaire n’est pas encore relié à un service d’envoi : vous pouvez le tester, mais aucune demande ne sera transmise.',
    demoTitle: 'Formulaire valide — mode démonstration',
    demoText:
      'Votre demande est correctement remplie, mais elle n’a pas été envoyée : aucun service d’envoi n’est encore relié à ce formulaire.',
    backToForm: 'Revenir au formulaire',
    successTitle: 'Demande envoyée',
    successText: 'Merci, votre demande a bien été transmise à Omrane Academy. Nous reviendrons vers vous par téléphone ou par e-mail.',
    another: 'Envoyer une autre demande',
    /** Lines of the pre-filled WhatsApp message (always sent to the academy). */
    wa: {
      greeting: 'Bonjour Omrane Academy,',
      intro: 'Nouvelle demande depuis le site :',
      name: 'Nom',
      phone: 'Téléphone',
      email: 'E-mail',
      level: 'Niveau',
      service: 'Service',
    },
  },

  legal: {
    noticeTitle: 'Document provisoire.',
    notice:
      'Les éléments signalés « À compléter » doivent être renseignés avec des informations vérifiées. Ce texte est un modèle : il ne garantit pas, à lui seul, la conformité du site à la réglementation applicable et devrait être relu par un professionnel du droit.',
    placeholder: (label: string) => `[À compléter : ${label}]`,
    labels: {
      legalName: 'raison sociale',
      legalForm: 'forme juridique',
      fullAddress: 'adresse postale',
      registration: 'identifiant au registre national des entreprises',
      taxId: 'matricule fiscal',
      email: 'adresse e-mail',
      publicationDirector: 'nom du responsable',
      host: 'nom, adresse et contact de l’hébergeur',
      dataRetention: 'durée de conservation',
      privacyContact: 'e-mail ou adresse pour les demandes relatives aux données',
      controller: 'raison sociale ou nom du responsable',
    },
  },

  mentions: {
    seoTitle: 'Mentions légales',
    seoDescription: 'Mentions légales du site Omrane Academy : éditeur, hébergement, propriété intellectuelle et crédits.',
    title: 'Mentions légales',
    intro: 'Informations relatives à l’éditeur et à l’hébergement du site Omrane Academy.',
    publisher: 'Éditeur du site',
    rows: {
      project: 'Nom du projet',
      legalName: 'Raison sociale',
      legalForm: 'Forme juridique',
      location: 'Localisation',
      fullAddress: 'Adresse complète',
      registration: 'Immatriculation',
      taxId: 'Matricule fiscal',
      phone: 'Téléphone',
      email: 'E-mail',
      publicationDirector: 'Directeur de la publication',
      host: 'Hébergeur',
    },
    hosting: 'Hébergement',
    natureTitle: 'Nature du projet',
    nature:
      'Omrane Academy est un projet de centre éducatif. Les informations présentées sur ce site décrivent les programmes envisagés ; elles ne constituent pas une offre contractuelle et peuvent évoluer.',
    ipTitle: 'Propriété intellectuelle',
    ip: 'Les textes, la charte graphique et le logotype d’Omrane Academy sont protégés. Toute reproduction ou réutilisation sans autorisation préalable est interdite.',
    photosBefore: 'Les photographies proviennent de la plateforme',
    photosAfter:
      'et sont utilisées conformément à sa licence. Elles sont illustratives et ne représentent pas les locaux ni les élèves d’Omrane Academy.',
    liabilityTitle: 'Responsabilité',
    liability:
      'L’éditeur s’efforce de fournir des informations exactes et à jour, sans pouvoir garantir l’absence d’erreurs. Les liens vers des sites externes (Google Maps, WhatsApp, Facebook) sont fournis à titre pratique ; l’éditeur n’est pas responsable de leur contenu.',
    dataTitle: 'Données personnelles',
    dataBefore: 'Le traitement des informations transmises via le formulaire de contact est décrit dans notre',
    dataLink: 'politique de confidentialité',
  },

  privacy: {
    seoTitle: 'Politique de confidentialité',
    seoDescription:
      'Comment Omrane Academy traite les informations transmises via le formulaire de contact : données collectées, finalité, conservation et droits.',
    title: 'Politique de confidentialité',
    intro: 'Ce document explique quelles informations sont collectées sur ce site, pourquoi, et comment exercer vos droits.',
    controllerTitle: 'Responsable du traitement',
    controller: 'Responsable',
    contact: 'Contact',
    collectedTitle: 'Données collectées',
    collectedIntro: 'Le site collecte uniquement les informations que vous saisissez dans le formulaire de contact :',
    collected: [
      'nom et prénom ;',
      'numéro de téléphone ;',
      'adresse e-mail, si vous choisissez de la renseigner ;',
      'niveau scolaire concerné et service souhaité ;',
      'le contenu de votre message.',
    ],
    sensitive:
      'Évitez d’indiquer dans votre message des informations sensibles (santé, situation personnelle détaillée) qui ne sont pas nécessaires à votre demande.',
    purposeTitle: 'Finalité',
    purpose:
      'Ces informations servent uniquement à répondre à votre demande et à échanger avec vous au sujet des programmes d’Omrane Academy. Elles ne sont ni vendues ni utilisées à des fins publicitaires.',
    recipientsTitle: 'Destinataires et transmission',
    recipients: [
      'Les informations sont destinées à l’équipe d’Omrane Academy. Le site lui-même n’enregistre ni ne transmet rien : lorsque vous validez le formulaire, il prépare un message dans WhatsApp, et c’est vous qui choisissez de l’envoyer depuis votre propre application.',
      'Une fois envoyé, le message est transmis par WhatsApp, un service de Meta, et traité selon ses propres conditions et sa politique de confidentialité. Il en va de même si vous nous contactez via notre page Facebook.',
    ],
    provider: 'Prestataire d’envoi',
    providerValue: 'WhatsApp (Meta) : le message est envoyé par vous, depuis votre application WhatsApp.',
    retentionTitle: 'Durée de conservation',
    retention: 'Durée',
    cookiesTitle: 'Cookies et mesure d’audience',
    cookies:
      'Dans sa version actuelle, le site n’utilise ni cookie publicitaire ni outil de mesure d’audience. Les polices de caractères sont hébergées sur le site lui-même. Votre choix de langue est mémorisé dans votre navigateur (stockage local), sans être transmis. Les liens vers WhatsApp, Facebook et Google Maps ouvrent ces services, qui appliquent leurs propres règles en matière de cookies.',
    rightsTitle: 'Vos droits',
    rights: [
      'Vous pouvez demander l’accès aux informations vous concernant, leur rectification ou leur suppression, et vous opposer à leur traitement, en écrivant au contact indiqué ci-dessus.',
      'En Tunisie, la protection des données personnelles est notamment encadrée par la loi organique n° 2004-63 du 27 juillet 2004, sous le contrôle de l’Instance nationale de protection des données personnelles (INPDP). Les obligations applicables au projet (déclaration, autorisations éventuelles) sont à vérifier auprès d’un professionnel ou de l’INPDP.',
    ],
    seeAlso: 'Voir aussi',
  },

  notFound: {
    seoTitle: 'Page introuvable',
    seoDescription: 'Cette page n’existe pas ou a été déplacée.',
    kicker: 'Erreur 404',
    title: 'Cette page est introuvable.',
    text: 'Le lien est peut-être incorrect, ou la page a été déplacée. Reprenez depuis l’accueil ou consultez nos programmes.',
    home: 'Revenir à l’accueil',
    programs: 'Voir les programmes',
  },
}

export type Messages = typeof fr
