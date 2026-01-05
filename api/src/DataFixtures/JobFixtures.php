<?php

declare(strict_types=1);

namespace App\DataFixtures;

use App\Entity\Job;
use App\Entity\Recruiter;
use App\Enum\JobStatus;
use App\Enum\JobType;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker\Factory;
use Symfony\Component\Uid\Uuid;

class JobFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create();
        $faker->seed(1234);

        $recruiter = $this->getReference(RecruiterFixtures::RECRUITER_REFERENCE, Recruiter::class);
        $json = file_get_contents(__DIR__.'/../../data/jobs.json');

        if (false === $json) {
            throw new \RuntimeException(sprintf('Failure when reading file %s', __DIR__.'/../../data/jobs.json'));
        }

        /** @var array<array<string, string>> $jobsData */
        $jobsData = json_decode($json, true);

        foreach ($jobsData as $jobData) {
            $job = new Job();
            $job
                ->setUuid(Uuid::fromString($jobData['uuid']))
                ->setTitle($jobData['title'])
                ->setDescription($jobData['description'])
                ->setSalary($jobData['salary'])
                ->setLocation($jobData['location'])
                ->setType(JobType::from($jobData['type']))
                ->setStatus(JobStatus::from($jobData['status']))
                ->setCompany($recruiter->getCompany())
                ->setCreatedBy($recruiter);

            $manager->persist($job);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            RecruiterFixtures::class,
        ];
    }
}
