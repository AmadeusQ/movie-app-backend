// import { Module } from '@nestjs/common';
// import { AuthController } from './controllers/auth/auth.controller';
// import { AuthService } from './services/auth/auth.service';
// import { UsersModule } from 'src/users/users.module';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants/constants';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Token } from 'src/typeorm/entities/Token';
// import { User } from 'src/typeorm/entities/User';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Token, User]),
//     UsersModule,
//     JwtModule.register({
//       global: true,
//       secret: jwtConstants.jwt_secret,
//       signOptions: { expiresIn: '12h' },
//     }),
//   ],
//   controllers: [AuthController],
//   providers: [AuthService],
//   exports: [AuthService],
// })
// export class AuthModule {}
