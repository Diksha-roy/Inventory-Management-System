
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

interface ServerData {
  id: number;
  server_name: string;
  server_cpu: number;
  server_memory_in_gb: number;
  location_id: number;
  os_id: number;
  type_id: number;
  category_id: number;
  environment_id: number;
  peak_memory_usage: number;
  peak_cpu_usage: number;
}

interface ServerCreateModalProps {
  onClose: () => void;
  onSave: (server: ServerData) => void;
}

export default function ServerCreateModal({ onClose, onSave }: ServerCreateModalProps) {
  const [formData, setFormData] = useState({
    server_name: '',
    server_cpu: '',
    server_memory_in_gb: '',
    location_id: '',
    os_id: '',
    type_id: '',
    category_id: '',
    environment_id: '',
    peak_memory_usage: '',
    peak_cpu_usage: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handle submit called")
    e.preventDefault();
    setLoading(true);

    try {
      console.log("try catch")
      const user = localStorage.getItem('auth');
      const token = JSON.parse(user||"").token; 
    
      if(JSON.parse(user||"").user.role == "ROLE_USER"){
        alert("Only Admin can create server")
        return;
      }
      if (!token) {
        alert('Admin token not found in localStorage.');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:8080/api/server', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serverName: formData.server_name,
          serverCpu: Number(formData.server_cpu),
          serverMemoryInGb: Number(formData.server_memory_in_gb),
          peakMemoryUsage: `${formData.peak_memory_usage}%`,
          peakCpuUsage: `${formData.peak_cpu_usage}%`,
          locationId: Number(formData.location_id),
          osId: Number(formData.os_id),
          typeId: Number(formData.type_id),
          categoryId: Number(formData.category_id),
          environmentId: Number(formData.environment_id)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Failed to add server');
      }

      const data = await response.json();
      onSave(data);
      onClose();
    } catch (error: any) {
      console.error('Add Server Error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Server</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
            {[
              { id: 'server_name', label: 'Server Name' },
              { id: 'server_cpu', label: 'CPU Cores', type: 'number' },
              { id: 'server_memory_in_gb', label: 'Memory (GB)', type: 'number' },
              { id: 'location_id', label: 'Location ID', type: 'number' },
              { id: 'os_id', label: 'OS ID', type: 'number' },
              { id: 'type_id', label: 'Type ID', type: 'number' },
              { id: 'category_id', label: 'Category ID', type: 'number' },
              { id: 'environment_id', label: 'Environment ID', type: 'number' },
              { id: 'peak_memory_usage', label: 'Peak Memory Usage (%)', type: 'number', step: '0.01' },
              { id: 'peak_cpu_usage', label: 'Peak CPU Usage (%)', type: 'number', step: '0.01' }
            ].map(({ id, label, type = 'text', step }) => (
              <div key={id} className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor={id} className="text-right">
                  {label}
                </Label>
                <Input
                  id={id}
                  type={type}
                  step={step}
                  value={(formData as any)[id]}
                  onChange={(e) => handleChange(id, e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700">
              {loading ? 'Adding...' : 'Add Server'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

