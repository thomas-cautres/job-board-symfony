<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Company;
use App\Entity\Job;
use App\Enum\JobStatus;
use App\Enum\JobType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;

class JobFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();

        $company = $this->getReference(CompanyFixtures::COMPANY_REFERENCE, Company::class);

        for ($i = 0; $i < 50; ++$i) {
            $job = new Job();
            $job->setTitle($faker->jobTitle());
            $job->setDescription($faker->realText(400));
            $job->setSalary($faker->numberBetween(30, 80).'k €');
            $job->setLocation($faker->city());

            // Random JobType
            $types = array_column(JobType::cases(), 'value');
            $job->setType(JobType::from($faker->randomElement($types)));

            // Random JobStatus (Mostly OPEN)
            $job->setStatus($faker->boolean(80) ? JobStatus::Open : JobStatus::Closed);

            $job->setCompany($company);
            $job->setCreatedBy($company->getCreatedBy()); // Assuming created by the admin of the company

            $manager->persist($job);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CompanyFixtures::class,
        ];
    }
}
