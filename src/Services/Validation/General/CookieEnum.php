<?php


namespace App\Services\Validation\General;


class CookieEnum
{
    // Keys
    const USER_COOKIE_KEY = "user_cookie";

    // Expiration Time
    const USER_COOKIE_EXPIRE = 60 * 60 * 24 * 2;    // Two days.

    public static function setUsersCookie(string $cookie): void
    {
        setcookie(self::USER_COOKIE_KEY, $cookie, self::USER_COOKIE_EXPIRE);
    }
}