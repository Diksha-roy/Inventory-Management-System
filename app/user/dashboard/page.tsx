// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Button } from '@/components/ui/button';
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input';
// import { Badge } from '@/components/ui/badge';
// import { 
//   Table, 
//   TableBody, 
//   TableCell, 
//   TableHead, 
//   TableHeader, 
//   TableRow 
// } from '@/components/ui/table';
// import { 
//   User,
//   LogOut, 
//   Search, 
//   Server,
//   Database,
//   Folder,
//   Settings,
//   Monitor,
//   Globe,
//   MapPin
// } from 'lucide-react';

// interface ServerData {
//   id: number;
//   server_name: string;
//   server_cpu: number;
//   server_memory_in_gb: number;
//   location_id: number;
//   os_id: number;
//   type_id: number;
//   category_id: number;
//   environment_id: number;
//   peak_memory_usage: number;
//   peak_cpu_usage: number;
// }

// interface Category {
//   id: number;
//   category_name: string;
// }

// interface Type {
//   id: number;
//   type_name: string;
// }

// interface OS {
//   id: number;
//   os_name: string;
//   os_version: string;
// }

// interface Environment {
//   id: number;
//   environment_name: string;
// }

// interface Location {
//   id: number;
//   location_name: string;
//   location_city: string;
// }

// export default function UserDashboard() {
//   const [currentUser, setCurrentUser] = useState<any>(null);
//   const [servers, setServers] = useState<ServerData[]>([]);
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [types, setTypes] = useState<Type[]>([]);
//   const [osData, setOSData] = useState<OS[]>([]);
//   const [environments, setEnvironments] = useState<Environment[]>([]);
//   const [locations, setLocations] = useState<Location[]>([]);
  
//   const [activeTab, setActiveTab] = useState<'servers' | 'categories' | 'types' | 'os' | 'environments' | 'locations'>('servers');
//   const [searchTerm, setSearchTerm] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     // Check if user is authenticated
//     const userData = localStorage.getItem('user');
//     console.log("user data",userData)
//     if (!userData) {
//       // router.push('/');
//       return;
//     }

//     const user = JSON.parse(userData);
//     if (user.role !== 'ROLE_VIEWER') {
//       // router.push('/');
//       return;
//     }

//     setCurrentUser(user);

//     // Load sample data (read-only view)
//     const sampleServers: ServerData[] = [
//       {
//         id: 43,
//         server_name: 'Server040',
//         server_cpu: 24,
//         server_memory_in_gb: 64,
//         location_id: 1,
//         os_id: 1,
//         type_id: 1,
//         category_id: 2,
//         environment_id: 2,
//         peak_memory_usage: 99.78,
//         peak_cpu_usage: 97.43
//       },
//       {
//         id: 44,
//         server_name: 'Server041',
//         server_cpu: 24,
//         server_memory_in_gb: 64,
//         location_id: 2,
//         os_id: 1,
//         type_id: 2,
//         category_id: 2,
//         environment_id: 2,
//         peak_memory_usage: 95.29,
//         peak_cpu_usage: 83.89
//       },
//       {
//         id: 45,
//         server_name: 'Server042',
//         server_cpu: 8,
//         server_memory_in_gb: 32,
//         location_id: 1,
//         os_id: 1,
//         type_id: 1,
//         category_id: 2,
//         environment_id: 2,
//         peak_memory_usage: 37.17,
//         peak_cpu_usage: 37.6
//       },
//       {
//         id: 46,
//         server_name: 'Server043',
//         server_cpu: 64,
//         server_memory_in_gb: 256,
//         location_id: 1,
//         os_id: 1,
//         type_id: 1,
//         category_id: 2,
//         environment_id: 2,
//         peak_memory_usage: 17.98,
//         peak_cpu_usage: 9.82
//       },
//       {
//         id: 47,
//         server_name: 'Server044',
//         server_cpu: 64,
//         server_memory_in_gb: 256,
//         location_id: 1,
//         os_id: 1,
//         type_id: 1,
//         category_id: 2,
//         environment_id: 2,
//         peak_memory_usage: 26.42,
//         peak_cpu_usage: 97.13
//       }
//     ];

//     const sampleCategories: Category[] = [
//       { id: 1, category_name: 'Application' },
//       { id: 2, category_name: 'Database' },
//       { id: 3, category_name: 'noida' },
//       { id: 4, category_name: 'testing' }
//     ];

//     const sampleTypes: Type[] = [
//       { id: 1, type_name: 'Baremetal' },
//       { id: 2, type_name: 'VM' },
//       { id: 3, type_name: 'mac' },
//       { id: 4, type_name: 'ttt' }
//     ];

//     const sampleOS: OS[] = [
//       { id: 1, os_name: 'RHEL', os_version: '7.9' },
//       { id: 2, os_name: 'RHEL', os_version: '8.1' },
//       { id: 3, os_name: 'RHEL', os_version: '8.8' },
//       { id: 4, os_name: 'RHEL', os_version: '9.3' },
//       { id: 5, os_name: 'RHEL', os_version: '9.5' },
//       { id: 6, os_name: 'RHEL', os_version: '9.4' }
//     ];

//     const sampleEnvironments: Environment[] = [
//       { id: 1, environment_name: 'Staging' },
//       { id: 2, environment_name: 'Production' },
//       { id: 3, environment_name: 'testing' }
//     ];

//     const sampleLocations: Location[] = [
//       { id: 1, location_name: 'NDC Delhi', location_city: 'New Delhi' },
//       { id: 2, location_name: 'NDC Delhi Vcenter', location_city: 'New Delhi' },
//       { id: 3, location_name: 'noida', location_city: 'sector 62' },
//       { id: 4, location_name: 'rrr', location_city: 'ihji' }
//     ];

//     setServers(sampleServers);
//     setCategories(sampleCategories);
//     setTypes(sampleTypes);
//     setOSData(sampleOS);
//     setEnvironments(sampleEnvironments);
//     setLocations(sampleLocations);
//   }, [router]);

//   const handleLogout = () => {
//     localStorage.removeItem('user');
//     router.push('/');
//   };

//   // Filter functions
//   const getFilteredData = () => {
//     switch (activeTab) {
//       case 'servers':
//         return servers.filter(server =>
//           server.server_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           server.id.toString().includes(searchTerm)
//         );
//       case 'categories':
//         return categories.filter(category =>
//           category.category_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           category.id.toString().includes(searchTerm)
//         );
//       case 'types':
//         return types.filter(type =>
//           type.type_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           type.id.toString().includes(searchTerm)
//         );
//       case 'os':
//         return osData.filter(os =>
//           os.os_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           os.os_version.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           os.id.toString().includes(searchTerm)
//         );
//       case 'environments':
//         return environments.filter(env =>
//           env.environment_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           env.id.toString().includes(searchTerm)
//         );
//       case 'locations':
//         return locations.filter(location =>
//           location.location_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           location.location_city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           location.id.toString().includes(searchTerm)
//         );
//       default:
//         return [];
//     }
//   };

//   if (!currentUser) return null;

//   const tabs = [
//     { id: 'servers', label: 'Servers', icon: Server },
//     { id: 'categories', label: 'Categories', icon: Folder },
//     { id: 'types', label: 'Types', icon: Settings },
//     { id: 'os', label: 'OS', icon: Monitor },
//     { id: 'environments', label: 'Environments', icon: Globe },
//     { id: 'locations', label: 'Locations', icon: MapPin }
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-4">
//             <div className="flex items-center">
//               <User className="h-8 w-8 text-blue-600 mr-3" />
//               <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
//             </div>
//             <div className="flex items-center space-x-4">
//               <span className="text-sm text-gray-600">Welcome, {currentUser.name}</span>
//               <Button
//                 variant="outline"
//                 onClick={handleLogout}
//                 className="flex items-center space-x-2"
//               >
//                 <LogOut className="h-4 w-4" />
//                 <span>Logout</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex space-x-8 overflow-x-auto">
//             {tabs.map((tab) => {
//               const Icon = tab.icon;
//               return (
//                 <button
//                   key={tab.id}
//                   onClick={() => {
//                     setActiveTab(tab.id as any);
//                     setSearchTerm('');
//                   }}
//                   className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
//                     activeTab === tab.id
//                       ? 'border-blue-500 text-blue-600'
//                       : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                   }`}
//                 >
//                   <Icon className="h-4 w-4 inline mr-2" />
//                   {tab.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Profile Card */}
//         <Card className="mb-8">
//           <CardHeader>
//             <CardTitle className="text-xl">Your Profile</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Name</label>
//                 <p className="text-lg font-semibold">{currentUser.name}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Email</label>
//                 <p className="text-lg">{currentUser.email}</p>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Role</label>
//                 <Badge variant="secondary" className="mt-1">
//                   <User className="h-3 w-3 mr-1" />
//                   {currentUser.role}
//                 </Badge>
//               </div>
//               <div>
//                 <label className="text-sm font-medium text-gray-500">Status</label>
//                 <Badge variant="default" className="mt-1">Active</Badge>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         {activeTab === 'servers' && (
//           <>
//             {/* Server Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Servers</CardTitle>
//                   <Server className="h-4 w-4 text-muted-foreground" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">{servers.length}</div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total CPU Cores</CardTitle>
//                   <Database className="h-4 w-4 text-blue-600" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {servers.reduce((sum, server) => sum + server.server_cpu, 0)}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Total Memory (GB)</CardTitle>
//                   <Database className="h-4 w-4 text-green-600" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {servers.reduce((sum, server) => sum + server.server_memory_in_gb, 0)}
//                   </div>
//                 </CardContent>
//               </Card>
//               <Card>
//                 <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                   <CardTitle className="text-sm font-medium">Avg CPU Usage</CardTitle>
//                   <Database className="h-4 w-4 text-orange-600" />
//                 </CardHeader>
//                 <CardContent>
//                   <div className="text-2xl font-bold">
//                     {(servers.reduce((sum, server) => sum + server.peak_cpu_usage, 0) / servers.length).toFixed(1)}%
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Server Information (Read-Only) */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-xl">Server Information</CardTitle>
//                 <p className="text-sm text-gray-600">View-only access to server data</p>
//               </CardHeader>
//               <CardContent>
//                 {/* Search */}
//                 <div className="relative mb-6">
//                   <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                   <Input
//                     placeholder="Search servers by name or ID..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>

//                 {/* Servers Table */}
//                 <div className="rounded-md border overflow-x-auto">
//                   <Table>
//                     <TableHeader>
//                       <TableRow>
//                         <TableHead>server_name</TableHead>
//                         <TableHead>server_cpu</TableHead>
//                         <TableHead>server_memory_in_gb</TableHead>
//                         <TableHead>location_id</TableHead>
//                         <TableHead>os_id</TableHead>
//                         <TableHead>type_id</TableHead>
//                         <TableHead>category_id</TableHead>
//                         <TableHead>environment_id</TableHead>
//                         <TableHead>peak_memory_usage</TableHead>
//                         <TableHead>peak_cpu_usage</TableHead>
//                         <TableHead>id</TableHead>
//                       </TableRow>
//                     </TableHeader>
//                     <TableBody>
//                       {getFilteredData().map((server: any) => (
//                         <TableRow key={server.id}>
//                           <TableCell className="font-medium">{server.server_name}</TableCell>
//                           <TableCell>{server.server_cpu}</TableCell>
//                           <TableCell>{server.server_memory_in_gb}</TableCell>
//                           <TableCell>{server.location_id}</TableCell>
//                           <TableCell>{server.os_id}</TableCell>
//                           <TableCell>{server.type_id}</TableCell>
//                           <TableCell>{server.category_id}</TableCell>
//                           <TableCell>{server.environment_id}</TableCell>
//                           <TableCell>
//                             <Badge variant={server.peak_memory_usage > 80 ? 'destructive' : 'default'}>
//                               {server.peak_memory_usage}%
//                             </Badge>
//                           </TableCell>
//                           <TableCell>
//                             <Badge variant={server.peak_cpu_usage > 80 ? 'destructive' : 'default'}>
//                               {server.peak_cpu_usage}%
//                             </Badge>
//                           </TableCell>
//                           <TableCell>{server.id}</TableCell>
//                         </TableRow>
//                       ))}
//                     </TableBody>
//                   </Table>
//                 </div>
//               </CardContent>
//             </Card>
//           </>
//         )}

//         {activeTab === 'categories' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Categories (Last {categories.length} Entries)</CardTitle>
//               <p className="text-sm text-gray-600">View-only access to category data</p>
//             </CardHeader>
//             <CardContent>
//               {/* Search */}
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search categories..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Categories Table */}
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50">
//                       <TableHead>category_name</TableHead>
//                       <TableHead>category_id</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {getFilteredData().map((category: any) => (
//                       <TableRow key={category.id}>
//                         <TableCell className="font-medium">{category.category_name}</TableCell>
//                         <TableCell>{category.id}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 'types' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Types (Last {types.length} Entries)</CardTitle>
//               <p className="text-sm text-gray-600">View-only access to type data</p>
//             </CardHeader>
//             <CardContent>
//               {/* Search */}
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search types..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Types Table */}
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50">
//                       <TableHead>type_name</TableHead>
//                       <TableHead>type_id</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {getFilteredData().map((type: any) => (
//                       <TableRow key={type.id}>
//                         <TableCell className="font-medium">{type.type_name}</TableCell>
//                         <TableCell>{type.id}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 'os' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">OS (Last {osData.length} Entries)</CardTitle>
//               <p className="text-sm text-gray-600">View-only access to OS data</p>
//             </CardHeader>
//             <CardContent>
//               {/* Search */}
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search OS..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* OS Table */}
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50">
//                       <TableHead>os_name</TableHead>
//                       <TableHead>os_version</TableHead>
//                       <TableHead>os_id</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {getFilteredData().map((os: any) => (
//                       <TableRow key={os.id}>
//                         <TableCell className="font-medium">{os.os_name}</TableCell>
//                         <TableCell>{os.os_version}</TableCell>
//                         <TableCell>{os.id}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 'environments' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Environments (Last {environments.length} Entries)</CardTitle>
//               <p className="text-sm text-gray-600">View-only access to environment data</p>
//             </CardHeader>
//             <CardContent>
//               {/* Search */}
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search environments..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Environments Table */}
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50">
//                       <TableHead>environment_name</TableHead>
//                       <TableHead>environment_id</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {getFilteredData().map((environment: any) => (
//                       <TableRow key={environment.id}>
//                         <TableCell className="font-medium">{environment.environment_name}</TableCell>
//                         <TableCell>{environment.id}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {activeTab === 'locations' && (
//           <Card>
//             <CardHeader>
//               <CardTitle className="text-xl">Locations (Last {locations.length} Entries)</CardTitle>
//               <p className="text-sm text-gray-600">View-only access to location data</p>
//             </CardHeader>
//             <CardContent>
//               {/* Search */}
//               <div className="relative mb-6">
//                 <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
//                 <Input
//                   placeholder="Search locations..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>

//               {/* Locations Table */}
//               <div className="rounded-md border">
//                 <Table>
//                   <TableHeader>
//                     <TableRow className="bg-green-50">
//                       <TableHead>location_name</TableHead>
//                       <TableHead>location_city</TableHead>
//                       <TableHead>location_id</TableHead>
//                     </TableRow>
//                   </TableHeader>
//                   <TableBody>
//                     {getFilteredData().map((location: any) => (
//                       <TableRow key={location.id}>
//                         <TableCell className="font-medium">{location.location_name}</TableCell>
//                         <TableCell>{location.location_city}</TableCell>
//                         <TableCell>{location.id}</TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//       </div>
//     </div>
//   );
// }






'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table';
import {
  Users, Shield, LogOut, Search, Server, Folder, Settings, Monitor, Globe, MapPin
} from 'lucide-react';
import ServerTable from '@/components/admin/ServerTable';

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

export default function UserDashboard() {
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [servers, setServers] = useState<ServerData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [types, setTypes] = useState<Type[]>([]);
  const [osData, setOSData] = useState<OS[]>([]);
  const [environments, setEnvironments] = useState<Environment[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeTab, setActiveTab] = useState<'servers' | 'categories' | 'types' | 'os' | 'environments' | 'locations'>('servers');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const authData = localStorage.getItem('auth');
    if (!authData) {
      console.error('No auth data found in localStorage');
      router.push('/');
      return;
    }

    let user, token;
    try {
      const parsedData = JSON.parse(authData);
      user = parsedData.user;
      token = parsedData.token;
    } catch (err) {
      console.error('Error parsing auth data:', err);
      router.push('/');
      return;
    }

    if (!user || user.role !== 'ROLE_USER') {
      console.error('User is not a regular user or user data is missing:', user);
      router.push('/');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp * 1000;
      if (Date.now() > exp) {
        console.error('Token expired');
        localStorage.removeItem('auth');
        router.push('/');
        return;
      }
    } catch (err) {
      console.error('Invalid token:', err);
      router.push('/');
      return;
    }

    setCurrentUser({ id: String(user.id), username: user.username, role: 'user' });

    const fetchData = async () => {
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };

      // Fetch Servers
      try {
        const serversResponse = await fetch('http://localhost:8080/api/server', { headers });
        if (!serversResponse.ok) throw new Error('Failed to fetch servers: ' + serversResponse.status);
        const serversData = await serversResponse.json();
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
          environment: s.environment || null
        }));
        setServers(mappedServers);
      } catch (err: any) {
        console.error('Error fetching servers:', err);
        alert('Failed to fetch servers: ' + err.message);
      }

      // Fetch Categories
      try {
        const categoriesResponse = await fetch('http://localhost:8080/api/category', { headers });
        if (!categoriesResponse.ok) throw new Error('Failed to fetch categories: ' + categoriesResponse.status);
        const categoriesData = await categoriesResponse.json();
        const mappedCategories: Category[] = categoriesData.map((c: any) => ({
          id: c.id,
          categoryName: c.categoryName
        }));
        setCategories(mappedCategories);
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        alert('Failed to fetch categories: ' + err.message);
      }

      // Fetch Types
      try {
        const typesResponse = await fetch('http://localhost:8080/api/type', { headers });
        if (!typesResponse.ok) throw new Error('Failed to fetch types: ' + typesResponse.status);
        const typesData = await typesResponse.json();
        const mappedTypes: Type[] = typesData.map((t: any) => ({
          id: t.id,
          typeName: t.typeName
        }));
        setTypes(mappedTypes);
      } catch (err: any) {
        console.error('Error fetching types:', err);
        alert('Failed to fetch types: ' + err.message);
      }

      // Fetch OS
      try {
        const osResponse = await fetch('http://localhost:8080/api/os', { headers });
        if (!osResponse.ok) throw new Error('Failed to fetch OS: ' + osResponse.status);
        const osData = await osResponse.json();
        const mappedOS: OS[] = osData.map((o: any) => ({
          id: o.osId,
          osName: o.osName,
          osVersion: o.osVersion
        }));
        setOSData(mappedOS);
      } catch (err: any) {
        console.error('Error fetching OS:', err);
        alert('Failed to fetch OS: ' + err.message);
      }

      // Fetch Environments
      try {
        const environmentsResponse = await fetch('http://localhost:8080/api/environment', { headers });
        if (!environmentsResponse.ok) throw new Error('Failed to fetch environments: ' + environmentsResponse.status);
        const environmentsData = await environmentsResponse.json();
        const mappedEnvironments: Environment[] = environmentsData.map((e: any) => ({
          id: e.id,
          environmentName: e.environmentName
        }));
        setEnvironments(mappedEnvironments);
      } catch (err: any) {
        console.error('Error fetching environments:', err);
        alert('Failed to fetch environments: ' + err.message);
      }

      // Fetch Locations
      try {
        const locationsResponse = await fetch('http://localhost:8080/api/location', { headers });
        if (!locationsResponse.ok) throw new Error('Failed to fetch locations: ' + locationsResponse.status);
        const locationsData = await locationsResponse.json();
        const mappedLocations: Location[] = locationsData.map((l: any) => ({
          id: l.id,
          locationName: l.locationName,
          locationCity: l.locationCity
        }));
        setLocations(mappedLocations);
      } catch (err: any) {
        console.error('Error fetching locations:', err);
        alert('Failed to fetch locations: ' + err.message);
      }
    };

    fetchData();
  }, [router]);

  // Filter functions
  const getFilteredData = () => {
    switch (activeTab) {
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

  if (!currentUser) return null;

  const tabs = [
    { id: 'servers', label: 'Servers', icon: Server },
    { id: 'categories', label: 'Categories', icon: Folder },
    { id: 'types', label: 'Types', icon: Settings },
    { id: 'os', label: 'OS', icon: Monitor },
    { id: 'environments', label: 'Environments', icon: Globe },
    { id: 'locations', label: 'Locations', icon: MapPin }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">User Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {currentUser.username}</span>
              <Button
                variant="outline"
                onClick={() => {
                  localStorage.removeItem('auth');
                  router.push('/');
                }}
                className="flex items-center space-x-2"
              >
                <LogOut className="h-4 w-4" />
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
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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
        {activeTab === 'servers' && (
          <ServerTable
            servers={getFilteredData() as ServerData[]}
            locations={locations}
            osData={osData}
            types={types}
            categories={categories}
            environments={environments}
            setEditingServer={() => {}} // No edit functionality
            handleDeleteServer={() => {}} // No delete functionality
            setShowCreateServer={() => {}} // No create functionality
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            isUserView={true} // Pass flag to ServerTable to hide edit/delete/create buttons
          />
        )}

        {activeTab === 'categories' && (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Categories (Last {categories.length} Entries)</CardTitle>
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
                  />
                </div>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Category ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((category: any) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.categoryName}</TableCell>
                        <TableCell>{category.id}</TableCell>
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
              <CardTitle className="text-xl">Types (Last {types.length} Entries)</CardTitle>
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
                  />
                </div>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type Name</TableHead>
                      <TableHead>Type ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((type: any) => (
                      <TableRow key={type.id}>
                        <TableCell className="font-medium">{type.typeName}</TableCell>
                        <TableCell>{type.id}</TableCell>
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
              <CardTitle className="text-xl">OS (Last {osData.length} Entries)</CardTitle>
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
                  />
                </div>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((os: any) => (
                      <TableRow key={os.id}>
                        <TableCell className="font-medium">{os.osName}</TableCell>
                        <TableCell>{os.osVersion}</TableCell>
                        <TableCell>{os.id}</TableCell>
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
              <CardTitle className="text-xl">Environments (Last {environments.length} Entries)</CardTitle>
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
                  />
                </div>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
                  Clear
                </Button>
              </div>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Environment Name</TableHead>
                      <TableHead>Environment ID</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((environment: any) => (
                      <TableRow key={environment.id}>
                        <TableCell className="font-medium">{environment.environmentName}</TableCell>
                        <TableCell>{environment.id}</TableCell>
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
              <CardTitle className="text-xl">Locations (Last {locations.length} Entries)</CardTitle>
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
                  />
                </div>
                <Button variant="outline" className="bg-blue-600 text-white hover:bg-blue-700">
                  Search
                </Button>
                <Button variant="outline" onClick={() => setSearchTerm('')}>
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
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {getFilteredData().map((location: any) => (
                      <TableRow key={location.id}>
                        <TableCell className="font-medium">{location.locationName}</TableCell>
                        <TableCell>{location.locationCity}</TableCell>
                        <TableCell>{location.id}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
