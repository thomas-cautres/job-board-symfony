<?php

declare(strict_types=1);

namespace App\Service;

use App\Dto\Job\CreateJobDto;
use App\Dto\Job\JobResponseDto;
use App\Entity\Company;
use App\Entity\Job;
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

        return new JobResponseDto(
            id: $job->getUuid()->toRfc4122(),
            title: (string) $job->getTitle(),
            description: (string) $job->getDescription(),
            createdAt: (string) $job->getCreatedAt()?->format(\DateTimeInterface::RFC3339_EXTENDED),
            salary: (string) $job->getSalary(),
            location: (string) $job->getLocation(),
            type: $job->getType()->value,
            status: $job->getStatus()->value,
        );
    }
}
