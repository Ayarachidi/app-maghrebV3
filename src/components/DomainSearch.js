import { useState } from "react"; 
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from "./useRecaptcha";
import SearchForm from "./SearchForm";
import SearchResults from "./SearchResults";
import Loader from "./Loader";

// URL de base de l'API, configurable via variable d'environnement
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function DomainSearch({ onSearchComplete, onBack }) {
  // État du domaine saisi par l'utilisateur
  const [domain, setDomain] = useState("");
  // État des extensions sélectionnées, un seul vrai à la fois
  const [extensions, setExtensions] = useState({ ".ma": true, "المغرب.": false });
  // Résultats de la recherche de domaines
  const [results, setResults] = useState([]);
  // Indicateur de chargement pendant la recherche
  const [loading, setLoading] = useState(false);
  // Gestion des erreurs pour l'affichage à l'utilisateur
  const [error, setError] = useState(null);
  // Hook personnalisé pour gérer le reCAPTCHA (token, ref, handlers)
  const { capchaToken, recaptchaRef, handleRecaptcha, resetCaptcha } = useRecaptcha();

  /**
   * Effectue une requête fetch avec un timeout via AbortController
   * @param {string} url - URL à requêter
   * @param {number} timeout - délai en ms avant annulation (default 7000ms)
   * @returns {Promise<Response>} réponse fetch ou rejet en cas d'abandon
   */
  const fetchWithTimeout = (url, timeout = 7000) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
  };

  /**
   * Récupère les données d'un domaine complet via API
   * @param {string} fullDomain - domaine complet avec extension
   * @returns {Promise<object>} objet contenant domaine et données ou erreur
   */
  const fetchDomainData = async (fullDomain) => {
    const url = `${API_BASE_URL}/domain/${encodeURIComponent(fullDomain)}`;
    try {
      const response = await fetchWithTimeout(url);
      if (!response.ok) throw new Error(`Erreur HTTP ${response.status}`);
      const data = await response.json();
      return { domain: fullDomain, data };
    } catch (error) {
      return { domain: fullDomain, data: { error: `Erreur lors de la récupération : ${error.message}` } };
    }
  };

  /**
   * Gère la recherche déclenchée par l'utilisateur
   * Vérifie la saisie, le reCAPTCHA puis récupère les données pour chaque extension sélectionnée
   */
  const handleSearch = async () => {
    setError(null); // Reset des erreurs précédentes
    if (!domain.trim()) {
      setError("Veuillez entrer un nom de domaine."); // Validation du domaine
      return;
    }
    if (!capchaToken) {
      setError("Veuillez valider le reCAPTCHA."); // Validation reCAPTCHA
      return;
    }

    setLoading(true);
    setResults([]);

    // Filtre les extensions sélectionnées (true)
    const selectedExtensions = Object.keys(extensions).filter((ext) => extensions[ext]);

    try {
      // Récupère les données pour chaque domaine complet (domain + extension)
      const fetchedResults = await Promise.all(selectedExtensions.map((ext) => fetchDomainData(`${domain}${ext}`)));
      setResults(fetchedResults);
      onSearchComplete(); // Callback externe quand la recherche est terminée
    } catch (error) {
      // Gestion des erreurs imprévues
      setError(`Erreur inattendue lors de la récupération des résultats : ${error.message}`);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Bascule l'extension sélectionnée, une seule extension à la fois est active
   * @param {string} ext - extension à activer
   */
  const toggleExtension = (ext) => {
    setExtensions((prev) =>
      Object.fromEntries(Object.keys(prev).map((key) => [key, key === ext]))
    );
  };

  return (
    <div className={`mt-6 ${!results.length ? "p-6 rounded shadow bg-[#d41a48]" : ""}`}>
      {/* Affiche un message d'erreur si besoin */}
   {error && <div className="mb-4 text-white font-semibold">{error}</div>}


      {/* Bouton "Back" pour revenir à la recherche */}
      {results.length > 0 && (
        <button
          onClick={() => {
            setResults([]);
            resetCaptcha(); // Réinitialisation du reCAPTCHA
            onBack(); // Callback externe pour revenir en arrière
          }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg shadow hover:bg-white transition"
        >
          ← Back
        </button>
      )}

      {/* Conteneur principal pour formulaire ou résultats */}
      <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg">
        {/* Affiche le formulaire si pas de résultats, sinon affiche les résultats */}
        {!results.length ? (
          <SearchForm
            domain={domain}
            setDomain={setDomain}
            extensions={extensions}
            toggleExtension={toggleExtension}
            handleSearch={handleSearch}
            loading={loading}
            recaptchaRef={recaptchaRef}
            handleRecaptcha={handleRecaptcha}
          />
        ) : (
          <SearchResults results={results} />
        )}
      </div>
    </div>
  );
}
