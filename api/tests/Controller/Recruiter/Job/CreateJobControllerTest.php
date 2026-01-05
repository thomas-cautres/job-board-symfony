<?php

declare(strict_types=1);

namespace App\Tests\Controller\Recruiter\Job;

use App\Entity\Recruiter;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class CreateJobControllerTest extends WebTestCase
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

    public function testCreateJobSuccess(): void
    {
        $this->client->loginUser($this->recruiter);

        $this->client->request('POST', '/api/recruiter/job', [
            'title' => 'Senior Symfony Developer',
            'description' => 'We are looking for an expert Symfony developer.',
            'salary' => '45k - 60k',
            'location' => 'Paris',
            'type' => 'full-time',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_CREATED);
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertArrayHasKey('id', $responseContent);
        $this->assertSame('Senior Symfony Developer', $responseContent['title']);
        $this->assertSame('We are looking for an expert Symfony developer.', $responseContent['description']);
        $this->assertSame('45k - 60k', $responseContent['salary']);
        $this->assertSame('Paris', $responseContent['location']);
        $this->assertSame('full-time', $responseContent['type']);
    }

    public function testTitleIsTooLong(): void
    {
        $this->client->loginUser($this->recruiter);

        $this->client->request('POST', '/api/recruiter/job', [
            'title' => 'Senior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony Developer',
            'description' => 'We are looking for an expert Symfony developer.',
            'salary' => '45k - 60k',
            'location' => 'Paris',
            'type' => 'full-time',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testDescriptionIsTooLong(): void
    {
        $this->client->loginUser($this->recruiter);

        $this->client->request('POST', '/api/recruiter/job', [
            'title' => 'Senior Symfony Developer',
            'description' => 'Senior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony DeveloperSenior Symfony Developer Symfony DeveloperSenior Symfony DeveloperSymfony DeveloperSenior Symfony DeveloperSymfony DeveloperSenior Symfony DeveloperSymfony DeveloperSenior Symfony DeveloperSymfony DeveloperSenior Symfony DeveloperSymfony DeveloperSenior Symfony Developer',
            'salary' => '45k - 60k',
            'location' => 'Paris',
            'type' => 'full-time',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNPROCESSABLE_ENTITY);
    }

    public function testAccessIsUnauthorized(): void
    {
        $this->client->request('POST', '/api/recruiter/job', [
            'title' => 'Senior Symfony Developer',
            'description' => 'We are looking for an expert Symfony developer.',
            'salary' => '45k - 60k',
            'location' => 'Paris',
            'type' => 'full-time',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_UNAUTHORIZED);
    }

    public function testAccessIsForbidden(): void
    {
        $recruiterWithoutCompany = new Recruiter();
        $recruiterWithoutCompany
            ->setEmail('recruiter-no-company@my-company.com')
            ->setPassword('password')
            ->setFirstName('John')
            ->setLastName('Smith');

        $this->client->loginUser($recruiterWithoutCompany);

        $this->client->request('POST', '/api/recruiter/job', [
            'title' => 'Senior Symfony Developer',
            'description' => 'We are looking for an expert Symfony developer.',
            'salary' => '45k - 60k',
            'location' => 'Paris',
            'type' => 'full-time',
        ]);

        $this->assertResponseStatusCodeSame(Response::HTTP_FORBIDDEN);
    }
}
