<?php

namespace App\Database\Entities;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="App\Database\Repositories\InjuryReasonRepository")
 * @Table(name="injury_reasons")
 */
class InjuryReason
{
    /**
     * @var int
     * @Id
     * @Column(type="integer", name="id")
     * @GeneratedValue
     */
    private $id;

    /**
     * @var string
     * @Column(type="string", name="name")
     */
    private $name;

    /**
     * @OneToMany(targetEntity="InjuryInformation", mappedBy="injuryReason")
     * @JoinColumn(name="injury_reason_id")
     */
    private $injuryInformation;

    public function __construct()
    {
        $this->injuryInformation = new ArrayCollection();
    }

    /**
     * @return int
     */
    public function getId(): int
    {
        return $this->id;
    }

    /**
     * @param int $id
     */
    public function setId(int $id): void
    {
        $this->id = $id;
    }

    /**
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName(string $name): void
    {
        $this->name = $name;
    }

    /**
     * @return mixed
     */
    public function getInjuryInformation()
    {
        return $this->injuryInformation;
    }

    /**
     * @param InjuryInformation $injuryInformation
     */
    public function addInjuryInformation(InjuryInformation $injuryInformation): void
    {
        if (!$this->injuryInformation->contains($injuryInformation)) {
            $this->injuryInformation[] = $injuryInformation;
            $injuryInformation->setInjuryReason($this);
        }
    }
}