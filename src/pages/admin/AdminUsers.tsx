import React, { useState, useEffect } from 'react';
import { getUsers } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Loader2, MoreHorizontal, Search, UserPlus, Users } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  status: 'active' | 'inactive';
  lastActive: Date;
  registeredDate: Date;
};

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getUsers(30);
        
        // Enhance with additional mock data
        const enhancedUsers = fetchedUsers.map((user) => ({
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`,
          role: (Math.random() > 0.8 ? 'admin' : 'user') as 'admin' | 'user',
          status: (Math.random() > 0.2 ? 'active' : 'inactive') as 'active' | 'inactive',
          lastActive: new Date(Date.now() - Math.floor(Math.random() * 30 * 24 * 60 * 60 * 1000)),
          registeredDate: new Date(Date.now() - Math.floor(Math.random() * 365 * 24 * 60 * 60 * 1000))
        }));
        
        setUsers(enhancedUsers);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);
  
  // Filter users by search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Actions
  const handleActivateUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: 'active' } : user
      )
    );
    toast.success('User activated');
  };
  
  const handleDeactivateUser = (userId: string) => {
    setUsers(prev => 
      prev.map(user => 
        user.id === userId ? { ...user, status: 'inactive' } : user
      )
    );
    toast.success('User deactivated');
  };
  
  const handleDeleteUser = (userId: string) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
    toast.success('User deleted');
  };
  
  // Format dates
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };
  
  return (
    <div className="min-h-screen pt-6 pb-16">
      <div className="mindease-container">
        <div className="mb-8">
          <h1 className="page-heading">User Management</h1>
          <p className="text-muted-foreground">
            View, edit, and manage user accounts on the platform.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <div className="text-2xl font-bold mt-1">{users.length}</div>
                </div>
                <div className="rounded-md bg-blue-50 p-2 text-blue-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <div className="text-2xl font-bold mt-1">
                    {users.filter(u => u.status === 'active').length}
                  </div>
                </div>
                <div className="rounded-md bg-green-50 p-2 text-green-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Administrators</p>
                  <div className="text-2xl font-bold mt-1">
                    {users.filter(u => u.role === 'admin').length}
                  </div>
                </div>
                <div className="rounded-md bg-amber-50 p-2 text-amber-500">
                  <Users className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
        
        <Card>
          <CardContent className="p-0">
            {loading ? (
              <div className="py-32 flex justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-mindease-primary" />
              </div>
            ) : filteredUsers.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Registered</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage 
                              src={user.avatar}
                              alt={user.name} 
                            />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDate(user.lastActive)}</TableCell>
                      <TableCell>{formatDate(user.registeredDate)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => window.location.href = `/admin/users/${user.id}`}
                            >
                              View Details
                            </DropdownMenuItem>
                            
                            {user.status === 'inactive' ? (
                              <DropdownMenuItem onClick={() => handleActivateUser(user.id)}>
                                Activate User
                              </DropdownMenuItem>
                            ) : (
                              <DropdownMenuItem onClick={() => handleDeactivateUser(user.id)}>
                                Deactivate User
                              </DropdownMenuItem>
                            )}
                            
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="py-32 text-center">
                <p className="text-muted-foreground mb-4">No users found matching "{searchQuery}"</p>
                <Button onClick={() => setSearchQuery('')}>Clear Search</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUsers;
