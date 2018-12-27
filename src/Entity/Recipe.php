<?php

namespace App\Entity;

use App\Entity\Coin;
use App\Entity\Item;
use App\Entity\Building;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\RecipeRepository")
 */
class Recipe
{
    /**
     * @ORM\Id()
     * @ORM\Column(type="string")
     */
    private $id;

    /**
     * @ORM\Column(type="decimal", precision=8, scale=2)
     */
    private $time;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $fuel;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Building", inversedBy="recipe")
     * @ORM\JoinColumn(name="building", referencedColumnName="id")
     */
    private $building;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Coin", inversedBy="recipe")
     * @ORM\JoinColumn(name="coin", referencedColumnName="id")
     */
    private $coin;
   
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getTime()
    {
        return $this->time;
    }

    public function setTime($time): self
    {
        $this->time = $time;

        return $this;
    }

    public function getFuel(): ?int
    {
        return $this->fuel;
    }

    public function setFuel(?int $fuel): self
    {
        $this->fuel = $fuel;

        return $this;
    }

    public function getBuilding(): ?Building {
        return $this->building;
    }

    public function setBuilding(?Building $building): self {
        $this->building = $building;
        return $this;
    }

    public function getCoin(): ?Coin {
        return $this->coin;
    }

    public function setCoin(?Coin $coin): self {
        $this->coin = $coin;
        return $this;
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
