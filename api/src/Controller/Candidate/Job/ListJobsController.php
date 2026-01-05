<?php

declare(strict_types=1);

namespace App\Controller\Candidate\Job;

use App\Dto\Recruiter\Job\JobResponseDto;
use App\Service\Candidate\JobService;
use Nelmio\ApiDocBundle\Attribute\Model;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/jobs/{page<\d+>}', name: 'candidate_list_jobs', methods: 'GET')]
#[OA\Response(
    response: Response::HTTP_OK,
    description: 'Successfully fetched paginated jobs',
    content: new OA\JsonContent(
        properties: [
            new OA\Property(
                property: 'data',
                type: 'array',
                items: new OA\Items(ref: new Model(type: JobResponseDto::class))
            ),
            new OA\Property(
                property: 'meta',
                properties: [
                    new OA\Property(property: 'totalItems', type: 'integer'),
                    new OA\Property(property: 'itemsPerPage', type: 'integer'),
                    new OA\Property(property: 'currentPage', type: 'integer'),
                    new OA\Property(property: 'totalPages', type: 'integer'),
                ],
                type: 'object'
            ),
        ],
        type: 'object'
    )
)]
#[OA\Tag(name: 'jobs')]
class ListJobsController extends AbstractController
{
    public function __construct(
        private readonly JobService $jobService,
    ) {
    }

    public function __invoke(int $page = 1): JsonResponse
    {
        $list = $this->jobService->list($page);

        return $this->json($list, Response::HTTP_OK);
    }
}
