import React, { createContext, useState } from 'react';


export const ThemeContext = createContext();
export default function ThemeContextProvider(props) {
  const [dark, setDark] = useState(localStorage.getItem('theme', false));

  const toggleTheme = () => {
    alert('dark');
    if (dark) {
      setDark(false);

      localStorage.removeItem('theme');
    } else {
      setDark(true);

      localStorage.setItem('theme', true);
    }
  };
  if (localStorage.getItem('theme')) {
    document.body.classList.add('dark');
  } else {
    document.body.classList.remove('dark');
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
}
