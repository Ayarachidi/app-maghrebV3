import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import useRecaptcha from './useRecaptcha';


export default function DomainSearch({ onSearchComplete, onBack }) {
  const [domain, setDomain] = useState("");
  const [extensions, setExtensions] = useState({ ".ma": true, "المغرب.": false });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null); // ✅ Nouveau
  const captchaRef = useRef(null);
  const { capchaToken, recaptchaRef, handleRecaptcha } = useRecaptcha();

  const fetchWithTimeout = (url, timeout = 7000) => { // ✅ Timeout corrigé
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);
    return fetch(url, { signal: controller.signal }).finally(() => clearTimeout(timer));
  };

  const handleCaptchaChange = (value) => { // ✅ Mise à jour
    if (value) {
      setCaptchaValid(true);
      setCaptchaToken(value);
    } else {
      setCaptchaValid(false);
      setCaptchaToken(null);
    }
  };

const handleSearch = async () => {
  if (!domain) {
    alert("Veuillez entrer un nom de domaine.");
    return;
  }

  if (!capchaToken) {
    alert("Veuillez valider le reCAPTCHA.");
    return;
  }

  setLoading(true);
  setResults([]);

  const selectedExtensions = Object.keys(extensions).filter((ext) => extensions[ext]);

  try {
    const fetchedResults = await Promise.all(
      selectedExtensions.map(async (ext) => {
        const fullDomain = `${domain}${ext}`;
        const url = `http://192.168.215.230:8080/domain/${encodeURIComponent(fullDomain)}`;

        try {
          const response = await fetchWithTimeout(url);
          if (!response.ok) {
            throw new Error(`Erreur HTTP ${response.status}`);
          }
          const data = await response.json();
          return { domain: fullDomain, data };
        } catch (error) {
          return {
            domain: fullDomain,
            data: { error: `Erreur lors de la récupération : ${error.message}` },
          };
        }
      })
    );
    setResults(fetchedResults);
    onSearchComplete();
  } catch (error) {
    setResults([{ domain: "", data: { error: "Erreur inattendue lors de la récupération des résultats." } }]);
  } finally {
    setLoading(false);
  }
};


  const toggle = (ext) => {
    setExtensions({ ...extensions, [ext]: !extensions[ext] });
  };

  const handleNameserverClick = (nameserver) => {
    const json = JSON.stringify(nameserver, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  const SectionCard = ({ title, children }) => (
    <details open className="mb-6 border border-[#3498DB] rounded-2xl bg-white shadow transition duration-300">
      <summary className="cursor-pointer p-4 font-semibold text-xl text-[#2C3E50] bg-white hover:bg-white rounded-t-2xl">
        {title}
      </summary>
      <div className="p-4 text-sm text-gray-700 space-y-3">{children}</div>
    </details>
  );

  const Loader = () => (
    <div className="flex justify-center items-center py-8">
      <motion.div
        className="w-12 h-12 border-4 border-[#d41a48] border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, ease: "linear", duration: 1 }}
      />
    </div>
  );

  return (
    <div className={`mt-6 ${!results.length ? "p-6 rounded shadow bg-[#d41a48]" : ""}`}> {/* ✅ Correction JSX */}
      {results.length > 0 && (
        <button
          onClick={() => {
            setResults([]);
            onBack();
          }}
          className="mb-6 inline-flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 font-semibold rounded-lg shadow hover:bg-white transition"
        >
          ← Back
        </button>
      )}

      <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg">
        {!results.length ? (
          <>
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="Entrez un nom de domaine"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d41a48]"
              />
              <button
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>

            <div className="mt-4">
           
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lc7rzkrAAAAAKgil1whOn63hYFpsD7WQlG6Ig4e" // Remplace par ta vraie clé
              onChange={handleRecaptcha}
            />

            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              {Object.keys(extensions).map((ext) => (
                <label key={ext} className="flex items-center gap-2 text-sm">
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

            {loading && <Loader />}
          </>
        ) : (
          <>
            {results.map((result, index) => (
              <div key={index} className="space-y-6 mb-10">
                <h2 className="text-lg font-bold text-[#d41a48] mb-2">
                  Domaine : {result.domain}
                </h2>

              <SectionCard title="🧾 Details"> 
  <p><strong>Object class name :</strong> {result.data.objectClassName}</p>
  <p><strong>Handle :</strong> {result.data.handle}</p>
  <p><strong>LDH name :</strong> {result.data.ldhName}</p>
  <p><strong>Unicode name :</strong> {result.data.unicodeName}</p>
  <p><strong>Secure DNS delegation signed :</strong> {result.data.secureDNS?.delegationSigned ? "Yes" : "No"}</p>
  <p><strong>Status :</strong> {(result.data.status || []).map((s, i) => (
    <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">{s}</span>
  ))}</p>

  {/* Bouton-lien stylisé */}
  {result.data.links && result.data.links[0]?.href && (
  <a
    href={result.data.links[0].href}
    target="_blank"
    rel="noopener noreferrer"
    className="block mt-4 w-full text-center border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm hover:bg-gray-100 transition"
  >
    {result.data.links[0].href}
  </a>
)}

</SectionCard>



               <SectionCard title="📅 Events">
  {(result.data.events || []).map((event, i) => {
    const formattedDate = new Date(event.eventDate).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    return (
      <p key={i}>
        <strong>{event.eventAction} : </strong>  {formattedDate}
        {event.eventActor && ` par ${event.eventActor}`}
      </p>
    );
  })}
</SectionCard>


              <SectionCard title="🏢 Entities">
  {(result.data.entities || []).map((entity, i) => (
    <details key={i} open className="mb-4 border rounded-xl bg-white shadow transition duration-300">
      <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
        {entity.handle}{" "}
        ({(entity.roles || []).join(", ")})
      </summary>

      <div className="p-4 space-y-3 text-sm text-gray-700">
        <p><strong>Object class name:</strong> entity</p>
        <p><strong>Handle:</strong> {entity.handle}</p>

        {/* Affichage des champs fn, adr, org avec filtrage spécial pour adr */}
        {entity.vcardArray?.[1]?.map((v, j) => {
          const [label, , , value] = v;

          if (["fn", "adr", "org"].includes(label)) {
            if (label === "adr" && Array.isArray(value)) {
              const cleanedAddress = [...new Set(value.filter(val => val && val.trim() !== ""))];
              if (cleanedAddress.length === 0) return null;
              return (
                <p key={j}>
                  <strong>Adr:</strong> {cleanedAddress.join(", ")}
                </p>
              );
            }

            if (!value || (Array.isArray(value) && value.length === 0)) return null;

            return (
              <p key={j}>
                <strong>{label.charAt(0).toUpperCase() + label.slice(1)}:</strong>{" "}
                {Array.isArray(value) ? value.join(", ") : value}
              </p>
            );
          }

          return null;
        })}

        {/* Affichage des rôles */}
        {entity.roles && entity.roles.length > 0 && (
          <p>
            <strong>Roles:</strong>{" "}
            {entity.roles.map((role, idx) => (
              <span key={idx} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">
                {role}
              </span>
            ))}
          </p>
        )}

        {/* REMARKS */}
        {entity.remarks && entity.remarks.length > 0 && (
          <div className="mt-4 space-y-3">
            <p className="font-semibold text-gray-800 text-center">Remarks</p>
            {entity.remarks.map((remark, rIdx) => (
              <div key={rIdx} className="border border-gray-200 bg-gray-50 p-3 rounded-lg shadow-sm text-center">
                <p className="font-medium text-gray-700">{remark.title}</p>
                <p className="font-medium text-gray-700">{remark.type}</p>
                <div className="mt-1 text-gray-600 text-sm space-y-1">
                  {(remark.description || []).map((desc, dIdx) => (
                    <p key={dIdx}>{desc}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </details>
  ))}
</SectionCard>





                <SectionCard title="🌐 Nameservers">
                  {(result.data.nameservers || []).map((ns, i) => (
                    <details key={i} open className="mb-4 border rounded-xl bg-white shadow transition duration-300">
                      <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
                        {ns.ldhName} ({ns.ipAddresses?.v4?.join(", ") || "N/A"})
                      </summary>
                      <div className="p-4 space-y-1 text-sm text-gray-700">
                        <p><strong>Object class name:</strong> {ns.objectClassName}</p>
                        <p><strong>LDH name:</strong> {ns.ldhName}</p>
                        <p><strong>Unicode name:</strong> {ns.unicodeName}</p>
                        <p><strong>IPv4:</strong> {ns.ipAddresses?.v4?.join(", ") || "N/A"}</p>
                        <p><strong>Status:</strong>{" "}
                          {(ns.status || []).map((s, j) => (
                            <span key={j} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">{s}</span>
                          ))}
                        </p>
                        <p>
  <strong>Link:</strong>
  <button
    onClick={() => handleNameserverClick(ns)}
    className="block mt-4 w-full text-center border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm hover:bg-gray-100 transition"
  >
    {ns.links[0].href}
  </button>
</p>


                      </div>
                    </details>
                  ))}
                </SectionCard>

                <SectionCard title="📄 Notices">
                  {(result.data.notices || []).map((notice, i) => (
                    <div key={i} className="mb-3">
                      <p className="font-semibold">{notice.title}</p>
                      <ul className="list-disc pl-5 text-sm">
                        {notice.description?.map((desc, j) => (
                          <li key={j}>{desc}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </SectionCard>
              </div>
            ))}
          </>
        )}
       

      </div>
    </div>
  );
}
