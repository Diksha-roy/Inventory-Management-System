
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Users, Shield, LogOut, Search, UserPlus, Crown, Server, Plus, Database,
  Folder, Settings, Monitor, Globe, MapPin
} from 'lucide-react';
import UserEditModal from '@/components/admin/UserEditModal';
import ServerEditModal from '@/components/admin/ServerEditModal';
import UserCreateModal from '@/components/admin/UserCreateModal';
import ServerCreateModal from '@/components/admin/ServerCreateModal';
import CategoryEditModal from '@/components/admin/CategoryEditModal';
import CategoryCreateModal from '@/components/admin/CategoryCreateModal';
import TypeEditModal from '@/components/admin/TypeEditModal';
import TypeCreateModal from '@/components/admin/TypeCreateModal';
import OSEditModal from '@/components/admin/OSEditModal';
import OSCreateModal from '@/components/admin/OSCreateModal';
import EnvironmentEditModal from '@/components/admin/EnvironmentEditModal';
import EnvironmentCreateModal from '@/components/admin/EnvironmentCreateModal';
import LocationEditModal from '@/components/admin/LocationEditModal';
import LocationCreateModal from '@/components/admin/LocationCreateModal';
import ServerTable from '@/components/admin/ServerTable';
import UserAdminModal from '@/components/admin/UserAdminModal';

// Interfaces
interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

interface ServerData {
  id: number;
  serverName: string;
  serverCpu: number;
  serverMemoryInGb: number;
  peakCpuUsage: string | null;
  peakMemoryUsage: string | null;
  location: {
    locationName: string;
    locationCity: string;
    id: number;
  } | null;
  os: {
    osId: number;
    osName: string;
    osVersion: string;
  } | null;
  type: {
    typeName: string;
    id: number;
  } | null;
  category: {
    categoryName: string;
    id: number;
  } | null;
  environment: {
    environmentName: string;
    id: number;
  } | null;
}

interface Category {
  id: number;
  categoryName: string;
}

interface Type {
  id: number;
  typeName: string;
}

interface OS {
  id: number;
  osName: string;
  osVersion: string;
}

interface Environment {
  id: number;
  environmentName: string;
}

interface Location {
  id: number;
  locationName: string;
  locationCity: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ id: string; username: string; role: string; token: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState<User[]>([]);
  const [servers, setServers] = useState<ServerData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [osData, setOSData] = useState<OS[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState<'users' | 'servers' | 'categories' | 'types' | 'os' | 'environments' | 'locations'>('users');
  const [searchTerm, setSearchTerm] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingServer, setEditingServer] = useState<ServerData | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingType, setEditingType] = useState<Type | null>(null);
  const [editingOS, setEditingOS] = useState<OS | null>(null);
  const [editingEnvironment, setEditingEnvironment] = useState<Environment | null>(null);
  const [editingLocation, setEditingLocation] = useState<Location | null>(null);
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [showCreateServer, setShowCreateServer] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const [showCreateType, setShowCreateType] = useState(false);
  const [showCreateOS, setShowCreateOS] = useState(false);
  const [showCreateEnvironment, setShowCreateEnvironment] = useState(false);
  const [showCreateLocation, setShowCreateLocation] = useState(false);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const authData = localStorage.getItem('auth');
        if (!authData) {
          // console.error('No auth data found in localStorage');
          // alert('Please log in to continue.');
          router.push('./');
          return;
        }

        let parsedData;
        try {
          parsedData = JSON.parse(authData);
        } catch (err) {
          console.error('Error parsing auth data:', err);
          localStorage.removeItem('auth');
          alert('Invalid authentication data. Please log in again.');
          router.push('./');
          return;
        }

        const { user, token } = parsedData;
        if (!user || !token || token.split('.').length !== 3) {
          console.error('Invalid auth data or token format:', parsedData);
          localStorage.removeItem('auth');
          alert('Invalid authentication data. Please log in again.');
          router.push('/');
          return;
        }

        console.log('Retrieved auth data:', parsedData);
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          console.log('Token payload:', payload);
          const exp = payload.exp * 1000;
          const timeUntilExpiry = exp - Date.now();
          console.log('Token expiration:', new Date(exp), 'Current time:', new Date());

          if (Date.now() > exp) {
            console.error('Token expired:', { exp, now: Date.now() });
            alert('Your session has expired. Please log in again.');
            localStorage.removeItem('auth');
            router.push('/');
            return;
          }
        } catch (err) {
          console.error('Invalid token format:', err);
          localStorage.removeItem('auth');
          alert('Invalid token. Please log in again.');
          router.push('/');
          return;
        }

        if (user.role !== 'ROLE_ADMIN') {
          console.error('User is not an admin:', user.role);
          localStorage.removeItem('auth');
          alert('Access denied: Admin role required.');
          router.push('/');
          return;
        }

        setCurrentUser({ ...user, token: parsedData.token });
        const headers = {
          'Authorization': `Bearer ${parsedData.token}`,
          'Content-Type': 'application/json',
        };
        console.log('API headers:', headers);

        try {
          // Fetch Users
          const usersResponse = await fetch('http://localhost:8080/api/user/all', { headers });
          if (usersResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!usersResponse.ok) {
            console.error('Users API response:', usersResponse.status, usersResponse.statusText);
            throw new Error(`Failed to fetch users: ${usersResponse.status}`);
          }
          const usersData = await usersResponse.json();
          console.log('Users data:', usersData);
          const mappedUsers: User[] = usersData.map((u: any) => ({
            id: String(u.id),
            username: u.username,
            role: u.role === 'ROLE_ADMIN' ? 'admin' : 'user',
          }));
          setUsers(mappedUsers);

          // Fetch Servers
          const serversResponse = await fetch('http://localhost:8080/api/server', { headers });
          if (serversResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!serversResponse.ok) {
            console.error('Servers API response:', serversResponse.status, serversResponse.statusText);
            throw new Error(`Failed to fetch servers: ${serversResponse.status}`);
          }
          const serversData = await serversResponse.json();
          console.log('Servers data:', serversData);
          const mappedServers: ServerData[] = serversData.map((s: any) => ({
            id: s.id,
            serverName: s.serverName,
            serverCpu: s.serverCpu,
            serverMemoryInGb: s.serverMemoryInGb,
            peakCpuUsage: s.peakCpuUsage,
            peakMemoryUsage: s.peakMemoryUsage,
            location: s.location || null,
            os: s.os || null,
            type: s.type || null,
            category: s.category || null,
            environment: s.environment || null,
          }));
          setServers(mappedServers);

          // Fetch Categories
          const categoriesResponse = await fetch('http://localhost:8080/api/category', { headers });
          if (categoriesResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!categoriesResponse.ok) {
            console.error('Categories API response:', categoriesResponse.status, categoriesResponse.statusText);
            throw new Error(`Failed to fetch categories: ${categoriesResponse.status}`);
          }
          const categoriesData = await categoriesResponse.json();
          console.log('Categories data:', categoriesData);
          const mappedCategories: Category[] = categoriesData.map((c: any) => ({
            id: c.id,
            categoryName: c.categoryName,
          }));
          setCategories(mappedCategories);

          // Fetch Types
          const typesResponse = await fetch('http://localhost:8080/api/type', { headers });
          if (typesResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!typesResponse.ok) {
            console.error('Types API response:', typesResponse.status, typesResponse.statusText);
            throw new Error(`Failed to fetch types: ${typesResponse.status}`);
          }
          const typesData = await typesResponse.json();
          console.log('Types data:', typesData);
          const mappedTypes: Type[] = typesData.map((t: any) => ({
            id: t.id,
            typeName: t.typeName,
          }));
          setTypes(mappedTypes);

          // Fetch OS
          const osResponse = await fetch('http://localhost:8080/api/os', { headers });
          if (osResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!osResponse.ok) {
            console.error('OS API response:', osResponse.status, osResponse.statusText);
            throw new Error(`Failed to fetch OS: ${osResponse.status}`);
          }
          const osData = await osResponse.json();
          console.log('OS data:', osData);
          const mappedOS: OS[] = osData.map((o: any) => ({
            id: o.osId,
            osName: o.osName,
            osVersion: o.osVersion,
          }));
          setOSData(mappedOS);

          // Fetch Environments
          const environmentsResponse = await fetch('http://localhost:8080/api/environment', { headers });
          if (environmentsResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!environmentsResponse.ok) {
            console.error('Environments API response:', environmentsResponse.status, environmentsResponse.statusText);
            throw new Error(`Failed to fetch environments: ${environmentsResponse.status}`);
          }
          const environmentsData = await environmentsResponse.json();
          console.log('Environments data:', environmentsData);
          const mappedEnvironments: Environment[] = environmentsData.map((e: any) => ({
            id: e.id,
            environmentName: e.environmentName,
          }));
          setEnvironments(mappedEnvironments);

          // Fetch Locations
          const locationsResponse = await fetch('http://localhost:8080/api/location', { headers });
          if (locationsResponse.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            localStorage.removeItem('auth');
            alert('Session invalid. Please log in again.');
            router.push('/');
            return;
          }
          if (!locationsResponse.ok) {
            console.error('Locations API response:', locationsResponse.status, locationsResponse.statusText);
            throw new Error(`Failed to fetch locations: ${locationsResponse.status}`);
          }
          const locationsData = await locationsResponse.json();
          console.log('Locations data:', locationsData);
          const mappedLocations: Location[] = locationsData.map((l: any) => ({
            id: l.id,
            locationName: l.locationName,
            locationCity: l.locationCity,
          }));
          setLocations(mappedLocations);
        } catch (err: any) {
          console.error('Error fetching data:', err);
          alert(`Failed to fetch data: ${err.message}`);
          router.push('/');
        }
      } catch (err) {
        console.error('Error in initializeAuth:', err);
        alert('Authentication error. Please log in again.');
        router.push('/');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [router]);

  // User handlers
  const handleDeleteUser = async (userId: string) => {
    if (!currentUser?.token) {
      console.error('No token available for delete user');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (userId === currentUser.id) {
      alert('You cannot delete your own account.');
      return;
    }
    if (confirm('Are you sure you want to delete this user?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/user/delete/${userId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete user API response:', response.status, response.statusText);
          throw new Error(`Failed to delete user: ${response.status}`);
        }
        const usersResponse = await fetch('http://localhost:8080/api/user/all', {
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (usersResponse.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!usersResponse.ok) {
          console.error('Users API response:', usersResponse.status, usersResponse.statusText);
          throw new Error(`Failed to fetch users: ${usersResponse.status}`);
        }
        const usersData = await usersResponse.json();
        console.log('Updated users data:', usersData);
        const mappedUsers: User[] = usersData.map((u: any) => ({
          id: String(u.id),
          username: u.username,
          role: u.role === 'ROLE_ADMIN' ? 'admin' : 'user',
        }));
        setUsers(mappedUsers);
        alert('User deleted successfully');
      } catch (err: any) {
        console.error('Error deleting user:', err);
        alert(`Failed to delete user: ${err.message}`);
      }
    }
  };

  const handleMakeAdmin = async (userId: string) => {
    if (!currentUser?.token) {
      console.error('No token available for make admin');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/user/promote/${userId}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Make admin API response:', response.status, response.statusText);
        throw new Error(`Failed to make admin: ${response.status}`);
      }
      setUsers(users.map(user => user.id === userId ? { ...user, role: 'admin' } : user));
      alert('User promoted to admin successfully');
    } catch (err: any) {
      console.error('Error making admin:', err);
      alert(`Failed to promote user to admin: ${err.message}`);
    }
  };

  const handleUpdateUser = async (updatedUser: User) => {
    if (!currentUser?.token) {
      console.error('No token available for update user');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/user/${updatedUser.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: updatedUser.username, role: updatedUser.role === 'admin' ? 'ROLE_ADMIN' : 'ROLE_USER' }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update user API response:', response.status, response.statusText);
        throw new Error(`Failed to update user: ${response.status}`);
      }
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setEditingUser(null);
      alert('User updated successfully');
    } catch (err: any) {
      console.error('Error updating user:', err);
      alert(`Failed to update user: ${err.message}`);
    }
  };

  const handleCreateUser = async (newUser: User) => {
    if (!currentUser?.token) {
      console.error('No token available for create user');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/user', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: newUser.username, role: newUser.role === 'admin' ? 'ROLE_ADMIN' : 'ROLE_USER' }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create user API response:', response.status, response.statusText);
        throw new Error(`Failed to create user: ${response.status}`);
      }
      const createdUser = await response.json();
      console.log('Created user:', createdUser);
      setUsers([...users, { id: String(createdUser.id), username: createdUser.username, role: createdUser.role === 'ROLE_ADMIN' ? 'admin' : 'user' }]);
      setShowCreateUser(false);
      alert('User created successfully');
    } catch (err: any) {
      console.error('Error creating user:', err);
      alert(`Failed to create user: ${err.message}`);
    }
  };

  // Server handlers
  const handleDeleteServer = async (serverId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete server');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this server?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/server/${serverId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete server API response:', response.status, response.statusText);
          throw new Error(`Failed to delete server: ${response.status}`);
        }
        setServers(servers.filter(server => server.id !== serverId));
        alert('Server deleted successfully');
      } catch (err: any) {
        console.error('Error deleting server:', err);
        alert(`Failed to delete server: ${err.message}`);
      }
    }
  };

  const handleUpdateServer = async (updatedServer: ServerData) => {
    if (!currentUser?.token) {
      console.error('No token available for update server');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/server/${updatedServer.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serverName: updatedServer.serverName,
          serverCpu: updatedServer.serverCpu,
          serverMemoryInGb: updatedServer.serverMemoryInGb,
          locationId: updatedServer.location?.id,
          osId: updatedServer.os?.osId,
          typeId: updatedServer.type?.id,
          categoryId: updatedServer.category?.id,
          environmentId: updatedServer.environment?.id,
          peakMemoryUsage: updatedServer.peakMemoryUsage,
          peakCpuUsage: updatedServer.peakCpuUsage,
        }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update server API response:', response.status, response.statusText);
        throw new Error(`Failed to update server: ${response.status}`);
      }
      setServers(servers.map(server => server.id === updatedServer.id ? updatedServer : server));
      setEditingServer(null);
      alert('Server updated successfully');
    } catch (err: any) {
      console.error('Error updating server:', err);
      alert(`Failed to update server: ${err.message}`);
    }
  };

  const handleCreateServer = async (newServer: ServerData) => {
    if (!currentUser?.token) {
      console.error('No token available for create server');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/server', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serverName: newServer.serverName,
          serverCpu: newServer.serverCpu,
          serverMemoryInGb: newServer.serverMemoryInGb,
          locationId: newServer.location?.id,
          osId: newServer.os?.osId,
          typeId: newServer.type?.id,
          categoryId: newServer.category?.id,
          environmentId: newServer.environment?.id,
          peakMemoryUsage: newServer.peakMemoryUsage,
          peakCpuUsage: newServer.peakCpuUsage,
        }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create server API response:', response.status, response.statusText);
        throw new Error(`Failed to create server: ${response.status}`);
      }
      const createdServer = await response.json();
      console.log('Created server:', createdServer);
      setServers([...servers, {
        id: createdServer.id,
        serverName: createdServer.serverName,
        serverCpu: createdServer.serverCpu,
        serverMemoryInGb: createdServer.serverMemoryInGb,
        peakCpuUsage: createdServer.peakCpuUsage,
        peakMemoryUsage: createdServer.peakMemoryUsage,
        location: createdServer.location || null,
        os: createdServer.os || null,
        type: createdServer.type || null,
        category: createdServer.category || null,
        environment: createdServer.environment || null,
      }]);
      setShowCreateServer(false);
      alert('Server created successfully');
    } catch (err: any) {
      console.error('Error creating server:', err);
      alert(`Failed to create server: ${err.message}`);
    }
  };

  // Category, Type, OS, Environment, Location handlers
  const handleDeleteCategory = async (categoryId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete category');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/category/${categoryId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete category API response:', response.status, response.statusText);
          throw new Error(`Failed to delete category: ${response.status}`);
        }
        setCategories(categories.filter(category => category.id !== categoryId));
        alert('Category deleted successfully');
      } catch (err: any) {
        console.error('Error deleting category:', err);
        alert(`Failed to delete category: ${err.message}`);
      }
    }
  };

  const handleUpdateCategory = async (updatedCategory: Category) => {
    if (!currentUser?.token) {
      console.error('No token available for update category');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/category/${updatedCategory.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryName: updatedCategory.categoryName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update category API response:', response.status, response.statusText);
        throw new Error(`Failed to update category: ${response.status}`);
      }
      setCategories(categories.map(category => category.id === updatedCategory.id ? updatedCategory : category));
      setEditingCategory(null);
      alert('Category updated successfully');
    } catch (err: any) {
      console.error('Error updating category:', err);
      alert(`Failed to update category: ${err.message}`);
    }
  };

  const handleCreateCategory = async (newCategory: Category) => {
    if (!currentUser?.token) {
      console.error('No token available for create category');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/category', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryName: newCategory.categoryName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create category API response:', response.status, response.statusText);
        throw new Error(`Failed to create category: ${response.status}`);
      }
      const createdCategory = await response.json();
      console.log('Created category:', createdCategory);
      setCategories([...categories, { id: createdCategory.id, categoryName: createdCategory.categoryName }]);
      setShowCreateCategory(false);
      alert('Category created successfully');
    } catch (err: any) {
      console.error('Error creating category:', err);
      alert(`Failed to create category: ${err.message}`);
    }
  };

  const handleDeleteType = async (typeId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete type');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this type?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/type/${typeId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete type API response:', response.status, response.statusText);
          throw new Error(`Failed to delete type: ${response.status}`);
        }
        setTypes(types.filter(type => type.id !== typeId));
        alert('Type deleted successfully');
      } catch (err: any) {
        console.error('Error deleting type:', err);
        alert(`Failed to delete type: ${err.message}`);
      }
    }
  };

  const handleUpdateType = async (updatedType: Type) => {
    if (!currentUser?.token) {
      console.error('No token available for update type');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/type/${updatedType.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeName: updatedType.typeName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update type API response:', response.status, response.statusText);
        throw new Error(`Failed to update type: ${response.status}`);
      }
      setTypes(types.map(type => type.id === updatedType.id ? updatedType : type));
      setEditingType(null);
      alert('Type updated successfully');
    } catch (err: any) {
      console.error('Error updating type:', err);
      alert(`Failed to update type: ${err.message}`);
    }
  };

  const handleCreateType = async (newType: Type) => {
    if (!currentUser?.token) {
      console.error('No token available for create type');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/type', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ typeName: newType.typeName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create type API response:', response.status, response.statusText);
        throw new Error(`Failed to create type: ${response.status}`);
      }
      const createdType = await response.json();
      console.log('Created type:', createdType);
      setTypes([...types, { id: createdType.id, typeName: createdType.typeName }]);
      setShowCreateType(false);
      alert('Type created successfully');
    } catch (err: any) {
      console.error('Error creating type:', err);
      alert(`Failed to create type: ${err.message}`);
    }
  };

  const handleDeleteOS = async (osId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete OS');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this OS?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/os/${osId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete OS API response:', response.status, response.statusText);
          throw new Error(`Failed to delete OS: ${response.status}`);
        }
        setOSData(osData.filter(os => os.id !== osId));
        alert('OS deleted successfully');
      } catch (err: any) {
        console.error('Error deleting OS:', err);
        alert(`Failed to delete OS: ${err.message}`);
      }
    }
  };

  const handleUpdateOS = async (updatedOS: OS) => {
    if (!currentUser?.token) {
      console.error('No token available for update OS');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/os/${updatedOS.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ osName: updatedOS.osName, osVersion: updatedOS.osVersion }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update OS API response:', response.status, response.statusText);
        throw new Error(`Failed to update OS: ${response.status}`);
      }
      setOSData(osData.map(os => os.id === updatedOS.id ? updatedOS : os));
      setEditingOS(null);
      alert('OS updated successfully');
    } catch (err: any) {
      console.error('Error updating OS:', err);
      alert(`Failed to update OS: ${err.message}`);
    }
  };

  const handleCreateOS = async (newOS: OS) => {
    if (!currentUser?.token) {
      console.error('No token available for create OS');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/os', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ osName: newOS.osName, osVersion: newOS.osVersion }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create OS API response:', response.status, response.statusText);
        throw new Error(`Failed to create OS: ${response.status}`);
      }
      const createdOS = await response.json();
      console.log('Created OS:', createdOS);
      setOSData([...osData, { id: createdOS.osId, osName: createdOS.osName, osVersion: createdOS.osVersion }]);
      setShowCreateOS(false);
      alert('OS created successfully');
    } catch (err: any) {
      console.error('Error creating OS:', err);
      alert(`Failed to create OS: ${err.message}`);
    }
  };

  const handleDeleteEnvironment = async (environmentId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete environment');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this environment?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/environment/${environmentId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete environment API response:', response.status, response.statusText);
          throw new Error(`Failed to delete environment: ${response.status}`);
        }
        setEnvironments(environments.filter(env => env.id !== environmentId));
        alert('Environment deleted successfully');
      } catch (err: any) {
        console.error('Error deleting environment:', err);
        alert(`Failed to delete environment: ${err.message}`);
      }
    }
  };

  const handleUpdateEnvironment = async (updatedEnvironment: Environment) => {
    if (!currentUser?.token) {
      console.error('No token available for update environment');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/environment/${updatedEnvironment.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ environmentName: updatedEnvironment.environmentName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update environment API response:', response.status, response.statusText);
        throw new Error(`Failed to update environment: ${response.status}`);
      }
      setEnvironments(environments.map(env => env.id === updatedEnvironment.id ? updatedEnvironment : env));
      setEditingEnvironment(null);
      alert('Environment updated successfully');
    } catch (err: any) {
      console.error('Error updating environment:', err);
      alert(`Failed to update environment: ${err.message}`);
    }
  };

  const handleCreateEnvironment = async (newEnvironment: Environment) => {
    if (!currentUser?.token) {
      console.error('No token available for create environment');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/environment', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ environmentName: newEnvironment.environmentName }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create environment API response:', response.status, response.statusText);
        throw new Error(`Failed to create environment: ${response.status}`);
      }
      const createdEnvironment = await response.json();
      console.log('Created environment:', createdEnvironment);
      setEnvironments([...environments, { id: createdEnvironment.id, environmentName: createdEnvironment.environmentName }]);
      setShowCreateEnvironment(false);
      alert('Environment created successfully');
    } catch (err: any) {
      console.error('Error creating environment:', err);
      alert(`Failed to create environment: ${err.message}`);
    }
  };

  const handleDeleteLocation = async (locationId: number) => {
    if (!currentUser?.token) {
      console.error('No token available for delete location');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    if (confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await fetch(`http://localhost:8080/api/location/${locationId}`, {
          method: 'DELETE',
          headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        });
        if (response.status === 401) {
          console.error('Unauthorized: Invalid or expired token');
          localStorage.removeItem('auth');
          alert('Session invalid. Please log in again.');
          router.push('/');
          return;
        }
        if (!response.ok) {
          console.error('Delete location API response:', response.status, response.statusText);
          throw new Error(`Failed to delete location: ${response.status}`);
        }
        setLocations(locations.filter(location => location.id !== locationId));
        alert('Location deleted successfully');
      } catch (err: any) {
        console.error('Error deleting location:', err);
        alert(`Failed to delete location: ${err.message}`);
      }
    }
  };

  const handleUpdateLocation = async (updatedLocation: Location) => {
    if (!currentUser?.token) {
      console.error('No token available for update location');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch(`http://localhost:8080/api/location/${updatedLocation.id}`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName: updatedLocation.locationName, locationCity: updatedLocation.locationCity }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Update location API response:', response.status, response.statusText);
        throw new Error(`Failed to update location: ${response.status}`);
      }
      setLocations(locations.map(location => location.id === updatedLocation.id ? updatedLocation : location));
      setEditingLocation(null);
      alert('Location updated successfully');
    } catch (err: any) {
      console.error('Error updating location:', err);
      alert(`Failed to update location: ${err.message}`);
    }
  };

  const handleCreateLocation = async (newLocation: Location) => {
    if (!currentUser?.token) {
      console.error('No token available for create location');
      alert('Authentication error: Please log in again.');
      router.push('/');
      return;
    }
    try {
      const response = await fetch('http://localhost:8080/api/location', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${currentUser.token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ locationName: newLocation.locationName, locationCity: newLocation.locationCity }),
      });
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token');
        localStorage.removeItem('auth');
        alert('Session invalid. Please log in again.');
        router.push('/');
        return;
      }
      if (!response.ok) {
        console.error('Create location API response:', response.status, response.statusText);
        throw new Error(`Failed to create location: ${response.status}`);
      }
      const createdLocation = await response.json();
      console.log('Created location:', createdLocation);
      setLocations([...locations, { id: createdLocation.id, locationName: createdLocation.locationName, locationCity: createdLocation.locationCity }]);
      setShowCreateLocation(false);
      alert('Location created successfully');
    } catch (err: any) {
      console.error('Error creating location:', err);
      alert(`Failed to create location: ${err.message}`);
    }
  };

  // Filter functions
  const getFilteredData = () => {
    switch (activeTab) {
      case 'users':
        return users.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.id.toString().includes(searchTerm)
        );
      case 'servers':
        return servers.filter(server =>
          server.serverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          server.id.toString().includes(searchTerm)
        );
      case 'categories':
        return categories.filter(category =>
          category.categoryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          category.id.toString().includes(searchTerm)
        );
      case 'types':
        return types.filter(type =>
          type.typeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          type.id.toString().includes(searchTerm)
        );
      case 'os':
        return osData.filter(os =>
          os.osName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          os.osVersion.toLowerCase().includes(searchTerm.toLowerCase()) ||
          os.id.toString().includes(searchTerm)
        );
      case 'environments':
        return environments.filter(env =>
          env.environmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          env.id.toString().includes(searchTerm)
        );
      case 'locations':
        return locations.filter(location =>
          location.locationName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.locationCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
          location.id.toString().includes(searchTerm)
        );
      default:
        return [];
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-lg font-medium text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!currentUser) return null;

  const tabs = [
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'servers', label: 'Server', icon: Server },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'types', label: 'Types', icon: Settings },
    { id: 'os', label: 'OS', icon: Monitor },
    { id: 'environments', label: 'Environments', icon: Globe },
    { id: 'locations', label: 'Locations', icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-purple-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.username}</span>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('auth');
                  router.push('/');
                }}
                className="flex items-center align-items-center"
              >
                <LogOut className="h-4 w-2 mr-2" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id as any);
                    setSearchTerm('');
                  }}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === 'tab.id' ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 inline mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'users' && (
          <>
            {/* User Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{users.length}</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Administrators</CardTitle>
                  <Shield className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {users.filter(user => user.role === 'admin').length}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* User Management */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">User Management</CardTitle>
                  <Button 
                    className="bg-blue-600 hover:bg-blue-700"
                    onClick={() => setShowCreateUser(true)}
                    disabled={isLoading}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search users by username..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Username</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredData().map((user: any) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.username}</TableCell>
                          <TableCell>
                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                              {user.role === 'admin' ? (
                                <Crown className="h-3 w-3 mr-1" />
                              ) : (
                                <Users className="h-3 w-3 mr-1" />
                              )}
                              {user.role}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              {isLoading && <Button
                                variant="outline"
                                size="sm"
                                // onClick={() => setEditingUser(user)}
                                // className="bg-white-10 text-white hover:bg-green-"
                                disabled={isLoading}
                              >
                                
                                {/* Edit */}
                              </Button>}
                              
                              {user.role !== 'admin' && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleMakeAdmin(user.id)}
                                  className="text-purple-600 hover:text-purple-700"
                                  disabled={isLoading}
                                >
                                  <Crown className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 text-white hover:bg-red-700"
                                disabled={isLoading}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </>
        )}
        
        {activeTab === 'servers' && (
          <ServerTable
            servers={getFilteredData() as ServerData[]}
            locations={locations}
            osData={osData}
            types={types}
            categories={categories}
            environments={environments}
            setEditingServer={setEditingServer}
            handleDeleteServer={handleDeleteServer}
            setShowCreateServer={setShowCreateServer}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'categories' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Manage Categories (Last {categories.length} Entries)</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowCreateCategory(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Category
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by category name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Category ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((category: any) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.categoryName}</TableCell>
                        <TableCell>{category.id}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingCategory(category)}
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={isLoading}
                            >
                              Edit
                              </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteCategory(category.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'types' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Manage Types (Last {types.length} Entries)</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowCreateType(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Type
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by type name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type Name</TableHead>
                      <TableHead>Type ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((type: any) => (
                      <TableRow key={type.id}>
                        <TableCell className="font-medium">{type.typeName}</TableCell>
                        <TableCell>{type.id}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingType(type)}
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={isLoading}
                            >
                              Edit
                              </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteType(type.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'os' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Manage OS (Last {osData.length} Entries)</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowCreateOS(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add OS
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by OS name or version..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>OS Name</TableHead>
                      <TableHead>Version</TableHead>
                      <TableHead>OS ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((os: any) => (
                      <TableRow key={os.id}>
                        <TableCell className="font-medium">{os.osName}</TableCell>
                        <TableCell>{os.osVersion}</TableCell>
                        <TableCell>{os.id}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingOS(os)}
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={isLoading}
                            >
                              Edit
                              </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteOS(os.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'environments' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Manage Environments (Last {environments.length} Entries)</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowCreateEnvironment(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Environment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by environment name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Environment Name</TableHead>
                      <TableHead>Environment ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((environment: any) => (
                      <TableRow key={environment.id}>
                        <TableCell className="font-medium">{environment.environmentName}</TableCell>
                        <TableCell>{environment.id}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingEnvironment(environment)}
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={isLoading}
                            >
                              Edit
                              </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteEnvironment(environment.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}

        {activeTab === 'locations' && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Manage Locations (Last {locations.length} Entries)</CardTitle>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setShowCreateLocation(true)}
                  disabled={isLoading}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Location
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by location name or city..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    disabled={isLoading}
                  />
                </div>
                <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Location Name</TableHead>
                      <TableHead>City</TableHead>
                      <TableHead>Location ID</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((location: any) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.locationName}</TableCell>
                        <TableCell>{location.locationCity}</TableCell>
                        <TableCell>{location.id}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setEditingLocation(location)}
                              className="bg-green-600 text-white hover:bg-green-700"
                              disabled={isLoading}
                            >
                              Edit
                              </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteLocation(location.id)}
                              className="bg-red-600 text-white hover:bg-red-700"
                              disabled={isLoading}
                            >
                              Delete
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Modals */}
      {editingUser && (
        <UserEditModal
          user={editingUser}
          onClose={() => setEditingUser(null)}
          onSave={handleUpdateUser}
        />
      )}
      {editingServer && (
        <ServerEditModal
          server={editingServer}
          locations={locations}
          osData={osData}
          types={types}
          categories={categories}
          environments={environments}
          onClose={() => setEditingServer(null)}
          onSave={handleUpdateServer}
        />
      )}
      {editingCategory && (
        <CategoryEditModal
          category={editingCategory}
          onClose={() => setEditingCategory(null)}
          onSave={handleUpdateCategory}
        />
      )}
      {editingType && (
        <TypeEditModal
          type={editingType}
          onClose={() => setEditingType(null)}
          onSave={handleUpdateType}
        />
      )}
      {editingOS && (
        <OSEditModal
          os={editingOS}
          onClose={() => setEditingOS(null)}
          onSave={handleUpdateOS}
        />
      )}
      {editingEnvironment && (
        <EnvironmentEditModal
          environment={editingEnvironment}
          onClose={() => setEditingEnvironment(null)}
          onSave={handleUpdateEnvironment}
        />
      )}
      {editingLocation && (
        <LocationEditModal
          location={editingLocation}
          onClose={() => setEditingLocation(null)}
          onSave={handleUpdateLocation}
        />
      )}
      {showCreateUser && (
        <UserCreateModal
          onClose={() => setShowCreateUser(false)}
          onSave={handleCreateUser}
        />
      )}
      {showCreateServer && (
        <ServerCreateModal
          locations={locations}
          osData={osData}
          types={types}
          categories={categories}
          environments={environments}
          onClose={() => setShowCreateServer(false)}
          onSave={handleCreateServer}
        />
      )}
      {showCreateCategory && (
        <CategoryCreateModal
          onClose={() => setShowCreateCategory(false)}
          onSave={handleCreateCategory}
        />
      )}
      {showCreateType && (
        <TypeCreateModal
          onClose={() => setShowCreateType(false)}
          onSave={handleCreateType}
        />
      )}
      {showCreateOS && (
        <OSCreateModal
          onClose={() => setShowCreateOS(false)}
          onSave={handleCreateOS}
        />
      )}
      {showCreateEnvironment && (
        <EnvironmentCreateModal
          onClose={() => setShowCreateEnvironment(false)}
          onSave={handleCreateEnvironment}
        />
      )}
      {showCreateLocation && (
        <LocationCreateModal
          onClose={() => setShowCreateLocation(false)}
          onSave={handleCreateLocation}
        />
      )}
    </div>
  );
}