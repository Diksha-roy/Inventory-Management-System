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

// interface ServerEditModalProps {
//   server: ServerData;
//   onClose: () => void;
//   onSave: (server: ServerData) => void;
// }

// export default function ServerEditModal({ server, onClose, onSave }: ServerEditModalProps) {
//   const [formData, setFormData] = useState<ServerData>(server);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setFormData(server);
//   }, [server]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);

//     // Simulate API call
//     setTimeout(() => {
//       onSave(formData);
//       setLoading(false);
//     }, 500);
//   };

//   const handleChange = (field: keyof ServerData, value: string | number) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: typeof value === 'string' && !isNaN(Number(value)) ? Number(value) : value
//     }));
//   };

//   return (
//     <Dialog open={true} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[600px]">
//         <DialogHeader>
//           <DialogTitle>Edit Server</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4 max-h-96 overflow-y-auto">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="server_name" className="text-right">
//                 Server Name
//               </Label>
//               <Input
//                 id="server_name"
//                 value={formData.server_name}
//                 onChange={(e) => handleChange('server_name', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="server_cpu" className="text-right">
//                 CPU Cores
//               </Label>
//               <Input
//                 id="server_cpu"
//                 type="number"
//                 value={formData.server_cpu}
//                 onChange={(e) => handleChange('server_cpu', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="server_memory_in_gb" className="text-right">
//                 Memory (GB)
//               </Label>
//               <Input
//                 id="server_memory_in_gb"
//                 type="number"
//                 value={formData.server_memory_in_gb}
//                 onChange={(e) => handleChange('server_memory_in_gb', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="location_id" className="text-right">
//                 Location ID
//               </Label>
//               <Input
//                 id="location_id"
//                 type="number"
//                 value={formData.location_id}
//                 onChange={(e) => handleChange('location_id', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="os_id" className="text-right">
//                 OS ID
//               </Label>
//               <Input
//                 id="os_id"
//                 type="number"
//                 value={formData.os_id}
//                 onChange={(e) => handleChange('os_id', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="type_id" className="text-right">
//                 Type ID
//               </Label>
//               <Input
//                 id="type_id"
//                 type="number"
//                 value={formData.type_id}
//                 onChange={(e) => handleChange('type_id', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="category_id" className="text-right">
//                 Category ID
//               </Label>
//               <Input
//                 id="category_id"
//                 type="number"
//                 value={formData.category_id}
//                 onChange={(e) => handleChange('category_id', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="environment_id" className="text-right">
//                 Environment ID
//               </Label>
//               <Input
//                 id="environment_id"
//                 type="number"
//                 value={formData.environment_id}
//                 onChange={(e) => handleChange('environment_id', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="peak_memory_usage" className="text-right">
//                 Peak Memory Usage
//               </Label>
//               <Input
//                 id="peak_memory_usage"
//                 type="number"
//                 step="0.01"
//                 value={formData.peak_memory_usage}
//                 onChange={(e) => handleChange('peak_memory_usage', e.target.value)}
//                 className="col-span-3"
//                 required
//               />
//             </div>
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="peak_cpu_usage" className="text-right">
//                 Peak CPU Usage
//               </Label>
//               <Input
//                 id="peak_cpu_usage"
//                 type="number"
//                 step="0.01"
//                 value={formData.peak_cpu_usage}
//                 onChange={(e) => handleChange('peak_cpu_usage', e.target.value)}
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ServerData, OS, Type, Category, Environment, Location } from '@/types';

interface ServerEditModalProps {
  server: ServerData;
  locations: Location[];
  osData: OS[];
  types: Type[];
  categories: Category[];
  environments: Environment[];
  onClose: () => void;
  onSave: (updatedServer: ServerData) => void;
}

export default function ServerEditModal({
  server,
  locations,
  osData,
  types,
  categories,
  environments,
  onClose,
  onSave,
}: ServerEditModalProps) {
  const [formData, setFormData] = useState<ServerData>({
    id: server.id,
    serverName: server.serverName || '',
    serverCpu: server.serverCpu || 0,
    serverMemoryInGb: server.serverMemoryInGb || 0,
    peakCpuUsage: server.peakCpuUsage || '',
    peakMemoryUsage: server.peakMemoryUsage || '',
    location: server.location || null,
    os: server.os || null,
    type: server.type || null,
    category: server.category || null,
    environment: server.environment || null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validate form data
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.serverName.trim()) newErrors.serverName = 'Server name is required';
    if (formData.serverCpu <= 0) newErrors.serverCpu = 'CPU cores must be greater than 0';
    if (formData.serverMemoryInGb <= 0) newErrors.serverMemoryInGb = 'Memory must be greater than 0';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.os) newErrors.os = 'OS is required';
    if (!formData.type) newErrors.type = 'Type is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.environment) newErrors.environment = 'Environment is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleInputChange = (field: keyof ServerData, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Server</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serverName" className="text-right">Server Name</Label>
            <div className="col-span-3">
              <Input
                id="serverName"
                value={formData.serverName}
                onChange={(e) => handleInputChange('serverName', e.target.value)}
                className={errors.serverName ? 'border-red-500' : ''}
              />
              {errors.serverName && <p className="text-red-500 text-sm mt-1">{errors.serverName}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serverCpu" className="text-right">CPU (Cores)</Label>
            <div className="col-span-3">
              <Input
                id="serverCpu"
                type="number"
                value={formData.serverCpu}
                onChange={(e) => handleInputChange('serverCpu', parseInt(e.target.value))}
                className={errors.serverCpu ? 'border-red-500' : ''}
              />
              {errors.serverCpu && <p className="text-red-500 text-sm mt-1">{errors.serverCpu}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="serverMemoryInGb" className="text-right">Memory (GB)</Label>
            <div className="col-span-3">
              <Input
                id="serverMemoryInGb"
                type="number"
                value={formData.serverMemoryInGb}
                onChange={(e) => handleInputChange('serverMemoryInGb', parseInt(e.target.value))}
                className={errors.serverMemoryInGb ? 'border-red-500' : ''}
              />
              {errors.serverMemoryInGb && <p className="text-red-500 text-sm mt-1">{errors.serverMemoryInGb}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="location" className="text-right">Location</Label>
            <div className="col-span-3">
              <Select
                value={formData.location?.id.toString()}
                onValueChange={(value) => {
                  const selectedLocation = locations.find(loc => loc.id === parseInt(value));
                  handleInputChange('location', selectedLocation || null);
                }}
              >
                <SelectTrigger className={errors.location ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map(loc => (
                    <SelectItem key={loc.id} value={loc.id.toString()}>
                      {loc.locationName}, {loc.locationCity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="os" className="text-right">OS</Label>
            <div className="col-span-3">
              <Select
                value={formData.os?.osId.toString()}
                onValueChange={(value) => {
                  const selectedOS = osData.find(os => os.id === parseInt(value));
                  handleInputChange('os', selectedOS || null);
                }}
              >
                <SelectTrigger className={errors.os ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select OS" />
                </SelectTrigger>
                <SelectContent>
                  {osData.map(os => (
                    <SelectItem key={os.id} value={os.id.toString()}>
                      {os.osName} {os.osVersion}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.os && <p className="text-red-500 text-sm mt-1">{errors.os}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right">Type</Label>
            <div className="col-span-3">
              <Select
                value={formData.type?.id.toString()}
                onValueChange={(value) => {
                  const selectedType = types.find(type => type.id === parseInt(value));
                  handleInputChange('type', selectedType || null);
                }}
              >
                <SelectTrigger className={errors.type ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {types.map(type => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.typeName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.type && <p className="text-red-500 text-sm mt-1">{errors.type}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">Category</Label>
            <div className="col-span-3">
              <Select
                value={formData.category?.id.toString()}
                onValueChange={(value) => {
                  const selectedCategory = categories.find(cat => cat.id === parseInt(value));
                  handleInputChange('category', selectedCategory || null);
                }}
              >
                <SelectTrigger className={errors.category ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.categoryName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="environment" className="text-right">Environment</Label>
            <div className="col-span-3">
              <Select
                value={formData.environment?.id.toString()}
                onValueChange={(value) => {
                  const selectedEnvironment = environments.find(env => env.id === parseInt(value));
                  handleInputChange('environment', selectedEnvironment || null);
                }}
              >
                <SelectTrigger className={errors.environment ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  {environments.map(env => (
                    <SelectItem key={env.id} value={env.id.toString()}>
                      {env.environmentName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.environment && <p className="text-red-500 text-sm mt-1">{errors.environment}</p>}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="peakCpuUsage" className="text-right">Peak CPU Usage (%)</Label>
            <div className="col-span-3">
              <Input
                id="peakCpuUsage"
                value={formData.peakCpuUsage || ''}
                onChange={(e) => handleInputChange('peakCpuUsage', e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="peakMemoryUsage" className="text-right">Peak Memory Usage (%)</Label>
            <div className="col-span-3">
              <Input
                id="peakMemoryUsage"
                value={formData.peakMemoryUsage || ''}
                onChange={(e) => handleInputChange('peakMemoryUsage', e.target.value)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
