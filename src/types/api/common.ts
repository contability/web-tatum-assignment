export interface StandardResponse<T> {
  success: boolean;
  httpStatusCode: number;
  result: T;
  message?: string;
}

export interface ErrorResponse {
  url?: string;
  status: number;
  message: string;
  error: string;
}
