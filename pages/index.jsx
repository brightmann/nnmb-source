import BlogPage from "../components/blog-page";
import { getAllPosts, POSTS_PER_PAGE } from "../lib/mdx";

export default function Home({ posts, currentPage, totalPages }) {
  return <BlogPage posts={posts} currentPage={currentPage} totalPages={totalPages} />;
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const posts = allPosts.slice(0, POSTS_PER_PAGE);

  return {
    props: {
      posts,
      currentPage: 1,
      totalPages,
    },
  };
};
