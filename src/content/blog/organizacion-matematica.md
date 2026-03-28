---
title: Sobre la Organización de la Matemática
date: "2025-11-19"
description: Reflexiones sobre la dificultad de encontrar fuentes accesibles en matemáticas, la tensión entre rigor y didáctica, y la importancia de organizar el conocimiento matemático con consistencia.
tags: [sistemas-dinámicos, didáctica, análisis, bibliografía]
---

Una de las mayores dificultades del tránsito de cualquier etapa del aprendizaje parece ser
la ubicación de contenido semejante. En efecto, inclusive con herramientas tan sofisticadas como
lo son la inteligencia artificial y los buscadores de los que se dispone sigue siendo tan difícil,
si no más, el obtener información que esté al alcance de lo que uno busca.

Si uno conoce lo suficiente del tema como para responder lo que necesita, entonces buscar información
es una tarea más bien inútil, pero si uno no conoce, la tarea resulta, aunque menos inútil, no por ello,
menos tediosa.

Coloquemos por ejemplo el caso del estudio de sistemas dinámicos. Una fuente respetada a nivel académico es
el texto de Lawrence Perko: *Differential Equations and Dynamical Systems*. Este texto, más que ser una compilación
de demostraciones sobre Teoremas útiles y fundamentales que todo estudiante debería conocer, al modo de los textos
de la trilogía de Rudin, el excelso volumen de Hoffman-Kunze o las referencias de John M. Lee y Serge Lang, son una
guía de estudio sobre dichos teoremas y una explicación de los resultados de forma geométrica. A medida que se progresa
en éste, las demostraciones se vuelven más esbozos y los Teoremas referencian a un sinfín de artículos y libros, muchos
de los cuales son, por cierto, también guías de estudio.

Tanta ha llegado a ser la aversión a la escuela de Bourbaki, a las demostraciones rígidas, analíticas, expresadas en cadenas
de fórmulas y proposiciones anidadas una detrás de otra que se llega al efecto contrario, a saber, que no haya fuentes unificadas
de los temas principales. Este defecto, presente en toda área de las ciencias matemáticas, debido en primera, a su multiplicidad,
y en segunda, a su complejidad y a la dificultad de su formalización, ha llevado a múltiples errores y redundancias en material.

La propuesta más reciente de parte del equipo de Lean4 parece ser la versión moderna del proyecto de Euclides, Russell y Bourbaki.

A esta propuesta, se le contrapone el hecho de que la matemática, al tener esta dimensión geométrica, artística, estructural,
adquiere múltiples capas. No es lo mismo estudiar una función "suave" en el sentido de no tener picos, como lo es en el contexto visual
de funciones reales de variable real tratado en la escuela, o "suave" como función analítica — la cual nos permite la
manipulación de límites de forma excesiva, debido a ser generalización de un polinomio, sin considerar los casos patológicos —
o que la función sea "suave" en el sentido de aquella que es suave en coordenadas locales, esto es, de clase $C^\infty$
en el sentido de variedades diferenciables.

En todos estos casos, la definición más general parece ser la que presenta mayor ventaja. Siempre es posible volver a la versión concreta
haciendo uso del análisis del caso concreto. Sin embargo, aquí también surge el problema de la pérdida del sentido de a qué se refiere
cuando se toma una generalización sin su caso particular.

No son pocas las entradas de páginas de uso común, como lo son Wikipedia y Stack Exchange, que presentan respuestas que
no se pueden leer desconectadas de toda la teoría preliminar. Para un ejemplo, basta tomar el siguiente enlace sobre cómo
[completar campos vectoriales](https://math.stackexchange.com/questions/3599388/completing-incomplete-vector-fields),
en el cual se hace referencia a otra publicación sobre cómo
[completar campos vectoriales en una variedad no compacta](https://math.stackexchange.com/questions/378783/completing-a-vector-field-on-a-non-compact-manifold-m).
Este problema — el de hallar un campo vectorial completo topológicamente equivalente a un campo vectorial dado — es demostrado
de forma elemental y se conoce como el **Teorema de Vinograd**, presentado en el texto *Qualitative Theory of Differential Equations*
de V.V. Nemytskii y V.V. Stepanov.

Una demostración similar es dada en el capítulo 3 del texto de Perko. El mayor problema es que para un estudiante de pregrado
la teoría de Variedades Riemannianas preliminar al Teorema de Hopf-Rinow le es inaccesible, mientras que la demostración del
texto de Perko resulta insuficiente por definir la equivalencia topológica únicamente para campos de clase $C^1(U)$.
Podría reducirse dicha condición aprovechando la definición de equivalencia topológica como en el texto
*Geometric Theory of Dynamical Systems* de Palis y Melo.

El mayor problema con esto es que la demostración de Perko no verifica la suavidad de la función distancia, la cual puede
probarse que no es suave para algunos conjuntos compactos. Basta tomar $K \supseteq \{(-1,0),(1,0)\}$ formado por dos curvas
centradas en tales puntos y tomar los valores para pequeñas perturbaciones de $0$ a la derecha y a la izquierda:
las perturbaciones son ambas pequeñas, pero los valores de "suavidad" en cada curva son distintos, con lo cual la existencia
de la derivada resulta problemática. El Teorema de Vinograd del texto de Nemytskii es mucho más satisfactorio al limitarse
a trabajar sobre campos de solución única, esto es, localmente Lipschitz.

El problema de la inaccesibilidad, así como el hecho de que la pregunta se dé naturalmente a nivel de pregrado mientras que
la respuesta se ubica fuera de las referencias estándar, es uno de los grandes problemas que futuros proyectos referenciales
deben enfrentar.

No mencionaremos casos más problemáticos, como el hecho de que a la palabra *bifurcación* en un mismo contexto y con
los mismos ejemplos le correspondan al menos tres definiciones diferentes: la de campo parametrizado $X_\lambda$ en el cual
un parámetro $\lambda_0$ posee la propiedad de que toda vecindad en su topología cuenta con la existencia de al menos un
campo no topológicamente equivalente; la de un punto del cual surgen ramificaciones de soluciones de una ecuación funcional;
o la de la existencia de un conjunto invariante que posea conjuntos invariantes cercanos pero disjuntos con cambios en su estabilidad.

Tras replantear mi corta experiencia enseñando en tutorías personalizadas y en salones de reforzamiento, he notado cuánta
necesidad hay de la estandarización del lenguaje matemático, inclusive en los niveles inferiores. Uno de los mayores problemas
de la educación en nivel básico es el de saber lo que no se sabe. La única solución que me parece sensata es ser consistente
con uno mismo: ni el docente puede exigir al alumno lo que éste no ha enseñado, ni el alumno puede sentirse completamente
desorientado.

El defecto es, así como en la organización actual de la matemática, el tiempo finito del que disponemos. Por esto,
se pide al visitante su perdón y su paciencia.
