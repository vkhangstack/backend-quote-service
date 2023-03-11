export enum OtpStatus {
  CREATED = '0',
  PENDING = '1',
  EXPIRED = '2',
  VERIFIED = '3',
}

export enum OtpCode {
  VERIFY_CODE_SUCCESS = 'OTP_2000',
  VERIFY_CODE_FAIL = 'OTP_4000',
}

export enum MessageOtpCode {
  VERIFY_CODE_SUCCESS = 'Verify code success',
  VERIFY_CODE_FAIL = 'Verify code fail by wrong code or expired code',
}

export enum OtpChannel {
  SMS = 'sms',
  EMAIL = 'email',
  CALL = 'call',
}
