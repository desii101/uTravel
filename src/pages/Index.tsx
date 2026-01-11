import { ThemeSwitch } from "@/components/HeaderUtilityItems";
import LangSwitcher from "@/components/LangSwitcher";
import { useTranslations } from "@/hooks/useTranslations";
import { handleHeaderDropdown } from "@/utils/dashUtils";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router";


const LangSwitch = ({ title }: { title: string }) => {
  return (<span>
    <FontAwesomeIcon onClick={(e) => handleHeaderDropdown(e)} className="text-gray-400 block text-center text-xl hover:cursor-pointer" icon={faGlobe} />
    <div className="hidden absolute max-sm:w-full max-sm:right-0 mt-5 rounded-xl bg-subbackground text-gray-200 border-2 border-zinc-300 dark:border-[#323232] shadow-xl">
      <h3 className="py-3 px-5 font-medium text-primary">{title}</h3>
      <LangSwitcher />
    </div>
  </span>
  )
}

export default function Index() {
  const { t } = useTranslations('main.index');
  return (
    <div className="justify-center items-center flex flex-col gap-4">
      <Link to="/dashboard" className="bg-primary hover:bg-primary/75 text-4xl rounded-3xl text-white py-3 px-6 w-fit">{t('dashboard')}</Link>
      <div className="flex gap-4">
        <ThemeSwitch />
        <LangSwitch title={t('language')} />
      </div>
    </div>
  )
}