// api/users.ts
import api from "./axios";
import { Therapist, User } from "./types";
import { THERAPISTS } from "./mockData";
import { getAvatarUrl } from "./helpers";

export const getUsers = async (limit = 10): Promise<User[]> => {
  const response = await api.get<User[]>(`/users?_limit=${limit}`);

  return response.data.map((user) => ({
    ...user,
    avatar: getAvatarUrl(user.username || user.name),
  }));
};

export const getUserById = async (id: string): Promise<User> => {
  const response = await api.get<User>(`/users/${id}`);
  const user = response.data;
  return {
    ...user,
    avatar: getAvatarUrl(user.username || user.name),
  };
};

export const getTherapists = async (): Promise<Therapist[]> => {
  // Return mock therapists (could be extended for real API)
  return THERAPISTS;
};

export const getTherapistById = async (id: string): Promise<Therapist | undefined> => {
  return THERAPISTS.find((therapist) => therapist.id === id);
};
