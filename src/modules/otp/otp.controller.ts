import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { Logger } from 'winston';

import type { ResponseDto } from '../../common/dto/response.dto';
import { MessageServerCode, ServerCode } from '../../constants/system.enum';
import { VerifyOtpDto } from './dtos/verify.otp.dto';
import { OtpCode } from './otp.enum';
import { OtpService } from './otp.service';

@Controller('otp')
@ApiTags('otp')
export class OtpController {
  constructor(
    private otpService: OtpService,

    @Inject('winston')
    private loggerService: Logger,
  ) {}

  @Post('/verify')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse()
  async verifyOtp(@Body() otpDto: VerifyOtpDto): Promise<ResponseDto<any> | ResponseDto<string[]>> {
    try {
      this.loggerService.info('verifyOtp called');
      const isOtp = await this.otpService.checkOtp(otpDto);

      if (!isOtp) {
        this.loggerService.error('verifyOtp checkOtp failed');

        return {
          code: OtpCode.VERIFY_CODE_FAIL,
          data: [],
          message: OtpCode.VERIFY_CODE_FAIL,
        };
      }

      return {
        code: OtpCode.VERIFY_CODE_SUCCESS,
        data: [],
        message: OtpCode.VERIFY_CODE_SUCCESS,
      };
    } catch (error) {
      this.loggerService.error('verifyOtp error', error);

      return {
        code: ServerCode.ERROR,
        data: [],
        message: MessageServerCode.ERROR,
      };
    }
  }
}
