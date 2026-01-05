<?php

declare(strict_types=1);

namespace App\Dto;

final readonly class ListMeta
{
    public function __construct(
        public int $totalItems,
        public int $itemsPerPage,
        public int $currentPage,
        public int $totalPages,
    ) {
    }
}
