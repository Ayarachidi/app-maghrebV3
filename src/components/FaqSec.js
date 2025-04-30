import React from "react";

function FaqSec() {
  return (
    <section className="w-full flex justify-center">
      <div className="w-[90vw] px-10 py-10 bg-white shadow-xl">
        <h1 className="font-extrabold text-3xl sm:text-3xl lg:text-4xl text-center mb-12">
          FAQs
        </h1>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left */}
          <div className="">
            <div className="p-6 ">
              <p className="font-semibold text-lg mb-2">
                How do I search a domain name?
              </p>
              <p className="text-sm text-gray-700">
                Simply use the Domain Search tool above. Type in the domain name
                in the search box and click on "Search".
              </p>
            </div>
            <div className="p-6 ">
              <p className="font-semibold text-lg mb-2">
                How can I find out who owns a domain?
              </p>
              <p className="text-sm text-gray-700">
                You can find out a domain's ownership using the WHOIS
                Information tool above.
              </p>
            </div>
            <div className="p-6 ">
              <p className="font-semibold text-lg mb-2">
                How do I find the location of an IP or Domain?
              </p>
              <p className="text-sm text-gray-700">
                Use the IP Lookup & Domain Location tools.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="">
            <div className="p-6 ">
              <p className="font-semibold text-lg mb-2">
                How do I generate domain names?
              </p>
              <p className="text-sm text-gray-700">
                Use the Domain Generator tool. Type in a keyword and you'll
                receive many suggestions.
              </p>
            </div>
            <div className="p-6 ">
              <p className="font-semibold text-lg mb-2">
                Where can I find when a domain expires?
              </p>
              <p className="text-sm text-gray-700">
                Use the WHOIS Information tool and check the domain name for
                expiry details.
              </p>
            </div>
            <div className="p-6">
              <p className="font-semibold text-lg mb-2">
                Where can I see the DNS Records of a Domain?
              </p>
              <p className="text-sm text-gray-700">
                Use the DNS Lookup tool and type in your domain name.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FaqSec;
