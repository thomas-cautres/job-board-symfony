<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\RecruiterRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: RecruiterRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Recruiter extends User
{
    #[ORM\ManyToOne(inversedBy: 'recruiters')]
    #[ORM\JoinColumn(nullable: true)]
    private ?Company $company = null;

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function getRoles(): array
    {
        return [self::ROLE_RECRUITER];
    }
}
