import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { validateHash } from '../../common/utils';
import type { RoleType } from '../../constants';
import { TokenType } from '../../constants';
import { ApiConfigService } from '../../shared/services/api-config.service';
import type { UserEntity } from '../user/user.entity';
import { StatusUser } from '../user/user.enum';
import { UserService } from '../user/user.service';
import { IsDelete } from './auth.enum';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import type { UserLoginDto } from './dto/UserLoginDto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ApiConfigService,
    private userService: UserService,
  ) {}

  async createAccessToken(data: { role: RoleType; userId: Uuid }): Promise<TokenPayloadDto> {
    const expiresIn = this.configService.authConfig.jwtExpirationTime;

    return new TokenPayloadDto({
      expiresIn,
      refreshExpireAt: Date.now() + Number(expiresIn),
      accessToken: await this.jwtService.signAsync(
        {
          userId: data.userId,
          type: TokenType.ACCESS_TOKEN,
          role: data.role,
        },
        {
          privateKey: this.configService.authConfig.privateKey,
        },
      ),
    });
  }

  async validateUser(userLoginDto: UserLoginDto): Promise<UserEntity | any> {
    const user = await this.userService.findByUsernameOrEmail({
      username: userLoginDto.username,
      email: userLoginDto.email,
      isDelete: IsDelete.NOT_DELETED,
    });

    if (!user) {
      return user!;
    }

    if (
      (user.settings?.isEmailVerified === true && user.settings?.isStatus === StatusUser.ACTIVE) ||
      (user.settings?.isPhoneVerified === true && user.settings?.isStatus === StatusUser.ACTIVE)
    ) {
      return user;
    }

    const isPasswordValid = await validateHash(userLoginDto.password, user?.password);

    // if (user.role !== RoleType.ADMIN) {
    //   return {
    //     needOtp: true,
    //   };
    // }

    if (!isPasswordValid) {
      return false;
    }
  }
}
