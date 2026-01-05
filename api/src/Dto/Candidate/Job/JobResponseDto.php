<?php

declare(strict_types=1);

namespace App\Dto\Candidate\Job;

use App\Entity\Job;

final readonly class JobResponseDto
{
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public string $createdAt,
        public string $salary,
        public string $location,
        public string $type,
        public string $status,
    ) {
    }

    public static function fromEntity(Job $job): self
    {
        return new self(
            id: $job->getUuid()->toRfc4122(),
            title: (string) $job->getTitle(),
            description: (string) $job->getDescription(),
            createdAt: (string) $job->getCreatedAt()?->format(\DateTimeInterface::RFC3339_EXTENDED),
            salary: (string) $job->getSalary(),
            location: (string) $job->getLocation(),
            type: (string) $job->getType()?->value,
            status: $job->getStatus()->value,
        );
    }
}
