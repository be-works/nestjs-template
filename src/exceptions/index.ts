import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode } from 'src/constants/message';

export class AppException extends HttpException {
  constructor(code: ErrorCode, message: string, status: number) {
    super({ errorCode: code, message, statusCode: status }, status);
  }
}

export class AppBadRequestException extends AppException {
  constructor(code: ErrorCode, message?: string) {
    super(code, message, HttpStatus.BAD_REQUEST);
  }
}

export class AppUnAuthorizedException extends AppException {
  constructor(message?: string) {
    super(
      ErrorCode.UNAUTHORIZED,
      message ?? 'Unauthorized',
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export class AppInternalServerError extends AppException {
  constructor(code: ErrorCode, message?: string) {
    super(code, message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
