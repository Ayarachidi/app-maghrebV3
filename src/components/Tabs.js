import { useEffect, useRef, useState } from "react";

// En dehors du composant
const tabLabels = ["DOMAIN SEARCH"];

export default function Tabs({ activeTab, setActiveTab }) {
  const containerRef = useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({});

  useEffect(() => {
    const container = containerRef.current;
    const buttons = container?.querySelectorAll("button");

    const activeIndex = tabLabels.indexOf(activeTab);
    if (buttons && buttons[activeIndex]) {
      const activeButton = buttons[activeIndex];
      const { offsetLeft, offsetWidth } = activeButton;
      setIndicatorStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [activeTab]); // ✅ plus de warning

  return (
    <div className="relative" ref={containerRef}>
      <div className="flex gap-3 sm:gap-4 my-4 relative">
        {tabLabels.map((label, idx) => (
          <button
            key={idx}
            onClick={() => setActiveTab(label)}
            className={`relative flex-1 min-w-[150px] sm:min-w-[180px] md:min-w-[200px] py-3 sm:py-4 px-2 rounded-md font-semibold text-sm sm:text-base text-center transition-all duration-300 ease-in-out
              ${activeTab === label ? "text-green-700" : "text-gray-800"}
              hover:bg-green-50 hover:scale-[1.03]`}
          >
            {label}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-[3px] bg-green-600 rounded transition-all duration-300"
          style={{ ...indicatorStyle, position: "absolute" }}
        />
      </div>
    </div>
  );
}
