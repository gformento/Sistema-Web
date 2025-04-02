document.addEventListener("DOMContentLoaded", function () {
  mostrarRegistros();
  document
    .getElementById("guardarBtn")
    .addEventListener("click", guardarRegistro);
});


function mostrarSeccion(seccion) {
    document.querySelectorAll('main section').forEach(section => {
        section.style.display = 'none';
    });
    const target = document.getElementById(seccion);
    if (target) {
        target.style.display = 'block';
    }
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
function guardarRegistro() {
  let nombre = document.getElementById("nombre").value;
  let email = document.getElementById("email").value;
  let editIndex = document.getElementById("editIndex").value;
  let registros = JSON.parse(localStorage.getItem("registros")) || [];

  if (editIndex) {
    registros[editIndex] = { nombre, email };
  } else {
    registros.push({ nombre, email });
  }

  localStorage.setItem("registros", JSON.stringify(registros));
  document.getElementById("dataForm").reset();
  document.getElementById("editIndex").value = "";
  mostrarRegistros();
}

function mostrarRegistros() {
  let registros = JSON.parse(localStorage.getItem("registros")) || [];
  let dataTable = document.getElementById("dataTable");
  dataTable.innerHTML = "";

  registros.forEach((registro, index) => {
    let row = dataTable.insertRow();
    row.innerHTML = `<td>${registro.nombre}</td><td>${registro.email}</td>
            <td>
                <button onclick="editarRegistro(${index})">Editar</button>
                <button onclick="eliminarRegistro(${index})">Eliminar</button>
            </td>`;
  });
}

function editarRegistro(index) {
  let registros = JSON.parse(localStorage.getItem("registros"));
  document.getElementById("nombre").value = registros[index].nombre;
  document.getElementById("email").value = registros[index].email;
  document.getElementById("editIndex").value = index;
  mostrarSeccion("nuevoRegistro");
}

function eliminarRegistro(index) {
  let registros = JSON.parse(localStorage.getItem("registros"));
  registros.splice(index, 1);
  localStorage.setItem("registros", JSON.stringify(registros));
  mostrarRegistros();
}

function guardarRegistro() {
  let nombre = document.getElementById("nombre").value.trim();
  let email = document.getElementById("email").value.trim();
  let editIndex = document.getElementById("editIndex").value;
  let registros = JSON.parse(localStorage.getItem("registros")) || [];

  // Expresiones regulares para validación
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let nombreRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/;

  // Validar nombre
  if (!nombreRegex.test(nombre)) {
    alert("El nombre solo puede contener letras y espacios.");
    return;
  }

  // Validar email
  if (!emailRegex.test(email)) {
    alert("Ingrese un email válido.");
    return;
  }

  // Validar que no haya registros duplicados
  let existe = registros.some(
    (registro) => registro.nombre === nombre || registro.email === email
  );
  if (existe && editIndex === "") {
    alert("El nombre o email ya están registrados.");
    return;
  }

  if (editIndex) {
    registros[editIndex] = { nombre, email };
  } else {
    registros.push({ nombre, email });
  }

  localStorage.setItem("registros", JSON.stringify(registros));
  document.getElementById("dataForm").reset();
  document.getElementById("editIndex").value = "";
  mostrarRegistros();

  // Redirigir automáticamente a la sección de registros
  mostrarSeccion("verRegistros");


}
