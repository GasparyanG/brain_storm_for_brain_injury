<?php

namespace App\Database;

use Doctrine\ORM\EntityManager;
use Doctrine\ORM\Tools\Setup;

class Connection
{
    private static ?EntityManager $entityManager = null;

    public static function getEntityManager(): EntityManager
    {
        $paths = array(__DIR__. '/Entities');
        $isDevMode = false;

        $databaseCredentials = json_decode(file_get_contents(__DIR__ . "/../../config/database.json"), true);

        // the connection configuration
        $dbParams = array(
            "driver" => self::getDatabaseDriver($databaseCredentials),
            "host" => self::getDatabaseHost($databaseCredentials),
            "port" => self::getDatabasePort($databaseCredentials),
            "dbname" => self::getDatabaseName($databaseCredentials),
            "user" => self::getDatabaseUser($databaseCredentials),
            "password" => self::getDatabasePassword($databaseCredentials)
        );

        $config = Setup::createAnnotationMetadataConfiguration($paths, $isDevMode);
        $config->setProxyDir(__DIR__ . "/Proxies");

        // More than one database connection is like killing a bunch of people.
        if (!self::$entityManager) {
            self::$entityManager = EntityManager::create($dbParams, $config);
        }
        return self::$entityManager;
    }

    private static function getCurrentConnectionKey(array $databaseCredentials): string
    {
        return $databaseCredentials['in_use'];
    }

    public static function getDatabaseName(array $databaseCredentials): string
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['dbname'];
    }

    public static function getDatabaseHost(array $databaseCredentials): string
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['host'];
    }

    /**
     * @param array $databaseCredentials
     * @return string|int
     */
    public static function getDatabasePassword(array $databaseCredentials)
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['password'];
    }

    public static function getDatabasePort(array $databaseCredentials): int
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['port'];
    }

    public static function getDatabaseUser(array $databaseCredentials): string
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['user'];
    }

    public static function getDatabaseDriver(array $databaseCredentials): string
    {
        $currentConnectionKey = self::getCurrentConnectionKey($databaseCredentials);
        return $databaseCredentials[$currentConnectionKey]['driver'];
    }
}