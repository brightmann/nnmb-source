import Link from "next/link";
import { formatDate } from "../lib/format-date";
import Pagination from "./pagination";

export default function BlogPage({ posts, currentPage, totalPages }) {
  return (
    <>
      <h1 className="text-6xl font-bold mb-8">Blog</h1>
      <hr className="my-8" />
      <ul className="flex flex-col gap-3">
        {posts.map(({ slug, title, summary, date }) => (
          <li key={slug}>
            <Link href={`/blog/${slug}`}>
              <a className="border border-solid border-gray-300 rounded-lg shadow-md p-6 block">
                <div className="flex justify-between">
                  <h2>{title}</h2>
                  <time dateTime={date}>{formatDate(date)}</time>
                </div>
                <p className="mt-4">{summary}</p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
