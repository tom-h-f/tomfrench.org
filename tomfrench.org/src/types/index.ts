/**
 * Common types used throughout the application
 */

// Navigation types
export interface NavItem {
  href: string;
  label: string;
}

// Post types
export interface Post {
  title: string;
  slug: string;
  date: string;
  excerpt?: string;
  content?: string;
  tags?: string[];
}

// Note types
export interface Note {
  id: string;
  title: string;
  content: string;
  path: string;
  lastModified: string;
}

// File types for uploads
export interface FileItem {
  name: string;
  size: number;
  type: string;
  url: string;
  uploadedAt: string;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system';

// Common component props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// API Response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
