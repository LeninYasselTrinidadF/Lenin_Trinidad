import { useState } from 'react';
import apuntes from '../data/apuntes.json';
import titulos from '../data/titulos.json';

type Apunte = typeof apuntes[0];
type TitulosData = Record<string, string[]>;

const titulosData = titulos as TitulosData;

const categorias = [
  { key: 'Curso_Colegio', label: 'Apuntes de Colegio', estado: 'En desarrollo 2/40' },
  { key: 'Preliminares_Tesis', label: 'Preliminares de Tesis', estado: 'En desarrollo 3/7' },
  { key: 'Apuntes_Complementarios', label: 'Apuntes Complementarios', estado: 'En desarrollo 2/???' },
  { key: 'Apuntes_Ingeniería', label: 'Apuntes de Ingeniería', estado: 'En desarrollo' },
];

function ordenarApuntes(lista: Apunte[]) {
  return [...lista].sort((a, b) => {
    if (a.area < b.area) return -1;
    if (a.area > b.area) return 1;
    return (parseInt(String(a.orden)) || 0) - (parseInt(String(b.orden)) || 0);
  });
}

export default function ApuntesTabla() {
  const [filtro, setFiltro] = useState<string | null>(null);

  const listaFiltrada = filtro
    ? apuntes.filter(a => titulosData[filtro]?.includes(a.titulo))
    : apuntes;

  const listaOrdenada = ordenarApuntes(listaFiltrada);
  let areaActual = '';

  return (
    <div>
      {/* Cards de categorías */}
      <section id="highlights">
        {categorias.map(cat => (
          <div key={cat.key} className="card">
            <h3>
              {cat.label}{' '}
              <span className="project-status status-active">{cat.estado}</span>
            </h3>
            <button
              data-filtro={cat.key}
              className={`filter-btn${filtro === cat.key ? ' active' : ''}`}
              onClick={() => setFiltro(cat.key)}
            >
              Filtrar Apuntes
            </button>
          </div>
        ))}
        <div className="card">
          <h3>Todos los apuntes</h3>
          <button
            className={`filter-btn${filtro === null ? ' active' : ''}`}
            onClick={() => setFiltro(null)}
          >
            Reiniciar Filtro
          </button>
        </div>
      </section>

      {/* Tabla */}
      <table id="tabla">
        <thead>
          <tr>
            <th>Orden</th>
            <th>Título</th>
            <th>Contenido</th>
            <th>Área</th>
            <th>Nivel</th>
            <th>Estado</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {listaOrdenada.map((a, i) => {
            const filas = [];
            if (a.area !== areaActual) {
              areaActual = a.area;
              filas.push(
                <tr key={`sep-${a.area}`} className="area-separator">
                  <td colSpan={7}>📁 {a.area}</td>
                </tr>
              );
            }
            filas.push(
              <tr key={i}>
                <td>{a.orden}</td>
                <td>{a.titulo}</td>
                <td>
                  <a href={a.archivo} target="_blank" rel="noopener">
                    {a.contenido}
                  </a>
                </td>
                <td>{a.area}</td>
                <td>{a.nivel}</td>
                <td>{a.estado}</td>
                <td>{a.fecha}</td>
              </tr>
            );
            return filas;
          })}
        </tbody>
      </table>
    </div>
  );
}
