// Guía de Vinos: lógica de la app. No usa librerías; los datos están en datos.js.

const DESCRIPCION_NIVEL = [
  "",
  "Suaves, frutados y fáciles de tomar.",
  "Más carácter y estructura.",
  "Complejos, intensos y de guarda."
];
const CUERPO = ["Ligero", "Ligero a medio", "Medio", "Medio a pleno", "Pleno"];

// Cada vino pasa de fila a objeto para no andar contando posiciones.
const vinos = VINOS.map(
  ([nombre, pais, region, tipo, uva, nivel, cuerpo, estilo, temp, comida, descripcion], i) => ({
    i, nombre, pais, region, tipo, uva, nivel, cuerpo, estilo, temp, comida, descripcion,
    marcas: MARCAS[i]
  })
);

const estado = { pestana: 0, nivel: 0, tipo: "", plato: -1, favoritos: [] };

try {
  estado.favoritos = JSON.parse(localStorage.getItem("vf") || "[]");
} catch (e) {
  // Sin almacenamiento disponible: los favoritos duran solo mientras la página esté abierta.
}

const $ = (id) => document.getElementById(id);

function guardarFavoritos() {
  try {
    localStorage.setItem("vf", JSON.stringify(estado.favoritos));
  } catch (e) {}
}

function esc(texto) {
  const mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
  return String(texto).replace(/[&<>"]/g, (c) => mapa[c]);
}

/* ---------- Dibujos ---------- */

// Cada familia de botella tiene su silueta. Devuelve [trazo, altura de la etiqueta].
function formaBotella(v) {
  if (v.tipo === "Espumante") {
    return ["M16 6h8v20c0 8 11 12 11 28v40a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V54c0-16 11-20 11-28z", 54];
  }
  if (/Riesling|Gewürz|Verde/.test(v.nombre)) {
    return ["M17.5 6h5v30c0 4 7 8 7 20v38a4 4 0 0 1-4 4h-15a4 4 0 0 1-4-4V56c0-12 7-16 7-20z", 58];
  }
  if (/Pinot Noir|Chardonnay|Barolo|Viognier|Garnacha|Syrah|Primitivo|Pinotage|Brunello/.test(v.nombre)) {
    return ["M17 6h6v18c0 14 10 20 10 36v34a4 4 0 0 1-4 4H11a4 4 0 0 1-4-4V60c0-16 10-22 10-36z", 60];
  }
  return ["M17 6h6v18c0 6 9 10 9 24v46a4 4 0 0 1-4 4H12a4 4 0 0 1-4-4V48c0-14 9-18 9-24z", 58];
}

// Nombre corto de la marca principal, para que entre en la etiqueta.
function marcaCorta(v) {
  const marca = v.marcas.split(",")[0].trim();
  return marca.length <= 10 ? marca : marca.split(" ")[0];
}

function botella(v, alto, textoEtiqueta) {
  const color = COLOR_TIPO[v.tipo];
  const [trazo, y] = formaBotella(v);
  const marca = textoEtiqueta
    ? `<text x="20" y="${y + 14}" font-size="5.2" text-anchor="middle" fill="#3a2a2e" font-family="Bodoni Moda,Georgia,serif">${esc(textoEtiqueta)}</text>`
    : `<rect x="14" y="${y + 12}" width="12" height="1" fill="#8a7f78"/>`;
  return `<svg height="${alto}" viewBox="0 0 40 100" aria-hidden="true">
    <path d="${trazo}" fill="${color}"/>
    <path d="M12 ${y - 6}v${94 - y}" stroke="#fff" stroke-opacity=".22" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="15.5" y="1" width="9" height="11" rx="1" fill="#2a1d21"/>
    <rect x="8" y="${y}" width="24" height="24" fill="#f3ede4"/>
    <rect x="12" y="${y + 5}" width="16" height="1.2" fill="${color}"/>
    ${marca}
    <rect x="14" y="${y + 19}" width="12" height="1" fill="#8a7f78"/>
  </svg>`;
}

function colorUva(v) {
  const primera = v.uva.split(",")[0];
  const hallada = COLOR_UVA.find(([clave]) => primera.includes(clave));
  if (hallada) return hallada[1];
  if (v.tipo === "Tinto" || v.tipo === "Fortificado") return "#43203f";
  return v.tipo === "Rosado" ? "#cf6f86" : "#a9b94a";
}

const GRANOS = [[12, 22], [24, 22], [36, 22], [48, 22], [18, 33], [30, 33], [42, 33], [24, 44], [36, 44], [30, 55]];

function racimo(v, ancho) {
  const color = colorUva(v);
  const granos = GRANOS.map(([x, y]) =>
    `<circle cx="${x}" cy="${y}" r="6.5" fill="${color}" stroke="#fff" stroke-opacity=".2"/>` +
    `<circle cx="${x - 2}" cy="${y - 2}" r="1.5" fill="#fff" fill-opacity=".4"/>`
  ).join("");
  return `<svg width="${ancho}" viewBox="0 0 60 64" aria-hidden="true">
    <path d="M30 3v15" stroke="#5e4630" stroke-width="2.5"/>
    <path d="M30 9q13-9 24 1q-12 9-24-1z" fill="#55703a"/>
    ${granos}
  </svg>`;
}

/* ---------- Piezas de la pantalla ---------- */

function fila(v) {
  const circulos = [1, 2, 3].map((n) => `<i class="${n <= v.nivel ? "on" : ""}"></i>`).join("");
  return `<div class="r" tabindex="0" onclick="abrirFicha(${v.i})" onkeydown="if (event.key === 'Enter') abrirFicha(${v.i})">
    ${botella(v, 58)}
    <div>
      <h3 class="d">${esc(v.nombre)}</h3>
      <p>${esc(v.marcas.split(",")[0])}, ${esc(v.pais)}</p>
    </div>
    ${racimo(v, 30)}
    <div class="g" title="${NIVELES[v.nivel - 1]}">${circulos}</div>
  </div>`;
}

function filtros() {
  const botonesNivel = ["Todos", ...NIVELES]
    .map((n, i) => `<button class="f${estado.nivel === i ? " on" : ""}" onclick="elegirNivel(${i})">${n}</button>`)
    .join("");
  let html = `<div class="fl"><span>Nivel</span>${botonesNivel}</div>
    <p class="nt">${DESCRIPCION_NIVEL[estado.nivel]}</p>`;
  if (estado.pestana === 0) {
    const botonesTipo = ["Todos", ...TIPOS]
      .map((t, i) => {
        const valor = i ? TIPOS[i - 1] : "";
        return `<button class="f${estado.tipo === valor ? " on" : ""}" onclick="elegirTipo('${valor}')">${t}</button>`;
      })
      .join("");
    html += `<div class="fl"><span>Tipo</span>${botonesTipo}</div>`;
  }
  return html;
}

// Un vino distinto por día, el mismo para todos.
function destacado() {
  const v = vinos[Math.floor(Date.now() / 864e5) % vinos.length];
  return `<div class="hr" style="--h:${COLOR_TIPO[v.tipo]}" tabindex="0" onclick="abrirFicha(${v.i})" onkeydown="if (event.key === 'Enter') abrirFicha(${v.i})">
    ${botella(v, 128)}
    <div>
      <p class="nt" style="margin:0">Vino de hoy</p>
      <h2 class="d">${esc(v.nombre)}</h2>
      <p>${esc(v.marcas.split(",")[0])}, ${esc(v.pais)}. ${NIVELES[v.nivel - 1]}.</p>
    </div>
  </div>`;
}

function visible(v, busqueda) {
  const { pestana, nivel, tipo, plato, favoritos } = estado;
  if (pestana === 2 && !favoritos.includes(v.i)) return false;
  if (pestana === 1) {
    if (plato < 0) return false;
    const claves = PLATOS[plato][1].split(" ");
    if (!claves.some((k) => v.comida.toLowerCase().includes(k))) return false;
  }
  if (pestana < 2 && nivel && v.nivel !== nivel) return false;
  if (pestana === 0 && tipo && v.tipo !== tipo) return false;
  if (busqueda) {
    const texto = [v.nombre, v.pais, v.region, v.tipo, v.uva, v.comida, v.descripcion, v.marcas].join(" ").toLowerCase();
    if (!texto.includes(busqueda)) return false;
  }
  return true;
}

function dibujar() {
  const busqueda = $("q").value.toLowerCase().trim();
  $("n").textContent = `${vinos.length} vinos del mundo con marcas y maridaje`;
  $("nv").innerHTML = ["Vinos", "Qué como hoy", `Favoritos (${estado.favoritos.length})`]
    .map((t, n) => `<button class="t${estado.pestana === n ? " on" : ""}" onclick="cambiarPestana(${n})">${t}</button>`)
    .join("");

  let html = "";
  if (estado.pestana === 1) {
    html += `<div class="dg">${PLATOS.map(([nombre], n) =>
      `<button class="d${estado.plato === n ? " on" : ""}" onclick="elegirPlato(${n})">${nombre}</button>`).join("")}</div>`;
    if (estado.plato > -1) {
      html += `<h2 class="hd d">Para ${PLATOS[estado.plato][0].toLowerCase()}</h2>${filtros()}`;
    }
  } else if (estado.pestana === 0) {
    const sinFiltros = !busqueda && !estado.nivel && !estado.tipo;
    html += (sinFiltros ? destacado() : "") + filtros();
  }

  const lista = vinos.filter((v) => visible(v, busqueda));
  if (estado.pestana === 1 && estado.plato < 0) {
    html += `<p class="em">Elegí un plato y te mostramos los vinos que mejor lo acompañan.</p>`;
  } else if (lista.length) {
    html += lista.map(fila).join("");
  } else {
    html += `<p class="em">${estado.pestana === 2
      ? "Todavía no guardaste vinos. Abrí uno y tocá Guardar en favoritos."
      : "No hay vinos con ese filtro. Probá con otro nivel o tipo."}</p>`;
  }
  $("ct").innerHTML = html;
}

/* ---------- Ficha de cada vino ---------- */

function abrirFicha(i) {
  const v = vinos[i];
  const ov = $("ov");
  const esFavorito = estado.favoritos.includes(i);
  const marcas = v.marcas.split(", ").map((m) => `<span>${esc(m)}</span>`).join("");
  const datos = [
    ["Va bien con", v.comida],
    ["Uva", v.uva],
    ["Servir a", v.temp],
    ["Estilo", v.estilo],
    ["Nivel", NIVELES[v.nivel - 1]]
  ].map(([t, d]) => `<div><dt>${t}</dt><dd>${esc(d)}</dd></div>`).join("");

  ov.style.setProperty("--h", COLOR_TIPO[v.tipo]);
  ov.innerHTML = `
    <div class="fd">
      <button class="bk" onclick="cerrarFicha()">‹ Volver</button>
      <div class="art">
        <figure>${botella(v, 190, marcaCorta(v))}<figcaption>${esc(v.marcas.split(",")[0])}</figcaption></figure>
        <figure>${racimo(v, 120)}<figcaption>Uva: ${esc(v.uva)}</figcaption></figure>
      </div>
    </div>
    <div class="in">
      <h2 class="d">${esc(v.nombre)}</h2>
      <p class="s">${esc(v.region)}, ${esc(v.pais)}. ${v.tipo}.</p>
      <p class="ds">${esc(v.descripcion)}</p>
      <p class="nt" style="margin-top:20px">Marcas conocidas</p>
      <div class="bl">${marcas}</div>
      <dl>
        ${datos}
        <div><dt>Cuerpo</dt><dd>${CUERPO[v.cuerpo - 1]}<div class="bar"><i style="width:${v.cuerpo * 20}%"></i></div></dd></div>
      </dl>
      <button class="btn" onclick="alternarFavorito(${i})">${esFavorito ? "Quitar de favoritos" : "Guardar en favoritos"}</button>
    </div>`;
  ov.classList.add("on");
  ov.scrollTop = 0;
}

function cerrarFicha() {
  $("ov").classList.remove("on");
}

function alternarFavorito(i) {
  const pos = estado.favoritos.indexOf(i);
  if (pos > -1) estado.favoritos.splice(pos, 1);
  else estado.favoritos.push(i);
  guardarFavoritos();
  dibujar();
  abrirFicha(i);
}

/* ---------- Acciones de los botones ---------- */

function cambiarPestana(n) { estado.pestana = n; dibujar(); }
function elegirNivel(n) { estado.nivel = n; dibujar(); }
function elegirTipo(t) { estado.tipo = t; dibujar(); }
function elegirPlato(n) { estado.plato = n; dibujar(); }

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarFicha();
});

dibujar();
