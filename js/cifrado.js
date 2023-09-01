// Limpiar el texto de entrada
function limpiarTexto(texto) {
  var mapaCaracteres = {
      "á": "a", "é": "e", "í": "i", "ó": "o", "ú": "u", "ü": "u",
      "Á": "A", "É": "E", "Í": "I", "Ó": "O", "Ú": "U", "Ü": "U",
  };
  var expresionRegular = /[\s.,\/#!$%\^&\*;:{}=\-_`~()\n0-9]/g;

  function reemplazo(caracter) {
      return mapaCaracteres[caracter] || caracter;
  }
  return texto.replace(expresionRegular, "")
      .replace(/[áéíóúüÁÉÍÓÚÜ]/g, reemplazo).
      toUpperCase();
}

// Verifica si dos números so coprimos
function sonCoprimos(numero) {
  function calcularMCD(a, b) {
      return b === 0 ? a : calcularMCD(b, a % b);
  }
  return calcularMCD(numero, 27) === 1;
}

// Calcular la frecuencia de caracteres en un texto
function frecuencia(texto) {
  var frecuencia = {};
  var caracteres = texto.split('');
  var totalvarras = 0;
  for (var i = 0; i < caracteres.length; i++) {
      var varra = caracteres[i];
      if (varra in frecuencia) {
          frecuencia[varra]++;
      } else {
          frecuencia[varra] = 1;
      }
      totalvarras++;
  }
  var frecuenciaOrdenada = Object.entries(frecuencia).sort((a, b) => b[1] - a[1]);
  var frecuenciaOrdenadaString = "";
  var frecuenciaOrdenadaString2 = "";
  for (var i = 0; i < frecuenciaOrdenada.length; i++) {
      var frecuenciaAbsoluta = frecuenciaOrdenada[i][1];
      frecuenciaOrdenadaString += `${frecuenciaOrdenada[i][0]}:${frecuenciaOrdenada[i][1]}\n`;
      var frecuenciaRelativa = (frecuenciaAbsoluta / totalvarras * 100).toFixed(2);
      frecuenciaOrdenadaString2 += `${frecuenciaOrdenada[i][0]}:${frecuenciaRelativa}%\n`;
  }
  var varra1 = frecuenciaOrdenada[0][0];
  var varra2 = frecuenciaOrdenada[1][0];

  return { varra1, varra2, frecuenciaOrdenadaString, frecuenciaOrdenadaString2, totalvarras, frecuencia };
}

// Calcular el inverso modular de un número
function inverso(a, m) {
  for (var x = 1; x < m; x++) {
      if ((a * x) % m === 1) {
          return x
      }
  }
  return 1;
}

// Realizar el cifrado afín
function cifrado(plaintext, a, b) {
  if (sonCoprimos(a) === true) {
      var ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
      var m = ALPHABET.length;
      var ciphertext = '';
      for (var i = 0; i < plaintext.length; i++) {
          var char = plaintext[i];
          var index = ALPHABET.indexOf(char);
          if (index === -1) {
              ciphertext += char;
          } else {
              var encryptedIndex = (a * index + b) % m;
              var encryptedChar = ALPHABET[encryptedIndex];
              ciphertext += encryptedChar;
          }
      }
      return ciphertext;
  } else {
      alert("A y el módulo 27 no son coprimos, ingrese un valor de A valido.")
  }
}

// Realizar el descifrado afín
function descifrado(ciphertext, varra1, varra2) {
  var ALPHABET = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  var m = ALPHABET.length;
  var b = ALPHABET.indexOf(varra2);
  var a = (ALPHABET.indexOf(varra1) - b) * inverso(4, 27) % m;
  if (a < 0) {
      a = a + 27;
  }
  var invA = inverso(a, m);
  var plaintext = '';
  for (var i = 0; i < ciphertext.length; i++) {
      var char = ciphertext[i];
      var index = ALPHABET.indexOf(char);
      if (index === -1) {
          plaintext += char;
      } else {
          var decryptedIndex = (invA * (index - b + m)) % m;
          var decryptedChar = ALPHABET[decryptedIndex];
          plaintext += decryptedChar;
      }
  }
  var b1 = ALPHABET.indexOf(varra1);
  var a1 = (ALPHABET.indexOf(varra2) - b1) * inverso(4, 27) % m;
  if (a1 < 0) {
      a1 = a1 + 27;
  }
  var invA1 = inverso(a1, m);
  var plaintext2 = '';
  for (var i = 0; i < ciphertext.length; i++) {
      var char = ciphertext[i];
      var index = ALPHABET.indexOf(char);
      if (index === -1) {
          plaintext2 += char;
      } else {
          var decryptedIndex = (invA1 * (index - b1 + m)) % m;
          var decryptedChar = ALPHABET[decryptedIndex];
          plaintext2 += decryptedChar;
      }
  }
  return { plaintext, plaintext2 };
}


// Función para recoger texto cifrado del formulario y mostrar resultado
function recogerTextoCifrado() {

  var text = document.getElementById("texto-original").value;
  var lim = limpiarTexto(text);

  var a = document.getElementById("a_Cifrado").value;
  var a2 = parseInt(a, 10);
  var b = document.getElementById("b_Cifrado").value;
  var b2 = parseInt(b, 10);

  var cif = cifrado(lim, a2, b2);
  document.getElementById("texto-cifrado").value = cif;
}

// Función para recoger texto cifrado y mostrar resultado descifrado
function recogerTextoDescifrado() {
  var cif = document.getElementById("texto-cifrado2").value;
  // Elimina los espacios del texto cifrado
  var cifSinEspacios = cif.replace(/\s/g, "");

  var fre = frecuencia(cifSinEspacios);
  var des = descifrado(cifSinEspacios, fre.varra1, fre.varra2);

  document.getElementById("texto-descifrado").value = des.plaintext;
  
  var mensajeEstadisticas = `El criptograma es de ${fre.totalvarras} caracteres; las dos letras más frecuentes son ` +
  `la ${fre.varra1} que aparece ${fre.frecuencia[fre.varra1]} veces con un ${fre.frecuenciaOrdenadaString2.split('\n')[1]}, ` +
  `y la ${fre.varra2} que aparece ${fre.frecuencia[fre.varra2]} veces con un ${fre.frecuenciaOrdenadaString2.split('\n')[2]}.`;
  
  document.getElementById("texto-estadisticas").value = mensajeEstadisticas;

  var ctx = document.getElementById("graficoFrecuencias").getContext("2d");
  var letras = Object.keys(fre.frecuencia);
  var frecuencias = Object.values(fre.frecuencia);

  var myChart = new Chart(ctx, {
      type: "bar",
      data: {
          labels: letras,
          datasets: [
              {
                  label: "Frecuencia de Letras",
                  data: frecuencias,
                  backgroundColor: "rgba(11, 188, 217, 1)",
                  borderColor: "rgba(255, 255, 255, 1)",
                  borderWidth: 1,
              },
          ],
      },
  });

}