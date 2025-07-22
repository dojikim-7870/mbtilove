import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const languages = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "jp", label: "日本語" }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setCurrentLang(langCode);
  };

  return (
    <div className="language-switch rounded-full px-4 py-2 border border-gray-200 bg-white/90 backdrop-blur-md">
      {languages.map((lang) => (
        <Button
          key={lang.code}
          variant="ghost"
          size="sm"
          onClick={() => handleLanguageChange(lang.code)}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition",
            currentLang === lang.code
              ? "bg-gradient-to-r from-romantic-pink to-soft-teal text-white"
              : "hover:bg-gray-100"
          )}
        >
          {lang.label}
        </Button>
      ))}
    </div>
  );
}
