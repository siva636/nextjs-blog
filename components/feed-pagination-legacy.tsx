'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export default function FeedPagination({ pages }: { pages: number }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlSearchParams = new URLSearchParams(searchParams);
  let page = urlSearchParams.get('page');
  let pageNumber: number = page === null ? 1 : Number(page);
  let totalPages: number = pages;

  function previous() {
    if (pageNumber <= 1) {
      return;
    }
    urlSearchParams.set('page', (--pageNumber).toString());
    replace(`${pathname}?${urlSearchParams.toString()}`);
  }

  function next() {
    if (pageNumber >= totalPages) {
      return;
    }
    urlSearchParams.set('page', (++pageNumber).toString());
    replace(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={pageNumber > 1 ? previous : () => {}}
              isActive
              className={
                pageNumber > 1
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-50'
              }
            />
          </PaginationItem>
          <PaginationItem>
            {pageNumber} of {pages}
          </PaginationItem>{' '}
          <PaginationItem>
            <PaginationNext
              onClick={pageNumber < totalPages ? next : () => {}}
              isActive
              className={
                pageNumber < totalPages
                  ? 'cursor-pointer'
                  : 'pointer-events-none opacity-50'
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
