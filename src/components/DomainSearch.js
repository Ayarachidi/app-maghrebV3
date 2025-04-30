import { useState } from "react";

export default function DomainSearch({ isWhois }) {
  const [domain, setDomain] = useState("");
  const [extensions, setExtensions] = useState({
    ".ma": true,
    "المغرب.": false,
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const toggle = (ext) => {
    setExtensions({ ...extensions, [ext]: !extensions[ext] });
  };

  const handleSearch = async () => {
    if (!domain) return;

    setLoading(true);
    setResults([]);

    const selectedExtensions = Object.keys(extensions).filter(
      (ext) => extensions[ext]
    );

    try {
      const fetchedResults = await Promise.all(
        selectedExtensions.map(async (ext) => {
          const fullDomain = `${domain}${ext}`;
          const response = await fetch(
            `http://192.168.215.57:8080/domaine/${encodeURIComponent(fullDomain)}`
          );
          const data = await response.json();
          return { domain: fullDomain, data };
        })
      );
      setResults(fetchedResults);
    } catch (error) {
      setResults([{ domain: "", data: { error: "Erreur de récupération des données." } }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded shadow mt-6" style={{ backgroundColor: "#d41a48" }}>
      <div className="bg-white bg-opacity-90 p-6 rounded shadow">
        {/* Input et bouton */}
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Domain Name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          {!isWhois && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
              onClick={handleSearch}
            >
              SEARCH
            </button>
          )}
        </div>

        {/* Extensions disponibles */}
        {!isWhois && (
          <div className="flex flex-wrap space-x-4 mt-4">
            {Object.keys(extensions).map((ext) => (
              <label key={ext} className="flex items-center space-x-1">
                <input
                  type="checkbox"
                  checked={extensions[ext]}
                  onChange={() => toggle(ext)}
                  className="accent-green-600"
                />
                <span>{ext}</span>
              </label>
            ))}
          </div>
        )}

        {/* Résultats affichés uniquement après recherche */}
        {(loading || results.length > 0) && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            {loading && <p>Chargement...</p>}
            {!loading && results.length > 0 && (
              <div className="space-y-4">
                {results.map((res, index) => (
                  <div key={index} className="border p-3 rounded bg-white shadow">
                    <p className="font-bold">{res.domain}</p>
                    <pre className="text-sm whitespace-pre-wrap">
                      {JSON.stringify(res.data, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
