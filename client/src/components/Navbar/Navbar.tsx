import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar({ setFilter }) {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 50) {
          setShowNavbar(false);
        } else {
          setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [lastScrollY, location.pathname]);

  const handleFilterClick = (filterValue) => {
    setFilter(filterValue);
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 z-20 w-full bg-gray-100 shadow-md
        ${showNavbar ? "translate-y-0" : "-translate-y-full"
        } transition-all duration-300`}
      >
        <nav className="flex items-center justify-between px-10 py-6">
          <div className="absolute left-0 px-4">
            <a href="/">
              <img src="/logo_holder.png" alt="Logo" className="h-20 w-auto" />{" "}
            </a>
          </div>

          <div className="flex items-center flex-grow mx-auto max-w-6xl">
            <input
              type="text"
              placeholder="Busca un producto por SKU..."
              className="flex-grow px-4 py-2 border-2 border-blue-900 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-900"
            />
          </div>
          <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full focus:outline-none"
          >
            Filtrar
            <span className="ml-2">▼</span>
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
              <div className="flex justify-between space-x-16">
                <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                  <h4 className="font-semibold text-gray-700 underline mb-2">Tipo de Material</h4>
                  <ul className="space-y-1 text-left w-full">
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Polietileno</li>
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Polipropileno</li>
                  </ul>
                </div>
                <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                  <h4 className="font-semibold text-gray-700 underline mb-2">Tipo de Producto</h4>
                  <ul className="space-y-1 text-left w-full">
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">Bolsa</li>
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded" onClick={() => handleFilterClick("Bobina")}>Bobina</li>
                  </ul>
                </div>
                <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                  <h4 className="font-semibold text-gray-700 underline mb-2">Dimensiones</h4>
                  <ul className="space-y-1 text-left w-full">
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">30x30x80</li>
                    <li className="cursor-pointer hover:bg-gray-100 px-2 py-1 rounded">40x40x100</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
        </nav>
      </div>
    </>
  );
}
