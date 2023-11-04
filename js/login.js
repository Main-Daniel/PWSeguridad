var FormularioLogin = document.getElementById("FormLogin");
var BotonIngresar = document.getElementById("Ingresar");

// Recuperar número de intentos desde el almacenamiento local
var Intentos = parseInt(localStorage.getItem("intentos")) || 0;
var TiempoEsp = parseInt(localStorage.getItem("tiempoesp")) || 0;

// Cargar los usuarios desde el archivo de configuración
fetch('data/usuarios.json').then(response => response.json()).then(data => {

    var usuarios = data.usuarios;

    FormularioLogin.addEventListener("submit", function (event) {
        event.preventDefault();
        var usuario = document.getElementById("Usuario").value;
        var clave = document.getElementById("Clave").value;

        // Verificar si las credenciales coinciden con los usuarios del archivo de configuración
        var usuarioValido = usuarios.find(u => u.usuario === usuario && u.clave === clave);

        if (usuarioValido) {
            // Inicio de sesión exitoso
            Intentos = 0;
            TiempoEsp = 0;
            localStorage.setItem("intentos", Intentos.toString());
            localStorage.setItem("tiempoesp", TiempoEsp.toString());
            alert("Ingreso exitoso")
            window.location.href = "cifrado.html";
        } else {
            // Manejar intentos fallidos y tiempos de espera como en tu código anterior
            Intentos++;

            if (Intentos <= 4) {
                var mensaje = "Inicio de sesión incorrecto.\nLlevas " + Intentos + " intento";
                if (Intentos > 1) {
                    mensaje += "s"; // Agregar "s" si el número de intentos es mayor que 1
                }
                alert(mensaje);
            } else if (Intentos == 5) {
                TiempoEsp = 5
                alert("Intentos agotados. Espera 5 segundos");
                iniciarTemporizador(TiempoEsp);
            } else if (Intentos > 5 && Intentos < 10) {
                TiempoEsp = TiempoEsp + 10;
                alert(`Intentos agotados. Espere ${TiempoEsp} segundos`);
                iniciarTemporizador(TiempoEsp);
            } else if (Intentos == 10) {
                TiempoEsp = 3600;
                alert(`Demasiados Intentos. Espere ${TiempoEsp} segundos`);
                iniciarTemporizador(TiempoEsp);
            } else if (Intentos > 10) {
                TiempoEsp = TiempoEsp + 1800;
                alert(`Demasiados Intentos. Espere ${TiempoEsp} segundos`);
                iniciarTemporizador(TiempoEsp);
            }

            // Guardar el número de intentos y el tiempo en el almacenamiento local
            localStorage.setItem("intentos", Intentos.toString());
            localStorage.setItem("tiempoesp", TiempoEsp.toString());
        }
    });
}).catch(error => console.error('Error al cargar usuarios', error));

// Función para iniciar el temporizador
function iniciarTemporizador(segundos) {
    BotonIngresar.disabled = true; // Inhabilita el botón
    var tiempoRestante = segundos;

    function actualizarBoton() {
        if (tiempoRestante > 0) {
            BotonIngresar.textContent = `Espere ${tiempoRestante} segundos`;
            tiempoRestante--;
            setTimeout(actualizarBoton, 1000);
        } else {
            BotonIngresar.textContent = "Ingresar";
            BotonIngresar.disabled = false;
        }
    }

    actualizarBoton();
}

// Restaurar el número de intentos si se encuentra en el almacenamiento local
if (Intentos > 0 && TiempoEsp > 0) {
    alert(`Intentos = ${this.Intentos} . Tiempo = ${this.TiempoEsp} segundos`)
    iniciarTemporizador(TiempoEsp); // Inicia el temporizador si se encontraron intentos en el almacenamiento local
}