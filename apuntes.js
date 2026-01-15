// Variables globales para almacenar los datos
let listaOriginal = [];
let titulosData = {};

// Primero cargar ambos archivos
Promise.all([
  fetch("apuntes.json").then(r => r.json()),
  fetch("titulos.json").then(r => r.json())
])
.then(([apuntes, titulos]) => {
  listaOriginal = apuntes;
  titulosData = titulos;
  
  console.log("Datos cargados:", {
    apuntes: listaOriginal.length,
    titulos: titulosData
  });
  
  // Renderizar la tabla completa inicialmente
  renderizarTabla(listaOriginal);
  
  // Agregar event listeners para los filtros
  setupFiltros();
})
.catch(e => {
  console.error("Error al cargar los archivos:", e);
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = `
    <tr>
      <td colspan="7">Error al cargar los datos. Verifica que los archivos existan.</td>
    </tr>
  `;
});

// Función para renderizar la tabla
function renderizarTabla(lista) {
  const tbody = document.querySelector("#tabla tbody");
  tbody.innerHTML = ""; // Limpiar tabla
  
  if (lista.length === 0) {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td colspan="7" style="text-align: center; color: rgba(255, 255, 255, 0.6); padding: 20px;">
        No se encontraron apuntes que coincidan con el filtro.
      </td>
    `;
    tbody.appendChild(tr);
    return;
  }
  
  // Ordenar primero por área y luego por el campo "orden"
  const listaOrdenada = [...lista].sort((a, b) => {
    // Primero comparar por área
    if (a.area < b.area) return -1;
    if (a.area > b.area) return 1;
    
    // Si el área es igual, comparar por el campo "orden"
    const ordenA = parseInt(a.orden) || 0;
    const ordenB = parseInt(b.orden) || 0;
    
    return ordenA - ordenB;
  });
  
  let currentArea = null;
  
  // Recorrer lista ordenada y agregar separadores de área
  listaOrdenada.forEach(d => {
    // Si cambiamos de área, agregar un separador
    if (d.area !== currentArea) {
      currentArea = d.area;
      
      // Crear fila separadora para el área
      const separatorRow = document.createElement("tr");
      separatorRow.className = "area-separator";
      separatorRow.innerHTML = `
        <td colspan="7">📁 ${currentArea}</td>
      `;
      tbody.appendChild(separatorRow);
    }
    
    // Agregar la fila normal del apunte
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.orden}</td>
      <td>${d.titulo}</td>
      <td><a href="${d.archivo}" target="_blank" rel="noopener">${d.contenido}</a></td>
      <td>${d.area}</td>
      <td>${d.nivel}</td>
      <td>${d.estado}</td>
      <td>${d.fecha}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Función para configurar los filtros
function setupFiltros() {
  // Agregar event listeners a todos los botones con data-filtro
  document.querySelectorAll('[data-filtro]').forEach(boton => {
    boton.addEventListener('click', (e) => {
      e.preventDefault();
      const filtroKey = e.target.dataset.filtro;
      console.log(`Filtro aplicado: ${filtroKey}`);
      aplicarFiltro(filtroKey);
      
      // Agregar feedback visual
      document.querySelectorAll('[data-filtro]').forEach(b => {
        b.classList.remove('active');
      });
      e.target.classList.add('active');
    });
  });
  
  console.log("Filtros configurados correctamente");
}

// Función para aplicar el filtro
function aplicarFiltro(filtroKey) {
  console.log("Aplicando filtro:", filtroKey);
  console.log("Datos de títulos disponibles:", titulosData);
  
  if (!filtroKey || filtroKey === "todos") {
    // Mostrar todos los apuntes
    console.log("Mostrando todos los apuntes");
    renderizarTabla(listaOriginal);
    return;
  }
  
  // Obtener la lista de títulos permitidos para este filtro
  const titulosPermitidos = titulosData[filtroKey];
  
  console.log(`Títulos permitidos para "${filtroKey}":`, titulosPermitidos);
  
  if (!titulosPermitidos) {
    console.error(`Filtro "${filtroKey}" no encontrado en titulos.json`);
    console.log("Claves disponibles:", Object.keys(titulosData));
    return;
  }
  
  // Filtrar la lista original
  const listaFiltrada = listaOriginal.filter(apunte => {
    const incluye = titulosPermitidos.includes(apunte.titulo);
    console.log(`¿"${apunte.titulo}" está en la lista? ${incluye}`);
    return incluye;
  });
  
  console.log(`Resultados del filtro "${filtroKey}":`, listaFiltrada.length, "apuntes encontrados");
  
  // Renderizar la tabla filtrada
  renderizarTabla(listaFiltrada);
}

// Función para resetear el filtro y mostrar todos (opcional)
// Y en la función resetearFiltro
function resetearFiltro() {
  renderizarTabla(listaOriginal);
  // Remover clase active de todos los botones de filtro
  document.querySelectorAll('.filter-btn').forEach(b => {
    b.classList.remove('active');
  });
}