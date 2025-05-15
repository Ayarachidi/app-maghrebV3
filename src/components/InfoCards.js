export default function InfoCards() {
  const cards = [
    {
      icon: "/images/card1.png",
      title: "CHECK A DOMAIN NAME",
      text: "Search domain details easily using our Domain Search tool.",
    },
    {
      icon: "/images/domainname.png",
      title: "FIND OUT WHO OWNS A DOMAIN",
      text: "Get information about the domain holder, location, and related entities.",
    },
    {
      icon: "/images/card3.png",
      title: "CHECK EXPIRATION DATE",
      text: "See when a domain will expire and plan accordingly.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10 mb-10">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className="bg-white p-10 rounded-sm shadow-xl text-center transform transition-transform hover:scale-105"
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
