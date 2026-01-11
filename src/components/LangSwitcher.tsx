import i18next from "i18next";

const setLang = (lang: string) => {
    i18next.changeLanguage(lang);
    localStorage.setItem('lang', lang);
};

export default function LangSwitcher() {
    const currentLang = i18next.language;
    const languages = [
        { code: 'en', language: 'English' },
        { code: 'ar', language: 'العربية' },
        { code: 'he', language: 'עברית' },
    ];
    const clicked = (code: string) => {
        if (currentLang !== code)
            setLang(code);
    }
    return (
        <div>
            {languages.map(x =>
                <span role="button" tabIndex={0} className={`block py-2.5 px-5 cursor-pointer text-base ${currentLang === x.code ? 'text-primary/90' : 'text-gray-400 dark:text-simple'} hover:text-primary hover:bg-primary/15 hover:cursor-pointer last:rounded-b-xl`}
                    key={x.code} onClick={() => clicked(x.code)}
                >{x.language}</span>)
            }
        </div>
    )
};