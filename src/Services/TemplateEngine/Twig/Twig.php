<?php


namespace App\Services\TemplateEngine\Twig;


use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class Twig
{
    /**
     * @var Environment
     */
    private $twig;

    public function __construct()
    {
        $loader = new FilesystemLoader(__DIR__ . '/html');
        $this->twig = new Environment($loader, []);

        $this->twig->addExtension(new AppExtension());
    }

    public function render($name, array $context = []): string
    {
        return $this->twig->render($name,$context);
    }
}