export default function InfoCards() {
  const cards = [
    {
      icon: "/images/card1.png",
      title: "CHECK DOMAIN AVAILABILITY",
      text: "Check whether a Domain Name is available for registration or not via our Domain Search Tool.",
    },
    {
      icon: "/images/domainname.png",
      title: "FIND DOMAIN OWNER INFORMATION",
      text: "Use the WHOIS information tool to find out a domain's owner, location, ip and other information.",
    },
    {
      icon: "/images/card3.png",
      title: "FIND OUT DOMAIN EXPIRY",
      text: "Looking out for a domain name that you want to claim? Learn when a domain will expire with our whois & search tools.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">

      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-10 rounded-sm shadow-xl  shadow-t-xl text-center transform transition-transform hover:scale-105"
        >
          <div className="mb-6 flex justify-center">
            <img src={card.icon} alt="icon" className="w-30 h-30" />
          </div>
          <h3 className="font-bold mb-4 text-xl">{card.title}</h3>
          <p className="text-gray-700 text-base">{card.text}</p>
        </div>
      ))}
    </div>
  );
}
