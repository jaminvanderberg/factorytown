<?php
namespace App\Controller;

use App\Entity\Item;
use App\Entity\Recipe;
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

        return $this->render('calculator/default.html.twig', [
            'items' => $items, 'recipes' => $recipes
        ]);
    }

    /**
     * @Route("/item/{id}", name="item")
     */
    public function item($id) {
        return $this->render('item/default.html.twig', ['id' => $id]);
    }
}