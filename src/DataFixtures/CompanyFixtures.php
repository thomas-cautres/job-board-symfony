<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Admin;
use App\Entity\Company;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

class CompanyFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $admin = $manager->getRepository(Admin::class)->find(1);

        $company = new Company();
        $company->setName('My company')->setCreatedBy($admin);
        $manager->persist($company);
        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            AdminFixtures::class
        ];
    }
}
