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

// interface Location {
//   id: number;
//   location_name: string;
//   location_city: string;
// }

// interface LocationCreateModalProps {
//   onClose: () => void;
//   onSave: (location: Location) => void;
// }

// export default function LocationCreateModal({ onClose, onSave }: LocationCreateModalProps) {
//   const [formData, setFormData] = useState({
//     location_name: '',
//     location_city: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       const newLocation: Location = {
//         id: Date.now(),
//         location_name: formData.location_name,
//         location_city: formData.location_city
//       };
//       onSave(newLocation);
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
//           <DialogTitle>Add New Location</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="location_name" className="text-right">
//                 Location Name
//               </Label>
//               <Input
//                 id="location_name"
//                 value={formData.location_name}
//                 onChange={(e) => handleChange('location_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="location_city" className="text-right">
//                 Location City
//               </Label>
//               <Input
//                 id="location_city"
//                 value={formData.location_city}
//                 onChange={(e) => handleChange('location_city', e.target.value)}
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
//               {loading ? 'Adding...' : 'Add Location'}
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

interface Location {
  id?: number;
  locationName: string;
  locationCity: string;
}

interface Props {
  onClose: () => void;
  onSave: (newLocation: Location) => void;
}

export default function LocationCreateModal({ onClose, onSave }: Props) {
  const [locationName, setLocationName] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input
      if (!locationName.trim() || !locationCity.trim()) {
        throw new Error('Location name and city are required');
      }

      // Get auth data from localStorage
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.error('No auth data found in localStorage for location creation');
        throw new Error('Authentication required. Please log in again.');
      }

      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('Auth data retrieved for location creation:', { user: auth.user, token: auth.token ? 'Present' : 'Missing' });
      } catch (err) {
        console.error('Failed to parse auth data:', err);
        throw new Error('Invalid authentication data');
      }

      if (!auth.token) {
        console.error('No token available for location creation');
        throw new Error('Authentication token missing');
      }

      // Make API request
      const response = await fetch('http://localhost:8080/api/location', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationName, locationCity }),
      });

      // Handle response
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for location creation');
        localStorage.removeItem('auth');
        alert('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('Create location API error:', response.status, errorData);
        } catch (err) {
          errorData = await response.text();
          console.error('Create location API error (non-JSON):', response.status, errorData);
        }
        throw new Error(`Failed to create location: ${errorData.message || response.statusText}`);
      }

      const createdLocation = await response.json();
      console.log('Location created successfully:', createdLocation);

      // Call onSave with new location
      onSave({
        id: createdLocation.id || createdLocation.locationId,
        locationName: createdLocation.locationName,
        locationCity: createdLocation.locationCity,
      });
      alert('Location created successfully');
      setLocationName('');
      setLocationCity('');
      onClose();
    } catch (err: any) {
      console.error('Error creating location:', err.message);
      setError(err.message || 'Failed to create location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Create Location</DialogTitle>
          <DialogDescription>
            Enter the location name and city below and click Save to create a new location.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="locationName">Location Name</Label>
            <Input
              id="locationName"
              type="text"
              placeholder="Enter location name"
              value={locationName}
              onChange={(e) => setLocationName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div>
            <Label htmlFor="locationCity">Location City</Label>
            <Input
              id="locationCity"
              type="text"
              placeholder="Enter location city"
              value={locationCity}
              onChange={(e) => setLocationCity(e.target.value)}
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
