export const COGNITO_ERRORS = {
  USER_NOT_FOUND: 'UserNotFoundException',
  LIMIT_EXCEEDED: 'LimitExceededException',
}

export const parseCognitoErrors = (error: Error) => {
  if (error.name === COGNITO_ERRORS.USER_NOT_FOUND) {
    return {
      message: 'Email is wrong or not found.',
      type: COGNITO_ERRORS.USER_NOT_FOUND,
    }
  }

  if (error.name === COGNITO_ERRORS.LIMIT_EXCEEDED) {
    return {
      message: 'Limit exceeded. Please try again later.',
      type: COGNITO_ERRORS.LIMIT_EXCEEDED,
    }
  }

  return {
    message: 'An unexpected error occurred. Please try again.',
    type: 'Unexpected',
  }
}
