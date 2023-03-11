import { BooleanFieldOptional, StringField } from '../../../decorators';

export class CreateSettingsDto {
  @BooleanFieldOptional()
  isEmailVerified: boolean;

  @BooleanFieldOptional()
  isPhoneVerified: boolean;

  @StringField()
  isStatus: string;
}
