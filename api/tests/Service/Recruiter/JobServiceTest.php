<?php

declare(strict_types=1);

namespace App\Tests\Service\Recruiter;

use App\Dto\Recruiter\Job\CreateJobDto;
use App\Dto\Recruiter\Job\JobResponseDto;
use App\Entity\Company;
use App\Entity\Job;
use App\Entity\Recruiter;
use App\Service\Recruiter\JobService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class JobServiceTest extends KernelTestCase
{
    private JobService $jobService;
    private EntityManagerInterface $entityManager;

    public function setUp(): void
    {
        self::bootKernel();
        $this->jobService = self::getContainer()->get(JobService::class);
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);
    }

    public function testCreate(): void
    {
        $company = $this->entityManager->getRepository(Company::class)->findOneBy(['name' => 'My company']);

        $dto = new CreateJobDto(
            title: 'Job title',
            description: 'Job description',
            salary: '50k',
            location: 'Lyon',
            type: 'full-time'
        );

        $jobResponse = $this->jobService->create($dto, $company);

        $this->assertSame($dto->title, $jobResponse->title);
        $this->assertSame($dto->description, $jobResponse->description);
        $this->assertNotNull($jobResponse->id);
        $this->assertNotNull($jobResponse->createdAt);

        $createdJob = $this->entityManager->getRepository(Job::class)->findOneBy(['uuid' => $jobResponse->id]);

        $this->assertNotNull($createdJob);
        $this->assertSame($dto->title, $createdJob->getTitle());
        $this->assertSame($dto->description, $createdJob->getDescription());
        $this->assertSame($company, $createdJob->getCompany());
        $this->assertNull($createdJob->getCreatedBy());
    }

    public function testGetAllForUser(): void
    {
        $recruiter = $this->entityManager->getRepository(Recruiter::class)->findOneBy(['email' => 'recruiter@my-company.com']);

        $jobsForUser = $this->jobService->getAllForUser($recruiter);

        $this->assertCount(50, $jobsForUser);

        $jobDto = $jobsForUser[0];
        $this->assertInstanceOf(JobResponseDto::class, $jobDto);
        $this->assertSame('Wellhead Pumper', $jobDto->title);
    }
}
