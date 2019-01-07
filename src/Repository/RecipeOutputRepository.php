<?php

namespace App\Repository;

use App\Entity\RecipeOutput;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

/**
 * @method RecipeOutput|null find($id, $lockMode = null, $lockVersion = null)
 * @method RecipeOutput|null findOneBy(array $criteria, array $orderBy = null)
 * @method RecipeOutput[]    findAll()
 * @method RecipeOutput[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class RecipeOutputRepository extends ServiceEntityRepository
{
    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, RecipeOutput::class);
    }

   /**
     * @return array Returns an array of arrays
     */
    public function getFlat() {
        return $this->getEntityManager()->createQuery(
            "SELECT r.id AS recipe, i.id AS item, ro.qty,\n"
            . "  i.name AS item_name, i.image AS item_image, i.fuel\n"
            . "FROM App:RecipeOutput ro LEFT JOIN ro.recipe r LEFT JOIN ro.item i"
        )->getResult();
    }    

    // /**
    //  * @return RecipeOutput[] Returns an array of RecipeOutput objects
    //  */
    /*
    public function findByExampleField($value)
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->orderBy('r.id', 'ASC')
            ->setMaxResults(10)
            ->getQuery()
            ->getResult()
        ;
    }
    */

    /*
    public function findOneBySomeField($value): ?RecipeOutput
    {
        return $this->createQueryBuilder('r')
            ->andWhere('r.exampleField = :val')
            ->setParameter('val', $value)
            ->getQuery()
            ->getOneOrNullResult()
        ;
    }
    */
}
