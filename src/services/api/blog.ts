// api/blog.ts
import api from "./axios";
import { mentalHealthThemes } from "./mockData";
import { Post, User } from "./types";
import { delay, getAvatarUrl } from "./helpers";

export const getBlogPosts = async (limit = 10): Promise<Post[]> => {
  await delay(500); // Simulate delay

  const response = await api.get<Post[]>(`/posts?_limit=${limit}`);

  return response.data.map((post, i) => {
    const theme = mentalHealthThemes[i % mentalHealthThemes.length];
    return {
      ...post,
      ...theme,
      author: {
        id: post.userId,
        name: `User ${post.userId}`,
        avatar: getAvatarUrl(`user${post.userId}`),
      },
    };
  });
};

export const getBlogPostById = async (id: string): Promise<Post & { author: User }> => {
  const postResponse = await api.get<Post>(`/posts/${id}`);
  const userResponse = await api.get<User>(`/users/${postResponse.data.userId}`);

  const index = Number(id) % mentalHealthThemes.length;
  const theme = mentalHealthThemes[index];

  return {
    ...postResponse.data,
    ...theme,
    author: {
      ...userResponse.data,
      avatar: getAvatarUrl(userResponse.data.username || userResponse.data.name),
    },
  };
};
