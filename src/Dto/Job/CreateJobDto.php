<?php

declare(strict_types=1);

namespace App\Dto\Job;

use Symfony\Component\Validator\Constraints as Assert;

final readonly class CreateJobDto
{
    public function __construct(
        #[Assert\NotBlank(message: 'create.job.title.not_blank')]
        #[Assert\Length(max: 255, maxMessage: 'create.job.title.length.max')]
        public string $title,
        #[Assert\NotBlank(message: 'create.job.description.not_blank')]
        #[Assert\Length(max: 400, maxMessage: 'create.job.description.length.max')]
        public string $description,
    ) {
    }
}
