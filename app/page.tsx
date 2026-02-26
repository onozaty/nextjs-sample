import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Next.js Sample</h1>
      <p className="text-gray-600 mb-8">
        Next.js + TypeScript + Tailwind CSS + Prisma のサンプルアプリです。
      </p>

      <nav>
        <ul className="space-y-3">
          <li>
            <Link
              href="/posts"
              className="inline-block text-blue-600 hover:underline text-lg"
            >
              📝 Posts — 投稿一覧
            </Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
