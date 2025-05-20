import SectionCard from "./SectionCard";

export default function SearchResults({ results }) {
  const validResults = results.filter((r) => !r.data?.error);

  const handleNameserverClick = (nameserver) => {
    const jsonContent = JSON.stringify(nameserver, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (validResults.length === 0) {
    return (
      <div className="text-center text-red-600 font-semibold text-lg py-10">
        Found 0 results
      </div>
    );
  }

  const dateFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return validResults.map((result) => (
    <div key={result.domain} className="space-y-6 mb-10">
      <h2 className="text-lg font-bold text-[#d41a48] mb-2">
        Domaine : {result.domain}
      </h2>

      {/* 🧾 Details */}
      <SectionCard title="🧾 Details">
        <p><strong>Object class name:</strong> {result.data.objectClassName}</p>
        <p><strong>Handle:</strong> {result.data.handle}</p>
        <p><strong>LDH name:</strong> {result.data.ldhName}</p>
        <p><strong>Unicode name:</strong> {result.data.unicodeName}</p>
        <p>
          <strong>Secure DNS delegation signed:</strong>{" "}
          {result.data.secureDNS?.delegationSigned ? "Yes" : "No"}
        </p>
        <p><strong>Status:</strong>{" "}
          {(result.data.status || []).map((status, idx) => (
            <span
              key={idx}
              className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2"
            >
              {status}
            </span>
          ))}
        </p>

        {result.data.links?.[0]?.href && (
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

      {/* 📅 Events */}
      {Array.isArray(result.data.events) && result.data.events.length > 0 && (
        <SectionCard title="📅 Events">
          {result.data.events.map((event, idx) => {
            const formattedDate = new Date(event.eventDate).toLocaleString("fr-FR", dateFormatOptions);
            return (
              <p key={idx}>
                <strong>{event.eventAction}:</strong> {formattedDate}
                {event.eventActor && ` par ${event.eventActor}`}
              </p>
            );
          })}
        </SectionCard>
      )}

      {/* 🏢 Entities */}
      {Array.isArray(result.data.entities) && result.data.entities.length > 0 && (
        <SectionCard title="🏢 Entities">
          {result.data.entities.map((entity) => (
            <details
              key={entity.handle}
              open
              className="mb-4 border rounded-xl bg-white shadow transition duration-300"
            >
              <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
                {entity.handle} ({(entity.roles || []).join(", ")})
              </summary>
              <div className="p-4 space-y-3 text-sm text-gray-700">
                <p><strong>Object class name:</strong> entity</p>
                <p><strong>Handle:</strong> {entity.handle}</p>

                {(entity.vcardArray?.[1] || []).map((v, idx) => {
                  const [label, , , value] = v;
                  if (!["fn", "adr", "org"].includes(label)) return null;

                  if (label === "adr" && Array.isArray(value)) {
                    const adrParts = value.flatMap(item =>
                      Array.isArray(item)
                        ? item.filter(val => typeof val === "string" && val.trim())
                        : (typeof item === "string" && item.trim() ? [item] : [])
                    );
                    if (adrParts.length === 0) return null;
                    return <p key={idx}><strong>Adr:</strong> {adrParts.join(", ")}</p>;
                  }

                  if (!value || (Array.isArray(value) && value.length === 0)) return null;

                  return (
                    <p key={idx}>
                      <strong>{label.charAt(0).toUpperCase() + label.slice(1)}:</strong>{" "}
                      {Array.isArray(value) ? value.join(", ") : value}
                    </p>
                  );
                })}

                {entity.roles?.length > 0 && (
                  <p>
                    <strong>Roles:</strong>{" "}
                    {entity.roles.map((role, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full mr-2"
                      >
                        {role}
                      </span>
                    ))}
                  </p>
                )}

                {entity.remarks?.length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="font-semibold text-gray-800 text-center">Remarks</p>
                    {entity.remarks.map((remark, idx) => (
                      <div
                        key={idx}
                        className="border border-gray-200 bg-gray-50 p-3 rounded-lg shadow-sm text-center"
                      >
                        {remark.title && <p className="font-medium text-gray-700">{remark.title}</p>}
                        {remark.type && <p className="font-medium text-gray-700">{remark.type}</p>}
                        {Array.isArray(remark.description) && remark.description.length > 0 && (
                          <div className="mt-1 text-gray-600 text-sm space-y-1">
                            {remark.description.map((desc, dIdx) => (
                              <p key={dIdx}>{desc}</p>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </SectionCard>
      )}

      {/* 🌐 Nameservers */}
      {Array.isArray(result.data.nameservers) && result.data.nameservers.length > 0 && (
        <SectionCard title="🌐 Nameservers">
          {result.data.nameservers.map((ns) => (
            <details
              key={ns.ldhName}
              open
              className="mb-4 border rounded-xl bg-white shadow transition duration-300"
            >
              <summary className="cursor-pointer p-3 font-medium bg-[#eff6ff] hover:bg-[#dbeafe] text-blue-800 rounded-t-xl">
                {ns.ldhName} ({ns.ipAddresses?.v4?.join(", ") || "N/A"})
              </summary>
              <div className="p-4 space-y-1 text-sm text-gray-700">
                <p><strong>Object class name:</strong> {ns.objectClassName}</p>
                <p><strong>LDH name:</strong> {ns.ldhName}</p>
                <p><strong>Unicode name:</strong> {ns.unicodeName}</p>
                <p><strong>IPv4:</strong> {ns.ipAddresses?.v4?.join(", ") || "N/A"}</p>
                <p><strong>Status:</strong>{" "}
                  {(ns.status || []).map((status, idx) => (
                    <span
                      key={idx}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mr-2"
                    >
                      {status}
                    </span>
                  ))}
                </p>
                <p><strong>Link:</strong></p>
                <button
                  onClick={() => handleNameserverClick(ns)}
                  className="block mt-4 w-full text-center border border-gray-300 text-gray-700 rounded-full px-4 py-2 text-sm hover:bg-gray-100 transition"
                >
                  {ns.links?.[0]?.href || "View JSON"}
                </button>
              </div>
            </details>
          ))}
        </SectionCard>
      )}

      {/* 🔀 Variants */}
      {Array.isArray(result.data.variants) && result.data.variants.length > 0 && (
        <SectionCard title="🔀 Variants">
          {result.data.variants.map((variant, idx) => (
            <div key={idx} className="space-y-2">
              <p><strong>Relations:</strong> {(variant.relations || []).join(", ")}</p>
              {(variant.variantNames || []).map((name, j) => (
                <div key={j} className="pl-4">
                  <p><strong>LDH Name:</strong> {name.ldhName}</p>
                  <p><strong>Unicode Name:</strong> {name.unicodeName}</p>
                </div>
              ))}
            </div>
          ))}
        </SectionCard>
      )}

      {/* 📄 Notices */}
      {Array.isArray(result.data.notices) && result.data.notices.length > 0 && (
        <SectionCard title="📄 Notices">
          {result.data.notices.map((notice, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-semibold">{notice.title}</p>
              <ul className="list-disc pl-5 text-sm">
                {(notice.description || []).map((desc, dIdx) => (
                  <li key={dIdx}>{desc}</li>
                ))}
              </ul>
            </div>
          ))}
        </SectionCard>
      )}
    </div>
  ));
}
