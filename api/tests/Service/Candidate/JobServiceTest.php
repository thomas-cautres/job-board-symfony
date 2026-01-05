<?php

declare(strict_types=1);

namespace App\Tests\Service\Candidate;

use App\Dto\Candidate\Job\JobResponseDto;
use App\Dto\Candidate\Job\ListJobs;
use App\Dto\ListMeta;
use App\Service\Candidate\JobService;
use Symfony\Bundle\FrameworkBundle\Test\KernelTestCase;

class JobServiceTest extends KernelTestCase
{
    private JobService $jobService;

    public function setUp(): void
    {
        self::bootKernel();
        $this->jobService = self::getContainer()->get(JobService::class);
    }

    public function testList(): void
    {
        $page = 1;
        $listJobs = $this->jobService->list($page);

        $this->assertInstanceOf(ListJobs::class, $listJobs);
        $this->assertIsArray($listJobs->data);
        $this->assertInstanceOf(ListMeta::class, $listJobs->meta);

        // Meta assertions
        $this->assertSame($page, $listJobs->meta->currentPage);
        $this->assertSame(JobService::PAGINATION_LENGTH, $listJobs->meta->itemsPerPage);
        $this->assertGreaterThanOrEqual(10, $listJobs->meta->totalItems);
        $this->assertGreaterThanOrEqual(1, $listJobs->meta->totalPages);

        // Data assertions
        $this->assertCount(10, $listJobs->data);

        $job = $listJobs->data[0];
        $this->assertInstanceOf(JobResponseDto::class, $job);

        // Detailed Job assertions
        $this->assertSame('Music Composer', $job->title);
        $this->assertNotEmpty($job->id);
        $this->assertMatchesRegularExpression('/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/', $job->id);
        $this->assertNotEmpty($job->description);
        $this->assertNotEmpty($job->createdAt);
        $this->assertNotEmpty($job->salary);
        $this->assertNotEmpty($job->location);
        $this->assertNotEmpty($job->type);
        $this->assertNotEmpty($job->status);
    }

    public function testListPagination(): void
    {
        $page = 2;
        $listJobs = $this->jobService->list($page);

        $this->assertInstanceOf(ListJobs::class, $listJobs);
        $this->assertSame($page, $listJobs->meta->currentPage);
        $this->assertCount(10, $listJobs->data);
        $this->assertGreaterThanOrEqual(10, $listJobs->meta->totalItems);
    }
}
