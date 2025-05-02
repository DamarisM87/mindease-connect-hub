
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { getCommunityPosts } from '@/services/api';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ThumbsUp, MessageCircle, Flag, Loader2, Heart, Send } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { toast } from '@/components/ui/sonner';

const Community = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [newPostContent, setNewPostContent] = useState('');
  const [submittingPost, setSubmittingPost] = useState(false);
  const [postComments, setPostComments] = useState<Record<string, string>>({});
  const [submittingComment, setSubmittingComment] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const fetchedPosts = await getCommunityPosts(15);
        setPosts(fetchedPosts);
      } catch (error) {
        console.error('Error fetching community posts:', error);
        toast.error('Failed to load community posts');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const handleCreatePost = async () => {
    if (!newPostContent.trim()) {
      toast.error('Please enter post content');
      return;
    }
    
    setSubmittingPost(true);
    
    try {
      // Simulate post creation
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Create new post object
      const newPost = {
        id: Date.now().toString(),
        title: newPostContent.slice(0, 30),
        body: newPostContent,
        userId: user?.id,
        author: {
          name: user?.name || 'Anonymous User',
          email: user?.email,
          avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'anon'}`
        },
        comments: [],
        likes: 0,
        date: new Date().toISOString()
      };
      
      // Update posts list with new post
      setPosts([newPost, ...posts]);
      
      // Clear post content
      setNewPostContent('');
      
      toast.success('Your post has been published');
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Failed to create your post');
    } finally {
      setSubmittingPost(false);
    }
  };
  
  const handleLikePost = (postId: string) => {
    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
    
    toast.success('Post liked!');
  };
  
  const handleAddComment = async (postId: string) => {
    const commentContent = postComments[postId] || '';
    
    if (!commentContent.trim()) {
      toast.error('Please enter a comment');
      return;
    }
    
    setSubmittingComment(prev => ({ ...prev, [postId]: true }));
    
    try {
      // Simulate comment creation
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create comment object
      const newComment = {
        id: Date.now().toString(),
        name: user?.name || 'Anonymous User',
        email: user?.email || 'anon@example.com',
        body: commentContent,
        avatar: user?.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'anon'}`
      };
      
      // Update posts with new comment
      setPosts(prev =>
        prev.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [newComment, ...post.comments]
            };
          }
          return post;
        })
      );
      
      // Clear comment
      setPostComments(prev => ({ ...prev, [postId]: '' }));
      
      toast.success('Comment added');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    } finally {
      setSubmittingComment(prev => ({ ...prev, [postId]: false }));
    }
  };
  
  const handleReportPost = (postId: string) => {
    toast.success('Post reported. Our team will review it shortly.');
  };
  
  // Filter posts based on active tab
  const filteredPosts = posts.filter(post => {
    if (activeTab === 'all') return true;
    if (activeTab === 'my-posts') return post.author.email === user?.email;
    return true;
  });
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">Community</h1>
          <p className="text-muted-foreground">
            Connect with others, share your experiences, and find support in our community.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="flex justify-between items-center mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="my-posts">My Posts</TabsTrigger>
                </TabsList>
                
                <Badge variant="outline" className="text-xs">
                  Community Guidelines
                </Badge>
              </div>
              
              <TabsContent value="all" className="space-y-6 mt-0">
                {/* Create Post Box */}
                {user && (
                  <Card className="mb-8">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">Posting to community</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <Textarea
                        placeholder="Share your thoughts, experiences, or questions..."
                        value={newPostContent}
                        onChange={(e) => setNewPostContent(e.target.value)}
                        rows={4}
                      />
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <p className="text-xs text-muted-foreground">
                        Posts are public and may be used anonymously for research
                      </p>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={submittingPost || !newPostContent.trim()}
                      >
                        {submittingPost ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Posting...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Post
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                )}
                
                {loading ? (
                  <div className="py-32 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-mindease-primary" />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <>
                    {filteredPosts.map((post) => (
                      <Card key={post.id} className="mb-6">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{post.author.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-muted-foreground hover:text-destructive"
                              onClick={() => handleReportPost(post.id)}
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p className="whitespace-pre-line">{post.body}</p>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex flex-col">
                          <div className="flex justify-between w-full mb-3">
                            <div className="flex gap-2 items-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex gap-2 text-muted-foreground hover:text-mindease-accent"
                                onClick={() => handleLikePost(post.id)}
                              >
                                <Heart className="h-4 w-4" />
                                <span className="text-xs font-medium">{post.likes}</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex gap-2 text-muted-foreground"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-xs font-medium">{post.comments.length}</span>
                              </Button>
                            </div>
                          </div>
                          
                          {/* Comments section */}
                          {post.comments.length > 0 && (
                            <div className="w-full space-y-3 pt-3 border-t mb-4">
                              {post.comments.slice(0, 3).map((comment: any, index: number) => (
                                <div key={index} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage 
                                      src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`} 
                                      alt={comment.name} 
                                    />
                                    <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">{comment.name}</span>
                                      <span className="text-xs text-muted-foreground">Just now</span>
                                    </div>
                                    <p className="text-sm">{comment.body}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Comment input */}
                          {user ? (
                            <div className="flex gap-3 w-full">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Textarea
                                  placeholder="Write a comment..."
                                  value={postComments[post.id] || ''}
                                  onChange={(e) => setPostComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  rows={1}
                                  className="resize-none min-h-[36px] py-2 text-sm"
                                />
                                <Button 
                                  size="sm" 
                                  className="shrink-0 self-end"
                                  disabled={submittingComment[post.id] || !postComments[post.id]?.trim()}
                                  onClick={() => handleAddComment(post.id)}
                                >
                                  {submittingComment[post.id] ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    <Send className="h-4 w-4" />
                                  )}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-center text-sm text-muted-foreground mt-2">
                              <a href="/login" className="text-mindease-accent hover:underline">Sign in</a> to comment
                            </p>
                          )}
                        </CardFooter>
                      </Card>
                    ))}
                  </>
                ) : (
                  <div className="py-32 text-center">
                    <p className="text-muted-foreground mb-4">No posts to display.</p>
                    {activeTab === 'my-posts' && (
                      <Button onClick={() => setActiveTab('all')}>View All Posts</Button>
                    )}
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="my-posts" className="space-y-6 mt-0">
                {!user ? (
                  <div className="py-32 text-center">
                    <p className="text-muted-foreground mb-4">Please sign in to view your posts.</p>
                    <Button asChild>
                      <a href="/login">Sign In</a>
                    </Button>
                  </div>
                ) : loading ? (
                  <div className="py-32 flex justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-mindease-primary" />
                  </div>
                ) : filteredPosts.length > 0 ? (
                  <>
                    {filteredPosts.map((post) => (
                      // Same post component as in All Posts tab
                      <Card key={post.id} className="mb-6">
                        <CardHeader className="pb-3">
                          <div className="flex justify-between items-start">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={post.author.avatar} alt={post.author.name} />
                                <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{post.author.name}</p>
                                <p className="text-xs text-muted-foreground">
                                  {formatDistanceToNow(new Date(post.date), { addSuffix: true })}
                                </p>
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pb-3">
                          <p>{post.body}</p>
                        </CardContent>
                        <CardFooter className="border-t pt-3 flex flex-col">
                          <div className="flex justify-between w-full mb-3">
                            <div className="flex gap-2 items-center">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex gap-2 text-muted-foreground hover:text-mindease-accent"
                                onClick={() => handleLikePost(post.id)}
                              >
                                <Heart className="h-4 w-4" />
                                <span className="text-xs font-medium">{post.likes}</span>
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="flex gap-2 text-muted-foreground"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span className="text-xs font-medium">{post.comments.length}</span>
                              </Button>
                            </div>
                          </div>
                          
                          {/* Comments section - same as All Posts tab */}
                          {post.comments.length > 0 && (
                            <div className="w-full space-y-3 pt-3 border-t mb-4">
                              {post.comments.slice(0, 3).map((comment: any, index: number) => (
                                <div key={index} className="flex gap-3">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage 
                                      src={comment.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.name}`} 
                                      alt={comment.name} 
                                    />
                                    <AvatarFallback>{comment.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="font-medium text-sm">{comment.name}</span>
                                      <span className="text-xs text-muted-foreground">Just now</span>
                                    </div>
                                    <p className="text-sm">{comment.body}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                          
                          {/* Comment input - same as All Posts tab */}
                          <div className="flex gap-3 w-full">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={user.avatar} alt={user.name} />
                              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 flex gap-2">
                              <Textarea
                                placeholder="Write a comment..."
                                value={postComments[post.id] || ''}
                                onChange={(e) => setPostComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                                rows={1}
                                className="resize-none min-h-[36px] py-2 text-sm"
                              />
                              <Button 
                                size="sm" 
                                className="shrink-0 self-end"
                                disabled={submittingComment[post.id] || !postComments[post.id]?.trim()}
                                onClick={() => handleAddComment(post.id)}
                              >
                                {submittingComment[post.id] ? (
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                ) : (
                                  <Send className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    ))}
                  </>
                ) : (
                  <div className="py-32 text-center">
                    <p className="text-muted-foreground mb-4">You haven't created any posts yet.</p>
                    <Button onClick={() => setActiveTab('all')}>View All Posts</Button>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Community Guidelines</h3>
              </CardHeader>
              <CardContent className="pb-3">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <ThumbsUp className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Be respectful and supportive of others</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <ThumbsUp className="h-3 w-3 text-green-600" />
                    </div>
                    <span>Share your experiences in a constructive way</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-red-100 p-1 mt-0.5">
                      <ThumbsUp className="h-3 w-3 text-red-600" fill="currentColor" transform="rotate(180)" />
                    </div>
                    <span>No harassment, hate speech, or bullying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="rounded-full bg-red-100 p-1 mt-0.5">
                      <ThumbsUp className="h-3 w-3 text-red-600" fill="currentColor" transform="rotate(180)" />
                    </div>
                    <span>Do not share personal identifying information</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Popular Topics</h3>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">#Anxiety</Badge>
                  <Badge variant="secondary">#Depression</Badge>
                  <Badge variant="secondary">#Mindfulness</Badge>
                  <Badge variant="secondary">#SelfCare</Badge>
                  <Badge variant="secondary">#TherapyTips</Badge>
                  <Badge variant="secondary">#WellnessJourney</Badge>
                  <Badge variant="secondary">#MentalHealthAwareness</Badge>
                  <Badge variant="secondary">#StressRelief</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-mindease-primary/20 to-mindease-secondary/20 border-0">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">Need Professional Support?</h3>
                  <p className="text-sm mb-4">
                    Some topics are better discussed with a trained professional.
                  </p>
                  <Button asChild>
                    <a href="/appointments">Book a Session</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-3">
                <h3 className="font-medium">Community Resources</h3>
              </CardHeader>
              <CardContent className="text-sm space-y-3">
                <p>
                  <strong>Crisis Helpline:</strong> 1-800-123-4567
                </p>
                <p>
                  <strong>Text Support:</strong> Text HOME to 741741
                </p>
                <p>
                  <strong>Online Resources:</strong> 
                  <a href="#" className="text-mindease-accent hover:underline ml-1">
                    Mental Health Foundation
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
