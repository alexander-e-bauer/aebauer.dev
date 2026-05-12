export interface ApiErrorShape {
  message: string;
  status?: number;
  code?: string;
  details?: unknown;
}

export class ApiError extends Error {
  status?: number;
  code?: string;
  details?: unknown;

  constructor(data: ApiErrorShape) {
    super(data.message);
    this.name = 'ApiError';
    this.status = data.status;
    this.code = data.code;
    this.details = data.details;
  }
}