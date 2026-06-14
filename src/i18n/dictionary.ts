import type { Locale } from "./config";

/**
 * Chaînes d'interface (navigation, titres de sections, boutons…).
 * Pour modifier un libellé, édite simplement la valeur fr / en correspondante.
 */
const dictionary = {
  fr: {
    nav: {
      home: "Accueil",
      publications: "Publications",
      conferences: "Conférences",
      projects: "Projets",
      teaching: "Enseignement",
      cv: "CV",
    },
    common: {
      readMore: "En savoir plus",
      viewAll: "Tout voir",
      backHome: "Retour à l'accueil",
      downloadCv: "Télécharger le CV (PDF)",
      email: "Email",
      present: "présent",
      skipToContent: "Aller au contenu",
      toggleTheme: "Changer de thème",
      menu: "Menu",
    },
    home: {
      heroEyebrow: "Doctorant en mécanique des fluides",
      contactCta: "Me contacter",
      researchTitle: "Axes de recherche",
      latestPublications: "Publications récentes",
      latestTalks: "Communications récentes",
      aboutTitle: "À propos",
    },
    publications: {
      title: "Publications",
      subtitle:
        "Articles, preprints et actes de conférence. Les liens PDF, DOI et HAL sont indiqués lorsque disponibles.",
      empty: "Les publications seront ajoutées prochainement.",
      filterAll: "Tout",
      typeArticle: "Article",
      typePreprint: "Preprint",
      typeProceedings: "Actes",
      typeThesis: "Thèse",
      abstract: "Résumé",
    },
    conferences: {
      title: "Conférences & communications",
      subtitle:
        "Exposés oraux, posters et communications invitées présentés en congrès et séminaires.",
      empty: "Les communications seront ajoutées prochainement.",
      typeTalk: "Exposé",
      typePoster: "Poster",
      typeInvited: "Invité",
      typeSeminar: "Séminaire",
    },
    projects: {
      title: "Projets de recherche",
      subtitle:
        "Travaux numériques et thématiques explorés au cours de mon doctorat et de mes collaborations.",
      empty: "Les projets seront ajoutés prochainement.",
    },
    teaching: {
      title: "Enseignement",
      subtitle:
        "Cours magistraux, travaux dirigés et travaux pratiques assurés en université et école d'ingénieurs.",
      empty: "Les enseignements seront ajoutés prochainement.",
    },
    cv: {
      title: "Curriculum Vitæ",
      education: "Formation",
      experience: "Expérience",
      skills: "Compétences",
      awards: "Distinctions & financements",
      languages: "Langues",
    },
    footer: {
      builtWith: "Site personnel",
      rights: "Tous droits réservés.",
    },
  },
  en: {
    nav: {
      home: "Home",
      publications: "Publications",
      conferences: "Conferences",
      projects: "Projects",
      teaching: "Teaching",
      cv: "CV",
    },
    common: {
      readMore: "Read more",
      viewAll: "View all",
      backHome: "Back to home",
      downloadCv: "Download CV (PDF)",
      email: "Email",
      present: "present",
      skipToContent: "Skip to content",
      toggleTheme: "Toggle theme",
      menu: "Menu",
    },
    home: {
      heroEyebrow: "PhD candidate in fluid mechanics",
      contactCta: "Get in touch",
      researchTitle: "Research interests",
      latestPublications: "Recent publications",
      latestTalks: "Recent talks",
      aboutTitle: "About",
    },
    publications: {
      title: "Publications",
      subtitle:
        "Journal articles, preprints and conference proceedings. PDF, DOI and HAL links are provided where available.",
      empty: "Publications will be added soon.",
      filterAll: "All",
      typeArticle: "Article",
      typePreprint: "Preprint",
      typeProceedings: "Proceedings",
      typeThesis: "Thesis",
      abstract: "Abstract",
    },
    conferences: {
      title: "Conferences & talks",
      subtitle:
        "Oral presentations, posters and invited talks given at conferences and seminars.",
      empty: "Talks will be added soon.",
      typeTalk: "Talk",
      typePoster: "Poster",
      typeInvited: "Invited",
      typeSeminar: "Seminar",
    },
    projects: {
      title: "Research projects",
      subtitle:
        "Numerical work and research topics explored during my PhD and collaborations.",
      empty: "Projects will be added soon.",
    },
    teaching: {
      title: "Teaching",
      subtitle:
        "Lectures, tutorials and lab sessions taught at university and engineering school.",
      empty: "Teaching activities will be added soon.",
    },
    cv: {
      title: "Curriculum Vitæ",
      education: "Education",
      experience: "Experience",
      skills: "Skills",
      awards: "Awards & funding",
      languages: "Languages",
    },
    footer: {
      builtWith: "Personal website",
      rights: "All rights reserved.",
    },
  },
};

export type Dictionary = (typeof dictionary)["fr"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionary[locale];
}
