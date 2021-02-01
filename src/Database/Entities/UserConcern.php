<?php


namespace App\Database\Entities;

/**
 * @Entity(repositoryClass="App\Database\Repositories\UserConcernRepository")
 * @Table(name="users_concerns")
 */
class UserConcern
{
    /**
     * @var int
     * @Id
     * @Column(type="integer", name="id")
     * @GeneratedValue
     */
    private $id;

    /**
     * @var Concern
     * @ManyToOne(targetEntity="Concern", inversedBy="userConcerns")
     * @JoinColumn(name="concern_id", referencedColumnName="id")
     */
    private $concern;

    /**
     * @var User
     * @ManyToOne(targetEntity="User", inversedBy="userConcerns")
     * @JoinColumn(name="user_id", referencedColumnName="id")
     */
    private $user;

    /**
     * @var bool
     * @Column(type="boolean", name="strong")
     */
    private $strong;

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
     * @return Concern
     */
    public function getConcern(): Concern
    {
        return $this->concern;
    }

    /**
     * @param Concern $concern
     */
    public function setConcern(Concern $concern): void
    {
        $this->concern = $concern;
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
     * @return bool
     */
    public function isStrong(): bool
    {
        return $this->strong;
    }

    /**
     * @param bool $strong
     */
    public function setStrong(bool $strong): void
    {
        $this->strong = $strong;
    }
}