<?php

declare(strict_types=1);

namespace App\Enum;

enum JobApplicationStatus: string
{
    case Submitted = 'submitted';
    case Rejected = 'rejected';
    case Hired = 'hired';
}
