'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  username: string;
  role: string;
}

interface Props {
  user: User;
  onClose: () => void;
  onSave: (userId: string) => void;
}

export default function UserAdminModal({ user, onClose, onSave }: Props) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePromote = async () => {
    setError('');
    setLoading(true);

    try {
      // Step 1: Retrieve auth data from localStorage
      const authData = localStorage.getItem('auth');
      console.log('UserAdminModal - Raw authData from localStorage:', authData); // Debug
      if (!authData) {
        setError('No authentication data found. Please log in again.');
        router.push('/login');
        return;
      }

      // Step 2: Parse auth data
      let auth;
      try {
        auth = JSON.parse(authData);
        console.log('UserAdminModal - Parsed auth:', auth); // Debug
      } catch (err) {
        console.error('UserAdminModal - Failed to parse auth data:', err);
        setError('Invalid authentication data. Please log in again.');
        router.push('/login');
        return;
      }

      // Step 3: Validate token
      if (!auth.token) {
        console.error('UserAdminModal - No token found');
        setError('Authentication token missing. Please log in again.');
        router.push('/login');
        return;
      }

      // Step 4: Check token format and expiration
      try {
        const tokenParts = auth.token.split('.');
        if (tokenParts.length !== 3) {
          throw new Error('Invalid JWT format');
        }
        const payload = JSON.parse(atob(tokenParts[1]));
        console.log('UserAdminModal - JWT payload:', payload); // Debug
        const expiry = payload.exp * 1000; // Convert to milliseconds
        const currentTime = Date.now();
        console.log(
          'UserAdminModal - Current time (IST):',
          new Date(currentTime).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          'Token expiry (IST):',
          new Date(expiry).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
        ); // Debug
        if (currentTime > expiry) {
          console.error('UserAdminModal - Token expired');
          localStorage.removeItem('auth');
          setError('Your session has expired. Please log in again.');
          router.push('/login');
          return;
        }
      } catch (err) {
        console.error('UserAdminModal - Invalid JWT token:', err);
        setError('Invalid authentication token. Please log in again.');
        router.push('/login');
        return;
      }

      // Step 5: Verify admin role
      // If server expects 'ADMIN', change to: auth.user?.role !== 'ADMIN'
      if (auth.user?.role !== 'ROLE_ADMIN') {
        console.error('UserAdminModal - User is not ROLE_ADMIN:', auth.user?.role);
        setError('Only admins can promote users.');
        return;
      }

      // Step 6: Make the PATCH request
      console.log('UserAdminModal - Sending PATCH request:', {
        url: `http://localhost:8080/api/user/promote/${user.id}`,
        headers: { Authorization: `Bearer ${auth.token}` },
      }); // Debug
      const response = await fetch(`http://localhost:8080/api/user/promote/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${auth.token}`,
          'Content-Type': 'application/json',
        },
      });

      // Step 7: Handle response
      if (response.status === 401) {
        const responseText = await response.text();
        console.error('UserAdminModal - 401 Unauthorized:', responseText);
        localStorage.removeItem('auth');
        setError('Session expired or invalid token. Please log in again.');
        router.push('/login');
        return;
      }

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
          console.error('UserAdminModal - API error:', response.status, errorData);
          setError(`Failed to promote user: ${errorData.message || response.statusText}`);
        } catch (err) {
          errorData = await response.text();
          console.error('UserAdminModal - API error (non-JSON):', response.status, errorData);
          setError(`Failed to promote user: ${errorData || response.statusText}`);
        }
        return;
      }

      console.log('UserAdminModal - User promoted successfully:', user.id);
      onSave(user.id);
      alert('User promoted to admin successfully');
      onClose();
    } catch (err: any) {
      console.error('UserAdminModal - Error promoting user:', err.message);
      setError(err.message || 'Failed to promote user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent aria-describedby="dialog-description">
        <DialogHeader>
          <DialogTitle>Promote User to Admin</DialogTitle>
          <DialogDescription>Confirm to promote {user.username} to admin role.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            Are you sure you want to promote <strong>{user.username}</strong> to admin?
          </p>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button onClick={handlePromote} disabled={loading}>
              {loading ? 'Promoting...' : 'Promote'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}