export interface PaginationResults<T> {
  data: T[][];
  headers: string[];
  count: number;
  currentPage: number;
  nextPage: number | null;
  prevPage: number | null;
  lastPage: number;
}
