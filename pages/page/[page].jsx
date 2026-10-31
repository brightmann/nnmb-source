import BlogPage from "../../components/blog-page";
import { getAllPosts, POSTS_PER_PAGE } from "../../lib/mdx";

export default function BlogPageN({ posts, currentPage, totalPages }) {
  return <BlogPage posts={posts} currentPage={currentPage} totalPages={totalPages} />;
}

export const getStaticProps = async ({ params }) => {
  const page = Number(params.page);
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  if (!Number.isInteger(page) || page < 2 || page > totalPages) {
    return {
      notFound: true,
    };
  }

  const posts = allPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE);

  return {
    props: {
      posts,
      currentPage: page,
      totalPages,
    },
  };
};

export const getStaticPaths = async () => {
  const totalPages = Math.ceil(getAllPosts().length / POSTS_PER_PAGE);
  const paths = [];

  for (let page = 2; page <= totalPages; page++) {
    paths.push({
      params: {
        page: String(page),
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};
