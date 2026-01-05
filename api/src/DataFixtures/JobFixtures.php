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
        $faker->seed(1234);

        $company = $this->getReference(CompanyFixtures::COMPANY_REFERENCE, Company::class);

        for ($i = 0; $i < 50; ++$i) {
            $job = new Job();
            $job->setTitle($faker->jobTitle())
                ->setDescription($faker->realText(400))
                ->setSalary($faker->numberBetween(30, 80) . 'k €')
                ->setLocation($faker->city());

            $types = array_column(JobType::cases(), 'value');

            /** @var string $type */
            $type = $faker->randomElement($types);

            $job->setType(JobType::from($type));

            $job->setStatus($faker->boolean(80) ? JobStatus::Open : JobStatus::Closed)
                ->setCompany($company)
                ->setCreatedBy($company->getCreatedBy()); // Assuming created by the admin of the company

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
