import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, getUsers } from '@/services/api';
import {
  Card, CardContent, CardDescription, CardFooter,
  CardHeader, CardTitle
} from '@/components/ui/card';
import { Loader2, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CATEGORIES = [
  { name: 'All', value: 'all' },
  { name: 'Anxiety', value: 'anxiety' },
  { name: 'Depression', value: 'depression' },
  { name: 'Mindfulness', value: 'mindfulness' },
  { name: 'Self-Care', value: 'self-care' },
  { name: 'Relationships', value: 'relationships' }
];

const Blog = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getBlogPosts(12);
        setPosts(fetchedPosts);
        const fetchedUsers = await getUsers(10);
        setAuthors(fetchedUsers);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
  }, []);

  const enhancedPosts = posts.map(post => {
    const randomCategory = CATEGORIES[Math.floor(Math.random() * (CATEGORIES.length - 1)) + 1].value;
    const author = authors.find(user => user.id === post.userId) || {
      name: 'Unknown Author',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=unknown`
    };
    const wordCount = post.body.split(/\s+/).length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const randomDate = new Date();
    randomDate.setDate(randomDate.getDate() - Math.floor(Math.random() * 30));

    return {
      ...post,
      category: randomCategory,
      author,
      readingTime,
      date: randomDate
    };
  });

  const filteredPosts = enhancedPosts.filter(post => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.body.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = activeCategory === 'all' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen pt-6 pb-16 bg-[hsl(210,100%,97%)] animate-fade-in transition-all duration-300">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading text-pink-500">Blog & Resources</h1>
          <p className="text-muted-foreground">
            Expert insights, tips, and articles about mental health and wellness.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full bg-white/70 backdrop-blur"
            />
          </div>

          <div className="w-full md:w-auto overflow-x-auto">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-max rounded-full bg-pink-100/60 shadow-sm">
                {CATEGORIES.map((category) => (
                  <TabsTrigger key={category.value} value={category.value} className="data-[state=active]:bg-pink-300/60">
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col animate-soft-float bg-white/80 backdrop-blur border border-pink-100">
                <div className="h-48 bg-gradient-to-r from-pink-100 via-pink-200 to-pink-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-pink-400 animate-wiggle"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="bg-pink-100 text-pink-600">
                      {CATEGORIES.find(cat => cat.value === post.category)?.name || 'General'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
                  </div>
                  <CardTitle className="mt-2 text-pink-600">
                    <Link to={`/blog/${post.id}`} className="hover:underline">
                      {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1 text-gray-700">
                    {post.body}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center justify-between pt-4 border-t border-pink-100">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium text-gray-800">{post.author.name}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">{formatDate(post.date)}</div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-32 text-center">
            <p className="text-lg font-medium mb-2">No posts found</p>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or category filters.
            </p>
            <Button onClick={() => {
              setSearchQuery('');
              setActiveCategory('all');
            }}>
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
