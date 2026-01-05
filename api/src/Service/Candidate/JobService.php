<?php

declare(strict_types=1);

namespace App\Service\Candidate;

use App\Dto\Candidate\Job\JobResponseDto;
use App\Dto\Candidate\Job\ListJobs;
use App\Dto\ListMeta;
use App\Entity\Job;
use App\Repository\JobRepository;

readonly class JobService
{
    public const int PAGINATION_LENGTH = 10;

    public function __construct(
        private JobRepository $jobRepository,
    ) {
    }

    public function list(int $page): ListJobs
    {
        $limit = self::PAGINATION_LENGTH;
        $offset = ($page - 1) * $limit;

        $paginator = $this->jobRepository->findPaginated($offset, $limit);

        /** @var Job[] $jobs */
        $jobs = iterator_to_array($paginator);

        /** @var JobResponseDto[] $data */
        $data = array_map(JobResponseDto::fromEntity(...), $jobs);

        return new ListJobs(
            data: $data,
            meta: new ListMeta(count($paginator), $limit, $page, (int) ceil(count($paginator) / $limit))
        );
    }
}
