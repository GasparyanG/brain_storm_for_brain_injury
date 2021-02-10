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
     * @var null|string
     * @Column(type="string", name="image_name")
     */
    private $imageName;

    /**
     * @var null|bool
     * @Column(type="boolean", name="described")
     */
    private $described;

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
     * @return string|null
     */
    public function getImageName(): ?string
    {
        return $this->imageName;
    }

    /**
     * @param string|null $imageName
     */
    public function setImageName(?string $imageName): void
    {
        $this->imageName = $imageName;
    }

    /**
     * @return bool|null
     */
    public function getDescribed(): ?bool
    {
        return $this->described;
    }

    /**
     * @param bool|null $described
     */
    public function setDescribed(?bool $described): void
    {
        $this->described = $described;
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