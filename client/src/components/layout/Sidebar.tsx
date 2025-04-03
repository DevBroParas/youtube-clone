import Link from 'next/link';

export function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 h-full border-r border-gray-200">
      <nav className="flex flex-col p-4">
        <Link href="/" className="py-2 px-4 hover:bg-gray-200 rounded">
          Home
        </Link>
        <Link href="/trending" className="py-2 px-4 hover:bg-gray-200 rounded">
          Trending
        </Link>
        <Link href="/subscriptions" className="py-2 px-4 hover:bg-gray-200 rounded">
          Subscriptions
        </Link>
      </nav>
    </aside>
  );
}
