import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import DomainSearch from './components/DomainSearch';
import WhoisSearch from './components/WhoisSearch';
import InfoCards from './components/InfoCards';
import FaqSec from './components/FaqSec';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState("DOMAIN SEARCH");
  const [showOnlyResults, setShowOnlyResults] = useState(false);

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="w-full px-4 md:px-14 py-8">
        {!showOnlyResults && <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />}

        {activeTab === "DOMAIN SEARCH" && (
          <DomainSearch
  onSearchComplete={() => setShowOnlyResults(true)}
  onBack={() => setShowOnlyResults(false)}
/>

        )}

        {!showOnlyResults && activeTab === "WHOIS INFORMATION" && <WhoisSearch />}
        {!showOnlyResults && <InfoCards />}
        {!showOnlyResults && <FaqSec />}
      </div>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
