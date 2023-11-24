<?php
// Ruta al archivo JSON
$json_file = '/var/www/usuarios/usuarios.json';

// Lee y muestra el contenido del archivo JSON
if (file_exists($json_file)) {
    header('Content-Type: application/json');
    readfile($json_file);
} else {
    echo 'Error: El archivo no existe.';
}
?>
