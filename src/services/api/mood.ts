// api/mood.ts
import { MoodEntry } from "./types";

const mockMoodEntries: MoodEntry[] = [];

export const addMoodEntry = async (
  userId: string,
  mood: string,
  date: string
): Promise<MoodEntry> => {
  const newEntry: MoodEntry = {
    id: (mockMoodEntries.length + 1).toString(),
    userId,
    mood,
    date,
  };
  mockMoodEntries.push(newEntry);
  return newEntry;
};

export const getMoodEntries = async (userId: string): Promise<MoodEntry[]> => {
  return mockMoodEntries.filter((entry) => entry.userId === userId);
};
