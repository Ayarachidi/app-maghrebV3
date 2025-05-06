export default function Navbar() {
  return (
    <div className="relative text-black overflow-hidden bg-white">
      <div className="w-full bg-grqy-200 mx-auto flex justify-between items-center px-6 md:px-10 py-4 md:py-6 ">
        {/* Logo seul, agrandi */}
        <div className="flex items-center  xl:ml-10">
          <img
            src="/images/logo.png"
            alt="Logo"
            className="w-40 h-20" // Agrandir le logo uniquement
          />
        </div>

        {/* Liens placés un peu plus haut */}
        <div className="flex space-x-4 md:space-x-6 text-sm md:text-lg lg:-mt-10 z-100 -mt-6  xl:mr-10"> 
          
          <a href="/" className="hover:underline">
          Home
          </a>
        </div>
      </div>

      {/* Courbe en bas */}
      <svg
        className="absolute bottom-0 left-0 w-full z-10"
        viewBox="0 0 1440 130"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{
          filter: "drop-shadow(0 20px 30px rgba(249, 26, 26, 0.35))",
        }}
      >
        <path
          fill="white"
          d="M0,96 C360,192 1080,0 1440,96 L1440,320 L0,320 Z"
        />
      </svg>
    </div>
  );
}
