export interface College {
  id: string;
  name: string;
  location: string;
  overview: string;
  courses: string[];
  fees: number;
  placement: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
}

export interface ComparisonData {
  collegeA: College | null;
  collegeB: College | null;
}