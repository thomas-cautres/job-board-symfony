<?php

declare(strict_types=1);

namespace App\Security\Voter;

use App\Entity\Company;
use App\Entity\Job;
use App\Entity\Recruiter;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

/** @extends Voter<string, Job> */
class JobVoter extends Voter
{
    public const string CREATE = 'create_job';
    public const string VIEW = 'view_job';
    public const string EDIT = 'edit_job';
    public const string DELETE = 'delete_job';

    protected function supports(string $attribute, mixed $subject): bool
    {
        if (!in_array($attribute, [self::VIEW, self::EDIT, self::CREATE, self::DELETE])) {
            return false;
        }

        if (self::CREATE === $attribute) {
            return true;
        }

        return $subject instanceof Job;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        /** @var Job $job */
        $job = $subject;

        return match ($attribute) {
            self::EDIT => $this->canEdit($job, $user),
            self::VIEW => $this->canView($job, $user),
            self::CREATE => $this->canCreate($user),
            default => throw new \LogicException('This code should not be reached!'),
        };
    }

    private function canCreate(User $user): bool
    {
        if (!$user instanceof Recruiter) {
            return false;
        }

        return in_array(User::ROLE_RECRUITER, $user->getRoles(), true) && $user->getCompany() instanceof Company;
    }

    private function canEdit(Job $job, User $user): bool
    {
        return true;
    }

    private function canView(Job $job, User $user): bool
    {
        return true;
    }
}
