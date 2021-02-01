<?php

namespace App\Database\Entities;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="App\Database\Repositories\ConcernRepository")
 * @Table(name="concerns")
 */
class Concern
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
     * @OneToMany(targetEntity="UserConcern", mappedBy="concern")
     * @JoinColumn(name="concern_id")
     */
    private $userConcerns;

    public function __construct()
    {
        $this->userConcerns = new ArrayCollection();
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
    public function getUserConcerns()
    {
        return $this->userConcerns;
    }

    /**
     * @param UserConcern $userConcern
     */
    public function addUserConcern(InjuryInformation $userConcern): void
    {
        if (!$this->userConcerns->contains($userConcern)) {
            $this->userConcerns[] = $userConcern;
            $userConcern->setConcern($this);
        }
    }
}