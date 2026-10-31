import Link from "next/link";

const pageHref = (page) => (page === 1 ? "/" : `/page/${page}`);

function getPageItems(currentPage, totalPages) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => ({ key: `page-${index + 1}`, value: index + 1 }));
  }

  const pages = [...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
    .filter((page) => page >= 1 && page <= totalPages)
    .sort((a, b) => a - b);

  const items = [];
  let previous = 0;

  for (const page of pages) {
    if (page - previous > 1) items.push({ key: `ellipsis-before-${page}`, value: "ellipsis" });
    items.push({ key: `page-${page}`, value: page });
    previous = page;
  }

  return items;
}

export default function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const linkClassName = "px-3 py-1 border border-gray-300 rounded-lg";
  const currentClassName = "px-3 py-1 border border-gray-900 rounded-lg bg-gray-900 text-white";
  const disabledClassName = "px-3 py-1 border border-gray-300 rounded-lg opacity-50";

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {currentPage > 1 ? (
        <Link href={pageHref(currentPage - 1)}>
          <a className={linkClassName}>Previous</a>
        </Link>
      ) : (
        <span className={disabledClassName}>Previous</span>
      )}
      {getPageItems(currentPage, totalPages).map((item) => {
        if (item.value === "ellipsis") {
          return (
            <span key={item.key} className="px-1 text-gray-500">
              …
            </span>
          );
        }

        if (item.value === currentPage) {
          return (
            <span key={item.key} className={currentClassName}>
              {item.value}
            </span>
          );
        }

        return (
          <Link key={item.key} href={pageHref(item.value)}>
            <a className={linkClassName}>{item.value}</a>
          </Link>
        );
      })}
      {currentPage < totalPages ? (
        <Link href={pageHref(currentPage + 1)}>
          <a className={linkClassName}>Next</a>
        </Link>
      ) : (
        <span className={disabledClassName}>Next</span>
      )}
    </nav>
  );
}
