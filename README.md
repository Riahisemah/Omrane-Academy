# Omrane Academy — site web

Site vitrine d’**Omrane Academy**, projet de centre éducatif à El Omrane Supérieur (Tunis) :
soutien scolaire (primaire, collège, lycée) et initiation à l’informatique.

Stack : React 19, TypeScript (strict), Vite 6, Tailwind CSS 4, React Router 7, Lucide.
Police Plus Jakarta Sans auto-hébergée via Fontsource (aucun appel à Google Fonts).

## Démarrage

Prérequis : Node.js 20+ et npm.

```bash
npm install
npm run dev       # serveur de développement sur http://localhost:5173
npm run build     # vérification TypeScript + build de production dans dist/
npm run preview   # sert le build de production sur http://localhost:4173
npm run lint      # ESLint
```

## Configuration

Les valeurs publiques de production sont dans `.env.production`. Pour le développement local,
copiez `.env.example` en `.env.local`. Variables :

| Variable | Rôle |
| --- | --- |
| `VITE_SITE_URL` | URL de production, sans `/` final (ex. `https://www.mon-domaine.tn`). Sert aux URL canoniques, à `og:url` / `og:image` et à la génération de `sitemap.xml`. **Sans elle, le sitemap n’est pas généré** (un avertissement s’affiche au build). |
| `VITE_CONTACT_PROVIDER` | `netlify` pour recevoir le formulaire via Netlify Forms au lieu de WhatsApp. |
| `VITE_CONTACT_ENDPOINT` | Autre point d’accès JSON pour le formulaire. **Les deux vides = envoi par WhatsApp.** |

Ces variables sont intégrées au JavaScript public : n’y mettez jamais de clé secrète.

### Formulaire de contact : WhatsApp

Par défaut, le formulaire est relié à **WhatsApp** (`+216 26 653 690`). Après validation, WhatsApp
(application sur mobile, WhatsApp Web ou Desktop sur ordinateur) s’ouvre avec la demande déjà rédigée.
**Le visiteur doit appuyer sur « Envoyer » dans WhatsApp** : le site ne peut pas envoyer le message
à sa place, et l’écran de confirmation l’indique clairement.

Le numéro et la page Facebook se modifient dans `src/config/site.ts` (objet `site.contact`).
Les liens directs WhatsApp et Facebook apparaissent sur la page Contact, dans la section contact de
l’accueil et dans le pied de page.

Autres modes d’envoi possibles (prioritaires sur WhatsApp s’ils sont configurés) :

- `VITE_CONTACT_PROVIDER=netlify` : Netlify Forms (voir « Déploiement sur Netlify »).
- `VITE_CONTACT_ENDPOINT=…` : un point d’accès qui reçoit un `POST` JSON
  (`nom`, `telephone`, `email`, `niveau`, `service`, `message`), par ex. Formspree ou une fonction
  serverless. Toute réponse 2xx est un succès ; sinon un message d’erreur s’affiche et la saisie est conservée.

### Informations légales et entreprise

Les informations non vérifiées (raison sociale, adresse complète, téléphone, e-mail, matricule
fiscal, hébergeur, etc.) sont centralisées dans [`src/config/site.ts`](src/config/site.ts), objet `legal`.
Chaque valeur à `null` s’affiche sur le site sous forme d’un repère visible **« [À compléter : …] »**.
Remplacez-les uniquement par des informations vérifiées.

Les pages Mentions légales et Confidentialité sont des **modèles** : faites-les relire par un
professionnel avant la mise en ligne. La loi organique tunisienne n° 2004-63 sur la protection des
données personnelles et l’INPDP y sont cités comme points de référence à vérifier.

Aucune donnée structurée `LocalBusiness` n’est publiée tant que l’adresse, le téléphone et les horaires
ne sont pas confirmés. Une fois ces informations vérifiées, un bloc JSON-LD pourra être ajouté dans `index.html`.

## Déploiement sur Netlify

Le projet est prêt pour Netlify (`netlify.toml`) : commande `npm run build`, dossier `dist`,
Node 22, réécriture des routes vers `index.html` (application monopage), en-têtes de sécurité et
de cache. L’URL publique est définie dans `.env.production` :
`VITE_SITE_URL=https://omrane-academy.netlify.app`.

> Netlify n’accepte pas de point dans le nom d’un site : `omrane.academy.netlify.app` est impossible,
> le nom retenu est **`omrane-academy`**. Si vous choisissez un autre nom, mettez à jour `VITE_SITE_URL`.

### Première mise en ligne (depuis GitHub, recommandé)

1. Poussez le code sur GitHub (`git push`).
2. Sur [app.netlify.com](https://app.netlify.com) : **Add new site → Import an existing project → GitHub**,
   puis choisissez le dépôt `Omrane-Academy`. Les réglages de build sont lus dans `netlify.toml`.
3. Avant ou après le premier déploiement : **Site configuration → General → Site details → Change site name**
   → `omrane-academy`. Le site est alors accessible sur `https://omrane-academy.netlify.app`.
4. Chaque `git push` sur la branche principale redéploie automatiquement le site.

### Alternative : Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init            # crée ou relie le site (nom : omrane-academy)
netlify deploy --build          # aperçu sur une URL temporaire
netlify deploy --build --prod   # mise en production
```

### Activer la réception du formulaire (Netlify Forms)

Optionnel : par défaut, les demandes passent par WhatsApp. Pour les recevoir plutôt dans Netlify (et par e-mail) :

1. Dans Netlify : **Site configuration → Forms → Enable form detection**.
2. Dans `.env.production`, indiquez `VITE_CONTACT_PROVIDER=netlify`, puis poussez sur GitHub.
3. Après le déploiement, le formulaire `contact` apparaît dans l’onglet **Forms**. Ajoutez-y une
   notification e-mail (**Forms → Form notifications**) pour être prévenu de chaque demande.
4. Testez un envoi, puis complétez `formProvider` et `dataRetention` dans `src/config/site.ts`
   (page Confidentialité).

Le formulaire caché dans `index.html` sert uniquement à la détection par Netlify : si vous ajoutez ou
renommez un champ, modifiez-le aux deux endroits.

### Autres hébergeurs

Le dossier `dist/` est un site statique. Configurez une réécriture de toutes les routes vers
`/index.html`, et un service d’envoi via `VITE_CONTACT_ENDPOINT` (voir plus haut).

`robots.txt` et `sitemap.xml` sont générés dans `dist/` au moment du build (voir `vite.config.ts`).
Si vous ajoutez une route, ajoutez-la aussi à `ROUTES` dans `vite.config.ts`.

Pour un meilleur référencement, un pré-rendu statique des pages (par ex. `vite-react-ssg` ou un
service de prerendering) permettra aux moteurs qui n’exécutent pas JavaScript de lire titres et
descriptions propres à chaque page. Aucun résultat de positionnement n’est garanti.

## Langues : français et arabe

Le site existe en **français** (`/`, `/programmes`…) et en **arabe** (`/ar`, `/ar/programmes`…),
avec une mise en page de droite à gauche et la police IBM Plex Sans Arabic pour l’arabe.

Choix de la langue à l’ouverture du site :

1. Si le visiteur a déjà choisi une langue avec le bouton « العربية / Français » de l’en-tête,
   ce choix est mémorisé dans son navigateur et s’applique toujours.
2. Sinon, la première langue prise en charge dans les préférences du navigateur décide :
   arabe → version arabe ; français ou toute autre langue → version française.
3. Un lien `/ar/…` partagé s’ouvre en arabe, même dans un navigateur français.

Les textes sont dans `src/i18n/messages/fr.ts` (référence) et `src/i18n/messages/ar.ts`.
TypeScript vérifie que les deux fichiers ont exactement les mêmes clés : un texte oublié dans une
langue empêche le build. Le nom « Omrane Academy » reste en caractères latins dans les deux langues,
comme sur le logo. Le sitemap liste les deux versions de chaque page (balises `hreflang`).

## Conversion et référencement

- **WhatsApp partout :** bouton flottant sur toutes les pages, barre d’annonce « Être informé(e) en
  priorité » et bouton dans la FAQ. Chaque lien ouvre WhatsApp avec un message déjà rédigé dans la
  langue du visiteur (textes dans `marketing` des fichiers de langue).
- **Sections pour les parents** sur l’accueil : « Pourquoi choisir Omrane Academy ? » et une FAQ.
  Règle éditoriale : uniquement des informations vraies, sans chiffres, avis ni dates inventés.
  Quand les matières, horaires ou tarifs seront fixés, mettez à jour la FAQ (`marketing.faq`).
- **Une page HTML par adresse et par langue** est générée au build (`dist/programmes/index.html`,
  `dist/ar/programmes/index.html`…), avec son titre, sa description, ses balises Open Graph et `hreflang`.
  Les aperçus de liens WhatsApp et Facebook affichent donc la bonne page dans la bonne langue.
- **Données structurées** (JSON-LD `EducationalOrganization`) dans `index.html` : nom, zone,
  numéro et page Facebook uniquement. Ajoutez l’adresse précise quand elle sera confirmée.
- **Images :** chaque photo a une version mobile légère (`*-sm.webp`) choisie automatiquement par le navigateur.

## Supports de communication (`marketing/`)

| Fichier | Usage |
| --- | --- |
| `flyer-a5.pdf` | Flyer A5 à imprimer : recto français, verso arabe. Impression « taille réelle », sans marges. |
| `flyer-fr.png`, `flyer-ar.png` | Le même flyer en image (1080 px) pour WhatsApp, Facebook et les groupes de parents. |
| `og-image.html` | Modèle de l’image d’aperçu des liens → `public/images/og-image.jpg` (FR) et `og-image-ar.jpg` (AR). |
| `app-icon.html` | Modèle des icônes d’écran d’accueil → `public/icons/` (+ `public/manifest.webmanifest`). |
| `qr/` | QR codes du flyer : site (FR/AR) et WhatsApp avec un message « j’ai vu votre flyer ». |

Les modèles HTML utilisent les polices du projet (`npm install` requis) et s’ouvrent dans un navigateur.
Pour modifier le flyer : éditez `flyer.html`, ouvrez-le dans Chrome ou Edge, puis
**Imprimer → Enregistrer en PDF**, format A5, marges « Aucune », « Graphiques d’arrière-plan » cochés.
`flyer.html#fr` ou `#ar` affiche une seule face (pour une capture d’écran).

Si l’adresse du site change (nom de domaine personnalisé), régénérez les QR codes et le flyer.
Les QR codes déjà imprimés vers `omrane-academy.netlify.app` continueront de fonctionner :
Netlify redirige cette adresse vers le domaine principal.

## Structure

```
public/
  images/            photos optimisées (WebP, Unsplash) + og-image.jpg
  favicon.svg
src/
  i18n/              langues : détection, chemins /ar, textes français et arabes
  config/site.ts     nom, WhatsApp, Facebook, variables d’environnement, infos légales
  data/content.ts    images et icônes des programmes, valeurs du formulaire
  components/        Header, Footer, Logo, Button, SectionHeading, CtaBand, ContactForm,
                     HeroPath, PageHero, LegalLayout, Seo, Layout…
  pages/             Home, Programmes, Approche, APropos, Contact,
                     MentionsLegales, Confidentialite, NotFound
  index.css          design tokens (couleurs, rayons, ombres) et échelle typographique
```

## Direction artistique

- Palette : navy `#142B4A`, bleu `#2878D0`, or `#F4B942`, fond `#F5F8FC`, texte `#172235`.
- Motif signature : le « chemin vers la réussite », une ligne dorée qui part du repère
  « El Omrane Supérieur » et monte vers l’image en arche (fenêtre d’école). C’est la seule animation
  automatique du site. Elle est désactivée si l’utilisateur demande moins d’animations
  (`prefers-reduced-motion`).
- Photographies : Unsplash, utilisées à titre d’illustration. Remplacez-les dès que des photos
  réelles du centre sont disponibles, en gardant des formats proches.
#   O m r a n e - A c a d e m y  
 