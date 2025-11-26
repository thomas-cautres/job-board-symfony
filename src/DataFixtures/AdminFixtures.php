<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Recruiter;
use App\Entity\User;
use App\Repository\CompanyRepository;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

class AdminFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $passwordHasher = new PasswordHasherFactory([User::class => ['algorithm' => 'auto']])->getPasswordHasher(User::class);

        $admin = new Admin();
        $admin
            ->setEmail('admin@my-company.com')
            ->setFirstName('Joe')
            ->setLastName('Barns')
            ->setConfirmationCode('1234')
            ->setPassword($passwordHasher->hash('test1234'));

        $manager->persist($admin);
        $manager->flush();
    }
}
