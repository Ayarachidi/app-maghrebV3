import { useState } from "react";

export default function DomainSearch() {
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
      setResults([
        { domain: "", data: { error: "Erreur de récupération des données." } },
      ]);
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
            onClick={handleSearch}
          >
            SEARCH
          </button>
        </div>

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

        {(loading || results.length > 0) && (
          <div className="mt-6 bg-gray-100 p-4 rounded shadow">
            {loading && <p>Chargement...</p>}
            {!loading &&
              results.map((res, index) => (
                <div
                  key={index}
                  className="border p-4 rounded bg-white shadow space-y-3 mb-6"
                >
                  <h2 className="text-xl font-semibold text-[#d41a48]">
                    Domaine : {res.domain}
                  </h2>

                  {res.data.error && (
                    <p className="text-red-500">{res.data.error}</p>
                  )}

                  {!res.data.error && (
                    <>
                      {/* Statut et handle */}
                      <p>
                        <strong>Status:</strong>{" "}
                        {(res.data.status || []).join(", ")}
                      </p>
                      <p>
                        <strong>Handle:</strong> {res.data.handle}
                      </p>

                      {/* Events */}
                      {res.data.events && (
                        <div>
                          <h3 className="font-bold text-lg">Événements :</h3>
                          <ul className="list-disc list-inside">
                            {res.data.events.map((event, i) => (
                              <li key={i}>
                                {event.eventAction} - {event.eventDate}
                                {event.eventActor &&
                                  ` (par ${event.eventActor})`}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Notices */}
                      {res.data.notices && (
                        <div>
                          <h3 className="font-bold text-lg">Notices :</h3>
                          {res.data.notices.map((notice, i) => (
                            <div key={i} className="mb-2">
                              <p className="font-semibold">{notice.title}</p>
                              <ul className="list-disc list-inside">
                                {notice.description.map((desc, j) => (
                                  <li key={j}>{desc}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Entities */}
                      {res.data.entities && (
                        <div>
                          <h3 className="font-bold text-lg">Entités :</h3>
                          {res.data.entities.map((entity, i) => (
                            <div
                              key={i}
                              className="p-2 border rounded mb-2 bg-gray-50"
                            >
                              <p>
                                <strong>Rôle:</strong>{" "}
                                {(entity.roles || []).join(", ")}
                              </p>
                              {entity.vcardArray && (
                                <ul className="text-sm list-inside">
                                  {entity.vcardArray[1].map((v, j) => {
                                    const [label, , , value] = v;
                                    return (
                                      <li key={j}>
                                        <strong>{label}:</strong>{" "}
                                        {Array.isArray(value)
                                          ? value.join(", ")
                                          : value}
                                      </li>
                                    );
                                  })}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Nameservers */}
                      {res.data.nameservers && (
                        <div>
                          <h3 className="font-bold text-lg">Serveurs DNS :</h3>
                          <ul className="list-disc list-inside">
                            {res.data.nameservers.map((ns, i) => (
                              <li key={i}>
                                {ns.ldhName} -{" "}
                                {ns.ipAddresses?.v4?.join(", ") || "IP inconnue"}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
