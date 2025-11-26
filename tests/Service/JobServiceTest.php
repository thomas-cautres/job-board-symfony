<?php

declare(strict_types=1);

namespace App\Tests\Service;

use App\Dto\Job\CreateJobDto;
use App\Entity\Company;
use App\Entity\Job;
use App\Entity\Recruiter;
use App\Service\JobService;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class JobServiceTest extends KernelTestCase
{
    private JobService $jobService;
    private EntityManagerInterface $entityManager;

    public function setUp(): void
    {
        self::bootKernel();
        $this->jobService = self::getContainer()->get(JobService::class);
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);

        $user = $this->entityManager->getRepository(Recruiter::class)->findOneBy(['email' => 'recruiter@my-company.com']);
        $token = new UsernamePasswordToken($user, 'main', $user->getRoles());
        self::getContainer()->get(TokenStorageInterface::class)->setToken($token);
    }

    public function testCreate(): void
    {
        $company = $this->entityManager->getRepository(Company::class)->findOneBy(['name' => 'My company']);

        $dto = new CreateJobDto(
            title: 'Job title',
            description: 'Job description'
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
        $this->assertSame('recruiter@my-company.com', $createdJob->getCreatedBy()->getEmail());
    }
}
