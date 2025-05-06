import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Disclosure } from "@headlessui/react";

export default function DomainSearch() {
  const [domain, setDomain] = useState("");
  const [extensions, setExtensions] = useState({ ".ma": true, "المغرب.": false });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const sectionOrder = ["details", "events", "entities", "nameservers", "notices"];

  const toggle = (ext) => {
    setExtensions({ ...extensions, [ext]: !extensions[ext] });
  };

  const handleSearch = async () => {
    if (!domain) return;
    setLoading(true);
    setResults([]);

    const selectedExtensions = Object.keys(extensions).filter((ext) => extensions[ext]);

    try {
      const fetchedResults = await Promise.all(
        selectedExtensions.map(async (ext) => {
          const fullDomain = `${domain}${ext}`;
          const response = await fetch(`http://192.168.215.230:8080/domain/${encodeURIComponent(fullDomain)}`);
          const data = await response.json();
          return { domain: fullDomain, data };
        })
      );
      setResults(fetchedResults);
      setCurrentDomainIndex(0);
      setCurrentSectionIndex(0);
      setShowModal(true);
    } catch (error) {
      setResults([{ domain: "", data: { error: "Erreur de récupération des données." } }]);
    } finally {
      setLoading(false);
    }
  };

  const currentResult = results[currentDomainIndex];
  const currentSection = sectionOrder[currentSectionIndex];

  const goToNextSection = () => setCurrentSectionIndex((prev) => (prev + 1) % sectionOrder.length);
  const goToPrevSection = () => setCurrentSectionIndex((prev) => (prev - 1 + sectionOrder.length) % sectionOrder.length);
  const closeModal = () => {
    setShowModal(false);
    setCurrentSectionIndex(0);
    setCurrentDomainIndex(0);
  };

  const SectionCard = ({ title, children }) => (
    <div className="border border-gray-200 p-4 rounded-2xl bg-white shadow-md w-full h-full">
      <h3 className="font-semibold mb-4 text-xl text-[#d41a48]">{title}</h3>
      <div className="text-sm text-gray-700 space-y-3">{children}</div>
    </div>
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
    <div className="p-6 rounded shadow mt-6 bg-[#d41a48]">
      <div className="bg-white bg-opacity-95 p-6 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Entrez un nom de domaine"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#d41a48]"
          />
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold shadow"
            onClick={handleSearch}
          >
            Rechercher
          </button>
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

        <AnimatePresence>
          {showModal && currentResult && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-white w-full max-w-3xl h-[80vh] p-6 rounded-2xl shadow-xl relative flex flex-col"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-3 right-3 text-gray-500 hover:text-black"
                >
                  <X size={24} />
                </button>

                <div className="flex justify-between items-center mb-4">
                  <button onClick={goToPrevSection} className="text-[#d41a48] hover:text-black">
                    <ChevronLeft size={28} />
                  </button>
                  <h2 className="text-lg font-bold text-[#d41a48] text-center">
                    Domaine : {currentResult.domain}
                  </h2>
                  <button onClick={goToNextSection} className="text-[#d41a48] hover:text-black">
                    <ChevronRight size={28} />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 min-h-0 pr-1 space-y-6">
                  {currentSection === "details" && (
                    <SectionCard title="🧾 Détails">
                      <p><strong>Object class name:</strong> {currentResult.data.objectClassName}</p>
                      <p><strong>Handle:</strong> {currentResult.data.handle}</p>
                      <p><strong>LDH name:</strong> {currentResult.data.ldhName}</p>
                      <p><strong>Unicode name:</strong> {currentResult.data.unicodeName}</p>
                      <p><strong>Secure DNS:</strong> {currentResult.data.secureDNS?.delegationSigned ? "Oui" : "Non"}</p>
                      <p><strong>Status:</strong> {(currentResult.data.status || []).map((s, i) => (
                        <span key={i} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2">{s}</span>
                      ))}</p>
                    </SectionCard>
                  )}

                  {currentSection === "events" && (
                    <SectionCard title="📅 Événements">
                      {(currentResult.data.events || []).map((event, i) => (
                        <p key={i}>
                          {event.eventAction} - {event.eventDate}
                          {event.eventActor && ` par ${event.eventActor}`}
                        </p>
                      ))}
                    </SectionCard>
                  )}

                  {currentSection === "entities" && (
                    <SectionCard title="🏢 Entités">
                      {(currentResult.data.entities || []).map((entity, i) => (
                        <details
                          key={i}
                          open
                          className="mb-4 border rounded-xl bg-white shadow transition duration-300"
                        >
                          <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
                            {entity.vcardArray?.[1]?.find(v => v[0] === "fn")?.[3] || entity.handle}
                            {" "} ({(entity.roles || []).join(", ")})
                          </summary>
                          <div className="p-4 space-y-1 text-sm text-gray-700">
                            <p><strong>Handle:</strong> {entity.handle}</p>
                            {(entity.vcardArray?.[1] || []).map((v, j) => {
                              const [label, , , value] = v;
                              return <p key={j}><strong>{label}:</strong> {Array.isArray(value) ? value.join(", ") : value}</p>;
                            })}
                          </div>
                        </details>
                      ))}
                    </SectionCard>
                  )}

                  {currentSection === "nameservers" && (
                    <SectionCard title="🌐 Serveurs de noms">
                      {(currentResult.data.nameservers || []).map((ns, i) => (
                        <details
                          key={i}
                          open
                          className="mb-4 border rounded-xl bg-white shadow transition duration-300"
                        >
                          <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
                            {ns.ldhName}
                          </summary>
                          <div className="p-4 space-y-1 text-sm text-gray-700">
                            <p><strong>LDH Name:</strong> {ns.ldhName}</p>
                            <p><strong>IPv4:</strong> {ns.ipAddresses?.v4?.join(", ") || "N/A"}</p>
                            <p><strong>IPv6:</strong> {ns.ipAddresses?.v6?.join(", ") || "N/A"}</p>
                            <p>
                              <strong>Status:</strong>{" "}
                              {(ns.status || []).map((s, j) => (
                                <span key={j} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2">{s}</span>
                              ))}
                            </p>
                          </div>
                        </details>
                      ))}
                    </SectionCard>
                  )}

                  {currentSection === "notices" && (
                    <SectionCard title="📄 Notices">
                      {(currentResult.data.notices || []).map((notice, i) => (
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
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
