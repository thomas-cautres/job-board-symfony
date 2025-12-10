<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\Job\CreateJobDto;
use App\Dto\Job\JobResponseDto;
use App\Entity\Company;
use App\Entity\Job;
use App\Entity\User;
use App\Enum\JobType;
use App\Repository\JobRepository;

readonly class JobService
{
    public function __construct(
        private JobRepository $jobRepository,
    ) {
    }

    public function create(CreateJobDto $input, Company $company): JobResponseDto
    {
        $job = new Job();
        $job
            ->setTitle($input->title)
            ->setDescription($input->description)
            ->setCompany($company)
            ->setLocation($input->location)
            ->setType(JobType::from($input->type))
            ->setSalary($input->salary);

        $this->jobRepository->save($job);

        return JobResponseDto::fromEntity($job);
    }

    /**
     * @return JobResponseDto[]
     */
    public function getAllForUser(User $user): array
    {
        $jobs = $this->jobRepository->findBy(['createdBy' => $user], orderBy: ['createdAt' => 'DESC']);

        return array_map(JobResponseDto::fromEntity(...), $jobs);
    }
}
