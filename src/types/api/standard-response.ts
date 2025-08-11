export interface StandardResponse<T> {
  success: boolean;
  httpStatusCode: number;
  result: T;
  message?: string;
}
