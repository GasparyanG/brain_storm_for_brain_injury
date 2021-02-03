<?php


namespace App\Services\Mailer;


use App\Database\Entities\User;
use App\Middlewares\RoutingMiddleware;
use App\Services\TemplateEngine\Twig\Twig;
use PHPMailer\PHPMailer\PHPMailer;

class EmailVerification
{
    // EMAIL STRUCTURE
    const SUBJECT = "Email Verification";
    const BODY_FILE = "/emails/email_verification.html.twig";

    // TWIG KEYS
    const VALIDATION_HASH = "validation_hash";

    private User $user;
    private PHPMailer $mail;

    public function __construct(User $user)
    {
        $this->user = $user;
        $this->mail = (new Mailer())->getMail();
    }

    public function verify(): bool
    {
        $hash = $this->user->getValidationHash();

        $this->mail->Subject = self::SUBJECT;

        try {
            $this->mail->addAddress($this->user->getEmailAddress(), $this->user->getName());
            $this->mail->isHTML(true);
            $this->mail->Body = (
                    new Twig())->render(self::BODY_FILE,
                        [
                            RoutingMiddleware::VERIFICATION_URL_KEY => RoutingMiddleware::VERIFICATION_URL,
                            self::VALIDATION_HASH => $this->user->getValidationHash()
                        ]
                );

            $this->mail->send();
        } catch (\Exception $e) {
            return false;
        }

        return true;
    }
}