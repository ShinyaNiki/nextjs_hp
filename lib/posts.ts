import axios from "axios";
import { BlogType } from "../types/BlogType";
import { PostIdType } from "../types/PostIdType";

const apiUrl: string = "https://jsonplaceholder.typicode.com/posts";

export const getAllPostsData = async (): Promise<Array<BlogType>> => {
  return await axios
    .get<Array<BlogType>>(apiUrl)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert("api error");
      return [];
    });
};

export const getAllPostIds = async (): Promise<Array<PostIdType>> => {
  return await axios
    .get<Array<BlogType>>(apiUrl)
    .then((res) => {
      return res.data.map((post) => {
        return {
          id: String(post.id),
        };
      });
    })
    .catch((e) => {
      alert("api error");
      return [];
    });
};

export const getPostData = async (id: string): Promise<BlogType> => {
  return await axios
    .get<BlogType>(`${apiUrl}/${id}/`)
    .then((res) => {
      return res.data;
    })
    .catch((e) => {
      alert("api error");
      return null;
    });
};
