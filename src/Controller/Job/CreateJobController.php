<?php

declare(strict_types=1);

namespace App\Controller\Job;

use App\Dto\Job\CreateJobDto;
use App\Dto\Job\JobResponseDto;
use App\Entity\Recruiter;
use App\Service\JobService;
use Nelmio\ApiDocBundle\Attribute\Model;
use Nelmio\ApiDocBundle\Attribute\Security;
use OpenApi\Attributes as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\MapRequestPayload;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/job', name: 'create_job', methods: 'POST')]
#[OA\Response(
    response: Response::HTTP_CREATED,
    description: 'Successfully created',
    content: new Model(type: JobResponseDto::class)
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
#[IsGranted('ROLE_RECRUITER')]
class CreateJobController extends AbstractController
{
    public function __construct(
        private readonly JobService $jobService,
    ) {
    }

    public function __invoke(
        #[MapRequestPayload] CreateJobDto $createJob,
    ): JsonResponse {
        /** @var Recruiter $user */
        $user = $this->getUser();

        $response = $this->jobService->create($createJob, $user->getCompany());

        return $this->json($response, Response::HTTP_CREATED);
    }
}
