<?php

declare(strict_types=1);

namespace App\Controller\Candidate\Job;

use App\Dto\Candidate\Job\JobResponseDto;
use App\Entity\Job;
use Nelmio\ApiDocBundle\Attribute\Model;
use OpenApi\Attributes as OA;
use Symfony\Bridge\Doctrine\Attribute\MapEntity;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Requirement\Requirement;

#[Route('/api/jobs/{uuid}', name: 'candidate_get_job', requirements: ['uuid' => Requirement::UID_RFC4122], methods: 'GET')]
#[OA\Response(
    response: Response::HTTP_OK,
    description: 'Successfully fetched job',
    content: new Model(type: JobResponseDto::class)
)]
#[OA\Tag(name: 'jobs')]
class GetJobController extends AbstractController
{
    public function __invoke(
        #[MapEntity(expr: 'repository.findOneBy({"uuid":uuid, "status":"open"})')]
        Job $job
    ): JsonResponse
    {
        return $this->json(JobResponseDto::fromEntity($job), Response::HTTP_OK);
    }
}
