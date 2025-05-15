function FaqSec() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-[90vw] px-10 py-10 bg-white shadow-xl">
        <h1 className="font-extrabold text-3xl sm:text-3xl lg:text-4xl text-center mb-12">
          Frequently Asked Questions
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="p-6">
              <p className="font-semibold text-lg mb-2">
                How do I search for a domain name?
              </p>
              <p className="text-sm text-gray-700">
                Simply enter the domain name in the search field above and click "Search".
              </p>
            </div>
            <div className="p-6">
              <p className="font-semibold text-lg mb-2">
                How can I find out who owns a domain?
              </p>
              <p className="text-sm text-gray-700">
                Our Domain Search tool provides details about the domain holder when available.
              </p>
            </div>
          </div>

          <div>
            <div className="p-6">
              <p className="font-semibold text-lg mb-2">
                Can I see a domain's expiration date?
              </p>
              <p className="text-sm text-gray-700">
                Yes, if available, the expiration date is shown in the domain result details.
              </p>
            </div>
            <div className="p-6">
              <p className="font-semibold text-lg mb-2">
                Which domains can I search?
              </p>
              <p className="text-sm text-gray-700">
                You can search domains with supported extensions such as .ma or المغرب.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSec;
