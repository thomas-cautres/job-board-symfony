<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Company;
use App\Entity\Recruiter;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\PasswordHasherFactory;

class RecruiterFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $passwordHasher = new PasswordHasherFactory([User::class => ['algorithm' => 'auto']])->getPasswordHasher(User::class);

        $company = $manager->getRepository(Company::class)->findOneBy(['name' => 'My company']);

        $recruiter = new Recruiter();
        $recruiter
            ->setEmail('recruiter@my-company.com')
            ->setFirstName('John')
            ->setLastName('Doe')
            ->setCompany($company)
            ->setConfirmationCode('1234')
            ->setPassword($passwordHasher->hash('test1234'));

        $manager->persist($recruiter);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }
}
