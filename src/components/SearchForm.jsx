import React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "./Loader";

const FORBIDDEN_WORDS = ["select", "delete", "drop", "'"];
const RECAPTCHA_KEY = process.env.REACT_APP_RECAPTCHA_SITE_KEY || "clé-par-defaut-pour-dev";

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
  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const lowerCaseDomain = domain.toLowerCase();

    for (const word of FORBIDDEN_WORDS) {
      if (lowerCaseDomain.includes(word)) {
        // SonarQube déconseille `alert`, préférer console.warn/log ou affichage UI
        console.warn(`Le nom de domaine contient un mot interdit : "${word}"`);
        return;
      }
    }

    if (form.checkValidity()) {
      handleSearch();
    } else {
      form.reportValidity();
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4" aria-label="Formulaire de recherche de domaine">
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
          required
          pattern="^[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+$"
          title="Entrez un nom de domaine valide, comme exemple.com"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Rechercher un domaine"
        >
          Search
        </button>
      </div>

      <p id="domainHelp" className="sr-only">
        Entrez un nom de domaine valide pour la recherche.
      </p>

      <div className="mt-4">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={RECAPTCHA_KEY}
          onChange={handleRecaptcha}
          theme="light"
          size="normal"
          aria-label="Vérification humaine via reCAPTCHA"
        />
      </div>

      <fieldset className="flex flex-wrap gap-4 mt-4" aria-label="Sélection d'extension de domaine">
        {Object.entries(extensions).map(([ext, checked]) => (
          <label
            key={ext}
            htmlFor={`extension-${ext}`}
            className="flex items-center gap-2 text-sm cursor-pointer select-none"
          >
            <input
              type="radio"
              id={`extension-${ext}`}
              name="extension"
              checked={checked}
              onChange={() => toggleExtension(ext)}
              className="accent-green-600"
              aria-checked={checked}
            />
            <span>{ext}</span>
          </label>
        ))}
      </fieldset>

      {loading && <Loader />}
    </form>
  );
}
