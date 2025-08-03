// 'use client';

// import { useState, useEffect } from 'react';
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

// interface LocationEditModalProps {
//   location: Location;
//   onClose: () => void;
//   onSave: (location: Location) => void;
// }

// export default function LocationEditModal({ location, onClose, onSave }: LocationEditModalProps) {
//   const [formData, setFormData] = useState<Location>(location);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setFormData(location);
//   }, [location]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       onSave(formData);
//       setLoading(false);
//     }, 500);
//   };

//   const handleChange = (field: keyof Location, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Location</DialogTitle>
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
//               {loading ? 'Saving...' : 'Save Changes'}
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
  id: number;
  locationName: string;
  locationCity: string;
}

interface Props {
  location: Location;
  onClose: () => void;
  onSave: (updatedLocation: Location) => void;
}

export default function LocationEditModal({ location, onClose, onSave }: Props) {
  const [locationName, setLocationName] = useState(location.locationName);
  const [locationCity, setLocationCity] = useState(location.locationCity);
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
        console.error('No auth data found in localStorage for location update');
        throw new Error('Authentication required. Please log in again.');
      }

      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('Auth data retrieved for location update:', { user: auth.user, token: auth.token ? 'Present' : 'Missing' });
      } catch (err) {
        console.error('Failed to parse auth data:', err);
        throw new Error('Invalid authentication data');
      }

      if (!auth.token) {
        console.error('No token available for location update');
        throw new Error('Authentication token missing');
      }

      // Make API request
      const response = await fetch(`http://localhost:8080/api/location/${location.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locationName, locationCity }),
      });

      // Handle response
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for location update');
        localStorage.removeItem('auth');
        alert('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('Update location API error:', response.status, errorData);
        } catch (err) {
          errorData = await response.text();
          console.error('Update location API error (non-JSON):', response.status, errorData);
        }
        throw new Error(`Failed to update location: ${errorData.message || response.statusText}`);
      }

      const updatedLocationData = await response.json();
      console.log('Location updated successfully:', updatedLocationData);

      // Use backend response for state update
      const updatedLocation = {
        id: location.id,
        locationName: updatedLocationData.locationName || updatedLocationData.name || locationName, // Fallback to form input if backend response is incomplete
        locationCity: updatedLocationData.locationCity || updatedLocationData.city || locationCity, // Fallback to form input if backend response is incomplete
      };
      onSave(updatedLocation);
      console.log('Updated locations state:', updatedLocation);
      alert('Location updated successfully');
      setLocationName('');
      setLocationCity('');
      onClose();
    } catch (err: any) {
      console.error('Error updating location:', err.message);
      setError(err.message || 'Failed to update location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Edit Location</DialogTitle>
          <DialogDescription>
            Update the location name and city below and click Save to confirm changes.
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
