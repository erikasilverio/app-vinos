// Datos de la app. Para agregar un vino: sumá una fila a VINOS y, en la misma posición, sus marcas en MARCAS.

const NIVELES = ["Iniciante", "Intermedio", "Experto"];
const TIPOS = ["Tinto", "Blanco", "Rosado", "Espumante", "Fortificado"];

// Color de la botella según el tipo de vino.
const COLOR_TIPO = {
  Tinto: "#6d1d33",
  Blanco: "#b9a64a",
  Rosado: "#d9808f",
  Espumante: "#a8943c",
  Fortificado: "#7a3b14"
};

// Platos para la pestaña "Qué como hoy": [nombre, palabras clave que se buscan en el maridaje de cada vino].
const PLATOS = [
  ["Asado y carnes rojas","asado carne cordero costillas barbacoa parrilla cortes hamburguesas"],
  ["Pizza y pastas","pizza pasta"],
  ["Pescados y mariscos","pescado marisco ostras ceviche pulpo rabas sushi caviar"],
  ["Ensaladas y picadas","ensalada picada aperitivo tapas"],
  ["Quesos","queso"],
  ["Pollo, cerdo y aves","pollo cerdo pato salmón"],
  ["Comida picante","picante especiada"],
  ["Postres y chocolate","postre tarta chocolate"]
];

// Color del racimo según la uva (se busca la primera coincidencia con la primera uva del vino).
const COLOR_UVA = [
  ["Cabernet","#2a1a3a"],
  ["Sauvignon","#b5c84e"],
  ["Tannat","#2c1538"],
  ["Malbec","#35183f"],
  ["Syrah","#2f1d44"],
  ["Merlot","#3b1c48"],
  ["Pinot Noir","#4a2540"],
  ["Pinot Grigio","#c7b08a"],
  ["Nebbiolo","#5a2140"],
  ["Sangiovese","#4d1d3a"],
  ["Tempranillo","#3d1a40"],
  ["Garnacha","#c46a84"],
  ["Carmenere","#46203f"],
  ["Marselan","#33183c"],
  ["Touriga","#331a42"],
  ["Corvina","#4a1f45"],
  ["Primitivo","#3a1a3c"],
  ["Pinotage","#40203f"],
  ["Glera","#c3cf6a"],
  ["Riesling","#c9cf6e"],
  ["Albariño","#c8c862"],
  ["Chardonnay","#d4c85e"],
  ["Moscato","#d9c45a"],
  ["Torrontés","#cfc25c"],
  ["Viognier","#d8c868"],
  ["Gewürz","#d9a877"],
  ["Veltliner","#b9c85e"],
  ["Sémillon","#d2b84e"],
  ["Verdejo","#b9c862"],
  ["Macabeo","#cdd070"],
  ["Alvarinho","#c8c862"],
  ["Palomino","#d0c466"]
];

// Campos de cada vino:
// [nombre, país, región, tipo, uva, nivel (1-3), cuerpo (1-5), estilo, temperatura, maridaje, descripción]
const VINOS = [
  ["Moscato d'Asti","Italia","Piamonte","Espumante","Moscato",1,1,"Dulce","6–8 °C","Postres de frutas, tartas, quesos azules suaves","Ligeramente burbujeante, bajo en alcohol (~5%). Aromas a durazno, flores blancas y miel. Perfecto para quien recién empieza."],
  ["Prosecco","Italia","Véneto","Espumante","Glera",1,1,"Seco suave","6–8 °C","Aperitivos, sushi, jamón crudo, frituras","Fresco y alegre, con burbujas ligeras y notas de manzana verde, pera y cítricos. Ideal para celebrar sin complicaciones."],
  ["Riesling Kabinett","Alemania","Mosela","Blanco","Riesling",1,1,"Semidulce","7–9 °C","Comida picante asiática, cerdo, pollo, quesos suaves","Muy aromático, de baja graduación y acidez vibrante. Duraznos, limón y notas minerales. Equilibra el dulzor con frescura."],
  ["Sauvignon Blanc","Nueva Zelanda","Marlborough","Blanco","Sauvignon Blanc",1,2,"Seco","7–10 °C","Ensaladas, pescados, mariscos, queso de cabra","Fresco, cítrico y herbal: pomelo, maracuyá, pasto recién cortado. Directo y fácil de disfrutar."],
  ["Rosé de Provenza","Francia","Provenza","Rosado","Garnacha, Cinsault",1,2,"Seco","8–10 °C","Ensaladas, pescado a la parrilla, cocina mediterránea, picadas","Pálido, elegante y sutil: fresa, melón y cítricos. El vino de verano por excelencia."],
  ["Malbec","Argentina","Mendoza","Tinto","Malbec",1,4,"Seco","16–18 °C","Asado, carnes rojas, empanadas, pastas con salsa de carne","Frutado y amable: ciruela, mora y violeta, con taninos suaves. Puerta de entrada ideal al mundo de los tintos."],
  ["Carmenere","Chile","Valle de Colchagua","Tinto","Carmenere",1,3,"Seco","16–18 °C","Pastel de choclo, cordero, guisos, quesos semiduros","Redondo y especiado, con notas de frutos rojos maduros, pimiento asado y chocolate. Taninos muy suaves."],
  ["Albariño","España","Rías Baixas","Blanco","Albariño",2,2,"Seco","8–10 °C","Mariscos, pulpo, pescados, ceviche","Aromas de durazno, cítricos y flores, con un toque salino del Atlántico. Muy gastronómico."],
  ["Chardonnay (Chablis)","Francia","Borgoña","Blanco","Chardonnay",2,3,"Seco","10–12 °C","Ostras, pollo con crema, pescados con manteca, quesos cremosos","Mineral y elegante: manzana verde, limón y piedra mojada. Si pasa por roble gana notas de manteca y vainilla."],
  ["Pinot Noir","Francia / EE. UU.","Borgoña / Oregón","Tinto","Pinot Noir",2,2,"Seco","14–16 °C","Pato, salmón, hongos, pollo asado, quesos suaves","Tinto liviano y sedoso: cereza, frambuesa, hongos y tierra húmeda. Elegante y delicado."],
  ["Tempranillo Crianza","España","Rioja","Tinto","Tempranillo",2,3,"Seco","15–17 °C","Jamón ibérico, cordero, chorizo, tapas, quesos curados","Equilibrado, con frutos rojos, cuero, vainilla y especias gracias a su paso por barrica."],
  ["Chianti Classico","Italia","Toscana","Tinto","Sangiovese",2,3,"Seco","16–18 °C","Pizza, pastas con tomate, carnes a la parrilla, quesos parmesanos","Cereza ácida, hierbas y tierra, con acidez marcada. Nació para acompañar la mesa italiana."],
  ["Cabernet Sauvignon","Chile / EE. UU.","Valle del Maipo / Napa","Tinto","Cabernet Sauvignon",2,4,"Seco","16–18 °C","Cortes de carne, hamburguesas gourmet, cordero, quesos fuertes","Estructurado, con cassis, pimiento, cedro y taninos firmes. Un clásico que mejora con los años."],
  ["Syrah / Shiraz","Australia","Barossa Valley","Tinto","Syrah",2,4,"Seco","16–18 °C","Barbacoa, costillas, carnes ahumadas, comida especiada","Potente y jugoso: mora, pimienta negra, chocolate y notas ahumadas. Intenso pero con fruta generosa."],
  ["Champagne Brut","Francia","Champaña","Espumante","Chardonnay, Pinot Noir",2,2,"Brut (seco)","6–8 °C","Ostras, caviar, frituras, quesos cremosos, platos de fiesta","Burbuja fina y persistente, con notas de manzana, brioche y avellana. Elegancia en copa."],
  ["Oporto Tawny","Portugal","Valle del Duero","Fortificado","Touriga Nacional y otras",2,4,"Muy dulce","12–14 °C","Frutos secos, chocolate amargo, queso azul, tartas de nuez","Vino fortificado de ~20% alcohol: caramelo, nuez, higo y especias. Para sorber lento después de comer."],
  ["Tannat","Uruguay","Canelones","Tinto","Tannat",3,5,"Seco","16–18 °C","Asado, chivito, cortes grasos, carnes de caza, quesos curados","La uva insignia de Uruguay: oscuro, tánico y potente, con mora, ciruela y especias. Pide carne y paciencia."],
  ["Barolo","Italia","Piamonte","Tinto","Nebbiolo",3,5,"Seco","16–18 °C","Trufa, risotto de hongos, carnes braseadas, quesos añejos","El «rey de los vinos»: rosas, alquitrán, cereza y tabaco. Taninos y acidez altos; requiere años de guarda."],
  ["Bordeaux (Saint-Émilion)","Francia","Burdeos","Tinto","Merlot, Cabernet Franc",3,4,"Seco","16–18 °C","Cordero, filet mignon, carnes rojas, quesos duros","Complejo y refinado, con ciruela, grafito, tabaco y tierra. Un vino para meditar, no para apurar."],
  ["Amarone della Valpolicella","Italia","Véneto","Tinto","Corvina, Rondinella",3,5,"Seco potente","16–18 °C","Estofados, carnes de caza, parmesano añejo, chocolate","Hecho con uvas semipasas: ciruela pasa, cacao, café y especias, con 15%+ de alcohol. Denso y opulento."],
  ["Albariño uruguayo","Uruguay","Maldonado","Blanco","Albariño",1,2,"Seco","8–10 °C","Pescados y mariscos del Atlántico, ceviche, rabas, ensaladas","Cítrico, floral y salino gracias a la brisa del Atlántico. Una de las grandes apuestas blancas de Uruguay: fresco y fácil de tomar."],
  ["Marselan","Uruguay","Canelones","Tinto","Marselan",2,3,"Seco","16–18 °C","Pastas con salsa, milanesas, carnes a la parrilla, quesos semiduros","Cruza de Cabernet Sauvignon y Garnacha que se da muy bien en Uruguay: frutos negros, especias y taninos suaves. Más amable que el Tannat."],
  ["Cabernet Franc","Uruguay","Canelones","Tinto","Cabernet Franc",2,3,"Seco","16–18 °C","Cordero, asado de tira, hongos, quesos curados","Elegante y especiado: frutos rojos, pimiento suave y hierbas. En Uruguay se logra con mucha frescura."],
  ["Merlot","Chile","Valle Central","Tinto","Merlot",1,3,"Seco","16–18 °C","Pastas, pizza, hamburguesas, pollo asado, quesos suaves","Suave y redondo, con ciruela, cereza y chocolate. Sus taninos amables lo hacen uno de los tintos más fáciles para empezar."],
  ["Pinot Grigio","Italia","Véneto","Blanco","Pinot Grigio",1,1,"Seco","7–9 °C","Aperitivos, ensaladas, pescados blancos, risotto de verduras","Ligero y refrescante, con pera, manzana y almendra. Muy fácil de tomar, ideal para el verano."],
  ["Torrontés","Argentina","Salta","Blanco","Torrontés",1,2,"Seco aromático","7–9 °C","Empanadas, comida picante suave, queso de cabra, sushi","Muy aromático: rosa, durazno y cítricos, con boca fresca. El blanco más sudamericano."],
  ["Cava Brut","España","Penedès","Espumante","Macabeo, Xarel·lo, Parellada",1,2,"Brut","6–8 °C","Tapas, jamón, frituras, mariscos","Burbujeante, fresco y accesible, con manzana, almendra y cítricos. Alternativa al Champagne."],
  ["Vinho Verde","Portugal","Minho","Blanco","Alvarinho, Loureiro",1,1,"Seco, con leve burbuja","6–8 °C","Mariscos, ensaladas, pescados, comida de verano","Muy liviano, de baja graduación y con una chispa natural. Cítrico y refrescante."],
  ["Verdejo","España","Rueda","Blanco","Verdejo",1,2,"Seco","7–9 °C","Ensaladas, mariscos, arroces, pescado frito","Fresco y aromático: hierba, cítricos y fruta de carozo, con un final levemente amargo."],
  ["Garnacha","España","Campo de Borja","Tinto","Garnacha",1,3,"Seco","15–17 °C","Paella, cerdo, embutidos, platos con especias suaves","Frutado y cálido, con frutilla, ciruela y pimienta suave. Taninos livianos y fácil de tomar."],
  ["Espumante uruguayo","Uruguay","Colonia","Espumante","Chardonnay, Pinot Noir",1,2,"Brut","6–8 °C","Aperitivos, mariscos, frituras, platos de fiesta","Fresco, fino y seco, con manzana, brioche y cítricos. Una excelente opción local para celebrar."],
  ["Viognier","Francia","Valle del Ródano","Blanco","Viognier",2,3,"Seco","9–11 °C","Pollo con crema, curry suave, pescados, quesos cremosos","Aromático y sedoso: durazno, damasco y flores. Cuerpo medio a pleno."],
  ["Gewürztraminer","Francia","Alsacia","Blanco","Gewürztraminer",2,3,"Seco a semidulce","8–10 °C","Cocina asiática, quesos fuertes, foie, platos especiados","Exuberante: lichi, rosa y especias. Inconfundible y muy expresivo."],
  ["Grüner Veltliner","Austria","Wachau","Blanco","Grüner Veltliner",2,2,"Seco","8–10 °C","Milanesa vienesa, espárragos, cocina asiática, ensaladas","Cítrico y especiado, con pimienta blanca y manzana verde. Fresco y versátil."],
  ["Primitivo","Italia","Apulia","Tinto","Primitivo",2,4,"Seco con fruta madura","16–18 °C","Pizza, costillas, pastas con ragú, provolone","Maduro y jugoso: ciruela, mermelada y pimienta. Cálido y generoso."],
  ["Pinotage","Sudáfrica","Stellenbosch","Tinto","Pinotage",2,4,"Seco","16–18 °C","Barbacoa, cordero, carnes ahumadas","Rústico y frutado, con mora, ciruela y humo. Carácter propio de Sudáfrica."],
  ["Ribera del Duero","España","Castilla y León","Tinto","Tempranillo",3,4,"Seco","16–18 °C","Cordero lechal, chuletón, quesos curados","Intenso y profundo: mora, regaliz, vainilla y minerales."],
  ["Brunello di Montalcino","Italia","Toscana","Tinto","Sangiovese",3,5,"Seco","16–18 °C","Carnes braseadas, caza, quesos añejos, trufa","Sangiovese de gran carácter y larga guarda: cereza, cuero, tabaco y tierra."],
  ["Jerez Fino","España","Jerez","Fortificado","Palomino",3,3,"Seco","6–8 °C","Jamón, almendras, mariscos fritos, aceitunas","Seco, salino y con aroma a almendra, criado bajo velo de flor. Para paladares avanzados."],
  ["Sauternes","Francia","Burdeos","Blanco","Sémillon",3,4,"Muy dulce","8–10 °C","Foie gras, quesos azules, postres de frutas","Dulce y untuoso, de uvas con podredumbre noble: miel, damasco y azafrán."]
];

// Marcas conocidas de cada vino, en el mismo orden que VINOS.
const MARCAS = [
  "Saracco, Michele Chiarlo, Bera", // Moscato d'Asti
  "Mionetto, Zonin, La Marca", // Prosecco
  "Dr. Loosen, Selbach-Oster, Pfeffingen", // Riesling Kabinett
  "Cloudy Bay, Villa Maria, Kim Crawford", // Sauvignon Blanc
  "Whispering Angel, Miraval, Minuty", // Rosé de Provenza
  "Catena Zapata, Trapiche, Luigi Bosca, Zuccardi", // Malbec
  "Concha y Toro, Santa Rita, Montes", // Carmenere
  "Martín Códax, Paco & Lola, Pazo de Señoráns", // Albariño
  "William Fèvre, Louis Jadot, La Chablisienne", // Chardonnay (Chablis)
  "Louis Jadot, Domaine Drouhin, Cloudy Bay", // Pinot Noir
  "Marqués de Riscal, Campo Viejo, Muga", // Tempranillo Crianza
  "Antinori, Ruffino, Castello di Ama", // Chianti Classico
  "Concha y Toro, Robert Mondavi, Santa Rita", // Cabernet Sauvignon
  "Penfolds, Yalumba, Torbreck", // Syrah / Shiraz
  "Moët & Chandon, Veuve Clicquot, Taittinger", // Champagne Brut
  "Taylor's, Graham's, Sandeman", // Oporto Tawny
  "Bouza, Pisano, Familia Deicas, Garzón", // Tannat
  "Gaja, Marchesi di Barolo, Pio Cesare", // Barolo
  "Château Figeac, Château Angélus, Cheval Blanc", // Bordeaux (Saint-Émilion)
  "Masi, Allegrini, Zenato", // Amarone della Valpolicella
  "Garzón, Bouza, Pisano", // Albariño uruguayo
  "Bouza, Pizzorno, Familia Deicas", // Marselan
  "Bouza, Pizzorno, Castillo Viejo", // Cabernet Franc
  "Concha y Toro, Santa Rita, Montes", // Merlot
  "Santa Margherita, Mezzacorona, Zenato", // Pinot Grigio
  "Colomé, Michel Torino, El Esteco", // Torrontés
  "Freixenet, Codorníu, Segura Viudas", // Cava Brut
  "Casal Garcia, Aveleda, Gazela", // Vinho Verde
  "Marqués de Riscal, José Pariente, Naia", // Verdejo
  "Borsao, Las Rocas", // Garnacha
  "Los Cerros de San Juan, Pisano", // Espumante uruguayo
  "E. Guigal, Yalumba, Cono Sur", // Viognier
  "Trimbach, Hugel, Zind-Humbrecht", // Gewürztraminer
  "Loimer, Domäne Wachau, Bründlmayer", // Grüner Veltliner
  "Cantele, Feudi di San Marzano", // Primitivo
  "Kanonkop, Beyers Truter, Spier", // Pinotage
  "Vega Sicilia, Pesquera, Protos", // Ribera del Duero
  "Biondi-Santi, Banfi, Casanova di Neri", // Brunello di Montalcino
  "Tío Pepe, La Ina, Lustau", // Jerez Fino
  "Château d'Yquem, Château Suduiraut, Château Climens" // Sauternes
];
