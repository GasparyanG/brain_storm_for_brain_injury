<?php


namespace App\Services\Validation\General;


class CookieEnum
{
    // Keys
    const USER_COOKIE_KEY = "user_cookie";

    // Expiration Time
    const USER_COOKIE_EXPIRE = 60 * 60 * 24 * 30 * 6;    // Half Year.

    public static function setUsersCookie(string $cookie, bool $update = false): void
    {
        if (!$update)
            setcookie(self::USER_COOKIE_KEY, $cookie, time()  + self::USER_COOKIE_EXPIRE);
        else
            setcookie(self::USER_COOKIE_KEY, $cookie, time()  + self::USER_COOKIE_EXPIRE, "/");
    }
}