// App.js
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

  return (
    <div className="bg-white min-h-screen font-sans">
      <Navbar />
      <div className="w-full px-4 md:px-14 py-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === "DOMAIN SEARCH" && <DomainSearch />}
        {activeTab === "WHOIS INFORMATION" && <WhoisSearch />}
        
        {/* Tu pourras ajouter ici REVERSE IP LOOKUP et DNS LOOKUP plus tard */}
        
        <InfoCards />
        <FaqSec />
      </div>
      <Footer />
    </div>
  );
}

export default App;
