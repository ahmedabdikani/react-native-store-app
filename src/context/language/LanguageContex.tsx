import { useEffect, useState } from "react";
import * as React from "react";

import useAsyncStorage from "../../hooks/useAsyncStorage";

import english from "../../language/english";
import somali from "../../language/somali";

const languages = { english, somali };
export type Language = keyof typeof languages;

interface Context {
  selectedLanguage: Language;
  language: typeof languages[Language];
  changeLanguage: (language: Language) => void;
}

const LanguageContext = React.createContext<Context>({} as Context);

export const useLanguage = () => React.useContext(LanguageContext);

export const LanguageProvider: React.FC = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [language, setLanguage] = useState<typeof languages[Language]>(
    languages[selectedLanguage]
  );
  const { getItem, setItem } = useAsyncStorage();

  useEffect(() => {
    getItem("language")
      .then((language) => {
        if (language && languages[language]) {
          setSelectedLanguage(language);
          setLanguage(languages[language]);
        }
      })
      .catch((error) => console.log(error));
  }, []);

  const changeLanguage = (language: Language) => {
    if (languages[language]) {
      console.log("changed language to ", language);
      setItem("language", language)
        .then(() => {
          setSelectedLanguage(language);
          setLanguage(languages[language]);
        })
        .catch((error) => console.log(error));
    } else {
      throw new Error("language isn't supported!");
    }
  };

  return (
    <LanguageContext.Provider
      value={{ language, selectedLanguage, changeLanguage }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
