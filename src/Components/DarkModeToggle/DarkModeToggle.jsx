// Components/DarkMode/DarkMode.jsx
import { useContext } from "react";

import { MdDarkMode, MdLightMode } from "react-icons/md";
import { DarkModeContext } from "../../Context/DarkModeContext";

export default function DarkMode() {
    let { mode, toggleMode } = useContext(DarkModeContext);

    return (
        <button
            onClick={toggleMode}
            className="p-2 rounded-full bg-gray-200  dark:bg-black  transition-colors cursor-pointer"
            aria-label="Toggle dark mode"
        >
            {mode === 'light' ? (
                <MdDarkMode className="text-2xl text-gray-800 dark:text-gray-200" />
            ) : (
                <MdLightMode className="text-2xl text-yellow-400" />
            )}
        </button>
    );
}