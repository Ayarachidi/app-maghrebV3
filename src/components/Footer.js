import React from "react";

/**
 * Footer component affichant les liens de navigation et logo.
 * @param {Object} props
 * @param {function(string): void} props.setActiveTab - Fonction pour changer l’onglet actif.
 */
function Footer({ setActiveTab }) {
  // Gestionnaire pour le clic sur le bouton ".MA Domain Name"
  const handleDomainSearchClick = () => {
    setActiveTab("DOMAIN SEARCH");
    // Scroll doux vers le haut de la page
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    // Footer avec bordure rouge, espacement et fond blanc
    <footer className="w-full border-t-3 border-[#d41a48] py-8 px-4 lg:px-32 bg-white mt-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Section gauche avec outils et pages */}
        <div className="flex flex-col sm:flex-row gap-12 lg:gap-30 w-full lg:w-2/3">
          {/* Bloc "Tools" */}
          <div>
            <p className="text-xl font-bold capitalize mb-4">tools</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                {/* Bouton accessible avec onClick */}
                <button
                  type="button"
                  onClick={handleDomainSearchClick}
                  className="hover:underline text-left focus:outline-none focus:ring-2 focus:ring-[#d41a48] rounded"
                  aria-label="Activate DOMAIN SEARCH tab and scroll to top"
                >
                  .MA Domain Name
                </button>
              </li>
            </ul>
          </div>

          {/* Bloc "Pages" */}
          <div>
            <p className="text-xl font-bold capitalize mb-4">pages</p>
            <ul className="space-y-2 capitalize text-sm text-gray-700">
              <li>
                {/* Lien vers la page d’accueil */}
                <a href="/" className="hover:underline">
                  home
                </a>
              </li>
              {/* Ajouter d’autres pages ici si besoin */}
            </ul>
          </div>
        </div>

        {/* Section droite avec logo */}
        <div className="w-full flex justify-center lg:w-1/3">
          {/* Image avec alt descriptif pour accessibilité */}
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="mx-auto lg:mx-0 w-40"
            loading="lazy" // Chargement différé pour performance
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
