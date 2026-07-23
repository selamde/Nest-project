import { Test, TestingModule } from '@nestjs/testing';
import { ApplicantService } from './applicant.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('ApplicantService', () => {
  let service: ApplicantService;

  const prismaMock={
    applicant:{
      create:jest.fn(),
      findMany:jest.fn(),
      findUnique:jest.fn(),
      update:jest.fn(),
      delete: jest.fn(),         
      count:jest.fn()
    }
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApplicantService,
        {
          provide: PrismaService,
          useValue:{ 
            prismaMock
          }
        }
      ],
    }).compile();

    service = module.get<ApplicantService>(ApplicantService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
