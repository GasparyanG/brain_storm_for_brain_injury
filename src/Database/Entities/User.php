<?php

namespace App\Database\Entities;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * @Entity(repositoryClass="App\Database\Repositories\UserRepository")
 * @Table(name="users")
 */
class User
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
     * @var int
     * @Column(type="integer", name="age")
     */
    private $age;

    /**
     * @var string
     * @Column(type="string", name="email_address")
     */
    private $emailAddress;

    /**
     * @var string
     * @Column(type="string", name="location")
     */
    private $location;

    /**
     * @OneToMany(targetEntity="InjuryInformation", mappedBy="user")
     * @JoinColumn(name="user_id")
     */
    private $injuryInformation;

    /**
     * @OneToMany(targetEntity="UserConcern", mappedBy="user")
     * @JoinColumn(name="user_id")
     */
    private $userConcerns;

    public function __construct()
    {
        $this->injuryInformation = new ArrayCollection();
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
     * @return int
     */
    public function getAge(): int
    {
        return $this->age;
    }

    /**
     * @param int $age
     */
    public function setAge(int $age): void
    {
        $this->age = $age;
    }

    /**
     * @return string
     */
    public function getEmailAddress(): string
    {
        return $this->emailAddress;
    }

    /**
     * @param string $emailAddress
     */
    public function setEmailAddress(string $emailAddress): void
    {
        $this->emailAddress = $emailAddress;
    }

    /**
     * @return string
     */
    public function getLocation(): string
    {
        return $this->location;
    }

    /**
     * @param string $location
     */
    public function setLocation(string $location): void
    {
        $this->location = $location;
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
            $injuryInformation->setUser($this);
        }
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
            $userConcern->setUser($this);
        }
    }
}