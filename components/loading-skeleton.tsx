export default function LoadingSkeleton() {
  return (
    <div className='prose h-screen border border-gray-400 bg-white shadow rounded p-8 w-full'>
      <div className='animate-pulse flex space-x-4'>
        <div className='rounded-full bg-gray-400 h-10 w-10'></div>
        <div className='flex-1 space-y-8 py-1'>
          <div className='h-3 bg-gray-400 rounded'></div>
          <div className='space-y-6'>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-3 bg-gray-400 rounded col-span-2'></div>
              <div className='h-3 bg-gray-400 rounded col-span-1'></div>
            </div>
            <div className='h-3 bg-gray-400 rounded'></div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-3 bg-gray-400 rounded col-span-1'></div>
              <div className='h-3 bg-gray-400 rounded col-span-2'></div>
            </div>
            <div className='grid grid-cols-3 gap-4'>
              <div className='h-3 bg-gray-400 rounded col-span-2'></div>
              <div className='h-3 bg-gray-400 rounded col-span-1'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
