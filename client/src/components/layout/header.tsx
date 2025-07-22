import { Heart } from "lucide-react";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useTranslation } from "react-i18next";

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-romantic-pink to-soft-teal rounded-full flex items-center justify-center">
              <Heart className="text-white" size={20} />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-romantic-pink to-soft-teal bg-clip-text text-transparent">
              {t("title")}
            </h1>
          </div>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
