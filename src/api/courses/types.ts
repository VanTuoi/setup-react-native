export type Course = {
  id: string;
  name: string;
  image: string;
  price: number;
  description: string;
  status: 'show' | 'hidden';
};

export type CoursesResponse = {
  Courses: Course[];
  total: number;
  skip: number;
  limit: number;
};

export type FilterOption = {
  search?: string;
  sortDirection?: 'asc' | 'desc';
  sortBy?: 'id' | 'name' | 'price';
  categoryId?: string;
  searchFields?: string[];
  [key: string]: any;
};
