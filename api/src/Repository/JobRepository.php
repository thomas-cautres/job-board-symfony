<?php

declare(strict_types=1);

namespace App\Repository;

use App\Entity\Job;
use App\Enum\JobStatus;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\ORM\Tools\Pagination\Paginator;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Job>
 */
class JobRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Job::class);
    }

    public function save(Job $job, bool $flush = true): void
    {
        $this->getEntityManager()->persist($job);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    /**
     * @return Paginator<Job>
     */
    public function findPaginated(int $start, int $length, ?string $term = null, ?string $location = null): Paginator
    {
        $qb = $this->createQueryBuilder('j');
        $qb
            ->where('j.status = :status')
            ->setFirstResult($start)
            ->setMaxResults($length)
            ->setParameter('status', JobStatus::Open);

        /** @var Paginator<Job> $paginator */
        $paginator = new Paginator($qb);

        return $paginator;
    }
}
