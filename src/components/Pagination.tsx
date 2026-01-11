import { DOTS, DOTS2, usePagination } from '@/hooks/usePagination';

interface PaginationProps {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
  className?: string;
}
const Pagination = (props: PaginationProps) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];
  const paginationItemClassList = 'flex items-center justify-center h-8 mx-1 text-gray-700 dark:text-gray-400 hover:bg-primary-400 text-sm tracking-tight rounded-[2rem] transition duration-200 cursor-pointer min-w-8';

  return (
    <div className="pagination-container flex justify-center w-full mt-3">
      <ul className={`flex items-center list-none p-0 m-0 ${className}`}>
        <li key="-1">
          <div role="button" tabIndex={0} className={`${paginationItemClassList} ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`} onClick={onPrevious}>
            <div className="relative inline-block transform rotate-[-135deg] rtl:rotate-45">
              <div className="w-1.5 h-1.5 border-r border-t border-gray-700 dark:border-gray-400 dark:hover:border-gray-700" />
            </div>
          </div>
        </li>
        {paginationRange.map(pageNumber => {
          if (pageNumber === DOTS) {
            return (
              <li key="-3" className={`${paginationItemClassList} pointer-events-none !cursor-default`}>&#8230;</li>
            );
          }
          if (pageNumber === DOTS2) {
            return (
              <li key="-4" className={`${paginationItemClassList} pointer-events-none !cursor-default`}>&#8230;</li>
            );
          }
          return (
            <li key={pageNumber}>
              <div role="button" tabIndex={0} className={`${paginationItemClassList} dark:hover:text-gray-700 ${pageNumber === currentPage ? 'bg-primary dark:text-gray-700' : ''}`} onClick={() => onPageChange(pageNumber as number)}>
                {pageNumber}
              </div>
            </li>
          );
        })}
        <li key="-2">
          <div role="button" tabIndex={0} className={`${paginationItemClassList} ${currentPage === lastPage ? 'pointer-events-none opacity-50' : ''}`} onClick={onNext}>
            <div className="relative inline-block transform rotate-45 rtl:rotate-[-135deg]">
              <div className="w-1.5 h-1.5 border-r border-t border-gray-700 dark:border-gray-400 dark:hover:border-gray-700" />
            </div>
          </div>
        </li>
      </ul>
    </div>
  );

};

export default Pagination;
