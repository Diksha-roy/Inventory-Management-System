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

// interface Category {
//   id: number;
//   category_name: string;
// }

// interface CategoryEditModalProps {
//   category: Category;
//   onClose: () => void;
//   onSave: (category: Category) => void;
// }

// export default function CategoryEditModal({ category, onClose, onSave }: CategoryEditModalProps) {
//   const [formData, setFormData] = useState<Category>(category);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setFormData(category);
//   }, [category]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       onSave(formData);
//       setLoading(false);
//     }, 500);
//   };

//   const handleChange = (field: keyof Category, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>Edit Category</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="category_name" className="text-right">
//                 Category Name
//               </Label>
//               <Input
//                 id="category_name"
//                 value={formData.category_name}
//                 onChange={(e) => handleChange('category_name', e.target.value)}
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

interface Category {
  id: number;
  categoryName: string;
}

interface Props {
  category: Category;
  onClose: () => void;
  onSave: (updatedCategory: Category) => void;
}

export default function CategoryEditModal({ category, onClose, onSave }: Props) {
  const [categoryName, setCategoryName] = useState(category.categoryName);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate input
      if (!categoryName.trim()) {
        throw new Error('Category name is required');
      }

      // Get auth data from localStorage
      const authData = localStorage.getItem('auth');
      if (!authData) {
        console.error('No auth data found in localStorage');
        throw new Error('Authentication required. Please log in again.');
      }

      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('Auth data retrieved for category update:', { user: auth.user, token: auth.token ? 'Present' : 'Missing' });
      } catch (err) {
        console.error('Failed to parse auth data:', err);
        throw new Error('Invalid authentication data');
      }

      if (!auth.token) {
        console.error('No token found in auth data');
        throw new Error('Authentication token missing');
      }

      // Make API request
      const response = await fetch(`http://localhost:8080/api/category/${category.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryName: categoryName }),
      });

      // Handle response
      if (response.status === 401) {
        console.error('Unauthorized: Invalid or expired token for category update');
        localStorage.removeItem('auth');
        alert('Session expired. Please log in again.');
        router.push('/');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('Update category API error:', response.status, errorData);
        } catch (err) {
          errorData = await response.text();
          console.error('Update category API error (non-JSON):', response.status, errorData);
        }
        throw new Error(`Failed to update category: ${errorData.message || response.statusText}`);
      }

      const updatedCategory = { id: category.id, categoryName: categoryName };
      console.log('Category updated successfully:', updatedCategory);

      // Call onSave with updated category
      onSave(updatedCategory);
      alert('Category updated successfully');
      setCategoryName('');
      onClose();
    } catch (err: any) {
      console.error('Error updating category:', err.message);
      setError(err.message || 'Failed to update category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogDescription>
            Update the category name below and save your changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="categoryName">Category Name</Label>
            <Input
              id="categoryName"
              type="text"
              placeholder="Enter category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && <p className="text-red-600">{error}</p>}
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
