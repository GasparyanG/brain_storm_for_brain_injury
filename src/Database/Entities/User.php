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
     * @var null|string
     * @Column(type="string", name="email_address")
     */
    private $emailAddress;

    /**
     * @var string
     * @Column(type="string", name="location")
     */
    private $location;

    /**
     * @var int
     * @Column(type="integer", name="signed_date")
     */
    private $signedDate;

    /**
     * @var bool
     * @Column(type="boolean", name="validated")
     */
    private $validated;

    /**
     * @var string
     * @Column(type="string", name="validation_hash")
     */
    private $validationHash;

    /**
     * @var null|string
     * @Column(type="string", name="cookie")
     */
    private $cookie;

    /**
     * @OneToOne(targetEntity="InjuryInformation", mappedBy="user")
     */
    private $injuryInformation;

    /**
     * @OneToOne(targetEntity="UserMessage", mappedBy="user")
     */
    private $userMessage;

    /**
     * @OneToMany(targetEntity="UserConcern", mappedBy="user")
     * @JoinColumn(name="user_id")
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
     * @return null|string
     */
    public function getEmailAddress(): ?string
    {
        return $this->emailAddress;
    }

    /**
     * @param null|string $emailAddress
     */
    public function setEmailAddress(?string $emailAddress): void
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
     * @return int
     */
    public function getSignedDate(): int
    {
        return $this->signedDate;
    }

    /**
     * @param int $signedDate
     */
    public function setSignedDate(int $signedDate): void
    {
        $this->signedDate = $signedDate;
    }

    /**
     * @return bool
     */
    public function isValidated(): bool
    {
        return $this->validated;
    }

    /**
     * @param bool $validated
     */
    public function setValidated(bool $validated): void
    {
        $this->validated = $validated;
    }

    /**
     * @return string
     */
    public function getValidationHash(): string
    {
        return $this->validationHash;
    }

    /**
     * @param string $validationHash
     */
    public function setValidationHash(string $validationHash): void
    {
        $this->validationHash = $validationHash;
    }

    /**
     * @return null|string
     */
    public function getCookie(): ?string
    {
        return $this->cookie;
    }

    /**
     * @param null|string $cookie
     */
    public function setCookie(?string $cookie): void
    {
        $this->cookie = $cookie;
    }

    /**
     * @return mixed
     */
    public function getUserMessage()
    {
        return $this->userMessage;
    }

    /**
     * @param mixed $userMessage
     */
    public function setUserMessage($userMessage): void
    {
        $this->userMessage = $userMessage;
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
    public function setInjuryInformation(InjuryInformation $injuryInformation): void
    {
        $this->injuryInformation = $injuryInformation;
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