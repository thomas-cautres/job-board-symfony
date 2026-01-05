<?php

declare(strict_types=1);

namespace App\Tests\Controller\Candidate\Job;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class GetJobControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testGetJob(): void
    {
        $this->client->request('GET', '/api/jobs/6ff8f7f6-1eb3-3525-be4a-3932c805afed');

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseContent);
        $this->assertEquals('Wellhead Pumper', $responseContent['title']);
    }
}
