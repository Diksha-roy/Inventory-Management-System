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

// interface OS {
//   id: number;
//   os_name: string;
//   os_version: string;
// }

// interface OSCreateModalProps {
//   onClose: () => void;
//   onSave: (os: OS) => void;
// }

// export default function OSCreateModal({ onClose, onSave }: OSCreateModalProps) {
//   const [formData, setFormData] = useState({
//     os_name: '',
//     os_version: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       const newOS: OS = {
//         id: Date.now(),
//         os_name: formData.os_name,
//         os_version: formData.os_version
//       };
//       onSave(newOS);
//       setLoading(false);
//     }, 500);
//   };

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
//           <DialogTitle>Add New OS</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_name" className="text-right">
//                 OS Name
//               </Label>
//               <Input
//                 id="os_name"
//                 value={formData.os_name}
//                 onChange={(e) => handleChange('os_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_version" className="text-right">
//                 OS Version
//               </Label>
//               <Input
//                 id="os_version"
//                 value={formData.os_version}
//                 onChange={(e) => handleChange('os_version', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
//               {loading ? 'Adding...' : 'Add OS'}
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
//   DialogFooter 
// } from '@/components/ui/dialog';

// interface OS {
//   id: number;
//   os_name: string;
//   os_version: string;
// }

// interface OSCreateModalProps {
//   onClose: () => void;
//   onSave: (os: OS) => void;
// }

// export default function OSCreateModal({ onClose, onSave }: OSCreateModalProps) {
//   const [formData, setFormData] = useState({
//     os_name: '',
//     os_version: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch('http://localhost:8080/api/os', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with actual token logic if different
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Failed to create OS');
//       }

//       const newOS = await response.json();
//       onSave(newOS);
//       onClose();
//     } catch (error) {
//       console.error('Error creating OS:', error);
//       alert('Failed to add OS. Please check console or token.');
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           <DialogTitle>Add New OS</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_name" className="text-right">
//                 OS Name
//               </Label>
//               <Input
//                 id="os_name"
//                 value={formData.os_name}
//                 onChange={(e) => handleChange('os_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_version" className="text-right">
//                 OS Version
//               </Label>
//               <Input
//                 id="os_version"
//                 value={formData.os_version}
//                 onChange={(e) => handleChange('os_version', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
//               {loading ? 'Adding...' : 'Add OS'}
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
//   DialogFooter
// } from '@/components/ui/dialog';

// interface OS {
//   id: number;
//   os_name: string;
//   os_version: string;
// }

// interface OSCreateModalProps {
//   onClose: () => void;
//   onSave: (os: OS) => void;
// }

// export default function OSCreateModal({ onClose, onSave }: OSCreateModalProps) {
//   const [formData, setFormData] = useState({
//     os_name: '',
//     os_version: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:8080/api/os', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${localStorage.getItem('token')}` // Make sure token is stored
//         },
//         body: JSON.stringify({
//           osName: formData.os_name,
//           osVersion: formData.os_version
//         })
//       });

//       if (!res.ok) {
//         throw new Error('Failed to add OS');
//       }

//       const data = await res.json();
//       onSave(data); // backend se returned OS pass karo
//       setFormData({ os_name: '', os_version: '' });
//       onClose();
//     } catch (error) {
//       console.error('Error:', error);
//       alert('Failed to add OS. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           <DialogTitle>Add New OS</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_name" className="text-right">
//                 OS Name
//               </Label>
//               <Input
//                 id="os_name"
//                 value={formData.os_name}
//                 onChange={(e) => handleChange('os_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_version" className="text-right">
//                 OS Version
//               </Label>
//               <Input
//                 id="os_version"
//                 value={formData.os_version}
//                 onChange={(e) => handleChange('os_version', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
//               {loading ? 'Adding...' : 'Add OS'}
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
//   DialogFooter
// } from '@/components/ui/dialog';

// interface OS {
//   id: number;
//   os_name: string;
//   os_version: string;
// }

// interface OSCreateModalProps {
//   onClose: () => void;
//   onSave: (os: OS) => void;
// }

// export default function OSCreateModal({ onClose, onSave }: OSCreateModalProps) {
//   const [formData, setFormData] = useState({
//     os_name: '',
//     os_version: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     const token = localStorage.getItem('token');
//     if (!token) {
//       alert('Token missing. Please login again.');
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch('http://localhost:8080/api/os', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           os_name: formData.os_name,
//           os_version: formData.os_version
//         })
//       });

//       if (!res.ok) {
//         const errorData = await res.json();
//         throw new Error(errorData.message || 'Failed to add OS');
//       }

//       const data = await res.json();
//       onSave(data); // pass new OS to parent
//       setFormData({ os_name: '', os_version: '' });
//       onClose();
//     } catch (error: any) {
//       console.error('Error:', error);
//       alert(error.message || 'Something went wrong. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleChange = (field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={() => {
//       setFormData({ os_name: '', os_version: '' });
//       onClose();
//     }}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Add New OS</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_name" className="text-right">
//                 OS Name
//               </Label>
//               <Input
//                 id="os_name"
//                 value={formData.os_name}
//                 onChange={(e) => handleChange('os_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_version" className="text-right">
//                 OS Version
//               </Label>
//               <Input
//                 id="os_version"
//                 value={formData.os_version}
//                 onChange={(e) => handleChange('os_version', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="button" variant="outline" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
//               {loading ? 'Adding...' : 'Add OS'}
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface OS {
  id?: number;
  osName: string;
  osVersion: string;
}

interface Props {
  onClose: () => void;
  onSave: (newOS: OS) => void;
}

export default function OSCreateModal({ onClose, onSave }: Props) {
  const [osName, setOsName] = useState('');
  const [osVersion, setOsVersion] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input
      if (!osName.trim() || !osVersion.trim()) {
        throw new Error('OS name and version are required');
      }

      // Get auth data from localStorage
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.error('No auth data found in localStorage for OS creation');
        throw new Error('Authentication required. Please log in again.');
      }

      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('Auth data retrieved for OS creation:', { user: auth.user, token: auth.token ? 'Present' : 'Missing' });
      } catch (err) {
        console.error('Failed to parse auth data:', err);
        throw new Error('Invalid authentication data');
      }

      if (!auth.token) {
        console.error('No token available for OS creation');
        throw new Error('Authentication token missing');
      }

      // Make API request
      const response = await fetch('http://localhost:8080/api/os', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ osName, osVersion }),
      });

      // Handle response
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for OS creation');
        localStorage.removeItem('auth');
        alert('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('Create OS API error:', response.status, errorData);
        } catch (err) {
          errorData = await response.text();
          console.error('Create OS API error (non-JSON):', response.status, errorData);
        }
        throw new Error(`Failed to create OS: ${errorData.message || response.statusText}`);
      }

      const createdOS = await response.json();
      console.log('OS created successfully:', createdOS);

      // Call onSave with new OS
      onSave({ id: createdOS.osId || createdOS.id, osName: createdOS.osName, osVersion: createdOS.osVersion });
      alert('OS created successfully');
      setOsName('');
      setOsVersion('');
      onClose();
    } catch (err: any) {
      console.error('Error creating OS:', err.message);
      setError(err.message || 'Failed to create OS. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Create Operating System</DialogTitle>
          <DialogDescription>
            Enter the OS name and version below and click Save to create a new operating system.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="osName">OS Name</Label>
            <Input
              id="osName"
              type="text"
              placeholder="Enter OS name"
              value={osName}
              onChange={(e) => setOsName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="osVersion">OS Version</Label>
            <Input
              id="osVersion"
              type="text"
              placeholder="Enter OS version"
              value={osVersion}
              onChange={(e) => setOsVersion(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
