<?php
// Ruta al archivo JSON
$json_file = '/home/tuusuario/private/users.json';

// Lee y muestra el contenido del archivo JSON
if (file_exists($json_file)) {
    header('Content-Type: application/json');
    readfile($json_file);
} else {
    echo 'Error: El archivo no existe.';
}
?>
