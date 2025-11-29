import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-4">The Everyday Shop Backend</h1>
      <p className="text-lg mb-8">
        This is the PayloadCMS backend. Access the admin panel at{' '}
        <Link href="/admin" className="text-blue-600 hover:underline">
          /admin
        </Link>
      </p>
    </div>
  );
}
