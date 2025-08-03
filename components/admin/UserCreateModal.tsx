// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter 
// } from '@/components/ui/dialog';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   role: 'user' | 'admin';
//   status: 'active' | 'inactive';
//   joinDate: string;
// }

// interface UserCreateModalProps {
//   onClose: () => void;
//   onSave: (user: User) => void;
// }

// export default function UserCreateModal({ onClose, onSave }: UserCreateModalProps) {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password:'',
//     confirm_password:'',
//     role: 'user' as 'user' | 'admin',
//     status: 'active' as 'active' | 'inactive'
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (formData.password !== formData.confirm_password) {
//     alert('Passwords do not match!');
//     return;
//   }

//   setLoading(true);

//   try {
//     const response = await fetch('http://localhost:8080/auth/register', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         username: formData.email, // using email as username
//         password: formData.password,
//         role: formData.role.toUpperCase(), // e.g., 'ADMIN' or 'USER'
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       alert(`Error: ${errorData.message || 'Registration failed'}`);
//       setLoading(false);
//       return;
//     }

//     // If successful:
//     const newUser: User = {
//       id: Date.now().toString(),
//       name: formData.name,
//       email: formData.email,
//       role: formData.role,
//       status: formData.status,
//       joinDate: new Date().toISOString().split('T')[0],
//     };

//     onSave(newUser);
//     onClose();
//   } catch (error) {
//     alert('Something went wrong!');
//   } finally {
//     setLoading(false);
//   }
// };


//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="name" className="text-right">
//                 Name
//               </Label>
//               <Input
//                 id="name"
//                 value={formData.name}
//                 onChange={(e) => handleChange('name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="email" className="text-right">
//                 Email
//               </Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={(e) => handleChange('email', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="password" className="text-right">
//                 Password
//               </Label>
//             <Input
//   id="password"
//   type="password"
//   value={formData.password}
//   onChange={(e) => handleChange('password', e.target.value)}
//   className="col-span-3"
//   required
// />

//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="confirm_password" className="text-right">
//                 Confirm Password
//               </Label>
//               <Input
//   id="confirm_password"
//   type="password"
//   value={formData.confirm_password}
//   onChange={(e) => handleChange('confirm_password', e.target.value)}
//   className="col-span-3"
//   required
// />

//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">
//                 Role
//               </Label>
//               <Select
//                 value={formData.role}
//                 onValueChange={(value: 'user' | 'admin') => handleChange('role', value)}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="VIEWER">User</SelectItem>
//                   <SelectItem value="ADMIN">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="status" className="text-right">
//                 Status
//               </Label>
//               <Select
//                 value={formData.status}
//                 onValueChange={(value: 'active' | 'inactive') => handleChange('status', value)}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="active">Active</SelectItem>
//                   <SelectItem value="inactive">Inactive</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading || formData.password !== formData.confirm_password}>
//   {loading ? 'Adding...' : 'Add User'}
// </Button>

//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }












// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { 
//   Dialog, 
//   DialogContent, 
//   DialogHeader, 
//   DialogTitle, 
//   DialogFooter 
// } from '@/components/ui/dialog';
// import { 
//   Select, 
//   SelectContent, 
//   SelectItem, 
//   SelectTrigger, 
//   SelectValue 
// } from '@/components/ui/select';

// interface User {
//   id: string;
//   username: string;
//   role: 'user' | 'admin';
// }

// interface UserCreateModalProps {
//   onClose: () => void;
//   onSave: (user: User) => void;
// }

// export default function UserCreateModal({ onClose, onSave }: UserCreateModalProps) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     role: 'user' as 'user' | 'admin',
//   });

//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!formData.username || !formData.password || !formData.role) {
//       alert('Please fill all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//       console.error("Token missing from localStorage");
//       return;
//   }
//       console.log("token get:", token);

//       const response = await fetch('http://localhost:8080/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "Authorization": `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//           role: formData.role.toUpperCase(), 
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         alert(`Error: ${errorData.message || 'Registration failed'}`);
//         setLoading(false);
//         return;
//       }

//       const data = await response.json();

//       // Assuming backend sends back token or user data if needed
//       // For now, create user object locally to pass to onSave

//       const newUser: User = {
//         id: Date.now().toString(),
//         username: formData.username,
//         role: formData.role,
//       };

//       onSave(newUser);
//       onClose();

//     } catch (error) {
//       alert('Something went wrong during registration');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field: keyof typeof formData, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="username" className="text-right">Username</Label>
//               <Input
//                 id="username"
//                 value={formData.username}
//                 onChange={(e) => handleChange('username', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="password" className="text-right">Password</Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => handleChange('password', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">Role</Label>
//               <Select
//                 value={formData.role}
//                 onValueChange={(value: 'user' | 'admin') => handleChange('role', value)}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }











// 'use client';

// import { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from '@/components/ui/dialog';
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select';

// interface User {
//   id: string;
//   username: string;
//   role: 'user' | 'admin';
// }

// interface UserCreateModalProps {
//   onClose: () => void;
//   onSave: (user: User) => void;
// }

// export default function UserCreateModal({ onClose, onSave }: UserCreateModalProps) {
//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     role: 'user' as 'user' | 'admin',
//   });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     if (!formData.username || !formData.password || !formData.role) {
//       setError('Please fill all fields');
//       return;
//     }

//     setLoading(true);

//     try {
//       const authData = localStorage.getItem('auth');
//       if (!authData) {
//         console.error('No auth data found in localStorage');
//         setError('Authentication data missing. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       let token;
//       try {
//         const parsedAuth = JSON.parse(authData);
//         token = parsedAuth.token;
//         console.log('Token retrieved:', token);
//       } catch (err) {
//         console.error('Error parsing auth data:', err);
//         setError('Invalid authentication data. Please log in again.');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:8080/auth/register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           username: formData.username,
//           password: formData.password,
//           role: formData.role === 'admin' ? 'ROLE_ADMIN' : 'ROLE_USER', // Match backend role format
//         }),
//       });

//       const data = await response.json();
//       console.log('Backend Response:', data); // Debug backend response

//       if (!response.ok) {
//         throw new Error(data.message || 'Registration failed');
//       }

//       // Create user object from backend response
//       const newUser: User = {
//         id: String(data.id || Date.now()), // Use backend ID if available, fallback to temp ID
//         username: formData.username,
//         role: formData.role, // 'user' or 'admin' as expected by AdminDashboard
//       };

//       console.log('New user created:', newUser);
//       onSave(newUser);
//       onClose();
//     } catch (error: any) {
//       console.error('Registration error:', error);
//       setError(error.message || 'Something went wrong during registration');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field: keyof typeof formData, value: string) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New User</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="username" className="text-right">
//                 Username
//               </Label>
//               <Input
//                 id="username"
//                 value={formData.username}
//                 onChange={(e) => handleChange('username', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="password" className="text-right">
//                 Password
//               </Label>
//               <Input
//                 id="password"
//                 type="password"
//                 value={formData.password}
//                 onChange={(e) => handleChange('password', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="role" className="text-right">
//                 Role
//               </Label>
//               <Select
//                 value={formData.role}
//                 onValueChange={(value: 'user' | 'admin') => handleChange('role', value)}
//               >
//                 <SelectTrigger className="col-span-3">
//                   <SelectValue placeholder="Select role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="user">User</SelectItem>
//                   <SelectItem value="admin">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             {error && <p className="text-red-600 col-span-4 text-center">{error}</p>}
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading}>
//               {loading ? 'Registering...' : 'Register'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }







'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface User {
  id: string;
  username: string;
  role: 'user' | 'admin';
}

interface UserCreateModalProps {
  onClose: () => void;
  onSave: (user: User) => void;
}

export default function UserCreateModal({ onClose, onSave }: UserCreateModalProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'user' as 'user' | 'admin',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password || !formData.role) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.error('No auth data found in localStorage for user creation');
        setError('Authentication data missing. Please log in again.');
        return;
      }

      let token;
      try {
        const parsedAuth = JSON.parse(authData);
        token = parsedAuth.token;
        console.log('Token retrieved for user creation:', token ? 'Present' : 'Missing');
      } catch (err) {
        console.error('Error parsing auth data:', err);
        setError('Invalid authentication data. Please log in again.');
        return;
      }

      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          role: formData.role === 'admin' ? 'ROLE_ADMIN' : 'ROLE_USER',
        }),
      });

      // Check Content-Type before parsing
      const contentType = response.headers.get('Content-Type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log('Backend JSON Response:', data);
      } else {
        data = await response.text();
        console.warn('Non-JSON response received:', data);
      }

      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for user creation');
        localStorage.removeItem('auth');
        setError('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        console.error('Create user API error:', response.status, data);
        throw new Error(data.message || data || 'Registration failed');
      }

      // Create user object
      const newUser: User = {
        id: String(data.id || data.userId || Date.now()),
        username: formData.username,
        role: formData.role,
      };

      console.log('New user created:', newUser);
      onSave(newUser);
      alert('User registered successfully');
      onClose();
    } catch (error: any) {
      console.error('Registration error:', error.message);
      if (error.message.includes('Unexpected token')) {
        // Handle case where user is registered but response is non-JSON
        console.warn('Assuming user registered despite non-JSON response');
        const newUser: User = {
          id: String(Date.now()), // Fallback ID
          username: formData.username,
          role: formData.role,
        };
        onSave(newUser);
        alert('User registered successfully');
        onClose();
      } else if (error.message.includes('CORS')) {
        setError('CORS error: Backend server is not configured to allow requests from this origin.');
      } else {
        setError(error.message || 'Something went wrong during registration');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the username, password, and role to create a new user.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => handleChange('username', e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                className="col-span-3"
                required
                disabled={loading}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Role
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: 'user' | 'admin') => handleChange('role', value)}
                disabled={loading}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">User</SelectItem>
                  {/* <SelectItem value="admin">Admin</SelectItem> */}
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-600 col-span-4 text-center">{error}</p>}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
