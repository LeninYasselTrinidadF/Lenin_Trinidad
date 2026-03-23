import { useState } from 'react';
import apuntes from '../data/apuntes.json';
import titulos from '../data/titulos.json';

type Apunte = typeof apuntes[0];
type TitulosData = Record<string, string[]>;

const titulosData = titulos as TitulosData;

const categorias = [
  {
    key: 'Curso_Colegio',
    label: 'Apuntes de Colegio',
    estado: 'En desarrollo 2/40',
    descripcion: 'Apuntes organizados de un curso desarrollado en 40 sesiones cubriendo el material concerniente a la etapa pre-universitaria. El enfoque del curso es teórico, construyendo la teoría desde teoría de conjuntos hasta la exposición de la identidad Euler, de modo tal que se comprendan los 4 cursos básicos de la currícula pre-universitaria: Aritmética, Álgebra, Geometría y Trigonometría. Se recomienda omitir las demostraciones y centrarse en los ejemplos y en la intuición geométrica y analítica de los conceptos básicos.',
  },
  {
    key: 'Preliminares_Tesis',
    label: 'Preliminares de Tesis',
    estado: 'En desarrollo 3/7',
    descripcion: 'Apuntes organizados de los temas relacionados con la tesis de pregrado sobre bifurcaciones de campos vectoriales parametrizados. Se cubren temas de análisis real, ecuaciones diferenciales ordinarias y teoría cualitativa de sistemas dinámicos. El objetivo es construir una base sólida para la lectura formal de la tesis presentada en el proyecto de grado.',
  },
  {
    key: 'Apuntes_Complementarios',
    label: 'Apuntes Complementarios',
    estado: 'En desarrollo 2/???',
    descripcion: 'Apuntes organizados de los temas relacionados con tópicos adicionales no desarrollados en los cursos formales, pero que complementan la formación matemática. Dentro de los temas de interés se encuentran la teoría de semigrupos y el análisis funcional.',
  },
  {
    key: 'Apuntes_Ingeniería',
    label: 'Apuntes de Ingeniería',
    estado: 'En desarrollo',
    descripcion: 'Apuntes organizados de los temas relacionados con cursos de física e ingeniería.',
  },
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
      <section id="highlights">
        {categorias.map(cat => (
          <div key={cat.key} className="card">
            <h3>
              {cat.label}{' '}
              <span className="project-status status-active">{cat.estado}</span>
            </h3>
            <p>{cat.descripcion}</p>
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
          <p>Presiona el botón para reiniciar todos los filtros y ver la lista completa de apuntes disponibles.</p>
          <button
            className={`filter-btn${filtro === null ? ' active' : ''}`}
            onClick={() => setFiltro(null)}
          >
            Reiniciar Filtro
          </button>
        </div>
      </section>

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
                  <a href={`/Lenin_Trinidad/${a.archivo}`} target="_blank" rel="noopener">
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