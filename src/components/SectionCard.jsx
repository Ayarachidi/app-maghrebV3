// SectionCard.js

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Composant réutilisable pour afficher une section extensible avec un titre.
 * @param {object} props
 * @param {string} props.title - Le titre affiché dans le résumé.
 * @param {React.ReactNode} props.children - Le contenu interne du bloc.
 */
export default function SectionCard({ title, children }) {
  return (
    <details
      open
      className="mb-6 border border-[#3498DB] rounded-2xl bg-white shadow transition duration-300"
    >
      <summary
        className="cursor-pointer p-4 font-semibold text-xl text-[#2C3E50] bg-white hover:bg-white rounded-t-2xl"
        role="button"
        tabIndex={0}
        aria-expanded="true"
      >
        {title}
      </summary>

      <div className="p-4 text-sm text-gray-700 space-y-3">
        {children}
      </div>
    </details>
  );
}

// Vérification des types de props à l'exécution
SectionCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
