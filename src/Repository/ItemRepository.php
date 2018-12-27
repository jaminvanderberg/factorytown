<?php

namespace App\Repository;

use App\Entity\Item;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Item|null find($id, $lockMode = null, $lockVersion = null)
 * @method Item|null findOneBy(array $criteria, array $orderBy = null)
 * @method Item[]    findAll()
 * @method Item[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ItemRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Item::class);
    }

    /**
     * @return Item[] Returns an array of Item objects
     */
    
    public function getAllByCategory()
    {
        return $this->createQueryBuilder('i')
            ->join('i.category', 'c')
            ->orderBy('c.ordering', 'ASC')
            ->getQuery()
            ->getResult()
        ;
    }
    
    /**
     * @return array Returns an array of arrays
     */
    public function getFlat() {
        $array = $this->getEntityManager()->createQuery(
            "SELECT i.id, i.name, i.image, i.ordering,\n"
            . "  c.name AS category_name, i.percent, c.image AS category_image, c.ordering AS category_ordering,\n"
            . "  co.name AS coin_name, co.image AS coin_image, i.sell, co.ordering AS coin_ordering\n"
            . "FROM App:Item i LEFT JOIN i.category c LEFT JOIN i.coin co"
        )->getResult();
        $ret = array();
        foreach($array as $item) {
            $ret[$item['id']] = $item;
        }
        return $ret;
    }

    /*
    public function findOneBySomeField($value): ?Item
    {
        return $this->createQueryBuilder('i')
            ->andWhere('i.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
