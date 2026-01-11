import { Table } from "@/components/Table";
import type { ClientData } from "@/components/TableTypes";
import { useTable } from "@/hooks/useTable";
import { useTranslations } from "@/hooks/useTranslations";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Clients() {
  const { t } = useTranslations('dashboard.clients');
  const { currentPage, searchConfig, sortConfig, handlePagination, handleSearch, handleSort } = useTable<ClientData>({ column: 'name', keyword: '' }, { key: 'id', order: 'asc' });
  const data: ClientData[] = [];
  return (
    <div className="clients">
      <h1 className="text-2xl font-medium pt-4 pb-2">{t('title')}</h1>
      <div className="grid">
        <Table isLoading={false} tableRowType="clients" titles={[
          { col: 'id', value: t('id') },
          { col: 'name', value: t('name') },
          { col: 'phone_number', value: t('phoneNumber') },
        ]} mainButton={t('add')} mainButtonIcon={faUserPlus} mainButtonHref="add" data={data} currentPage={currentPage}
          handleRefresh={() => console.log('handleRefresh')} handleData={() => console.log('handleData')}
          searchPlaceholder={t('search')} noResults={t('noResults')} handlePagination={handlePagination}
          searchConfig={searchConfig} handleSearch={handleSearch} sortConfig={sortConfig} handleSort={handleSort} totalCount={data.length} />
      </div>
    </div>
  )
}