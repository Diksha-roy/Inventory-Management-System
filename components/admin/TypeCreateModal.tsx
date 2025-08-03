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

// interface Type {
//   id: number;
//   type_name: string;
// }

// interface TypeCreateModalProps {
//   onClose: () => void;
//   onSave: (type: Type) => void;
// }

// export default function TypeCreateModal({ onClose, onSave }: TypeCreateModalProps) {
//   const [formData, setFormData] = useState({
//     type_name: ''
//   });
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       const newType: Type = {
//         id: Date.now(),
//         type_name: formData.type_name
//       };
//       onSave(newType);
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
//           <DialogTitle>Add New Type</DialogTitle>
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
//               {loading ? 'Adding...' : 'Add Type'}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// }





'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';

interface Type {
  id: number;
  typeName: string;
}

interface TypeCreateModalProps {
  onClose: () => void;
  onSave: (type: Type) => void;
}

export default function TypeCreateModal({ onClose, onSave }: TypeCreateModalProps) {
  const [formData, setFormData] = useState({
    typeName: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
       const user = localStorage.getItem('auth');
      const token = JSON.parse(user||"").token; 
      if (!token) {
        alert('Token not found in localStorage.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/type', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          typeName: formData.typeName
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to create type.');
      }

      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error: any) {
      console.error('Create Type Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (value: string) => {
    setFormData({ typeName: value });
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Type</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type_name" className="text-right">
                Type Name
              </Label>
              <Input
                id="type_name"
                value={formData.typeName}
                onChange={(e) => handleChange(e.target.value)}
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
              {loading ? 'Adding...' : 'Add Type'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
