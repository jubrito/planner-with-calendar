import { useEffect, useState } from "react";

const useLocale = (defaultLocale = "en-US") => {
  const [locale, setLocale] = useState(defaultLocale);

  useEffect(() => {
    const lang = document.documentElement.getAttribute("lang");
    if (lang) {
      setLocale(lang);
    }
  }, []);

  return {
    locale,
    setLocale,
  };
};

export default useLocale;
