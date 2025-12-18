
export interface Program {
  id: string;
  name: string;
  host: string;
  time: string;
  days: string;
  description?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  content: string;
  date: string;
  imageUrl?: string;
}

export interface RadioMetadata {
  title: string;
  artist: string;
  isLive: boolean;
}
