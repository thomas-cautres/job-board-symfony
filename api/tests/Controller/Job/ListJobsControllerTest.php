<?php

declare(strict_types=1);

namespace App\Tests\Controller\Job;

use App\Entity\Recruiter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ListJobsControllerTest extends WebTestCase
{
    private KernelBrowser $client;
    private EntityManagerInterface $entityManager;
    private Recruiter $recruiter;

    protected function setUp(): void
    {
        $this->client = static::createClient();
        $this->entityManager = self::getContainer()->get(EntityManagerInterface::class);
        $this->recruiter = $this->entityManager->getRepository(Recruiter::class)->findOneBy(['email' => 'recruiter@my-company.com']);
    }

    public function testListJobsSuccess(): void
    {
        $this->client->loginUser($this->recruiter);

        $this->client->request('GET', '/api/jobs');

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseContent);
    }
}
