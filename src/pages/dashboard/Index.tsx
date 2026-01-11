import { useTranslations } from "@/hooks/useTranslations";

export default function Overview() {
  const { t } = useTranslations('dashboard.overview');
  return (
    <div className="overview">
      <h1 className="text-2xl font-medium pt-4 pb-2">{t('title')}</h1>
      <div className="grid">
      </div>
    </div>
  )
}