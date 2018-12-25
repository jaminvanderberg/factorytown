<?php
namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use App\Entity\Item;
use App\Entity\Category;
use App\Entity\Coin;

class CalculatorController extends AbstractController {
    /**
     * @Route("/calculator", name="calculator")
     */
    public function calc() {
        //$items = $this->getDoctrine()->getRepository(Item::class)->findAll();
        $items = $this->getDoctrine()->getRepository(Item::class)->getAllByCategory();
        $flat = $this->getDoctrine()->getEntityManager()->createQuery(
            "SELECT i.id, i.name, i.image, i.ordering,\n"
            . "  c.name AS category_name, i.percent, c.image AS category_image, c.ordering AS category_ordering,\n"
            . "  co.name AS coin_name, co.image AS coin_image, i.sell, co.ordering AS coin_ordering\n"
            . "FROM App:Item i LEFT JOIN i.category c LEFT JOIN i.coin co"
        )->getResult();

        return $this->render('calculator/default.html.twig', [
            'items' => $items, 'flat' => $flat
        ]);
    }

    /**
     * @Route("/item/{id}", name="item")
     */
    public function item($id) {
        return $this->render('item/default.html.twig', ['id' => $id]);
    }

    /**
     * @Route("/get/{id}", name="get")
     */
    public function get($id) {
        $sql = "WITH RECURSIVE cte AS (\n"
            . "  SELECT ro1.item, ro1.qty, ro1.recipe, r1.building, (r1.time / ro1.qty) as time, r1.fuel, 1 AS lvl, CAST(ro1.item AS CHAR(255)) AS path, r1.id AS parent, 1.00 AS per, r1.time / ro1.qty as critical_time\n"
            . "  FROM recipe_output AS ro1\n"
            . "    LEFT JOIN recipe AS r1 ON ro1.recipe = r1.id\n"
            . "      WHERE ro1.item = :id\n"
            . "\n"
            . "  UNION ALL\n"
            . "\n"
            . "  SELECT ri.item, ri.qty, ri.recipe, r.building, r.time, r.fuel, lvl + 1, CONCAT(path, '.', ri.item), r.id AS parent, r.time / (cte.critical_time / ri.qty * ro.qty), cte.critical_time / ri.qty * ro.qty\n"
            . "    FROM recipe AS r\n"
            . "      INNER JOIN recipe_output AS ro ON ro.recipe = r.id\n"
            . "      INNER JOIN recipe_ingredient AS ri ON ri.item = ro.item\n"
            . "      INNER JOIN cte ON ri.recipe = cte.parent\n"
            . ")\n"
            . "SELECT lvl, path, qty, time, critical_time, per, b.name AS building, b.image AS building_image, i.name AS item, i.image AS item_image FROM cte\n"
            . "  LEFT JOIN building AS b ON b.id = building\n"
            . "  LEFT JOIN item AS i ON i.id = item\n"
            . "ORDER BY path";

        $conn = $this->getDoctrine()->getEntityManager()->getConnection();
        
        $query = $conn->prepare($sql);
        $query->execute(['id' => $id]);
        $results = $query->fetchAll();

        return new JsonResponse($this->createTree($results));
    }

    function createTree(&$results, $level = 1) {
        $tree = array();

        while($result = array_shift($results)) {
            if ($result['lvl'] != $level) {
                array_unshift($results, $result);
                return $tree;
            }

            $ob = new \stdClass();
            $ob->path = $result['path'];
            $ob->text = '<div class="row w-100">'
                    . '<div class="col">' . $result['qty'] . 'x <img src="/image/item/' . $result['item_image'] . '"> '. $result['item'] . ' (1/' . floatval($result['critical_time']) . 'sec)</div>' 
                    . '<div style="position: fixed; left: 50%">' . floatval($result['per']) . 'x <img src="/image/building/' . $result['building_image'] . '"> ' . $result['building'] . ' (' . floatval($result['time']) . 'sec)</div>'
                . '';

            $next = reset($results);
            if ($next['lvl'] > $result['lvl']) {
                $ob->children = $this->createTree($results, $next['lvl']);
            }

            $tree[] = $ob;
        }

        return $tree;
    }
}