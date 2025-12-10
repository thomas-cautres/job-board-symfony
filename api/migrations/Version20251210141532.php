<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

final class Version20251210141532 extends AbstractMigration
{
    public function getDescription(): string
    {
        return 'Add job fields';
    }

    public function up(Schema $schema): void
    {
        $this->addSql('ALTER TABLE job ADD type VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE job ADD salary VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE job ADD location VARCHAR(255) NOT NULL');
        $this->addSql('ALTER TABLE job ADD status VARCHAR(255) DEFAULT \'open\' NOT NULL');
    }

    public function down(Schema $schema): void
    {
        $this->addSql('ALTER TABLE job DROP type');
        $this->addSql('ALTER TABLE job DROP salary');
        $this->addSql('ALTER TABLE job DROP location');
        $this->addSql('ALTER TABLE job DROP status');
    }
}
