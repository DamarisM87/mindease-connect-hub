// api/comments.ts
import api from "./axios";
import { Comment } from "./types";
import { MENTAL_HEALTH_COMMENTS } from "./mockData";
import { getAvatarUrl } from "./helpers";

export const getCommentsForPost = async (postId: string): Promise<Comment[]> => {
  const response = await api.get<Comment[]>(`/comments?postId=${postId}`);

  // Replace gibberish with themed comments for better UX
  return response.data.map((comment, i) => ({
    ...comment,
    body: MENTAL_HEALTH_COMMENTS[i % MENTAL_HEALTH_COMMENTS.length],
    avatar: getAvatarUrl(comment.email),
  }));
};
