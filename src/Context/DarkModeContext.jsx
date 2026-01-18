// Context/DarkModeContext.jsx
import { createContext, useState, useEffect } from 'react';

export let DarkModeContext = createContext();

export function DarkModeProvider({ children }) {
    const [mode, setMode] = useState(() => {
        // Get saved mode from localStorage or default to 'light'
        return localStorage.getItem('theme') || 'light';
    });

    useEffect(() => {
        // Apply theme to document
        if (mode === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        // Save to localStorage
        localStorage.setItem('theme', mode);
    }, [mode]);

    function toggleMode() {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    }

    return (
        <DarkModeContext.Provider value={{ mode, toggleMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}
