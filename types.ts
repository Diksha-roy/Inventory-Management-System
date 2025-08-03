export interface User {
  id: string;
  username: string;
  email: string;
  password?: string;
  role: 'admin' | 'user';
  token?: string;
}

export interface ServerData {
  id: number;
  serverName: string;
  serverCpu: number;
  serverMemoryInGb: number;
  peakCpuUsage: string | null;
  peakMemoryUsage: string | null;
  locationId: number | null;
  osId: number | null;
  typeId: number | null;
  categoryId: number | null;
  environmentId: number | null;
  location: { id: number; locationName: string; locationCity: string } | null;
  os: { id: number; osName: string; osVersion: string } | null;
  type: { id: number; typeName: string } | null;
  category: { id: number; categoryName: string } | null;
  environment: { id: number; environmentName: string } | null;
}

export interface Location {
  id: number;
  locationName: string;
  locationCity: string;
}

export interface OS {
  id: number;
  osName: string;
  osVersion: string;
}

export interface Type {
  id: number;
  typeName: string;
}

export interface Category {
  id: number;
  categoryName: string;
}

export interface Environment {
  id: number;
  environmentName: string;
}