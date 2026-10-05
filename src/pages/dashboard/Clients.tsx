import { Table } from "@/components/Table";
import type { ClientData } from "@/components/TableTypes";
import { useTable } from "@/hooks/useTable";
import { useTranslations } from "@/hooks/useTranslations";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";

export default function Clients() {
  const { t } = useTranslations("dashboard.clients");
  const {
    currentPage,
    searchConfig,
    sortConfig,
    handlePagination,
    handleSearch,
    handleSort,
  } = useTable<ClientData>(
    { column: "name", keyword: "" },
    { key: "id", order: "asc" },
  );
  const data: ClientData[] = [
    // mock data
    {
      id: 1,
      name: "Kalle Enstone",
      phone_number: "1869378217",
    },
    {
      id: 2,
      name: "Gloriana Harral",
      phone_number: "2562406021",
    },
    {
      id: 3,
      name: "Reggi Bereford",
      phone_number: "8904350534",
    },
    {
      id: 4,
      name: "Kelbee O'Hengerty",
      phone_number: "5899293939",
    },
    {
      id: 5,
      name: "Ginger Antonoczyk",
      phone_number: "3436927433",
    },
    {
      id: 6,
      name: "Filmore Helstrom",
      phone_number: "5787364768",
    },
    {
      id: 7,
      name: "Dionisio Kendred",
      phone_number: "5233712324",
    },
    {
      id: 8,
      name: "Granger Goaks",
      phone_number: "9171504155",
    },
    {
      id: 9,
      name: "Balduin Gawler",
      phone_number: "5377243446",
    },
    {
      id: 10,
      name: "Delainey Berendsen",
      phone_number: "3236024243",
    },
  ];

  return (
    <div className="clients">
      <h1 className="text-2xl font-medium pt-4 pb-2">{t("title")}</h1>
      <div className="grid">
        <Table
          isLoading={false}
          tableRowType="clients"
          titles={[
            { col: "id", value: t("id") },
            { col: "name", value: t("name") },
            { col: "phone_number", value: t("phoneNumber") },
          ]}
          mainButton={t("add")}
          mainButtonIcon={faUserPlus}
          mainButtonHref="add"
          data={data}
          currentPage={currentPage}
          handleRefresh={() => console.log("handleRefresh")}
          handleData={() => console.log("handleData")}
          searchPlaceholder={t("search")}
          noResults={t("noResults")}
          handlePagination={handlePagination}
          searchConfig={searchConfig}
          handleSearch={handleSearch}
          sortConfig={sortConfig}
          handleSort={handleSort}
          totalCount={data.length}
        />
      </div>
    </div>
  );
}
