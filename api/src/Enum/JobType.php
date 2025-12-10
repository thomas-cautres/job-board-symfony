<?php

declare(strict_types=1);

namespace App\Enum;

enum JobType: string
{
    case FullTime = 'full-time';
    case PartTime = 'part-time';
    case Internship = 'internship';
}
