import { Layout } from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import { PostIdType } from "../../types/PostIdType";
import { GetStaticPathsResult, GetStaticPropsResult } from "next";
import { BlogType } from "../../types/BlogType";
import Link from "next/link";

type Props = {
  post: BlogType;
};

const Post = (props: Props) => {
  const { post } = props;
  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={post.title}>
      <p className="m-4">
        {"ID : "}
        {post.id}
      </p>
      <p className="mb-8 text-xl font-bold">{post.title}</p>
      <p className="px-10">{post.body}</p>
      <Link href="/blog-page">
        <div className="flex cursor-pointer mt-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  );
};

export const getStaticPaths = async (): Promise<
  GetStaticPathsResult<PostIdType>
> => {
  const postIds: Array<PostIdType> = await getAllPostIds();

  const paths = postIds.map((post: PostIdType) => {
    return {
      params: post,
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}): Promise<GetStaticPropsResult<Props>> => {
  const blog: BlogType = await getPostData(params!.id);

  return {
    props: {
      post: blog,
    },
  };
};

export default Post;
