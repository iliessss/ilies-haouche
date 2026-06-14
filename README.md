# Site personnel — Ilies Haouche

Site web académique bilingue (FR / EN) : présentation, publications, conférences, projets, enseignement et CV.

Construit avec **Next.js 16**, **React 19** et **Tailwind CSS v4**. Mode clair/sombre, responsive, et entièrement prégénéré en statique (idéal pour Vercel).

---

## 🚀 Démarrer en local

```bash
cd ~/Projects/ilies-haouche
npm install      # une seule fois
npm run dev      # lance le site sur http://localhost:3000
```

Le site s'ouvre sur http://localhost:3000 et se met à jour automatiquement à chaque modification.

---

## ✏️ Mettre le site à jour (l'essentiel)

**Tout le contenu se trouve dans un seul fichier :**

```
src/content/site.ts
```

Tu n'as quasiment jamais besoin de toucher au reste. Dans ce fichier tu trouveras des sections clairement séparées :

| Section            | Quoi modifier                                             |
| ------------------ | -------------------------------------------------------- |
| `profile`          | Ton nom, titre, labo, bio, axes de recherche, liens      |
| `publications`     | Tes articles, preprints, actes (avec liens PDF/DOI/HAL)  |
| `conferences`      | Tes exposés, posters, séminaires                         |
| `projects`         | Tes projets de recherche                                 |
| `education`        | Ta formation (CV)                                        |
| `experience`       | Ton expérience (CV)                                      |
| `skills`           | Tes compétences (CV)                                     |
| `awards`           | Tes distinctions / financements (CV)                     |
| `languages`        | Les langues que tu parles (CV)                           |

### Règles simples

- Chaque texte existe en **deux langues** : `{ fr: "...", en: "..." }`. Remplis les deux.
- Remplace tous les `[À COMPLÉTER]` / `[TO COMPLETE]` par tes vraies infos.
- Pour **ajouter** une publication / conférence / projet : copie-colle un bloc existant dans la liste et modifie-le.
- Pour **supprimer** un élément : efface son bloc `{ ... }`.
- Mets ton nom en gras dans la liste d'auteurs avec `**Ilies Haouche**`.

### Ajouter ta photo et ton CV PDF

1. Dépose les fichiers dans le dossier `public/` (ex : `public/photo.jpg`, `public/cv-ilies-haouche.pdf`).
2. Dans `src/content/site.ts`, renseigne :
   ```ts
   photo: "/photo.jpg",
   cvPdf: "/cv-ilies-haouche.pdf",
   ```

### Ajouter tes liens (Scholar, ORCID, LinkedIn…)

Dans `profile.links`, remplis les URL. Un champ laissé vide (`""`) masque automatiquement l'icône correspondante.

### Modifier un libellé d'interface (menu, titres…)

Tout est dans `src/i18n/dictionary.ts` (les deux langues côte à côte).

---

## 🌐 Mettre le site en ligne (déploiement)

### Option recommandée : Vercel + GitHub (déploiement automatique)

1. Crée un dépôt sur GitHub (ex : `ilies-haouche`).
2. Pousse le projet :
   ```bash
   cd ~/Projects/ilies-haouche
   git add -A
   git commit -m "Site personnel"
   git branch -M main
   git remote add origin https://github.com/<ton-compte>/ilies-haouche.git
   git push -u origin main
   ```
3. Sur https://vercel.com → **Add New… → Project** → importe le dépôt GitHub.
4. Vercel détecte Next.js tout seul : clique **Deploy**. C'est en ligne en ~1 min.

➡️ Ensuite, **chaque `git push` met le site à jour automatiquement**. C'est le gros avantage de ce combo.

### Nom de domaine personnalisé

Dans Vercel → ton projet → **Settings → Domains**, ajoute ton domaine (ex : `ilies-haouche.com` ou un sous-domaine de `al-iqraiyyah.com`). Pense à mettre l'URL définitive dans `metadataBase` (fichier `src/app/[lang]/layout.tsx`) pour le SEO et les aperçus de partage.

---

## 🛠️ Structure du projet

```
src/
  app/
    layout.tsx              # layout racine (passe-plat)
    page.tsx                # redirige / vers /fr
    [lang]/                 # toutes les pages, par langue (fr/en)
      layout.tsx            # <html>, polices, thème, navbar, footer
      page.tsx              # Accueil
      publications/         # Publications
      conferences/          # Conférences
      projects/             # Projets
      teaching/             # Enseignement
      cv/                   # CV
  components/               # Navbar, Footer, icônes, etc. (à ne pas modifier en général)
  content/site.ts          # 👈 TON CONTENU (le fichier à éditer)
  i18n/                     # langues + libellés d'interface
public/                     # photo, CV PDF, images
```

---

## Commandes utiles

```bash
npm run dev      # développement
npm run build    # build de production (vérifie que tout compile)
npm run start    # sert le build de production en local
```
