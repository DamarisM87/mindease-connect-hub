// api/analytics.ts

export const getSystemStats = async () => {
  // Mock some stats
  return {
    usersCount: 1500,
    postsCount: 800,
    commentsCount: 2500,
    activeUsersToday: 450,
  };
};
