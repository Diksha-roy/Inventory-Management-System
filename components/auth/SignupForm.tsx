// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Alert, AlertDescription } from '@/components/ui/alert';
// // import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
// // import { 
// //   Select, 
// //   SelectContent, 
// //   SelectItem, 
// //   SelectTrigger, 
// //   SelectValue 
// // } from '@/components/ui/select';

// // export default function SignupForm() {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [confirmPassword, setConfirmPassword] = useState('');
// //   const [role, setRole] = useState<'user' | 'admin'>('user');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     if (password !== confirmPassword) {
// //       setError('Passwords do not match');
// //       setLoading(false);
// //       return;
// //     }

// //     // Simulate user creation
// //     setTimeout(() => {
// //       if (name && email && password) {
// //         // Store user data in localStorage
// //         const userData = {
// //           email,
// //           role,
// //           name,
// //           id: Date.now().toString(),
// //         };
// //         localStorage.setItem('user', JSON.stringify(userData));
        
// //         // Redirect based on selected role
// //         if (role === 'admin') {
// //           router.push('/admin/dashboard');
// //         } else {
// //           router.push('/user/dashboard');
// //         }
// //       } else {
// //         setError('Please fill in all fields');
// //       }
// //       setLoading(false);
// //     }, 1000);
// //   };

// //   return (
// //     <Card className="w-full max-w-md shadow-lg">
// //       <CardHeader className="space-y-1">
// //         <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="name">Full Name</Label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="name"
// //                 type="text"
// //                 placeholder="Enter your full name"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="pl-10"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="email">Email</Label>
// //             <div className="relative">
// //               <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="email"
// //                 type="email"
// //                 placeholder="Enter your email"
// //                 value={email}
// //                 onChange={(e) => setEmail(e.target.value)}
// //                 className="pl-10"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="role">Role</Label>
// //             <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select your role" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="user">User</SelectItem>
// //                 <SelectItem value="admin">Administrator</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="password">Password</Label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 placeholder="Create a password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="pl-10 pr-10"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
// //               >
// //                 {showPassword ? <EyeOff /> : <Eye />}
// //               </button>
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="confirmPassword">Confirm Password</Label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="confirmPassword"
// //                 type="password"
// //                 placeholder="Confirm your password"
// //                 value={confirmPassword}
// //                 onChange={(e) => setConfirmPassword(e.target.value)}
// //                 className="pl-10"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           {error && (
// //             <Alert className="border-red-200 bg-red-50">
// //               <AlertDescription className="text-red-700">{error}</AlertDescription>
// //             </Alert>
// //           )}

// //           <Button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700"
// //             disabled={loading}
// //           >
// //             {loading ? 'Creating Account...' : 'Create Account'}
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }










// //  'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Alert, AlertDescription } from '@/components/ui/alert';
// // import { Eye, EyeOff, Lock, User } from 'lucide-react';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue
// // } from '@/components/ui/select';

// // export default function SignupForm() {
// //   const [name, setName] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState<'user' | 'admin'>('user');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     if (!name || !password) {
// //       setError('Please fill in all fields');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:8080/api/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           name,
// //           password,
// //           role,
// //         }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || 'Signup failed');
// //       }

// //       const result = await response.json();

// //       // Optional: Store token if returned
// //       if (result.token) {
// //         localStorage.setItem('token', result.token);
// //       }

// //       // Store user info
// //       localStorage.setItem('user', JSON.stringify({ name, role }));

// //       // Redirect based on role
// //       router.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
// //     } catch (err: any) {
// //       setError(err.message || 'Something went wrong');
// //     }

// //     setLoading(false);
// //   };

// //   return (
// //     <Card className="w-full max-w-md shadow-lg">
// //       <CardHeader className="space-y-1">
// //         <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="name">Username</Label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="name"
// //                 type="text"
// //                 placeholder="Enter your username"
// //                 value={name}
// //                 onChange={(e) => setName(e.target.value)}
// //                 className="pl-10"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="role">Role</Label>
// //             <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select your role" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="user">User</SelectItem>
// //                 <SelectItem value="admin">Administrator</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="password">Password</Label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 placeholder="Create a password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="pl-10 pr-10"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
// //               >
// //                 {showPassword ? <EyeOff /> : <Eye />}
// //               </button>
// //             </div>
// //           </div>

// //           {error && (
// //             <Alert className="border-red-200 bg-red-50">
// //               <AlertDescription className="text-red-700">{error}</AlertDescription>
// //             </Alert>
// //           )}

// //           <Button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700"
// //             disabled={loading}
// //           >
// //             {loading ? 'Creating Account...' : 'Create Account'}
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }









// // 'use client';

// // import { useState } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Button } from '@/components/ui/button';
// // import { Input } from '@/components/ui/input';
// // import { Label } from '@/components/ui/label';
// // import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// // import { Alert, AlertDescription } from '@/components/ui/alert';
// // import { Eye, EyeOff, Lock, User } from 'lucide-react';
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue
// // } from '@/components/ui/select';

// // export default function SignupForm() {
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [role, setRole] = useState<'user' | 'admin'>('user');
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [error, setError] = useState('');
// //   const [loading, setLoading] = useState(false);
// //   const router = useRouter();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setError('');
// //     setLoading(true);

// //     if (!username || !password) {
// //       setError('Please fill in all fields');
// //       setLoading(false);
// //       return;
// //     }

// //     try {
// //       const response = await fetch('http://localhost:8080/api/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify({
// //           username,
// //           password,
// //           role,
// //         }),
// //       });

// //       const result = await response.json();

// //       if (!response.ok) {
// //         throw new Error(result.message || 'Signup failed');
// //       }

// //       // Optional: Store token if returned
// //       if (result.token) {
// //         localStorage.setItem('token', result.token);
// //       }

// //       // Store user info
// //       localStorage.setItem('user', JSON.stringify({ username, role }));

// //       // Redirect based on role
// //       router.push(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
// //     } catch (err: any) {
// //       setError(err.message || 'Something went wrong');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <Card className="w-full max-w-md shadow-lg">
// //       <CardHeader className="space-y-1">
// //         <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
// //       </CardHeader>
// //       <CardContent>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <div className="space-y-2">
// //             <Label htmlFor="username">Username</Label>
// //             <div className="relative">
// //               <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="username"
// //                 type="text"
// //                 placeholder="Enter your username"
// //                 value={username}
// //                 onChange={(e) => setUsername(e.target.value)}
// //                 className="pl-10"
// //                 required
// //               />
// //             </div>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="role">Role</Label>
// //             <Select value={role} onValueChange={(value: 'user' | 'admin') => setRole(value)}>
// //               <SelectTrigger>
// //                 <SelectValue placeholder="Select your role" />
// //               </SelectTrigger>
// //               <SelectContent>
// //                 <SelectItem value="user">User</SelectItem>
// //                 <SelectItem value="admin">Admin</SelectItem>
// //               </SelectContent>
// //             </Select>
// //           </div>

// //           <div className="space-y-2">
// //             <Label htmlFor="password">Password</Label>
// //             <div className="relative">
// //               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
// //               <Input
// //                 id="password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 placeholder="Create a password"
// //                 value={password}
// //                 onChange={(e) => setPassword(e.target.value)}
// //                 className="pl-10 pr-10"
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
// //               >
// //                 {showPassword ? <EyeOff /> : <Eye />}
// //               </button>
// //             </div>
// //           </div>

// //           {error && (
// //             <Alert className="border-red-200 bg-red-50">
// //               <AlertDescription className="text-red-700">{error}</AlertDescription>
// //             </Alert>
// //           )}

// //           <Button
// //             type="submit"
// //             className="w-full bg-blue-600 hover:bg-blue-700"
// //             disabled={loading}
// //           >
// //             {loading ? 'Creating Account...' : 'Create Account'}
// //           </Button>
// //         </form>
// //       </CardContent>
// //     </Card>
// //   );
// // }




// // import React, { useState } from 'react';

// // const SignupForm: React.FC = () => {
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     password: '',
// //     role: 'VIEWER',
// //   });

// //   const [message, setMessage] = useState('');

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     try {
// //       const res = await fetch('http://localhost:8080/api/auth/register', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //         },
// //         body: JSON.stringify(formData),
// //       });

// //       const result = await res.text();

// //       if (res.ok) {
// //         setMessage('✅ User registered successfully!');
// //         setFormData({ username: '', password: '', role: 'VIEWER' });
// //       } else {
// //         setMessage(`❌ Error: ${result}`);
// //       }
// //     } catch (err) {
// //       setMessage('❌ Server error!');
// //     }
// //   };

// //   return (
// //     <div style={styles.container}>
// //       <h2>Signup</h2>
// //       <form onSubmit={handleSubmit} style={styles.form}>
// //         <input
// //           type="text"
// //           name="username"
// //           placeholder="Username"
// //           value={formData.username}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />
// //         <input
// //           type="password"
// //           name="password"
// //           placeholder="Password"
// //           value={formData.password}
// //           onChange={handleChange}
// //           style={styles.input}
// //           required
// //         />
// //         <select name="role" value={formData.role} onChange={handleChange} style={styles.input}>
// //           <option value="VIEWER">Viewer</option>
// //           <option value="ADMIN">Admin</option>
// //         </select>
// //         <button type="submit" style={styles.button}>Signup</button>
// //         {message && <p>{message}</p>}
// //       </form>
// //     </div>
// //   );
// // };

// // const styles: { [key: string]: React.CSSProperties } = {
// //   container: {
// //     width: '300px',
// //     margin: '100px auto',
// //     padding: '20px',
// //     border: '1px solid #ccc',
// //     borderRadius: '8px',
// //     textAlign: 'center',
// //     fontFamily: 'Arial',
// //   },
// //   form: {
// //     display: 'flex',
// //     flexDirection: 'column',
// //   },
// //   input: {
// //     padding: '10px',
// //     marginBottom: '10px',
// //     borderRadius: '4px',
// //     border: '1px solid #ccc',
// //   },
// //   button: {
// //     padding: '10px',
// //     backgroundColor: '#007bff',
// //     color: 'white',
// //     border: 'none',
// //     borderRadius: '4px',
// //     cursor: 'pointer',
// //   },
// // };

// // export default SignupForm;




// "use client";

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Alert, AlertDescription } from '@/components/ui/alert';
// import { User, Lock } from 'lucide-react';
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from '@/components/ui/select';

// const SignupForm: React.FC = () => {
//   const router = useRouter();

//   const [formData, setFormData] = useState({
//     username: '',
//     password: '',
//     role: 'VIEWER',
//   });

//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRoleChange = (value: string) => {
//     setFormData({ ...formData, role: value });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setMessage('');
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:8080/api/auth/register', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData),
//       });

//       const result = await res.text();

//       if (res.ok) {
//         setMessage('✅ User registered successfully!');
//         setFormData({ username: '', password: '', role: 'VIEWER' });
//         // Optionally redirect to login:
//         // router.push("/login");
//       } else {
//         setMessage(`❌ Error: ${result}`);
//       }
//     } catch (err) {
//       setMessage('❌ Server error!');
//     }

//     setLoading(false);
//   };

//   return (
//     <Card className="w-full max-w-md mx-auto mt-20 shadow-lg">
//       <CardHeader className="space-y-1">
//         <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="space-y-2">
//             <Label htmlFor="username">Username</Label>
//             <div className="relative">
//               <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="username"
//                 name="username"
//                 type="text"
//                 placeholder="Enter your username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="pl-10"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="password">Password</Label>
//             <div className="relative">
//               <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 id="password"
//                 name="password"
//                 type="password"
//                 placeholder="Create a password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="pl-10"
//                 required
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <Label htmlFor="role">Role</Label>
//             <Select value={formData.role} onValueChange={handleRoleChange}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select a role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="VIEWER">Viewer</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           {message && (
//             <Alert className={`border ${message.startsWith("✅") ? "border-green-300 bg-green-50" : "border-red-200 bg-red-50"}`}>
//               <AlertDescription className={message.startsWith("✅") ? "text-green-700" : "text-red-700"}>
//                 {message}
//               </AlertDescription>
//             </Alert>
//           )}

//           <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
//             {loading ? 'Creating Account...' : 'Create Account'}
//           </Button>
//         </form>
//       </CardContent>
//     </Card>
//   );
// };

// export default SignupForm;
