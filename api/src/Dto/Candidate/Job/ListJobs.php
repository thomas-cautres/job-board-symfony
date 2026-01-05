<?php

declare(strict_types=1);

namespace App\Dto\Candidate\Job;

use App\Dto\ListMeta;

class ListJobs
{
    /**
     * @param JobResponseDto[] $data
     */
    public function __construct(
        public array $data,
        public ListMeta $meta,
    ) {
    }
}
