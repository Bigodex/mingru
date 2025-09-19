"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import styles from "./theme-switch.module.css";


export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Evita erro de hidratação
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <label className={styles.switch}>
      <input
        type="checkbox"
        className={styles.toggle}
        checked={isDark}
        onChange={() => setTheme(isDark ? "light" : "dark")}
      />
      <span className={styles.slider}></span>
      <span className={styles["card-side"]}></span>
    </label>
  );
}
