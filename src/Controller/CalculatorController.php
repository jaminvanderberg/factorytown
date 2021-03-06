<?php
namespace App\Controller;

use App\Entity\Coin;
use App\Entity\Item;
use App\Entity\Recipe;
use App\Entity\Category;
use App\Entity\RecipeOutput;
use App\Entity\RecipeIngredient;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CalculatorController extends AbstractController {
    /**
     * @Route("/calculator", name="calculator")
     */
    public function calc() {
        //$items = $this->getDoctrine()->getRepository(Item::class)->findAll();
        $items = $this->getDoctrine()->getRepository(Item::class)->getFlat();
        $recipes = $this->getDoctrine()->getRepository(Recipe::class)->getFlat();
        $ingredients = $this->getDoctrine()->getRepository(RecipeIngredient::class)->getFlat();
        $output = $this->getDoctrine()->getRepository(RecipeOutput::class)->getFlat();
        $category = $this->getDoctrine()->getRepository(Category::class)->getFlat();
        $coin = $this->getDoctrine()->getRepository(Coin::class)->getFlat();
        
        $itemdata = array();
        foreach($items as $item) {
            $itemdata[$item['id']] = $item;
        }
        $recipedata = array();
        foreach($recipes as $recipe) {
            $recipe['ingredients'] = array();
            $recipe['output'] = array();
            $recipedata[$recipe['id']] = $recipe;
        }
        foreach($ingredients as $ingredient) {
            $recipedata[$ingredient['recipe']]['ingredients'][] = $ingredient;
        }
        foreach($output as $out) {
            $recipedata[$out['recipe']]['output'][] = $out;
        }

        return $this->render('calculator/default.html.twig', [
            'items' => $itemdata, 'recipes' => $recipedata,
            'categories' => $category, 'coins' => $coin
        ]);
    }

    /**
     * @Route("/item/{id}", name="item")
     */
    public function item($id) {
        return $this->render('item/default.html.twig', ['id' => $id]);
    }
}