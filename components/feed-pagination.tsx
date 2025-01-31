'use client';
import { useRouter, useParams } from 'next/navigation';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from './ui/pagination';

export default function FeedPagination({ pages }: { pages: number }) {
  const { replace } = useRouter();
  const params = useParams();

  let pageNumber: number = Number(params.page);
  let totalPages: number = pages;

  function previous() {
    if (pageNumber <= 1) {
      return;
    }
    replace(`/feed/${pageNumber - 1}`);
  }

  function next() {
    if (pageNumber >= totalPages) {
      return;
    }
    replace(`/feed/${pageNumber + 1}`);
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
