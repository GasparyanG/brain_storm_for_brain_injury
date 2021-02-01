<?php


namespace App\Database\Entities;

/**
 * @Entity(repositoryClass="App\Database\Repositories\InjuryInformationRepository")
 * @Table(name="injury_information")
 */
class InjuryInformation
{
    /**
     * @var int
     * @Id
     * @Column(type="integer", name="id")
     * @GeneratedValue
     */
    private $id;

    /**
     * @var null|InjuryReason
     * @ManyToOne(targetEntity="InjuryReason", inversedBy="injuryInformations")
     * @JoinColumn(name="injury_reason_id", referencedColumnName="id")
     */
    private $injuryReason;

    /**
     * @var User
     * @OneToOne(targetEntity="User", inversedBy="injuryInformation")
     * @JoinColumn(name="user_id", referenceColumnName="id")
     */
    private $user;

    /**
     * @var int
     * @Column(type="integer", name="injury_date")
     */
    private $injuryDate;

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
     * @return InjuryReason|null
     */
    public function getInjuryReason(): ?InjuryReason
    {
        return $this->injuryReason;
    }

    /**
     * @param InjuryReason|null $injuryReason
     */
    public function setInjuryReason(?InjuryReason $injuryReason): void
    {
        $this->injuryReason = $injuryReason;
    }

    /**
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }

    /**
     * @param User $user
     */
    public function setUser(User $user): void
    {
        $this->user = $user;
    }

    /**
     * @return int
     */
    public function getInjuryDate(): int
    {
        return $this->injuryDate;
    }

    /**
     * @param int $injuryDate
     */
    public function setInjuryDate(int $injuryDate): void
    {
        $this->injuryDate = $injuryDate;
    }
}