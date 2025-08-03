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
  DialogFooter 
} from '@/components/ui/dialog';

interface OS {
  id: number;
  os_name: string;
  os_version: string;
}

interface OSEditModalProps {
  os: OS;
  onClose: () => void;
  onSave: (os: OS) => void;
}

export default function OSEditModal({ os, onClose, onSave }: OSEditModalProps) {
  const [formData, setFormData] = useState<OS>(os);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormData(os);
  }, [os]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      onSave(formData);
      setLoading(false);
    }, 500);
  };

  const handleChange = (field: keyof OS, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit OS</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="os_name" className="text-right">
                OS Name
              </Label>
              <Input
                id="os_name"
                value={formData.os_name}
                onChange={(e) => handleChange('os_name', e.target.value)}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="os_version" className="text-right">
                OS Version
              </Label>
              <Input
                id="os_version"
                value={formData.os_version}
                onChange={(e) => handleChange('os_version', e.target.value)}
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