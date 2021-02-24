<?php
require 'PHPMailerAutoload.php';

$mail = new PHPMailer(true);

try {
    $username    = $_POST['username'];
    $email       = $_POST['email'];
    $description = $_POST['description'];

    $body =
        "<strong>Name:</strong> " . $username . "<br/>" .
        "<strong>Email Address:</strong> " . $email . "<br/>" .
        "<strong>Description:</strong> " . $description . "<br/>" . 
        "-------------" . "<br/>" . "This e-mail was sent from pedroarantes.com" . 
        "<br/>" . "<strong>" . date("h:m:i d/m/Y") . "</strong>";

    $mail->isSMTP();
    $mail->Host = gethostbyname('smtp.gmail.com');
    $mail->Port = 587;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->SMTPAuth = true;
    $mail->Username = 'example@gmail.com';
    $mail->Password = 'password';
    $mail->setfrom($email);
    $mail->addaddress('example@gmail.com');
    $mail->Subject = 'Hire me email from pedroarantes.com';
    $mail->msgHTML($body);
    $mail->send();
    echo "<strong>Success! </strong> Thank you.";
} catch (phpmailerException $e) {
    echo $e->errorMessage();
} catch (Exception $e) {
    echo $e->getMessage();
}
