<?php

declare(strict_types=1);

namespace App\Entity;

use App\Entity\Traits\BlameableTrait;
use App\Entity\Traits\TimestampableTrait;
use App\Enum\JobApplicationStatus;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Types\UuidType;
use Symfony\Component\Uid\Uuid;

#[ORM\Entity]
#[ORM\HasLifecycleCallbacks]
class JobApplication
{
    use BlameableTrait;
    use TimestampableTrait;

    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private int $id;

    #[ORM\Column(type: UuidType::NAME)]
    private Uuid $uuid;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    private ?string $motivationLetter = null;

    #[ORM\Column]
    private string $cvFilename;

    #[ORM\ManyToOne(inversedBy: 'applications')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Candidate $candidate = null;

    #[ORM\ManyToOne(inversedBy: 'applications')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Job $jobOffer = null;

    #[ORM\Column(type: Types::STRING, enumType: JobApplicationStatus::class, options: ['default' => JobApplicationStatus::Submitted->value])]
    private JobApplicationStatus $status = JobApplicationStatus::Submitted;

    public function __construct()
    {
        $this->uuid = Uuid::v7();
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getUuid(): Uuid
    {
        return $this->uuid;
    }

    public function setUuid(Uuid $uuid): static
    {
        $this->uuid = $uuid;

        return $this;
    }

    public function getMotivationLetter(): ?string
    {
        return $this->motivationLetter;
    }

    public function setMotivationLetter(?string $motivationLetter): static
    {
        $this->motivationLetter = $motivationLetter;

        return $this;
    }

    public function getCvFilename(): string
    {
        return $this->cvFilename;
    }

    public function setCvFilename(string $cvFilename): static
    {
        $this->cvFilename = $cvFilename;

        return $this;
    }

    public function getCandidate(): ?Candidate
    {
        return $this->candidate;
    }

    public function setCandidate(?Candidate $candidate): static
    {
        $this->candidate = $candidate;

        return $this;
    }

    public function getJobOffer(): ?Job
    {
        return $this->jobOffer;
    }

    public function setJobOffer(?Job $jobOffer): static
    {
        $this->jobOffer = $jobOffer;

        return $this;
    }

    public function getStatus(): JobApplicationStatus
    {
        return $this->status;
    }

    public function setStatus(JobApplicationStatus $status): static
    {
        $this->status = $status;

        return $this;
    }
}
