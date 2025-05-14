
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostById, getComments, createComment } from '@/services/api';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Clock, Calendar, MessageSquare, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const BlogPost = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  type BlogPostType = {
    id: string | number;
    title: string;
    body: string;
    category: string;
    date: Date;
    readingTime: number;
    author?: {
      name?: string;
      avatar?: string;
    };
  };
  
    const [post, setPost] = useState<BlogPostType | null>(null);
  type CommentType = {
    name: string;
    email?: string;
    body: string;
    avatar?: string;
    // Add other fields as needed
  };
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  type RelatedPostType = {
    id: number;
    title: string;
    category: string;
    date: Date;
  };
  const [relatedPosts, setRelatedPosts] = useState<RelatedPostType[]>([]);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        
        // Fetch post with author details
        const fetchedPost = await getBlogPostById(id);
        
        // Enhance post with extra metadata
        const enhancedPost = {
          ...fetchedPost,
          readingTime: Math.ceil(fetchedPost.body.split(/\s+/).length / 200),
          date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
          category: getRandomCategory()
        };
        
        setPost(enhancedPost);
        
        // Fetch comments
        const fetchedComments = await getComments(id);
        setComments(fetchedComments);
        
        // Create mock related posts
        setRelatedPosts(createMockRelatedPosts(3));
      } catch (error) {
        console.error('Error fetching post data:', error);
        toast.error('Failed to load the blog post');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPostData();
  }, [id]);
  
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!commentText.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create comment
      const newComment = await createComment(
        id!,
        user?.name || 'Anonymous',
        user?.email || 'anonymous@example.com',
        commentText
      );
      
      // Add avatar to comment
      const commentWithAvatar = {
        ...newComment,
        avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'anon'}`
      };
      
      // Add to comments list
      setComments([commentWithAvatar, ...comments]);
      
      // Clear comment text
      setCommentText('');
      
      toast.success('Your comment has been added');
    } catch (error) {
      console.error('Error submitting comment:', error);
      toast.error('Failed to submit your comment');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Helper function to get random category
  const getRandomCategory = () => {
    const categories = [
      'Anxiety', 'Depression', 'Mindfulness', 
      'Self-Care', 'Relationships', 'Therapy'
    ];
    return categories[Math.floor(Math.random() * categories.length)];
  };
  
  // Helper function to create mock related posts
  const createMockRelatedPosts = (count: number) => {
    const posts = [];
    
    for (let i = 0; i < count; i++) {
      const id = Math.floor(Math.random() * 100) + 1;
      posts.push({
        id,
        title: `Related Article ${i + 1}`,
        category: getRandomCategory(),
        date: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000))
      });
    }
    
    return posts;
  };
  
  // Format date
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  // Generate paragraphs from post body
  const generateParagraphs = (text: string) => {
    // Split text into sentences
    const sentences = text.split('. ');
    const paragraphs = [];
    let currentParagraph = '';
    
    // Group sentences into paragraphs (3-5 sentences per paragraph)
    for (let i = 0; i < sentences.length; i++) {
      currentParagraph += sentences[i] + '. ';
      
      if ((i + 1) % 4 === 0 || i === sentences.length - 1) {
        paragraphs.push(currentParagraph);
        currentParagraph = '';
      }
    }
    
    return paragraphs;
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-6 pb-16 flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-mindease-primary" />
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="min-h-screen pt-6 pb-16">
        <div className="mindease-container text-center py-32">
          <h1 className="text-2xl font-bold mb-4">Post not found</h1>
          <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const paragraphs = generateParagraphs(post.body);
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-6">
          <Button variant="ghost" asChild className="-ml-4">
            <Link to="/blog" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
        
        <article>
          <div className="mb-8">
            <Badge className="mb-4">{post.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-6">
              {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
            </h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage 
                    src={post.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=author`} 
                    alt={post.author?.name || 'Author'} 
                  />
                  <AvatarFallback>
                    {(post.author?.name || 'A').charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{post.author?.name || 'Unknown Author'}</span>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} min read</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  <span>{comments.length} comments</span>
                </div>
              </div>
            </div>
            
            <div className="aspect-video bg-gradient-to-r from-mindease-primary/20 to-mindease-secondary/20 rounded-lg flex items-center justify-center mb-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-mindease-primary"
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
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <h2 className="text-2xl font-semibold mb-4">
                  Introduction to {post.category}
                </h2>
                
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-6 text-lg leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                
                <h2 className="text-2xl font-semibold my-6">
                  Key Takeaways
                </h2>
                
                <ul className="space-y-3 list-disc pl-6">
                  <li>Understanding your mental health needs is the first step to wellness</li>
                  <li>Regular self-assessment can help catch issues before they become serious</li>
                  <li>Professional support combined with self-care creates the best outcomes</li>
                  <li>Building a support network is essential for long-term mental wellness</li>
                </ul>
              </div>
              
              <Separator className="my-8" />
              
              {/* Comments Section */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Comments ({comments.length})</h2>
                
                {user ? (
                  <form onSubmit={handleSubmitComment} className="mb-8">
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <Textarea 
                          placeholder="Share your thoughts..."
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          rows={3}
                          className="mb-3"
                        />
                        <Button type="submit" disabled={isSubmitting}>
                          {isSubmitting ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Posting...
                            </>
                          ) : (
                            'Post Comment'
                          )}
                        </Button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <div className="bg-muted rounded-lg p-4 mb-8 text-center">
                    <p className="mb-3">Please sign in to leave a comment</p>
                    <Button asChild>
                      <Link to="/login">Sign In</Link>
                    </Button>
                  </div>
                )}
                
                <div className="space-y-6">
                  {comments.length > 0 ? (
                    comments.map((comment, index) => (
                      <div key={index} className="flex gap-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage 
                            src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`}
                            alt={comment.name} 
                          />
                          <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium">{comment.name}</span>
                            <span className="text-xs text-muted-foreground">
                              {new Date().toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-sm">{comment.body}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-4">
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Author Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage 
                        src={post.author?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=author`}
                        alt={post.author?.name || 'Author'} 
                      />
                      <AvatarFallback>{(post.author?.name || 'A').charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-medium text-lg mb-1">{post.author?.name || 'Unknown Author'}</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Mental Health Professional
                    </p>
                    <p className="text-sm mb-4">
                      Specializing in {post.category} and helping clients develop resilience strategies for over 10 years.
                    </p>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {relatedPosts.map((relatedPost) => (
                      <div key={relatedPost.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
                        <div className="w-16 h-16 rounded bg-mindease-primary/20 flex items-center justify-center shrink-0">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-mindease-primary"
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
                        <div>
                          <Link 
                            to={`/blog/${relatedPost.id}`} 
                            className="font-medium hover:text-mindease-accent line-clamp-2"
                          >
                            {relatedPost.title}
                          </Link>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px]">
                              {relatedPost.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDate(relatedPost.date)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* CTA */}
              <Card className="bg-gradient-to-br from-mindease-primary/20 to-mindease-secondary/20 border-0">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">Need Professional Support?</h3>
                    <p className="text-sm mb-4">
                      Connect with our trained therapists to discuss your mental health needs.
                    </p>
                    <Button asChild>
                      <Link to="/appointments">Book a Session</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogPost;
