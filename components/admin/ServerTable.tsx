// 'use client';

// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Search, UserPlus, Server, Delete } from 'lucide-react'; // Explicitly import Server
// import { ServerData, Location, OS, Type, Category, Environment } from '@/types';

// interface ServerTableProps {
//   servers: ServerData[];
//   locations: Location[];
//   osData: OS[];
//   types: Type[];
//   categories: Category[];
//   environments: Environment[];
//   setEditingServer: (server: ServerData | null) => void;
//   handleDeleteServer: (serverId: number) => Promise<void>;
//   setShowCreateServer: (show: boolean) => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   isLoading: boolean;
// }

// export default function ServerTable({
//   servers = [], // Default to empty array to prevent undefined
//   locations,
//   osData,
//   types,
//   categories,
//   environments,
//   setEditingServer,
//   handleDeleteServer,
//   setShowCreateServer,
//   searchTerm,
//   setSearchTerm,
//   isLoading,
// }: ServerTableProps) {
//   return (
//     <>
//       <Card className="mb-8">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
//           <Server className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{servers.length}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle className="text-xl"> Add Server </CardTitle>
//             <div className='flex item-center justify-center gap-2'>
//             <Button
//               className="bg-blue-600 hover:bg-blue-700"
//               onClick={() => setShowCreateServer(true)}
//               disabled={isLoading}
//             >
//               <UserPlus className="h-4 w-4 mr-2" />
//               Add Bulk Server
//             </Button>
//             <Button
//               className="bg-red-600 hover:bg-red-700"
//               onClick={() => setShowCreateServer(true)}
//               disabled={isLoading}
//             >
//               <Delete className="h-4 w-4 mr-2" />
//               Delete Bulk Server
//             </Button>
//             <Button
//               className="bg-green-600 hover:bg-green-700"
//               onClick={() => setShowCreateServer(true)}
//               disabled={isLoading}
//             >
//               <UserPlus className="h-4 w-4 mr-2" />
//               Add Server
//             </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by server name or ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//                 disabled={isLoading}
//               />
//             </div>
//             <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
//               Search
//             </Button>
//             <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
//               Clear
//             </Button>
//           </div>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-green-50">
//                   <TableHead>Server Name</TableHead>
//                   <TableHead>CPU (Cores)</TableHead>
//                   <TableHead>Memory (GB)</TableHead>
//                   <TableHead>Peak CPU Usage</TableHead>
//                   <TableHead>Peak Memory Usage</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>OS</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Environment</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {servers.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} className="text-center">
//                       No servers found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   servers.map((server) => (
//                     <TableRow key={server.id}>
//                       <TableCell className="font-medium">{server.serverName}</TableCell>
//                       <TableCell>{server.serverCpu}</TableCell>
//                       <TableCell>{server.serverMemoryInGb}</TableCell>
//                       <TableCell>{server.peakCpuUsage || 'N/A'}</TableCell>
//                       <TableCell>{server.peakMemoryUsage || 'N/A'}</TableCell>
//                       <TableCell>{server.location ? `${server.location.locationName}, ${server.location.locationCity}` : 'N/A'}</TableCell>
//                       <TableCell>{server.os ? `${server.os.osName} ${server.os.osVersion}` : 'N/A'}</TableCell>
//                       <TableCell>{server.type ? server.type.typeName : 'N/A'}</TableCell>
//                       <TableCell>{server.category ? server.category.categoryName : 'N/A'}</TableCell>
//                       <TableCell>{server.environment ? server.environment.environmentName : 'N/A'}</TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setEditingServer(server)}
//                             className="bg-green-600 text-white hover:bg-green-700"
//                             disabled={isLoading}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleDeleteServer(server.id)}
//                             className="bg-red-600 text-white hover:bg-red-700"
//                             disabled={isLoading}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }





// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Label } from '@/components/ui/label';
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog';
// import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
// import { Search, UserPlus, Server, Delete } from 'lucide-react';
// import { ServerData, Location, OS, Type, Category, Environment } from '@/types';
// import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

// interface ServerTableProps {
//   servers: ServerData[];
//   locations: Location[];
//   osData: OS[];
//   types: Type[];
//   categories: Category[];
//   environments: Environment[];
//   setEditingServer: (server: ServerData | null) => void;
//   handleDeleteServer: (serverId: number) => Promise<void>;
//   setShowCreateServer: (show: boolean) => void;
//   searchTerm: string;
//   setSearchTerm: (term: string) => void;
//   isLoading: boolean;
//   onUpdate?: (servers: ServerData[]) => void; // Made optional
//   onDelete?: (serverIds: number[]) => void; // Made optional
// }

// export default function ServerTable({
//   servers = [],
//   locations,
//   osData,
//   types,
//   categories,
//   environments,
//   setEditingServer,
//   handleDeleteServer,
//   setShowCreateServer,
//   searchTerm,
//   setSearchTerm,
//   isLoading,
//   onUpdate,
//   onDelete,
// }: ServerTableProps) {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [selectedDeleteFile, setSelectedDeleteFile] = useState<File | null>(null);
//   const [uploadMethod, setUploadMethod] = useState<'formdata' | 'json'>('json');
//   const [deleteMethod, setDeleteMethod] = useState<'formdata' | 'json'>('json');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const validateAuth = () => {
//     const authData = localStorage.getItem('auth');
//     console.log('ServerTable - Raw authData:', authData);
//     if (!authData) {
//       setError('No authentication data found. Please log out and log in again.');
//       return null;
//     }

//     let auth;
//     try {
//       auth = JSON.parse(authData);
//       console.log('ServerTable - Parsed auth:', auth);
//     } catch (err) {
//       console.error('ServerTable - Failed to parse auth data:', err);
//       setError('Invalid authentication data. Please log out and log in again.');
//       return null;
//     }

//     if (!auth.token) {
//       console.error('ServerTable - No token found');
//       setError('Authentication token missing. Please log out and log in again.');
//       return null;
//     }

//     try {
//       const tokenParts = auth.token.split('.');
//       if (tokenParts.length !== 3) {
//         throw new Error('Invalid JWT format');
//       }
//       const payload = JSON.parse(atob(tokenParts[1]));
//       console.log('ServerTable - JWT payload:', payload);
//       const expiry = payload.exp * 1000;
//       const currentTime = Date.now();
//       console.log(
//         'ServerTable - Current time (IST):',
//         new Date(currentTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
//         'Token expiry (IST):',
//         new Date(expiry).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
//       );
//       if (currentTime > expiry) {
//         console.error('ServerTable - Token expired');
//         localStorage.removeItem('auth');
//         setError('Your session has expired. Please log out and log in again.');
//         return null;
//       }
//     } catch (err) {
//       console.error('ServerTable - Invalid JWT token:', err);
//       setError('Invalid authentication token. Please log out and log in again.');
//       return null;
//     }

//     if (auth.user?.role !== 'ROLE_ADMIN') {
//       console.error('ServerTable - User is not ROLE_ADMIN:', auth.user?.role);
//       setError('Only admins can perform this action.');
//       return null;
//     }

//     return auth;
//   };

//   const refreshToken = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/api/auth/refresh', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
//       });
//       if (!response.ok) {
//         throw new Error('Token refresh failed');
//       }
//       const data = await response.json();
//       localStorage.setItem('auth', JSON.stringify({ token: data.token, user: { role: 'ROLE_ADMIN' } }));
//       console.log('ServerTable - Token refreshed:', data.token);
//       return data.token;
//     } catch (err) {
//       console.error('ServerTable - Token refresh error:', err);
//       setError('Failed to refresh token. Please log out and log in again.');
//       return null;
//     }
//   };

//   const sendFile = async (
//     url: string,
//     method: string,
//     file: File | null,
//     successMessage: string,
//     failureMessage: string,
//     payloadType: 'formdata' | 'json'
//   ) => {
//     if (!file) {
//       setError('Please select a JSON file.');
//       return;
//     }

//     setError('');
//     let auth = validateAuth();
//     if (!auth) return;

//     try {
//       const fileContent = await file.text();
//       let data;
//       try {
//         data = JSON.parse(fileContent);
//         if (!Array.isArray(data)) {
//           throw new Error('File must contain an array.');
//         }
//         if (url.includes('bulk') && !url.includes('delete')) {
//           for (const s of data) {
//             if (!s.serverName || !s.serverCpu || !s.serverMemoryInGb) {
//               throw new Error('Each server must have serverName, serverCpu, and serverMemoryInGb.');
//             }
//           }
//         } else {
//           if (!data.every((id: any) => typeof id === 'string' || typeof id === 'number')) {
//             throw new Error('File must contain an array of server IDs.');
//           }
//         }
//       } catch (err) {
//         console.error('ServerTable - Invalid JSON file:', err);
//         setError('Invalid JSON file. Ensure it contains an array with valid data.');
//         return;
//       }

//       console.log(`ServerTable - Sending ${payloadType} request:`, { url, method, data: JSON.stringify(data, null, 2) });
//       let response;
//       let currentToken = auth.token.trim();
//       if (payloadType === 'formdata') {
//         const formData = new FormData();
//         formData.append('file', file);
//         response = await fetch(url, {
//           method,
//           headers: {
//             Authorization: `Bearer ${currentToken}`,
//           },
//           body: formData,
//         });
//       } else {
//         response = await fetch(url, {
//           method,
//           headers: {
//             Authorization: `Bearer ${currentToken}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify(data),
//         });
//       }

//       if (response.status === 401) {
//         console.error(`ServerTable - ${failureMessage} 401 Unauthorized at ${url}:`, {
//           status: response.status,
//           statusText: response.statusText,
//           body: await response.text() || 'Empty response',
//           url,
//           method,
//           payloadType,
//           data: JSON.stringify(data, null, 2),
//         });

//         // Try refreshing token
//         currentToken = await refreshToken();
//         if (!currentToken) return;

//         // Retry with new token
//         console.log(`ServerTable - Retrying with new token at ${url}`);
//         if (payloadType === 'formdata') {
//           const formData = new FormData();
//           formData.append('file', file);
//           response = await fetch(url, {
//             method,
//             headers: {
//               Authorization: `Bearer ${currentToken}`,
//             },
//             body: formData,
//           });
//         } else {
//           response = await fetch(url, {
//             method,
//             headers: {
//               Authorization: `Bearer ${currentToken}`,
//               'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(data),
//           });
//         }

//         if (response.status === 401) {
//           const responseText = await response.text();
//           console.error(`ServerTable - ${failureMessage} 401 Unauthorized after token refresh:`, {
//             status: response.status,
//             statusText: response.statusText,
//             body: responseText || 'Empty response',
//             url,
//             method,
//             payloadType,
//             data: JSON.stringify(data, null, 2),
//           });
//           setError(`${failureMessage}: Authentication failed using ${payloadType} even after token refresh. Try the other method or log out and log in again.`);
//           return;
//         }
//       }

//       if (!response.ok) {
//         const errorData = await response.text();
//         console.error(`ServerTable - ${failureMessage} API error at ${url}:`, response.status, errorData);
//         try {
//           const parsedError = JSON.parse(errorData);
//           setError(`${failureMessage}: ${parsedError.message || response.statusText}`);
//         } catch {
//           setError(`${failureMessage}: ${errorData || response.statusText}`);
//         }
//         // Try fallback endpoint
//         let fallbackUrl = url;
//         if (url.includes('bulk') && !url.includes('delete')) {
//           fallbackUrl = 'http://localhost:8080/api/servers/bulk-upload';
//         } else if (url.includes('delete')) {
//           fallbackUrl = 'http://localhost:8080/api/servers/bulk-delete';
//         }
//         if (fallbackUrl !== url) {
//           console.log(`ServerTable - Trying fallback endpoint: ${fallbackUrl}`);
//           response = await fetch(fallbackUrl, {
//             method: 'POST',
//             headers: {
//               Authorization: `Bearer ${currentToken}`,
//               ...(payloadType === 'json' && { 'Content-Type': 'application/json' }),
//             },
//             body: payloadType === 'formdata' ? (() => {
//               const formData = new FormData();
//               formData.append('file', file);
//               return formData;
//             })() : JSON.stringify(data),
//           });
//           if (response.status === 401) {
//             const fallbackText = await response.text();
//             console.error(`ServerTable - Fallback ${failureMessage} 401 Unauthorized:`, {
//               status: response.status,
//               statusText: response.statusText,
//               body: fallbackText || 'Empty response',
//               url: fallbackUrl,
//               payloadType,
//               data: JSON.stringify(data, null, 2),
//             });
//             setError(`${failureMessage}: Authentication failed on fallback endpoint. Try the other method or log out and log in again.`);
//             return;
//           }
//           if (!response.ok) {
//             const errorData = await response.text();
//             console.error(`ServerTable - Fallback ${failureMessage} API error:`, response.status, errorData);
//             setError(`${failureMessage}: ${errorData || response.statusText}`);
//             return;
//           }
//         } else {
//           return;
//         }
//       }

//       if (url.includes('bulk') && !url.includes('delete') && onUpdate) {
//         onUpdate(data); // Update table with new servers
//       } else if (url.includes('delete') && onDelete) {
//         onDelete(data); // Update table after delete
//       } else {
//         console.warn('ServerTable - onUpdate or onDelete not provided, table not updated');
//       }
//       alert(successMessage);
//     } catch (err: any) {
//       console.error(`ServerTable - ${failureMessage}:`, err.message);
//       setError(`${failureMessage}: ${err.message}`);
//     }
//   };

//   return (
//     <>
//       <Card className="mb-8">
//         <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//           <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
//           <Server className="h-4 w-4 text-muted-foreground" />
//         </CardHeader>
//         <CardContent>
//           <div className="text-2xl font-bold">{servers.length}</div>
//         </CardContent>
//       </Card>
//       <Card>
//         <CardHeader>
//           <div className="flex justify-between items-center">
//             <CardTitle className="text-xl">Server Management</CardTitle>
//             <div className="flex items-center justify-center gap-2">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
//                     <UserPlus className="h-4 w-4 mr-2" /> Add Bulk Server
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Upload Servers</DialogTitle>
//                     <DialogDescription>Upload a JSON file containing server data</DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-3">
//                     <Label>JSON file</Label>
//                     <Input
//                       type="file"
//                       accept=".json"
//                       onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                     />
//                     <Label>Upload Method</Label>
//                     <RadioGroup
//                       value={uploadMethod}
//                       onValueChange={(value: 'formdata' | 'json') => setUploadMethod(value)}
//                       className="flex space-x-4"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="formdata" id="formdata-upload" />
//                         <Label htmlFor="formdata-upload">FormData</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="json" id="json-upload" checked />
//                         <Label htmlFor="json-upload">JSON</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button
//                       onClick={() =>
//                         sendFile(
//                           'http://localhost:8080/api/server/bulk',
//                           'POST',
//                           selectedFile,
//                           'Servers uploaded successfully',
//                           'Upload failed',
//                           uploadMethod
//                         )
//                       }
//                     >
//                       Upload
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>

//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
//                     <Delete className="h-4 w-4 mr-2" /> Delete Bulk Server
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent>
//                   <DialogHeader>
//                     <DialogTitle>Delete Servers</DialogTitle>
//                     <DialogDescription>Upload a JSON file with server IDs to delete</DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-3">
//                     <Label>JSON file</Label>
//                     <Input
//                       type="file"
//                       accept=".json"
//                       onChange={(e) => setSelectedDeleteFile(e.target.files?.[0] || null)}
//                     />
//                     <Label>Delete Method</Label>
//                     <RadioGroup
//                       value={deleteMethod}
//                       onValueChange={(value: 'formdata' | 'json') => setDeleteMethod(value)}
//                       className="flex space-x-4"
//                     >
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="formdata" id="formdata-delete" />
//                         <Label htmlFor="formdata-delete">FormData</Label>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <RadioGroupItem value="json" id="json-delete" checked />
//                         <Label htmlFor="json-delete">JSON</Label>
//                       </div>
//                     </RadioGroup>
//                   </div>
//                   <DialogFooter>
//                     <DialogClose asChild>
//                       <Button variant="outline">Cancel</Button>
//                     </DialogClose>
//                     <Button
//                       variant="destructive"
//                       onClick={() =>
//                         sendFile(
//                           'http://localhost:8080/api/server/bulk/delete',
//                           'POST',
//                           selectedDeleteFile,
//                           'Servers deleted successfully',
//                           'Delete failed',
//                           deleteMethod
//                         )
//                       }
//                     >
//                       Delete
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>

//               <Button
//                 className="bg-green-600 hover:bg-green-700"
//                 onClick={() => setShowCreateServer(true)}
//                 disabled={isLoading}
//               >
//                 <UserPlus className="h-4 w-4 mr-2" /> Add Server
//               </Button>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent>
//           {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
//           <div className="flex gap-4 mb-6">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search by server name or ID..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//                 disabled={isLoading}
//               />
//             </div>
//             <Button variant="outline" className="bg-green-600 text-white hover:bg-green-700" disabled={isLoading}>
//               Search
//             </Button>
//             <Button variant="outline" onClick={() => setSearchTerm('')} disabled={isLoading}>
//               Clear
//             </Button>
//           </div>
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-green-50">
//                   <TableHead>Server Name</TableHead>
//                   <TableHead>CPU (Cores)</TableHead>
//                   <TableHead>Memory (GB)</TableHead>
//                   <TableHead>Peak CPU Usage</TableHead>
//                   <TableHead>Peak Memory Usage</TableHead>
//                   <TableHead>Location</TableHead>
//                   <TableHead>OS</TableHead>
//                   <TableHead>Type</TableHead>
//                   <TableHead>Category</TableHead>
//                   <TableHead>Environment</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {servers.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={11} className="text-center">
//                       No servers found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   servers.map((server) => (
//                     <TableRow key={server.id}>
//                       <TableCell className="font-medium">{server.serverName}</TableCell>
//                       <TableCell>{server.serverCpu}</TableCell>
//                       <TableCell>{server.serverMemoryInGb}</TableCell>
//                       <TableCell>{server.peakCpuUsage || 'N/A'}</TableCell>
//                       <TableCell>{server.peakMemoryUsage || 'N/A'}</TableCell>
//                       <TableCell>
//                         {server.location ? `${server.location.locationName}, ${server.location.locationCity}` : 'N/A'}
//                       </TableCell>
//                       <TableCell>{server.os ? `${server.os.osName} ${server.os.osVersion}` : 'N/A'}</TableCell>
//                       <TableCell>{server.type?.typeName || 'N/A'}</TableCell>
//                       <TableCell>{server.category?.categoryName || 'N/A'}</TableCell>
//                       <TableCell>{server.environment?.environmentName || 'N/A'}</TableCell>
//                       <TableCell>
//                         <div className="flex space-x-2">
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => setEditingServer(server)}
//                             className="bg-green-600 text-white hover:bg-green-700"
//                             disabled={isLoading}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => handleDeleteServer(server.id)}
//                             className="bg-red-600 text-white hover:bg-red-700"
//                             disabled={isLoading}
//                           >
//                             Delete
//                           </Button>
//                         </div>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, UserPlus, Server, Delete } from 'lucide-react';
import { ServerData, Location, OS, Type, Category, Environment } from '@/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface ServerTableProps {
  servers: ServerData[];
  locations: Location[];
  osData: OS[];
  types: Type[];
  categories: Category[];
  environments: Environment[];
  setEditingServer: (server: ServerData | null) => void;
  handleDeleteServer: (serverId: number) => Promise<void>;
  setShowCreateServer: (show: boolean) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
  onUpdate?: (servers: ServerData[]) => void;
  onDelete?: (serverIds: number[]) => void;
}

export default function ServerTable({
  servers = [],
  locations,
  osData,
  types,
  categories,
  environments,
  setEditingServer,
  handleDeleteServer,
  setShowCreateServer,
  searchTerm,
  setSearchTerm,
  isLoading,
  onUpdate,
  onDelete,
}: ServerTableProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedDeleteFile, setSelectedDeleteFile] = useState<File | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'formdata' | 'json'>('json');
  const [deleteMethod, setDeleteMethod] = useState<'formdata' | 'json'>('json');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateAuth = () => {
    const authData = localStorage.getItem('auth');
    console.log('ServerTable - Raw authData:', authData);
    if (!authData) {
      setError('No authentication data found. Please log out and log in again.');
      return null;
    }

    let auth;
    try {
      auth = JSON.parse(authData);
      console.log('ServerTable - Parsed auth:', auth);
    } catch (err) {
      console.error('ServerTable - Failed to parse auth data:', err);
      setError('Invalid authentication data. Please log out and log in again.');
      return null;
    }

    if (!auth.token) {
      console.error('ServerTable - No token found');
      setError('Authentication token missing. Please log out and log in again.');
      return null;
    }

    try {
      const tokenParts = auth.token.split('.');
      if (tokenParts.length !== 3) {
        throw new Error('Invalid JWT format');
      }
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log('ServerTable - JWT payload:', payload);
      const expiry = payload.exp * 1000;
      const currentTime = Date.now();
      console.log(
        'ServerTable - Current time (IST):',
        new Date(currentTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        'Token expiry (IST):',
        new Date(expiry).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
      );
      if (currentTime > expiry) {
        console.error('ServerTable - Token expired');
        localStorage.removeItem('auth');
        setError('Your session has expired. Please log out and log in again.');
        return null;
      }
    } catch (err) {
      console.error('ServerTable - Invalid JWT token:', err);
      setError('Invalid authentication token. Please log out and log in again.');
      return null;
    }

    if (auth.user?.role !== 'ROLE_ADMIN') {
      console.error('ServerTable - User is not ROLE_ADMIN:', auth.user?.role);
      setError('Only admins can perform this action.');
      return null;
    }

    return auth;
  };

  const refreshToken = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: localStorage.getItem('refreshToken') }),
      });
      if (!response.ok) {
        throw new Error('Token refresh failed');
      }
      const data = await response.json();
      localStorage.setItem('auth', JSON.stringify({ token: data.token, user: { role: 'ROLE_ADMIN' } }));
      console.log('ServerTable - Token refreshed:', data.token);
      return data.token;
    } catch (err) {
      console.error('ServerTable - Token refresh error:', err);
      setError('Failed to refresh token. Please log out and log in again.');
      return null;
    }
  };

  const sendFile = async (
    url: string,
    method: string,
    file: File | null,
    successMessage: string,
    failureMessage: string,
    payloadType: 'formdata' | 'json'
  ) => {
    if (!file) {
      setError('Please select a JSON file.');
      return;
    }

    setError('');
    let auth = validateAuth();
    if (!auth) return;

    try {
      const fileContent = await file.text();
      console.log(`ServerTable - Raw file content for ${url}:`, fileContent);
      let data;
      try {
        data = JSON.parse(fileContent);
        if (!Array.isArray(data)) {
          throw new Error('File must contain an array.');
        }
        if (url.includes('bulk') && !url.includes('delete')) {
          for (const s of data) {
            if (!s.serverName || !s.serverCpu || !s.serverMemoryInGb) {
              throw new Error('Each server must have serverName, serverCpu, and serverMemoryInGb.');
            }
          }
        } else {
          if (!data.every((id: any) => typeof id === 'string' || typeof id === 'number')) {
            throw new Error('File must contain an array of server IDs (strings or numbers).');
          }
          // Convert string IDs to numbers for delete
          data = data.map((id: string | number) => (typeof id === 'string' ? parseInt(id, 10) : id));
        }
      } catch (err) {
        console.error('ServerTable - Invalid JSON file:', err, 'Raw content:', fileContent);
        setError('Invalid JSON file. Ensure it contains an array with valid data (e.g., [1, 2] for delete).');
        return;
      }

      console.log(`ServerTable - Sending ${payloadType} request:`, { url, method, data: JSON.stringify(data, null, 2) });
      let response;
      let currentToken = auth.token.trim();
      if (payloadType === 'formdata') {
        const formData = new FormData();
        formData.append('file', file);
        response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
          body: formData,
        });
      } else {
        response = await fetch(url, {
          method,
          headers: {
            Authorization: `Bearer ${currentToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
      }

      if (response.status === 401) {
        console.error(`ServerTable - ${failureMessage} 401 Unauthorized at ${url}:`, {
          status: response.status,
          statusText: response.statusText,
          body: await response.text() || 'Empty response',
          url,
          method,
          payloadType,
          data: JSON.stringify(data, null, 2),
        });

        // Try refreshing token
        currentToken = await refreshToken();
        if (!currentToken) return;

        // Retry with new token
        console.log(`ServerTable - Retrying with new token at ${url}`);
        if (payloadType === 'formdata') {
          const formData = new FormData();
          formData.append('file', file);
          response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${currentToken}`,
            },
            body: formData,
          });
        } else {
          response = await fetch(url, {
            method,
            headers: {
              Authorization: `Bearer ${currentToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
        }

        if (response.status === 401) {
          const responseText = await response.text();
          console.error(`ServerTable - ${failureMessage} 401 Unauthorized after token refresh:`, {
            status: response.status,
            statusText: response.statusText,
            body: responseText || 'Empty response',
            url,
            method,
            payloadType,
            data: JSON.stringify(data, null, 2),
          });
          setError(`${failureMessage}: Authentication failed using ${payloadType} even after token refresh. Try the other method or log out and log in again.`);
          return;
        }
      }

      if (!response.ok) {
        const errorData = await response.text();
        console.error(`ServerTable - ${failureMessage} API error at ${url}:`, response.status, errorData);
        try {
          const parsedError = JSON.parse(errorData);
          setError(`${failureMessage}: ${parsedError.message || response.statusText}`);
        } catch {
          setError(`${failureMessage}: ${errorData || response.statusText}`);
        }
        // Try fallback endpoint
        let fallbackUrl = url;
        let fallbackMethod = method;
        if (url.includes('bulk') && !url.includes('delete')) {
          fallbackUrl = 'http://localhost:8080/api/servers/bulk-upload';
        } else if (url.includes('delete')) {
          fallbackUrl = 'http://localhost:8080/api/servers/bulk-delete';
          fallbackMethod = 'DELETE';
        }
        if (fallbackUrl !== url || fallbackMethod !== method) {
          console.log(`ServerTable - Trying fallback endpoint: ${fallbackUrl} with method ${fallbackMethod}`);
          response = await fetch(fallbackUrl, {
            method: fallbackMethod,
            headers: {
              Authorization: `Bearer ${currentToken}`,
              ...(payloadType === 'json' && { 'Content-Type': 'application/json' }),
            },
            body: payloadType === 'formdata' ? (() => {
              const formData = new FormData();
              formData.append('file', file);
              return formData;
            })() : JSON.stringify(data),
          });
          if (response.status === 401) {
            const fallbackText = await response.text();
            console.error(`ServerTable - Fallback ${failureMessage} 401 Unauthorized:`, {
              status: response.status,
              statusText: response.statusText,
              body: fallbackText || 'Empty response',
              url: fallbackUrl,
              method: fallbackMethod,
              payloadType,
              data: JSON.stringify(data, null, 2),
            });
            setError(`${failureMessage}: Authentication failed on fallback endpoint. Try the other method or log out and log in again.`);
            return;
          }
          if (!response.ok) {
            const errorData = await response.text();
            console.error(`ServerTable - Fallback ${failureMessage} API error:`, response.status, errorData);
            setError(`${failureMessage}: ${errorData || response.statusText}`);
            return;
          }
        } else {
          return;
        }
      }

      if (url.includes('bulk') && !url.includes('delete') && onUpdate) {
        onUpdate(data);
      } else if (url.includes('delete') && onDelete) {
        onDelete(data);
      } else {
        console.warn('ServerTable - onUpdate or onDelete not provided, table not updated');
      }
      alert(successMessage);
    } catch (err: any) {
      console.error(`ServerTable - ${failureMessage}:`, err.message);
      setError(`${failureMessage}: ${err.message}`);
    }
  };

  return (
    <>
      <Card className="mb-8">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
          <Server className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{servers.length}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl">Server Management</CardTitle>
            <div className="flex items-center justify-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                    <UserPlus className="h-4 w-4 mr-2" /> Add Bulk Server
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Servers</DialogTitle>
                    <DialogDescription>Upload a JSON file containing server data</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <Label>JSON file</Label>
                    <Input
                      type="file"
                      accept=".json"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                    />
                    <Label>Upload Method</Label>
                    <RadioGroup
                      value={uploadMethod}
                      onValueChange={(value: 'formdata' | 'json') => setUploadMethod(value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formdata" id="formdata-upload" />
                        <Label htmlFor="formdata-upload">FormData</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="json" id="json-upload" checked />
                        <Label htmlFor="json-upload">JSON</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      onClick={() =>
                        sendFile(
                          'http://localhost:8080/api/server/bulk',
                          'POST',
                          selectedFile,
                          'Servers uploaded successfully',
                          'Upload failed',
                          uploadMethod
                        )
                      }
                    >
                      Upload
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    <Delete className="h-4 w-4 mr-2" /> Delete Bulk Server
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete Servers</DialogTitle>
                    <DialogDescription>Upload a JSON file with server IDs to delete</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-3">
                    <Label>JSON file</Label>
                    <Input
                      type="file"
                      accept=".json"
                      onChange={(e) => setSelectedDeleteFile(e.target.files?.[0] || null)}
                    />
                    <Label>Delete Method</Label>
                    <RadioGroup
                      value={deleteMethod}
                      onValueChange={(value: 'formdata' | 'json') => setDeleteMethod(value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="formdata" id="formdata-delete" />
                        <Label htmlFor="formdata-delete">FormData</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="json" id="json-delete" checked />
                        <Label htmlFor="json-delete">JSON</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                      variant="destructive"
                      onClick={() =>
                        sendFile(
                          'http://localhost:8080/api/server/bulk/delete',
                          'POST',
                          selectedDeleteFile,
                          'Servers deleted successfully',
                          'Delete failed',
                          deleteMethod
                        )
                      }
                    >
                      Delete
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <Button
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowCreateServer(true)}
                disabled={isLoading}
              >
                <UserPlus className="h-4 w-4 mr-2" /> Add Server
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by server name or ID..."
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
                <TableRow className="bg-green-50">
                  <TableHead>Server Name</TableHead>
                  <TableHead>CPU (Cores)</TableHead>
                  <TableHead>Memory (GB)</TableHead>
                  <TableHead>Peak CPU Usage</TableHead>
                  <TableHead>Peak Memory Usage</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>OS</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Environment</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {servers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center">
                      No servers found.
                    </TableCell>
                  </TableRow>
                ) : (
                  servers.map((server) => (
                    <TableRow key={server.id}>
                      <TableCell className="font-medium">{server.serverName}</TableCell>
                      <TableCell>{server.serverCpu}</TableCell>
                      <TableCell>{server.serverMemoryInGb}</TableCell>
                      <TableCell>{server.peakCpuUsage || 'N/A'}</TableCell>
                      <TableCell>{server.peakMemoryUsage || 'N/A'}</TableCell>
                      <TableCell>
                        {server.location ? `${server.location.locationName}, ${server.location.locationCity}` : 'N/A'}
                      </TableCell>
                      <TableCell>{server.os ? `${server.os.osName} ${server.os.osVersion}` : 'N/A'}</TableCell>
                      <TableCell>{server.type?.typeName || 'N/A'}</TableCell>
                      <TableCell>{server.category?.categoryName || 'N/A'}</TableCell>
                      <TableCell>{server.environment?.environmentName || 'N/A'}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditingServer(server)}
                            className="bg-green-600 text-white hover:bg-green-700"
                            disabled={isLoading}
                          >
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteServer(server.id)}
                            className="bg-red-600 text-white hover:bg-red-700"
                            disabled={isLoading}
                          >
                            Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  );
}