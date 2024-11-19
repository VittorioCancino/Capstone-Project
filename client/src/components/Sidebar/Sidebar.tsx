import React, { useState } from "react";

interface SideBarProps {
    setFilterComponent: (filter: string | null) => void;
}



const SideBar: React.FC<SideBarProps> = ({ setFilterComponent }) => {

    const [showDropdown, setShowDropdown] = useState(false);

    return (
        <div className="h-full w-64 bg-gray-100 p-4 border-r shadow-lg">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <ul className="space-y-4">
                <li>
                    <button
                        onClick={() => setFilterComponent(null)}
                        className="w-full text-left p-2 hover:bg-gray-200 rounded"
                    >
                        🏠 Todos los productos
                    </button>
                </li>
                <li className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="w-full text-left p-2 hover:bg-gray-200 rounded"
                    >
                        📦 Admin
                        <span className="ml-2">▼</span>
                    </button>
                    {showDropdown && (
                        <div className="absolute left-20 mt-2 w-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4">
                            <div className="flex justify-between space-x-16">
                                <div className="text-center flex flex-col items-start space-y-2 whitespace-nowrap">
                                    <h4
                                        className="font-semibold text-gray-700  cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-[200px]"
                                        onClick={() => { setFilterComponent("Stores"); setShowDropdown(!showDropdown) }}
                                    >
                                        Bodegas
                                    </h4>
                                    <h4
                                        className="font-semibold text-gray-700 mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-[200px]"
                                        onClick={() => { setFilterComponent("Areas"); setShowDropdown(!showDropdown) }}
                                    >
                                        Areas
                                    </h4>

                                    <h4
                                        className="font-semibold text-gray-700  mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-[200px]"
                                        onClick={() => { setFilterComponent("Groups"); setShowDropdown(!showDropdown) }}
                                    >
                                        Grupos
                                    </h4>
                                    <h4
                                        className="font-semibold text-gray-700 mb-2 cursor-pointer hover:bg-gray-100 px-2 py-1 rounded w-[200px]"
                                        onClick={() => { setFilterComponent("Materials"); setShowDropdown(!showDropdown) }}
                                    >
                                        Materiales
                                    </h4>
                                </div>
                            </div>
                        </div>
                    )}
                </li>
                <li>
                    <button
                        onClick={() => setFilterComponent("Users")}
                        className="w-full text-left p-2 hover:bg-gray-200 rounded"
                    >
                        👥 Users
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setFilterComponent("Reports")}
                        className="w-full text-left p-2 hover:bg-gray-200 rounded"
                    >
                        📊 Reports
                    </button>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;

