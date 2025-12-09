<?php

declare(strict_types=1);

namespace App\Dto\Job;

final readonly class JobResponseDto
{
    public function __construct(
        public string $id,
        public string $title,
        public string $description,
        public string $createdAt,
    ) {
    }
}
