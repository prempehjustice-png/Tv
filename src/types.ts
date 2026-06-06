export interface Channel {
  id: string;
  name: string;
  category: string;
  country: 'USA' | 'UK' | 'Canada' | 'Ghana' | 'Global';
  url: string;
  logoUrl?: string;
  fallbackTemplate?: boolean;
  programInfo?: string;
}
