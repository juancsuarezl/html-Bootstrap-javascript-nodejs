<?php

	$destino= juancsuarezl@gmail.com;
	$nombre= $_POST["nombre"];
	$telefono= $_POST["telefono"];
	$email= $_POST["email"];
	$mensaje= $_POST["mensaje"];
	$contenido= "Nombre:" . $nombre "\nTeléfono: " . $telefono . "\nCorreo Electrónico: " . $email "\nMensaje: " . $mensaje ;
	mail($destino, "Contacto", $contenido);
	//header("Location:gracias.html");

?>