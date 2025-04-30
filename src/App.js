// App.js
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import DomainSearch from './components/DomainSearch';
import InfoCards from './components/InfoCards';

function App() {
  const [activeTab, setActiveTab] = useState("DOMAIN SEARCH");

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="w-full px-4 md:px-8 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {(activeTab === "DOMAIN SEARCH" || activeTab === "WHOIS INFORMATION") && (
          <DomainSearch isWhois={activeTab === "WHOIS INFORMATION"} />
        )}
        <InfoCards />
      </div>
    </div>
  );
}

export default App;
