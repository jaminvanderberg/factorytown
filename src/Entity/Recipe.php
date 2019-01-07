<?php

namespace App\Entity;

use App\Entity\Coin;
use App\Entity\Item;
use App\Entity\Building;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
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
     * @ORM\ManyToOne(targetEntity="App\Entity\Building", inversedBy="recipes")
     * @ORM\JoinColumn(name="building", referencedColumnName="id")
     */
    private $building;

    /**
     * @ORM\ManyToOne(targetEntity="App\Entity\Coin", inversedBy="recipes")
     * @ORM\JoinColumn(name="coin", referencedColumnName="id")
     */
    private $coin;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecipeOutput", mappedBy="recipe")
     * @ORM\JoinColumn(name="recipe", referencedColumnName="id")
     */
    private $recipeOutputs;

    /**
     * @ORM\OneToMany(targetEntity="App\Entity\RecipeIngredient", mappedBy="recipe")
     */
    private $recipeIngredients;

    /**
     * @ORM\Column(type="integer")
     */
    private $cost;

    public function __construct()
    {
        $this->recipeOutputs = new ArrayCollection();
        $this->recipeIngredients = new ArrayCollection();
    }
   
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

    /**
     * @return Collection|RecipeOutput[]
     */
    public function getRecipeOutputs(): Collection
    {
        return $this->recipeOutputs;
    }

    public function addRecipeOutput(RecipeOutput $recipeOutput): self
    {
        if (!$this->recipeOutputs->contains($recipeOutput)) {
            $this->recipeOutputs[] = $recipeOutput;
            $recipeOutput->setRecipeId($this);
        }

        return $this;
    }

    public function removeRecipeOutput(RecipeOutput $recipeOutput): self
    {
        if ($this->recipeOutputs->contains($recipeOutput)) {
            $this->recipeOutputs->removeElement($recipeOutput);
            // set the owning side to null (unless already changed)
            if ($recipeOutput->getRecipeId() === $this) {
                $recipeOutput->setRecipeId(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|RecipeIngredient[]
     */
    public function getRecipeIngredients(): Collection
    {
        return $this->recipeIngredients;
    }

    public function addRecipeIngredient(RecipeIngredient $recipeIngredient): self
    {
        if (!$this->recipeIngredients->contains($recipeIngredient)) {
            $this->recipeIngredients[] = $recipeIngredient;
            $recipeIngredient->setRecipe($this);
        }

        return $this;
    }

    public function removeRecipeIngredient(RecipeIngredient $recipeIngredient): self
    {
        if ($this->recipeIngredients->contains($recipeIngredient)) {
            $this->recipeIngredients->removeElement($recipeIngredient);
            // set the owning side to null (unless already changed)
            if ($recipeIngredient->getRecipe() === $this) {
                $recipeIngredient->setRecipe(null);
            }
        }

        return $this;
    }

    public function getItem(): ?Item
    {
        return $this->item;
    }

    public function setItem(?Item $item): self
    {
        $this->item = $item;

        // set (or unset) the owning side of the relation if necessary
        $newRecipe = $item === null ? null : $this;
        if ($newRecipe !== $item->getRecipe()) {
            $item->setRecipe($newRecipe);
        }

        return $this;
    }

    public function getCost(): ?int
    {
        return $this->cost;
    }

    public function setCost(int $cost): self
    {
        $this->cost = $cost;

        return $this;
    }

}
