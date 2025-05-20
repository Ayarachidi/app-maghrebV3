import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import DomainSearch from './components/DomainSearch';
import InfoCards from './components/InfoCards';
import FaqSec from './components/FaqSec';
import Footer from './components/Footer';

function App() {
  const [activeTab, setActiveTab] = useState('DOMAIN SEARCH');
  const [showOnlyResults, setShowOnlyResults] = useState(false);

  const handleSearchComplete = () => {
    setShowOnlyResults(true);
  };

  const handleBack = () => {
    setShowOnlyResults(false);
  };

  const shouldShowExtras = !showOnlyResults;

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="w-full px-4 md:px-14 py-8">
        {shouldShowExtras && (
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'DOMAIN SEARCH' && (
          <DomainSearch
            onSearchComplete={handleSearchComplete}
            onBack={handleBack}
          />
        )}

        {shouldShowExtras && (
          <>
            <InfoCards />
            <FaqSec />
          </>
        )}
      </div>
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
