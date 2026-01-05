<?php

declare(strict_types=1);

namespace App\Controller\Recruiter\Job;

use App\Dto\Job\JobResponseDto;
use App\Entity\Recruiter;
use App\Service\Recruiter\JobService;
use Nelmio\ApiDocBundle\Attribute\Model;
use Nelmio\ApiDocBundle\Attribute\Security;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/api/recruiter/jobs', name: 'recruiter_list_jobs', methods: 'GET')]
#[OA\Response(
    response: Response::HTTP_OK,
    description: 'Successfully fetched',
    content: new OA\JsonContent(
        type: 'array',
        items: new OA\Items(ref: new Model(type: JobResponseDto::class))
    )
)]
#[OA\Response(
    response: Response::HTTP_UNAUTHORIZED,
    description: 'Invalid bearer token',
)]
#[OA\Response(
    response: Response::HTTP_FORBIDDEN,
    description: 'Access forbidden',
)]
#[OA\Tag(name: 'jobs')]
#[Security(name: 'Bearer')]
class ListJobsController extends AbstractController
{
    public function __construct(
        private readonly JobService $jobService,
    ) {
    }

    public function __invoke(): JsonResponse
    {
        /** @var Recruiter $user */
        $user = $this->getUser();

        $response = $this->jobService->getAllForUser($user);

        return $this->json($response, Response::HTTP_OK);
    }
}
