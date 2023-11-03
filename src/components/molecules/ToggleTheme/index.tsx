"use client";

import React from "react";
import styles from "./toggleTheme.module.css";

const ToggleTheme = () => {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
  };

  return (
    <label htmlFor="theme" className={`${styles.theme} print:flex-none my-auto self-end sm:self-start`}>
      <span className={`${styles.theme__toggleWrap}`}>
        <input
          id="theme"
          className={`${styles.theme__toggle}`}
          type="checkbox"
          role="switch"
          name="theme"
          value="dark"
          onChange={toggleTheme}
          checked={isDark}
        />
        <span className={`${styles.theme__fill}`}></span>
        <span className={`${styles.theme__icon}`}>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
          <span className={`${styles.theme__iconPart}`}></span>
        </span>
      </span>
    </label>
  );
};

export default ToggleTheme;
