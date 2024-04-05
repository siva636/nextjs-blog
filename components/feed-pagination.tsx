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
            {pageNumber > 1 && (
              <PaginationPrevious
                onClick={previous}
                isActive
                className='cursor-pointer'
              />
            )}
          </PaginationItem>
          <PaginationItem>
            {pageNumber} of {pages}
          </PaginationItem>{' '}
          <PaginationItem>
            {pageNumber < totalPages && (
              <PaginationNext
                onClick={next}
                isActive
                className='cursor-pointer'
              />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}
