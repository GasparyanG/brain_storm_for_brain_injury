<?php

namespace App\Services\Mailer;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;

class Mailer
{
    // Path to configuration file.
    const MAIL_CONFIG_FILE = __DIR__ . "/../../../config/mail.json";

    // Configuration Keys.
    const FROM = "from";
    const FROM_NAME = "from_name";
    const ACTIVATE_ERRORS = "activate_errors";
    const PORT = "port";
    const USERNAME = "username";
    const PASSWORD = "password";
    const HOST = "host";

    private array $mailConfiguration;
    private PHPMailer $mail;

    public function __construct()
    {
        // Get Configuration.
        $this->mailConfiguration =
            json_decode(file_get_contents(self::MAIL_CONFIG_FILE), true);

        $this->configureMailer(); // Configure.
    }

    private function configureMailer(): void
    {
        $this->mail = new PHPMailer($this->mailConfiguration[self::ACTIVATE_ERRORS]);  // True is responsible for error activation.
        $this->mail->Username = $this->mailConfiguration[self::USERNAME];
        $this->mail->Host = $this->mailConfiguration[self::HOST];
        $this->mail->Password = $this->mailConfiguration[self::PASSWORD];

        // SMTP CONFIGURATION
        $this->mail->isSMTP();
        // $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $this->mail->SMTPAuth = true;
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

        $this->mail->From = $this->mailConfiguration[self::FROM];
        $this->mail->FromName = $this->mailConfiguration[self::FROM_NAME];
    }

    public function getMail(): PHPMailer
    {
        return $this->mail;
    }
}