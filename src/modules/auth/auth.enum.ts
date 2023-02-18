export enum AuthEnum {
  CREATE_ADMIN_SUCCESS = 'ADMIN_2001',
  CREATE_ADMIN_FAILURE = 'ADMIN_4000',
  GET_USER_SUCCESS = 'USER_2000',
  CREATE_USER_SUCCESS = 'USER_2001',
  LOGIN_SUCCESS = 'LOGIN_2000',
  LOGIN_FAILURE = 'LOGIN_4000',
  LOGOUT_SUCCESS = 'LOGOUT_2000',
  LOGOUT_FAILURE = 'LOGOUT_4000',
}

export enum MessageAuthEnum {
  LOGIN_SUCCESS = 'Login Success',
  LOGIN_FAILURE = 'Login wrong password or username',
  GET_USER_SUCCESS = 'Get user info success',
  CREATE_USER_SUCCESS = 'Register user successful',
}
