// WhoisSearch.js
import { useState } from "react";

export default function WhoisSearch() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleWhois = async () => {
    if (!domain) return;

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(
        `http://192.168.215.57:8080/whois/${encodeURIComponent(domain)}`
      );
      const data = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "Erreur lors de la récupération WHOIS." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded shadow mt-6 bg-[#d41a48]">
      <div className="bg-white bg-opacity-90 p-6 rounded shadow">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter Domain Name"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
            onClick={handleWhois}
          >
            GET WHOIS
          </button>
        </div>

        {loading && <p className="mt-4">Chargement...</p>}
        {result && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            <pre className="text-sm whitespace-pre-wrap">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
