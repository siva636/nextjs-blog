export default async function Loading() {
  return (
    <article className='flex flex-col md:flex-row bg-gray-200 rounded-2xl'>
      <section
        className='rounded-t-2xl md:rounded-bl-2xl md:rounded-tr-none'
        style={{ flex: '1 1 40%' }}
      >
        <div className='blur h-full w-full min-w-[300px] min-h-[300px] bg-red-200'></div>
      </section>
      <section className='flex flex-col min-h-full' style={{ flex: '1 1 60%' }}>
        <div className='blur font-thin px-3 pt-1 pb-0 m-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
          By unknown author
        </div>
        <div className='blur prose px-3 py-0 mt-[-8px] mb-0 mx-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
          <h2>Title</h2>
        </div>

        <div className='blur prose mb-auto px-3 py-5 overflow-hidden text-ellipsis'>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
      </section>
    </article>
  );
}
