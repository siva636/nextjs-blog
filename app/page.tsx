import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/feed/1');
}
