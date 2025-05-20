// Tabs.js

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

// Liste des onglets à afficher
const TAB_LABELS = ["DOMAIN SEARCH"];

/**
 * Composant d'onglets avec indicateur animé pour l'onglet actif.
 * @param {Object} props
 * @param {string} props.activeTab - Nom de l'onglet actif.
 * @param {Function} props.setActiveTab - Fonction pour mettre à jour l'onglet actif.
 */
export default function Tabs({ activeTab, setActiveTab }) {
  const containerRef = useRef(null); // Référence vers le conteneur des boutons
  const [indicatorStyle, setIndicatorStyle] = useState({}); // Style dynamique de l'indicateur

  useEffect(() => {
    const container = containerRef.current;
    const buttons = container?.querySelectorAll("button");

    const activeIndex = TAB_LABELS.indexOf(activeTab);

    if (buttons && buttons[activeIndex]) {
      const activeButton = buttons[activeIndex];
      const { offsetLeft, offsetWidth } = activeButton;

      // Mise à jour dynamique de la position et de la largeur de l'indicateur
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex gap-3 sm:gap-4 my-4 relative">
        {TAB_LABELS.map((label) => (
          <button
            key={label}
            onClick={() => setActiveTab(label)}
            type="button"
            className={`relative flex-1 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] py-3 sm:py-4 px-2 rounded-md font-semibold text-sm sm:text-base text-center transition-all duration-300 ease-in-out
              ${activeTab === label ? "text-green-700" : "text-gray-800"}
              hover:bg-green-50 hover:scale-[1.03]`}
            aria-pressed={activeTab === label}
          >
            {label}
          </button>
        ))}

        {/* Indicateur animé sous l'onglet actif */}
        <span
          className="absolute bottom-0 h-[3px] bg-green-600 rounded transition-all duration-300"
          style={indicatorStyle}
        />
      </div>
    </div>
  );
}

// Validation des props
Tabs.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};
