export type ResponseAPI<T = any> = {
  code: number;
  message: string;
  data: T;
  traceId: string;
};
