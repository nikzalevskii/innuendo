import { formatDate, Note } from "@innuendo/shared";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Innuendo</h1>
        <p className="text-xl text-gray-600 mb-8">
          Персональная система знаний
        </p>
        <Link
          href="/notes"
          className="inline-flex items-center px-6 py-3 bg-blue-600
  text-white rounded-lg hover:bg-blue-700"
        >
          Перейти к заметкам →
        </Link>
      </div>
    </div>
  );
}
