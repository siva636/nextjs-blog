'use client';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';

export default function Pagination({ pages }: { pages: number }) {
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
    <div className='flex justify-between items-center'>
      <button
        onClick={previous}
        disabled={pageNumber <= 1}
        className='flex items-center justify-center px-3 h-8 me-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        <svg
          className='w-3.5 h-3.5 me-2 rtl:rotate-180'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 10'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M13 5H1m0 0 4 4M1 5l4-4'
          />
        </svg>
        Previous
      </button>
      <div className=''>
        Page {pageNumber} of {totalPages}
      </div>
      <button
        onClick={next}
        disabled={pageNumber >= totalPages}
        className=' flex items-center justify-center px-3 h-8 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
      >
        Next
        <svg
          className='w-3.5 h-3.5 ms-2 rtl:rotate-180'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 14 10'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='M1 5h12m0 0L9 1m4 4L9 9'
          />
        </svg>
      </button>
    </div>
  );
}
