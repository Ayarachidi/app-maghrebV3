// Tableau contenant les questions fréquentes et leurs réponses associées
const faqs = [
  {
    question: "How do I search for a domain name?",
    answer: 'Simply enter the domain name in the search field above and click "Search".',
  },
  {
    question: "How can I find out who owns a domain?",
    answer: "Our Domain Search tool provides details about the domain holder when available.",
  },
  {
    question: "Can I see a domain's expiration date?",
    answer: "Yes, if available, the expiration date is shown in the domain result details.",
  },
  {
    question: "Which domains can I search?",
    answer: "You can search domains with supported extensions such as .ma or المغرب.",
  },
];

function FaqSec() {
  return (
    // Section principale centrée horizontalement sur toute la largeur
    <section className="w-full flex justify-center">
      {/* Conteneur blanc avec padding et ombre pour mise en avant */}
      <div className="w-[90vw] px-10 py-10 bg-white shadow-xl">
        {/* Titre principal centré avec différentes tailles selon l'écran */}
        <h1 className="font-extrabold text-3xl sm:text-3xl lg:text-4xl text-center mb-12">
          Frequently Asked Questions
        </h1>

        {/* Grille responsive : 1 colonne sur petits écrans, 2 colonnes à partir de md */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/*
            Répartition dynamique des questions dans 2 colonnes :
            - Utilisation de reduce pour séparer les FAQ en deux groupes (colonne 0 et 1)
            - i % 2 sert à alterner les colonnes pour chaque élément
          */}
          {faqs.reduce(
            (acc, faq, i) => {
              const col = i % 2;
              // Initialisation du tableau de la colonne si inexistant
              if (!acc[col]) acc[col] = [];
              // Ajout de la question/réponse dans la colonne correspondante
              acc[col].push(
                <div key={i} className="p-6">
                  {/* Question en gras avec taille un peu plus grande */}
                  <p className="font-semibold text-lg mb-2">{faq.question}</p>
                  {/* Réponse en texte plus petit et gris */}
                  <p className="text-sm text-gray-700">{faq.answer}</p>
                </div>
              );
              return acc;
            },
            [[], []] // Valeur initiale : tableau de 2 colonnes vides
          )
          // Mapping des deux colonnes pour générer les div correspondantes
          .map((colFaqs, i) => (
            <div key={i}>{colFaqs}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FaqSec;
