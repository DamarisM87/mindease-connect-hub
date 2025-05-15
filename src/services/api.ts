
import axios from "axios";

// Create axios instance with default config
const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});



const mentalHealthThemes = [
  {
    title: "Coping with Anxiety in Daily Life",
    body: "Discover gentle ways to manage anxiety, including breathing techniques, journaling prompts, and grounding exercises that help bring calm to your day."
  },
  {
    title: "The Power of Positive Affirmations",
    body: "Learn how to use positive self-talk and affirmations to improve your mood, build self-esteem, and navigate difficult emotions with compassion."
  },
  {
    title: "Creating a Self-Care Routine That Sticks",
    body: "Explore how to build a consistent and nurturing self-care practice using mindfulness, creativity, and soft boundaries for emotional well-being."
  },
  {
    title: "Understanding Emotional Burnout",
    body: "Burnout is more than being tired. Learn the signs, causes, and healing practices to gently recover and restore emotional balance."
  },
  {
    title: "Mindful Journaling for Mental Clarity",
    body: "Discover how daily journaling can help untangle your thoughts, reflect on feelings, and track your emotional growth over time."
  },
  {
    title: "Navigating Grief with Grace",
    body: "Grief is not linear. Read tender reflections and gentle guidance on how to feel your way through loss at your own pace."
  },
  {
    title: "Small Joys That Boost Your Mood",
    body: "From warm tea to morning sunbeams, discover the small things that can bring light into your mental wellness journey."
  },
  {
    title: "How to Set Healthy Boundaries with Love",
    body: "Explore soft but strong strategies for saying no, protecting your energy, and communicating your needs with kindness."
  },
  {
    title: "The Healing Power of Talking to Someone",
    body: "Whether it’s a therapist or a trusted friend, expressing your feelings out loud can lighten your emotional load."
  },
  {
    title: "You Are Not Alone: Finding Community",
    body: "Mental health thrives in connection. Learn ways to feel seen, heard, and supported by people who understand your journey."
  }
];


// Define a list of comments for mental health posts
const MENTAL_HEALTH_COMMENTS = [
  "Thank you for sharing this. It really resonated with me.",
  "You're not alone in feeling this way. Stay strong.",
  "This was so uplifting to read. Keep going!",
  "I really needed to hear this today. Grateful for your words.",
  "Mental health is so important. Thanks for highlighting this.",
  "Beautifully expressed. You've inspired me to reflect too.",
  "Sending you love and support. We're in this together.",
  "It’s brave of you to open up like this. You matter.",
  "This community helps me feel seen. Thank you for being part of it.",
  "I’m so glad I came across this post. It gave me hope."
];


export const MENTAL_HEALTH_USERS = [
  { name: "Alex Johnson", email: "alex.johnson@example.com" },
  { name: "Sam Taylor", email: "sam.taylor@example.com" },
  { name: "Jordan Smith", email: "jordan.smith@example.com" },
  { name: "Casey Williams", email: "casey.w@example.com" },
  { name: "Taylor Davis", email: "t.davis@example.com" },
  { name: "Morgan Wilson", email: "morgan.w@example.com" },
  { name: "Jamie Brown", email: "jamie.b@example.com" },
  { name: "Riley Miller", email: "riley.m@example.com" },
  { name: "Drew Anderson", email: "drew.a@example.com" },
  { name: "Cameron Thomas", email: "cam.thomas@example.com" }

];

// Get blog posts from JSONPlaceholder
export const getBlogPosts = async (limit = 10) => {
  try {
    const response = await api.get(`/posts?_limit=${limit}`);
    interface Post {
      userId: number;
      id: number;
      title: string;
      body: string;
    }
    const themedPosts = response.data.map((post: Post, i: number) => ({
      ...post,
      title: mentalHealthThemes[i % mentalHealthThemes.length].title,
      body: mentalHealthThemes[i % mentalHealthThemes.length].body
    }));
    return themedPosts;
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw error;
  }
};

// Get blog post by ID with author details
export const getBlogPostById = async (id: string) => {
  try {
    const post = await api.get(`/posts/${id}`);
    const user = await api.get(`/users/${post.data.userId}`);

    const i = parseInt(id, 10) % mentalHealthThemes.length;
    return {
      ...post.data,
      title: mentalHealthThemes[i].title,
      body: mentalHealthThemes[i].body,
      author: user.data
    };
  } catch (error) {
    console.error(`Error fetching blog post ${id}:`, error);
    throw error;
  }
};


// Define a User interface based on JSONPlaceholder user structure
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

// Get users from JSONPlaceholder
export const getUsers = async (limit = 10) => {
  try {
    const response = await api.get<User[]>(`/users?_limit=${limit}`);
    // Add avatar URLs to users
    const usersWithAvatars = response.data.map((user: User) => ({
      ...user,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
    }));
    return usersWithAvatars;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

// Get comments for a post
// Get comments for a post with mental health-themed content
export const getComments = async (postId: string) => {
  try {
    const response = await api.get(`/posts/${postId}/comments`);
    
    interface Comment {
      postId: number;
      id: number;
      name: string;
      email: string;
      body: string;
    }
    const meaningfulComments = response.data.map((comment: Comment, index: number) => {
      // Get a user based on comment index (cycle through our list)
      const user = MENTAL_HEALTH_USERS[index % MENTAL_HEALTH_USERS.length];
      
      return {
        ...comment,
        name: user.name,
        email: user.email,
        body: MENTAL_HEALTH_COMMENTS[index % MENTAL_HEALTH_COMMENTS.length],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`
      };
    });
    
    return meaningfulComments;
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error);
    throw error;
  }
};
// Create a new comment
// Create a new mental health-themed comment
export const createComment = async (
  postId: string, 
  name?: string, 
  email?: string,
  body?: string
) => {
  try {
    // If name/email not provided, use a random mental health user
    const randomUser = MENTAL_HEALTH_USERS[
      Math.floor(Math.random() * MENTAL_HEALTH_USERS.length)
    ];
    
    const finalName = name || randomUser.name;
    const finalEmail = email || randomUser.email;
    const finalBody = body || MENTAL_HEALTH_COMMENTS[
      Math.floor(Math.random() * MENTAL_HEALTH_COMMENTS.length)
    ];
    
    const response = await api.post(`/comments`, { 
      postId, 
      name: finalName,
      email: finalEmail,
      body: finalBody,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${finalName}`
    });
    
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error;
  }
};

// Post a contact form
export const submitContactForm = async (name: string, email: string, message: string) => {
  try {
    const response = await api.post(`/posts`, { 
      title: `Contact from ${name}`,
      body: message,
      userId: 1, 
      email
    });
    return response.data;
  } catch (error) {
    console.error("Error submitting contact form:", error);
    throw error;
  }
};

// Mock therapists data
const THERAPISTS = [
  { id: 1, name: "Dr. Sarah Johnson", specialty: "Anxiety & Depression", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" },
  { id: 2, name: "Dr. Michael Chen", specialty: "Trauma & PTSD", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael" },
  { id: 3, name: "Dr. Aisha Patel", specialty: "Family Therapy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha" },
  { id: 4, name: "Dr. James Wilson", specialty: "Substance Abuse", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=James" },
  { id: 5, name: "Dr. Sofia Rodriguez", specialty: "Child Psychology", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia" },
  { id: 6, name: "Dr. Robert Kim", specialty: "Couple's Therapy", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert" }
];

// Get all therapists
export const getTherapists = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return THERAPISTS;
};

// Get therapist by ID
export const getTherapistById = async (id: number) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));
  return THERAPISTS.find(therapist => therapist.id === id) || null;
};

// Get available time slots for a therapist (mock data)
export const getAvailableSlots = async (therapistId: number, date: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Generate random available slots between 9 AM and 5 PM
  const slots = [];
  const hours = [9, 10, 11, 13, 14, 15, 16];
  
  // Use therapistId as seed for consistent but different availability per therapist
  const availableHours = hours.filter(h => (h + therapistId) % 3 !== 0);
  
  for (const hour of availableHours) {
    slots.push(`${hour}:00`);
    if ((hour + therapistId) % 2 === 0) {
      slots.push(`${hour}:30`);
    }
  }
  
  return slots;
};

// Book an appointment (mock)
export const bookAppointment = async (
  therapistId: number,
  date: string,
  time: string,
  userId: string,
  notes: string
) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Return mock response
  return {
    id: Date.now().toString(),
    therapistId,
    date,
    time,
    userId,
    notes,
    status: "confirmed"
  };
};

// Get user appointments (mock)
export const getUserAppointments = async (userId: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Get user appointments from localStorage or return empty array
  const storedAppointments = localStorage.getItem(`mindease_appointments_${userId}`);
  return storedAppointments ? JSON.parse(storedAppointments) : [];
};

// Save user appointment to localStorage
// Define an interface for Appointment
export interface Appointment {
  id: string;
  therapistId: number;
  therapistName?: string;
  userId: string;
  userName?: string;
  date: string;
  time: string;
  notes: string;
  status: string;
}

export const saveUserAppointment = async (userId: string, appointment: Appointment) => {
  // Get existing appointments
  const appointments = await getUserAppointments(userId);
  
  // Add new appointment
  appointments.push(appointment);
  
  // Save to localStorage
  localStorage.setItem(`mindease_appointments_${userId}`, JSON.stringify(appointments));
  
  return appointment;
};

// Get all appointments (for admin)
export const getAllAppointments = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock data if nothing in localStorage
  const mockAppointments = [
    {
      id: "1001",
      therapistId: 1,
      therapistName: "Dr. Sarah Johnson",
      userId: "user123",
      userName: "John Smith",
      date: "2025-05-15",
      time: "10:00",
      notes: "Initial consultation",
      status: "confirmed"
    },
    {
      id: "1002",
      therapistId: 2,
      therapistName: "Dr. Michael Chen",
      userId: "user456",
      userName: "Emily Davis",
      date: "2025-05-16",
      time: "14:30",
      notes: "Follow-up session",
      status: "confirmed"
    },
    {
      id: "1003",
      therapistId: 3,
      therapistName: "Dr. Aisha Patel",
      userId: "user789",
      userName: "David Wilson",
      date: "2025-05-17",
      time: "11:00",
      notes: "Family therapy session",
      status: "cancelled"
    }
  ];
  
  return mockAppointments;
};

// Mental Health Tracking APIs
// Define an interface for MoodEntry
export interface MoodEntry {
  mood: string;
  note?: string;
  // Add more specific properties here if needed
}

export const saveMoodEntry = async (userId: string, entry: MoodEntry) => {
  // Get existing entries
  const entries = await getMoodEntries(userId);
  
  // Add new entry
  entries.push({
    id: Date.now().toString(),
    ...entry,
    timestamp: new Date().toISOString()
  });
  
  // Save to localStorage
  localStorage.setItem(`mindease_mood_${userId}`, JSON.stringify(entries));
  
  return entries;
};

export const getMoodEntries = async (userId: string) => {
  // Get from localStorage or return empty array
  const storedEntries = localStorage.getItem(`mindease_mood_${userId}`);
  return storedEntries ? JSON.parse(storedEntries) : [];
};

// Community posts APIs
export const getCommunityPosts = async (limit = 10) => {
  try {
    // Fetch posts
    const postsResponse = await api.get(`/posts?_limit=${limit}`);
    
    interface Post {
      userId: number;
      id: number;
      title: string;
      body: string;
    }
    const enhancedPosts = await Promise.all(postsResponse.data.map(async (post: Post, index: number) => {
      // Get a meaningful author from our list
      const authorUser = MENTAL_HEALTH_USERS[index % MENTAL_HEALTH_USERS.length];
      
      // Get user data for author
      const user = await api.get(`/users/${post.userId}`);
      
      // Get comments
      const commentsResponse = await api.get(`/posts/${post.id}/comments?_limit=2`);
      
      // Define a Comment interface for type safety
      interface Comment {
        postId: number;
        id: number;
        name: string;
        email: string;
        body: string;
      }
      // Transform comments to use meaningful names
      const meaningfulComments = commentsResponse.data.map((comment: Comment, commentIndex: number) => {
        const commentUser = MENTAL_HEALTH_USERS[
          (commentIndex + index) % MENTAL_HEALTH_USERS.length
        ];
        
        return {
          ...comment,
          name: commentUser.name,
          email: commentUser.email,
          body: MENTAL_HEALTH_COMMENTS[commentIndex % MENTAL_HEALTH_COMMENTS.length],
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${commentUser.name}`
        };
      });
      
      // Add random likes count
      const likes = Math.floor(Math.random() * 50);
      
      return {
        ...post,
        title: mentalHealthThemes[post.id % mentalHealthThemes.length].title,
        body: mentalHealthThemes[post.id % mentalHealthThemes.length].body,
        author: {
          ...user.data,
          name: authorUser.name, // Override with meaningful name
          email: authorUser.email,
          avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authorUser.name}`
        },
        comments: meaningfulComments,
        likes,
        date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)).toISOString()
      };
    }));
    
    return enhancedPosts;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
};
// Get system analytics (mock data)
export const getSystemAnalytics = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    userCount: 523,
    activeUsers: 278,
    appointments: {
      total: 1245,
      completed: 876,
      upcoming: 289,
      cancelled: 80
    },
    mood: {
      excellent: 30,
      good: 40,
      neutral: 15,
      poor: 10,
      bad: 5
    },
    blogPosts: 42,
    communityPosts: 187,
    userGrowth: [
      { month: 'Jan', users: 320 },
      { month: 'Feb', users: 352 },
      { month: 'Mar', users: 390 },
      { month: 'Apr', users: 420 },
      { month: 'May', users: 523 }
    ],
    moodDistribution: [
      { name: 'Mon', excellent: 12, good: 23, neutral: 8, poor: 5, bad: 2 },
      { name: 'Tue', excellent: 14, good: 21, neutral: 10, poor: 4, bad: 3 },
      { name: 'Wed', excellent: 16, good: 19, neutral: 12, poor: 3, bad: 2 },
      { name: 'Thu', excellent: 13, good: 24, neutral: 9, poor: 6, bad: 2 },
      { name: 'Fri', excellent: 18, good: 26, neutral: 6, poor: 4, bad: 1 },
      { name: 'Sat', excellent: 20, good: 28, neutral: 5, poor: 3, bad: 1 },
      { name: 'Sun', excellent: 15, good: 25, neutral: 9, poor: 4, bad: 2 }
    ]
  };
};
