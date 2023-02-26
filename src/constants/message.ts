export enum ErrorCode {
  USER_NOT_FOUND,
  UNAUTHORIZED,
  VALIDATION_ERROR,
  USER_IS_EXIST,
}

export const Messages = {
  [ErrorCode.USER_IS_EXIST]: 'username is exist',
};
