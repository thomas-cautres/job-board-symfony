<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20251126212633 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Make created_by_id nullable';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ALTER created_by_id DROP NOT NULL');
        $this->addSql('ALTER TABLE job ALTER created_by_id DROP NOT NULL');
        $this->addSql('ALTER TABLE job_application ALTER created_by_id DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE company ALTER created_by_id SET NOT NULL');
        $this->addSql('ALTER TABLE job ALTER created_by_id SET NOT NULL');
        $this->addSql('ALTER TABLE job_application ALTER created_by_id SET NOT NULL');
    }
}
