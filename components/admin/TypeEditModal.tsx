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

// interface Type {
//   id: number;
//   type_name: string;
// }

// interface TypeEditModalProps {
//   type: Type;
//   onClose: () => void;
//   onSave: (type: Type) => void;
// }

// export default function TypeEditModal({ type, onClose, onSave }: TypeEditModalProps) {
//   const [formData, setFormData] = useState<Type>(type);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setFormData(type);
//   }, [type]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       onSave(formData);
//       setLoading(false);
//     }, 500);
//   };

//   const handleChange = (field: keyof Type, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Type</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="type_name" className="text-right">
//                 Type Name
//               </Label>
//               <Input
//                 id="type_name"
//                 value={formData.type_name}
//                 onChange={(e) => handleChange('type_name', e.target.value)}
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

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';

interface Type {
  id: number;
  type_name: string;
}

interface TypeEditModalProps {
  type: Type;
  onClose: () => void;
  onSave: (type: Type) => void;
}

export default function TypeEditModal({ type, onClose, onSave }: TypeEditModalProps) {
  const [formData, setFormData] = useState<Type>(type);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(type);
  }, [type]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token'); // assuming token is stored in localStorage
      if (!token) {
        alert('Unauthorized: Token missing');
        return;
      }

      const response = await fetch(`http://localhost:8080/api/type/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ typeName: formData.type_name }),
      });

      if (!response.ok) {
        throw new Error('Failed to update type');
      }

      const updatedType = await response.json();
      onSave(updatedType);
    } catch (error) {
      console.error('Error updating type:', error);
      alert('Error updating type');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Type, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Type</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type_name" className="text-right">
                Type Name
              </Label>
              <Input
                id="type_name"
                value={formData.type_name}
                onChange={(e) => handleChange('type_name', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
