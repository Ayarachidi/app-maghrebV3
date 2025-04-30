import React from "react";

function Footer() {
  return (
    <footer className="w-full border-t-3 border-[#d41a48] py-8 px-4 lg:px-32 bg-white mt-5">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-10">
        {/* Left Section */}
        <div className="flex flex-col sm:flex-row gap-12 lg:gap-30 w-full lg:w-2/3">
          {/* Tools */}
          <div>
            <p className="text-xl font-bold capitalize mb-4">tools</p>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  .MA Domain Name
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  WHOIS .ma
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Reverse IP Lookup
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  DNS Lookup
                </a>
              </li>
            </ul>
          </div>
          {/* Pages */}
          <div>
            <p className="text-xl font-bold capitalize mb-4">pages</p>
            <ul className="space-y-2 capitalize text-sm text-gray-700">
              <li>
                <a href="#" className="hover:underline">
                  home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  contact us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full flex justify-center lg:w-1/3">
          <img
            src="/images/logo.png"
            alt="Company Logo"
            className="mx-auto lg:mx-0 w-40"
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
