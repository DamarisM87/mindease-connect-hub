// api/types.ts

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  category?: string;
  author?: User;
}

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  avatar?: string;
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
  avatar?: string;
}

export interface Therapist {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
}

export interface Appointment {
  id: string;
  userId: string;
  therapistId: string;
  datetime: string;
  status: "booked" | "canceled" | "completed";
}

export interface MoodEntry {
  id: string;
  userId: string;
  mood: string;
  date: string;
}
