<?php

namespace App\Repository;

use App\Entity\Coin;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method Coin|null find($id, $lockMode = null, $lockVersion = null)
 * @method Coin|null findOneBy(array $criteria, array $orderBy = null)
 * @method Coin[]    findAll()
 * @method Coin[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CoinRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Coin::class);
    }

    /**
     * @return array Returns an array of arrays
     */
    public function getFlat() {
        return $this->getEntityManager()->createQuery(
            "SELECT c.id, c.name, c.image, c.class, c.ordering\n"
            . "FROM App:Coin c\n"
            . "ORDER BY c.ordering"
        )->getResult();
    }    


    // /**
    //  * @return Coin[] Returns an array of Coin objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('c.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?Coin
    {
        return $this->createQueryBuilder('c')
            ->andWhere('c.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
