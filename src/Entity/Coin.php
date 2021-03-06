<?php

namespace App\Entity;

use App\Entity\Item;
use App\Entity\Recipe;
use Doctrine\ORM\Mapping as ORM;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;

/**
 * @ORM\Entity(repositoryClass="App\Repository\CoinRepository")
 */
class Coin
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
     * @ORM\OneToMany(targetEntity="App\Entity\Item", mappedBy="coin")
     * @ORM\JoinColumn(name="id", referencedColumnName="coin")
     */
    private $items;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\Recipe", mappedBy="recipe")
     * @ORM\JoinColumn(name="id", referencedColumnName="recipe")
     */
    private $recipes;


    /**
     * @ORM\Column(type="string", length=20)
     */
    private $class;

    /**
     * @ORM\Column(type="integer")
     */
    private $ordering;    

    public function getId(): ?int
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

    /**
     * @return Collection|Item[]
     */
    public function getItems(): Collection {
        return $this->items;
    }

    public function getClass(): ?string
    {
        return $this->class;
    }

    public function setClass(string $class): self
    {
        $this->class = $class;

        return $this;
    }

    public function getOrdering(): ?int
    {
        return $this->ordering;
    }

    public function setOrdering(int $ordering): self
    {
        $this->ordering = $ordering;

        return $this;
    }  

    /**
     * @return Collection|Recipe[]
     */
    public function getRecipes(): Collection {
        return $this->recipes;
    }


    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }
}
