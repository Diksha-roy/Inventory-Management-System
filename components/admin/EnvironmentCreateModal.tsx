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

// interface Environment {
//   id: number;
//   environment_name: string;
// }

// interface EnvironmentCreateModalProps {
//   onClose: () => void;
//   onSave: (environment: Environment) => void;
// }

// export default function EnvironmentCreateModal({ onClose, onSave }: EnvironmentCreateModalProps) {
//   const [formData, setFormData] = useState({
//     environment_name: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       const newEnvironment: Environment = {
//         id: Date.now(),
//         environment_name: formData.environment_name
//       };
//       onSave(newEnvironment);
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
//           <DialogTitle>Add New Environment</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="environment_name" className="text-right">
//                 Environment Name
//               </Label>
//               <Input
//                 id="environment_name"
//                 value={formData.environment_name}
//                 onChange={(e) => handleChange('environment_name', e.target.value)}
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
//               {loading ? 'Adding...' : 'Add Environment'}
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

interface Environment {
  id?: number;
  environmentName: string;
}

interface Props {
  onClose: () => void;
  onSave: (newEnvironment: Environment) => void;
}

export default function EnvironmentCreateModal({ onClose, onSave }: Props) {
  const [environmentName, setEnvironmentName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input
      if (!environmentName.trim()) {
        throw new Error('Environment name is required');
      }

      // Get auth data from localStorage
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.error('No auth data found in localStorage for environment creation');
        throw new Error('Authentication required. Please log in again.');
      }

      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('Auth data retrieved for environment creation:', { user: auth.user, token: auth.token ? 'Present' : 'Missing' });
      } catch (err) {
        console.error('Failed to parse auth data:', err);
        throw new Error('Invalid authentication data');
      }

      if (!auth.token) {
        console.error('No token available for environment creation');
        throw new Error('Authentication token missing');
      }

      // Make API request
      const response = await fetch('http://localhost:8080/api/environment', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ environmentName }),
      });

      // Handle response
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for environment creation');
        localStorage.removeItem('auth');
        alert('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('Create environment API error:', response.status, errorData);
        } catch (err) {
          errorData = await response.text();
          console.error('Create environment API error (non-JSON):', response.status, errorData);
        }
        throw new Error(`Failed to create environment: ${errorData.message || response.statusText}`);
      }

      const createdEnvironment = await response.json();
      console.log('Environment created successfully:', createdEnvironment);

      // Call onSave with new environment
      onSave({ id: createdEnvironment.id, environmentName: createdEnvironment.environmentName });
      alert('Environment created successfully');
      setEnvironmentName('');
      onClose();
    } catch (err: any) {
      console.error('Error creating environment:', err.message);
      setError(err.message || 'Failed to create environment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Create Environment</DialogTitle>
          <DialogDescription>
            Enter the environment name below and click Save to create a new environment.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="environmentName">Environment Name</Label>
            <Input
              id="environmentName"
              type="text"
              placeholder="Enter environment name"
              value={environmentName}
              onChange={(e) => setEnvironmentName(e.target.value)}
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
