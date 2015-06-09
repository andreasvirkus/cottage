<?php
    if($_POST && $_POST['url'] == ''){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $message = $_POST['message'];

        mail("andreas.virkus@gmail.com", "CV mail - " .$name, 
             "Nimi: ".$name. "\nE-mail: " .$email. 
             "\n\n----------------------\n" .$message);
    }
?>