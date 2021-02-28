import * as React from "react";

import eng from "../language/english";

const languages = { eng };

type Language = keyof typeof languages;
interface Context {
  language: Object;
  changeLanguage: (language: Language) => void;
}

const LanguageContext = React.createContext<Context>({} as Context);

export const useLanguage = () => React.useContext(LanguageContext);

export const LanguageProvider: React.FC = ({ children }) => {
  const [language, setLanguage] = React.useState<typeof languages[Language]>(
    languages["eng"]
  );

  const changeLanguage = (language: Language) => {
    if (languages[language]) {
      setLanguage(languages[language]);
    } else {
      throw new Error("language isn't supported!");
    }
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
