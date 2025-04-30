// Tabs.js
export default function Tabs({ activeTab, setActiveTab }) {
  const tabs = [
    "DOMAIN SEARCH",
    "WHOIS INFORMATION",
    "REVERSE IP LOOKUP",
    "DNS LOOKUP",
  ];

  return (
    <div className="flex flex-wrap gap-3 sm:gap-4 my-4">
      {tabs.map((label, idx) => (
        <button
          key={idx}
          onClick={() => setActiveTab(label)}
          className={`flex-1 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] py-3 sm:py-4 px-2 rounded-md shadow text-center font-semibold text-sm sm:text-base transition ${
            activeTab === label ? "bg-green-600 text-white" : "bg-white text-gray-800"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
