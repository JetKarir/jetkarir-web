export interface ApiMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: ApiMeta;
  traceId?: string;
}

export interface ApiError {
  success: false;
  code: string;
  message: string;
  errors?: { field: string; rule: string; message: string }[];
  traceId?: string;
}
