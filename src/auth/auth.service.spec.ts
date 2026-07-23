import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';


describe('AuthService', () => {
  let service: AuthService;

  const mockJwtService={
    signAsunc:jest.fn(),
    sign: jest.fn(),
    verify:jest.fn()
  }
 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
   
      providers: [AuthService,
        {
          provide:PrismaService,
          useValue:{}
        },
        {
          provide: JwtService,
          useValue:{
            mockJwtService
          }
        }
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
