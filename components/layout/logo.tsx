import Image from 'next/image';

export default function Logo() {
  return (
    <>
      <Image
        className='hidden md:block dark:hidden'
        src='/logos/logo.png'
        width={150}
        height={45}
        alt='Village Chef'
      />
      <Image
        className='hidden dark:md:block'
        src='/logos/darkLogo.png'
        width={150}
        height={45}
        alt='Village Chef'
      />
      <Image
        className='md:hidden dark:hidden'
        src='/logos/sublogo.png'
        width={75}
        height={26}
        alt='Village Chef'
      />
      <Image
        className='hidden dark:block dark:md:hidden'
        src='/logos/darkSublogo.png'
        width={75}
        height={26}
        alt='Village Chef'
      />
    </>
  );
}
