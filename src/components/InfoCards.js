/**
 * Composant InfoCards affichant une grille de cartes d'information.
 * Chaque carte contient une icône, un titre et un texte descriptif.
 */
export default function InfoCards() {
  // Liste des cartes à afficher
  const cards = [
    {
      icon: "/images/card1.png",
      title: "CHECK A DOMAIN NAME",
      text: "Search domain details easily using our Domain Search tool.",
    },
    {
      icon: "/images/domainname.png",
      title: "FIND OUT WHO OWNS A DOMAIN",
      text: "Get information about the domain holder, location, and related entities.",
    },
    {
      icon: "/images/card3.png",
      title: "CHECK EXPIRATION DATE",
      text: "See when a domain will expire and plan accordingly.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 mb-10">
      {cards.map((card, idx) => (
        <article
          key={idx}
          className="bg-white p-10 rounded-sm shadow-xl text-center transform transition-transform hover:scale-105"
          role="region"
          aria-labelledby={`card-title-${idx}`}
        >
          <div className="mb-6 flex justify-center">
            {/* 
              Ajout d'un alt pertinent pour l'image.
              Si l’image est purement décorative, alt="" pour ignorer.
              Ici on utilise alt="" car l’info est dans le titre/text.
            */}
            <img
              src={card.icon}
              alt=""
              aria-hidden="true"
              className="w-30 h-30"
              loading="lazy"
            />
          </div>
          <h3
            id={`card-title-${idx}`}
            className="font-bold mb-4 text-xl"
          >
            {card.title}
          </h3>
          <p className="text-gray-700 text-base">{card.text}</p>
        </article>
      ))}
    </div>
  );
}
