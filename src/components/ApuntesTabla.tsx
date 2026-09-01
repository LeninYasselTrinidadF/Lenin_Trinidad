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
    estado: 'EN DESARROLLO 2/40',
    titleColor: 'var(--suwako-hat)',
    accentGradient: 'linear-gradient(90deg, var(--suwako-dress), var(--ark-navy))',
    descripcion: 'Curso de 40 sesiones cubriendo material pre-universitario: Aritmética, Álgebra, Geometría y Trigonometría. Enfoque teórico con intuición geométrica y analítica.',
  },
  {
    key: 'Preliminares_Tesis',
    label: 'Preliminares de Tesis',
    estado: 'EN DESARROLLO 3/7',
    titleColor: 'var(--cirno-ice)',
    accentGradient: 'linear-gradient(90deg, var(--ark-agua), var(--pol-green))',
    descripcion: 'Bifurcaciones de campos vectoriales parametrizados, análisis real, ecuaciones diferenciales ordinarias y teoría cualitativa de sistemas dinámicos.',
  },
  {
    key: 'Apuntes_Complementarios',
    label: 'Apuntes Complementarios',
    estado: 'EN DESARROLLO 2/???',
    titleColor: 'var(--prot-beige)',
    accentGradient: 'linear-gradient(90deg, var(--prot-orange), var(--ark-gold))',
    descripcion: 'Tópicos adicionales que complementan la formación matemática: teoría de semigrupos, análisis funcional y temas avanzados.',
  },
  {
    key: 'Apuntes_Ingeniería',
    label: 'Apuntes de Ingeniería',
    estado: 'EN DESARROLLO',
    titleColor: 'var(--pol-green)',
    accentGradient: 'linear-gradient(90deg, var(--pol-green), var(--thales-bright))',
    descripcion: 'Apuntes organizados de temas relacionados con cursos de física, análisis de señales e ingeniería.',
  },
];

function ordenarApuntes(lista: Apunte[]) {
  return [...lista].sort((a, b) => {
    if (a.area < b.area) return -1;
    if (a.area > b.area) return 1;
    return (parseInt(String(a.orden)) || 0) - (parseInt(String(b.orden)) || 0);
  });
}

function getEstadoColor(estado: string) {
  const norm = estado.toLowerCase();
  if (norm.includes('completado') || norm.includes('listo') || norm.includes('finalizado')) {
    return 'var(--pol-green)';
  }
  if (norm.includes('%') || norm.includes('desarrollo') || norm.includes('progreso')) {
    return 'var(--ark-gold)';
  }
  if (norm.includes('borrador') || norm.includes('draft')) {
    return 'var(--prot-orange)';
  }
  return 'var(--text-second)';
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
            <div className="card-accent" style={{ background: cat.accentGradient }}></div>
            <span className="badge badge-dev">{cat.estado}</span>
            <h3 style={{ color: cat.titleColor }}>{cat.label}</h3>
            <p>{cat.descripcion}</p>
            <button
              data-filtro={cat.key}
              className={`filter-btn${filtro === cat.key ? ' active' : ''}`}
              onClick={() => setFiltro(cat.key)}
            >
              {filtro === cat.key ? '✓ Filtrando' : 'Filtrar Apuntes →'}
            </button>
          </div>
        ))}

        <div className="card" style={{ borderTop: '3px solid var(--thales-water)' }}>
          <div className="card-accent" style={{ background: 'linear-gradient(90deg, var(--thales-water), var(--nitori-cyan))' }}></div>
          <h3 style={{ color: 'var(--thales-bright)' }}>Todos los apuntes</h3>
          <p>Restablece todos los filtros activos para examinar la totalidad de los documentos y cursos disponibles.</p>
          <button
            className={`filter-btn${filtro === null ? ' active' : ''}`}
            onClick={() => setFiltro(null)}
          >
            {filtro === null ? '✓ Mostrando todos' : 'Reiniciar Filtro ↺'}
          </button>
        </div>
      </section>

      {/* Separador de Prisma Arco Iris */}
      <div className="area-sep" aria-hidden="true">
        <div className="area-seg area-seg-red"></div>
        <div className="area-seg area-seg-orange"></div>
        <div className="area-seg area-seg-green"></div>
        <div className="area-seg area-seg-blue"></div>
      </div>

      <div className="table-container">
        <table id="tabla" className="apuntes-table">
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
                  <tr key={`sep-${a.area}`} className="area-row">
                    <td colSpan={7}>
                      <div className="area-bar">
                        <div className="area-pip"></div>
                        <span>{a.area}</span>
                      </div>
                    </td>
                  </tr>
                );
              }
              filas.push(
                <tr key={i}>
                  <td>{a.orden}</td>
                  <td style={{ color: 'var(--text-main)', fontWeight: 600 }}>{a.titulo}</td>
                  <td>
                    <a href={`/Lenin_Trinidad/${a.archivo}`} target="_blank" rel="noopener">
                      {a.contenido}
                    </a>
                  </td>
                  <td>{a.area}</td>
                  <td>{a.nivel}</td>
                  <td style={{ color: getEstadoColor(a.estado), fontWeight: 600 }}>{a.estado}</td>
                  <td style={{ whiteSpace: 'nowrap' }}>{a.fecha}</td>
                </tr>
              );
              return filas;
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}