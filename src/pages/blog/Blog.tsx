import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogPosts, getUsers } from '@/services/api';
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
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
    <div className="min-h-screen pt-6 pb-16 bg-gradient-to-br from-[#eaf6ff] via-[#fdfaff] to-[#fbeeff]">

      <div className="mindease-container">
        <div className="mb-8 animate-fade-in">
          <h1 className="page-heading text-pink-600">Blog & Resources</h1>
          <p className="text-muted-foreground text-[hsl(var(--foreground)/80%)]">
            ✨ Expert insights, tips, and articles about mental wellness.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full border-pink-200 bg-white/70 backdrop-blur-sm"
            />
          </div>

          <div className="w-full md:w-auto overflow-x-auto">
            <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
              <TabsList className="w-max bg-pink-50 rounded-full shadow-sm">
                {CATEGORIES.map((category) => (
                  <TabsTrigger
                    key={category.value}
                    value={category.value}
                    className="rounded-full px-4 py-1 text-sm hover:bg-pink-100 transition-all"
                  >
                    {category.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {loading ? (
          <div className="py-32 flex justify-center animate-soft-float">
            <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden flex flex-col rounded-2xl shadow-md hover:shadow-lg transition-all bg-white/80 backdrop-blur animate-soft-float">
                <div className="h-48 bg-gradient-to-r from-pink-100 via-rose-100 to-orange-100 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-pink-400"
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
                    <Badge variant="outline" className="rounded-full border-pink-300 text-pink-500">
                      {CATEGORIES.find(cat => cat.value === post.category)?.name || 'General'}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{post.readingTime} min read</span>
                  </div>
                  <CardTitle className="mt-2">
                    <Link to={`/blog/${post.id}`} className="hover:text-pink-500 transition-colors">
                      {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-2 mt-1 text-[hsl(var(--foreground)/70%)]">
                    {post.body}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow pb-0"></CardContent>
                <CardFooter className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Avatar className="h-8 w-8 border-2 border-pink-200">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <p className="font-medium">{post.author.name}</p>
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
            <p className="text-muted-foreground mb-6">Try adjusting your search or category filters.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="rounded-full bg-pink-400 hover:bg-pink-500 text-white transition-all"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
