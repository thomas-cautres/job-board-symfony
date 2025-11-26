<?php

declare(strict_types=1);

namespace App\Entity;

use App\Repository\AdminRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: AdminRepository::class)]
#[ORM\HasLifecycleCallbacks]
class Admin extends User
{
}
