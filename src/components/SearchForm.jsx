import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";

/**
 * Composant formulaire de recherche de domaine.
 *
 * Props:
 * - domain: string - valeur du champ de saisie du domaine
 * - setDomain: function - callback pour mettre à jour la saisie
 * - extensions: object - clé: extension, valeur: booléen sélection
 * - toggleExtension: function - callback pour changer l'extension sélectionnée
 * - handleSearch: function - fonction déclenchée au clic sur le bouton recherche
 * - loading: boolean - état de chargement (affiche Loader)
 * - recaptchaRef: ref - référence pour le composant ReCAPTCHA
 * - handleRecaptcha: function - callback lorsque reCAPTCHA change (valide)
 */
export default function SearchForm({
  domain,
  setDomain,
  extensions,
  toggleExtension,
  handleSearch,
  loading,
  recaptchaRef,
  handleRecaptcha,
}) {
  // Gestion de la soumission du formulaire (éviter rechargement page)
  const onSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Search domain form">
      <div className="flex flex-col md:flex-row gap-4">
        <input
  type="text"
  name="domain"
  id="domain"
  placeholder="Entrez un nom de domaine"
  value={domain}
  onChange={(e) => setDomain(e.target.value)}
  className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d41a48]"
  aria-required="true"
  aria-describedby="domainHelp"
  autoComplete="off"
  pattern="^([a-zA-Z0-9]([-a-zA-Z0-9]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$"
  title="Veuillez saisir un nom de domaine valide, exemple : exemple.com"
/>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Search
        </button>
      </div>

      {/* Description d'aide pour le champ domain (accessibilité) */}
      <p id="domainHelp" className="sr-only">
        Entrez un nom de domaine valide pour la recherche.
      </p>

      {/* ReCAPTCHA */}
      <div className="mt-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          // La clé reCAPTCHA doit idéalement être dans une variable d’environnement côté client (ex: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY)
          sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY || "clé-par-defaut-pour-dev"}
          onChange={handleRecaptcha}
          theme="light"
          size="normal"
          aria-label="reCAPTCHA challenge"
        />
      </div>

      {/* Sélecteur d'extensions avec boutons radio accessibles */}
      <fieldset className="flex flex-wrap gap-4 mt-4" aria-label="Sélection d'extension de domaine">
        {Object.keys(extensions).map((ext) => (
          <label
            key={ext}
            htmlFor={`extension-${ext}`}
            className="flex items-center gap-2 text-sm cursor-pointer select-none"
          >
            <input
              type="radio"
              id={`extension-${ext}`}
              name="extension"
              checked={extensions[ext]}
              onChange={() => toggleExtension(ext)}
              className="accent-green-600"
              aria-checked={extensions[ext]}
            />
            <span>{ext}</span>
          </label>
        ))}
      </fieldset>

      {/* Loader lors du chargement */}
      {loading && <Loader />}
    </form>
  );
}
