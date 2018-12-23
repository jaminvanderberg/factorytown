<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use App\Entity\Category;
use App\Entity\Coin;

/**
 * @ORM\Entity(repositoryClass="App\Repository\ItemRepository")
 */
class Item
{
    /**
     * @ORM\Id()
     * @ORM\Column(type="string", length=10)
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=50)
     */
    private $name;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $image;

    /**
     * @ORM\Column(type="integer")
     */
    private $sell;

    /**
     * @ORM\Column(type="integer")
     */
    private $percent;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Category", inversedBy="items")
     * @ORM\JoinColumn(name="category", referencedColumnName="id")
     */
    private $category;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Coin", inversedBy="items")
     * @ORM\JoinColumn(name="coin", referencedColumnName="id")
     */
    private $coin;

    public function getId(): ?string
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getSell(): ?int
    {
        return $this->sell;
    }

    public function setSell(int $sell): self
    {
        $this->sell = $sell;

        return $this;
    }

    public function getPercent(): ?int
    {
        return $this->percent;
    }

    public function setPercent(int $percent): self
    {
        $this->percent = $percent;

        return $this;
    }

    /* */

    public function getCategory(): ?Category {
        return $this->category;
    }

    public function getCategoryName(): ?string { return $this->category->getName(); }
    public function getCategoryImage(): ?string { return $this->category->getImage(); }

    public function setCategory(?Category $category): self {
        $this->category = $category;
        return $this;
    }

    public function getCoin(): ?Coin {
        return $this->coin;
    }

    public function getCoinName(): ?string { return $this->coin->getName(); }
    public function getCoinImage(): ?string { return $this->coin->getImage(); }
    public function getCoinClass(): ?string { return $this->coin->getClass(); }

    public function setCoin(?Coin $coin): self {
        $this->coin = $coin;
        return $this;
    }

}
