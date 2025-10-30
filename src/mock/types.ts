import { IconName } from '@/icons'

export interface User {
  id: number;
  name: string;
  avatar: string;
  date: string;
  title: string;
  post: {
    title: string;
    content: string;
    category: string;
    categoryIcon: IconName;
    stats: {
      comments: number;
      likes: number;
      favorites: number;
      shares: number;
    };
  };
}
