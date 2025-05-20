// api/community.ts
import { Comment } from "./types";
import { delay, getAvatarUrl } from "./helpers";
import { MENTAL_HEALTH_COMMENTS } from "./mockData";

interface CommunityPost {
  id: string;
  title: string;
  body: string;
  author: string;
  avatar: string;
  comments: Comment[];
}

const mockCommunityPosts: CommunityPost[] = [
  {
    id: "1",
    title: "Coping with Stress",
    body: "How do you all manage stress in your daily life? Let's share tips!",
    author: "Alice",
    avatar: getAvatarUrl("alice"),
    comments: [],
  },
  {
    id: "2",
    title: "Mindfulness Success Stories",
    body: "Have mindfulness practices helped you? Tell your story here!",
    author: "Bob",
    avatar: getAvatarUrl("bob"),
    comments: [],
  },
];

export const getCommunityPosts = async (p0: number): Promise<CommunityPost[]> => {
  await delay(300);
  return mockCommunityPosts;
};

export const addCommunityPost = async (
  title: string,
  body: string,
  author: string
): Promise<CommunityPost> => {
  const newPost: CommunityPost = {
    id: (mockCommunityPosts.length + 1).toString(),
    title,
    body,
    author,
    avatar: getAvatarUrl(author),
    comments: [],
  };
  mockCommunityPosts.push(newPost);
  return newPost;
};

export const addCommentToCommunityPost = async (
  postId: string,
  comment: Comment
): Promise<Comment | null> => {
  const post = mockCommunityPosts.find((p) => p.id === postId);
  if (!post) return null;
  post.comments.push(comment);
  return comment;
};
