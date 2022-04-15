import { Layout } from "../components/Layout";
import { BlogType } from "../types/BlogType";
import { getAllPostsData } from "../lib/posts";
import { GetStaticPropsResult } from "next";
import { Post } from "../components/Post";

type Props = {
  posts: Array<BlogType>;
};
const Blog = (props: Props) => {
  const { posts } = props;

  return (
    <Layout title="Blog">
      <ul className="m-10">
        {posts &&
          posts.map((post: BlogType) => <Post key={post.id} post={post} />)}
      </ul>
    </Layout>
  );
};

export default Blog;

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<Props>
> => {
  const posts: Array<BlogType> = await getAllPostsData();
  return {
    props: { posts },
  };
};
