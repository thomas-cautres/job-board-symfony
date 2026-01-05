<?php

namespace App\Tests\Controller\Candidate\Job;

use Symfony\Bundle\FrameworkBundle\KernelBrowser;
use Symfony\Bundle\FrameworkBundle\Test\WebTestCase;
use Symfony\Component\HttpFoundation\Response;

class ListJobsControllerTest extends WebTestCase
{
    private KernelBrowser $client;

    protected function setUp(): void
    {
        $this->client = static::createClient();
    }

    public function testListJobsSuccess(): void
    {
        $this->client->request('GET', '/api/jobs');

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseContent);
        $this->assertIsArray($responseContent['data']);
        $this->assertIsArray($responseContent['meta']);
        $this->assertCount(10, $responseContent['data']);
        $this->assertSame(46, $responseContent['meta']['totalItems']);
        $this->assertSame(10, $responseContent['meta']['itemsPerPage']);
        $this->assertSame(1, $responseContent['meta']['currentPage']);
        $this->assertSame(5, $responseContent['meta']['totalPages']);

        $this->assertEquals('Visual Designer', $responseContent['data'][0]['title']);
    }

    public function testListJobsPage2Success(): void
    {
        $this->client->request('GET', '/api/jobs/2');

        $this->assertResponseStatusCodeSame(Response::HTTP_OK);
        $responseContent = json_decode($this->client->getResponse()->getContent(), true);

        $this->assertIsArray($responseContent);
        $this->assertIsArray($responseContent['data']);
        $this->assertIsArray($responseContent['meta']);
        $this->assertCount(10, $responseContent['data']);
        $this->assertSame(46, $responseContent['meta']['totalItems']);
        $this->assertSame(10, $responseContent['meta']['itemsPerPage']);
        $this->assertSame(2, $responseContent['meta']['currentPage']);
        $this->assertSame(5, $responseContent['meta']['totalPages']);
    }
}
