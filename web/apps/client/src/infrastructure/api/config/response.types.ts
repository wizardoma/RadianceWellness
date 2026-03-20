export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export class ResponseEntity<T> {
  readonly isError: boolean;
  readonly data: T | null;
  readonly isConnectionTimeout: boolean;
  readonly pagination?: Pagination;
  readonly isSocket: boolean;
  readonly errorMessage: string | null;
  readonly fieldErrors: Record<string, string>;
  readonly statusCode: number;

  constructor({
    isError,
    data,
    errorMessage,
    statusCode = 200,
    pagination,
    fieldErrors = {},
    isConnectionTimeout = false,
    isSocket = false,
  }: {
    isError: boolean;
    data: T | null;
    errorMessage: string | null;
    statusCode?: number;
    pagination?: Pagination;
    fieldErrors?: Record<string, string>;
    isConnectionTimeout?: boolean;
    isSocket?: boolean;
  }) {
    this.isError = isError;
    this.data = data;
    this.errorMessage = errorMessage;
    this.statusCode = statusCode;
    this.pagination = pagination;
    this.fieldErrors = fieldErrors;
    this.isConnectionTimeout = isConnectionTimeout;
    this.isSocket = isSocket;
  }

  static Socket<T>(): ResponseEntity<T> {
    return new ResponseEntity<T>({
      isError: true,
      data: null,
      isSocket: true,
      errorMessage: "Please check your internet connection",
    });
  }

  static Timeout<T>(): ResponseEntity<T> {
    return new ResponseEntity<T>({
      isError: true,
      data: null,
      errorMessage:
        "Connection timeout, please check your network and try again",
      isConnectionTimeout: true,
    });
  }

  static Error<T>(
    errors: string,
    {
      fieldErrors = {},
      statusCode = 400,
    }: {
      fieldErrors?: Record<string, string>;
      statusCode?: number;
    } = {}
  ): ResponseEntity<T> {
    return new ResponseEntity<T>({
      isError: true,
      fieldErrors,
      statusCode,
      data: null,
      errorMessage: errors,
    });
  }

  static Data<T>(data: T, pagination?: Pagination): ResponseEntity<T> {
    return new ResponseEntity<T>({
      isError: false,
      data,
      errorMessage: null,
      pagination,
    });
  }
}
