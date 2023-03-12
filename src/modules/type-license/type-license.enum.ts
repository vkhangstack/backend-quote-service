export enum STATUS {
  INACTIVE = 1,
  ACTIVE = 2,
}

export enum CODE {
  CREATE_SUCCESS = 'LICENSE_2001',
  UPDATE_SUCCESS = 'LICENSE_2002',
  GET_LIST_SUCCESS = 'LICENSE_2000',
  GET_DETAIL_SUCCESS = 'LICENSE_2000',
  LICENSE_NOT_FOUND = 'LICENSE_4004',
  FAIL = 'LICENSE_4000',
}

export enum MASSAGE {
  CREATE_SUCCESS = 'Create type license successfully',
  UPDATE_SUCCESS = 'Update type license successfully',
  GET_LIST_SUCCESS = 'Get list type license successfully',
  GET_DETAIL_SUCCESS = 'Get type license detail successfully',
  LICENSE_NOT_FOUND = 'Id license wrong',
}
