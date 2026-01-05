<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20260105203730 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Create index on job status field';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('CREATE INDEX status_idx ON job (status)');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('DROP INDEX status_idx');
    }
}
