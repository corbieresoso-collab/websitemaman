export type Serie = "cosmogonie" | "entites" | "biomes" | "abysses";

export interface Artwork {
  id: string;
  serie: Serie;
  image: string;
  available: boolean;
  titles: { fr: string; en: string; es: string };
  descriptions: { fr: string; en: string; es: string };
}

export const artworks: Artwork[] = [
  {
    id: "gestation",
    serie: "cosmogonie",
    image: "/artworks/gestation.jpg",
    available: true,
    titles: { fr: "Gestation", en: "Gestation", es: "Gestación" },
    descriptions: {
      fr: "Un corps qui est aussi un univers berce en lui une planète naissante. La lumière perce pour la première fois, couronnant un astre encore endormi. Le fleuve bleu emporte tout vers l'inconnu. Deux éclats rouges — des cœurs, ou des braises.",
      en: "A body that is also a universe cradles a nascent planet. Light pierces for the first time, crowning a still-sleeping star. The blue river carries everything toward the unknown. Two red sparks — hearts, or embers.",
      es: "Un cuerpo que también es universo acuna un planeta naciente. La luz penetra por primera vez, coronando un astro aún dormido. El río azul arrastra todo hacia lo desconocido. Dos destellos rojos — corazones, o brasas.",
    },
  },
  {
    id: "l-architecte",
    serie: "entites",
    image: "/artworks/l-architecte.jpg",
    available: true,
    titles: { fr: "L'Architecte", en: "The Architect", es: "El Arquitecto" },
    descriptions: {
      fr: "Mi-oiseau, mi-entité cosmique, il navigue entre les mondes qu'il construit lui-même. Ses plumes sont des fils. La tempête qui tourbillonne autour de lui — c'est lui qui l'a faite.",
      en: "Half-bird, half-cosmic entity, it navigates between worlds it builds itself. Its feathers are threads. The storm swirling around it — it made that storm.",
      es: "Mitad pájaro, mitad entidad cósmica, navega entre mundos que él mismo construye. Sus plumas son hilos. La tormenta que gira a su alrededor — él la creó.",
    },
  },
  {
    id: "la-chambre-des-origines",
    serie: "biomes",
    image: "/artworks/la-chambre-des-origines.jpg",
    available: true,
    titles: {
      fr: "La Chambre des Origines",
      en: "The Chamber of Origins",
      es: "La Cámara de los Orígenes",
    },
    descriptions: {
      fr: "L'intérieur de tout. Là où les graines choisissent de germer, où l'araignée tisse les lois de la croissance. C'est ce qui se passe quand personne ne regarde — la vie s'organise seule, magnifiquement.",
      en: "The inside of everything. Where seeds choose to germinate, where the spider weaves the laws of growth. This is what happens when no one watches — life organises itself, magnificently.",
      es: "El interior de todo. Donde las semillas eligen germinar, donde la araña teje las leyes del crecimiento. Esto es lo que ocurre cuando nadie mira — la vida se organiza sola, magníficamente.",
    },
  },
  {
    id: "le-gardien",
    serie: "entites",
    image: "/artworks/le-gardien.jpg",
    available: true,
    titles: { fr: "Le Gardien", en: "The Guardian", es: "El Guardián" },
    descriptions: {
      fr: "L'œil au centre de tout. Il ne juge pas — il perçoit. Le triangle inscrit dans le cercle est une géométrie vivante, couverte de plumes et de mystère. Les racines-flammes qui le portent sont aussi vieilles que la première pensée.",
      en: "The eye at the centre of everything. It does not judge — it perceives. The triangle inscribed in the circle is a living geometry, covered in feathers and mystery. The root-flames that carry it are as old as the first thought.",
      es: "El ojo en el centro de todo. No juzga — percibe. El triángulo inscrito en el círculo es una geometría viva, cubierta de plumas y misterio. Las raíces-llamas que lo sostienen son tan antiguas como el primer pensamiento.",
    },
  },
  {
    id: "l-observateur",
    serie: "abysses",
    image: "/artworks/l-observateur.jpg",
    available: true,
    titles: { fr: "L'Observateur", en: "The Observer", es: "El Observador" },
    descriptions: {
      fr: "Dans les profondeurs de ce qui n'a pas de nom, quelque chose regarde depuis toujours. Ses yeux sont des horizons. Ses plumes des antennes. Les motifs zébrés qui le traversent sont une langue que nous avons oubliée.",
      en: "In the depths of what has no name, something has always been watching. Its eyes are horizons. Its feathers are antennae. The zebra patterns running through it are a language we have forgotten.",
      es: "En las profundidades de lo que no tiene nombre, algo siempre ha estado observando. Sus ojos son horizontes. Sus plumas son antenas. Los patrones que lo atraviesan son un idioma olvidado.",
    },
  },
  {
    id: "les-spheres-flottantes",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-06.jpg",
    available: true,
    titles: {
      fr: "Les Sphères Flottantes",
      en: "Floating Spheres",
      es: "Las Esferas Flotantes",
    },
    descriptions: {
      fr: "Une grande sphère bleue flotte dans un espace de plumes et de rubans verts. Autour d'elle gravitent des formes légères — graines ou planètes, impossible à distinguer.",
      en: "A large blue sphere floats in a space of feathers and green ribbons. Light forms orbit around it — seeds or planets, impossible to tell apart.",
      es: "Una gran esfera azul flota en un espacio de plumas y cintas verdes. Formas ligeras orbitan a su alrededor — semillas o planetas, imposible distinguir.",
    },
  },
  {
    id: "la-spirale-vivante",
    serie: "abysses",
    image: "/artworks/oeuvre-07.jpg",
    available: true,
    titles: {
      fr: "La Spirale Vivante",
      en: "The Living Spiral",
      es: "La Espiral Viva",
    },
    descriptions: {
      fr: "Une entité bleue, violette et rose tourbillonne sur elle-même. Mi-méduse, mi-galaxie. Elle est à la fois la spirale et ce qui la regarde tourner.",
      en: "A blue, violet and pink entity whirls upon itself. Half-jellyfish, half-galaxy. It is both the spiral and the thing watching it turn.",
      es: "Una entidad azul, violeta y rosa gira sobre sí misma. Mitad medusa, mitad galaxia. Es tanto la espiral como lo que la observa girar.",
    },
  },
  {
    id: "l-oeil-des-marees",
    serie: "abysses",
    image: "/artworks/oeuvre-08.jpg",
    available: true,
    titles: {
      fr: "L'Œil des Marées",
      en: "Eye of the Tides",
      es: "El Ojo de las Mareas",
    },
    descriptions: {
      fr: "Des vagues de sarcelle entourent un cercle doré. À l'intérieur : le calme absolu d'un œil qui a tout vu. La mer et l'iris sont la même chose.",
      en: "Teal waves surround a golden circle. Inside: the absolute calm of an eye that has seen everything. The sea and the iris are the same thing.",
      es: "Olas de color teal rodean un círculo dorado. Adentro: la calma absoluta de un ojo que lo ha visto todo. El mar y el iris son la misma cosa.",
    },
  },
  {
    id: "anatomie-du-crepuscule",
    serie: "abysses",
    image: "/artworks/oeuvre-30.jpg",
    available: true,
    titles: {
      fr: "Anatomie du Crépuscule",
      en: "Anatomy of Dusk",
      es: "Anatomía del Crepúsculo",
    },
    descriptions: {
      fr: "Violet profond, rouge sang, structures intérieures exposées. Cette œuvre montre ce que le corps cache : une architecture secrète de corail et de lumière.",
      en: "Deep violet, blood red, interior structures exposed. This work shows what the body hides: a secret architecture of coral and light.",
      es: "Violeta profundo, rojo sangre, estructuras interiores expuestas. Esta obra muestra lo que el cuerpo oculta: una arquitectura secreta de coral y luz.",
    },
  },
  {
    id: "les-spheres-de-l-aube",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-10.jpg",
    available: true,
    titles: {
      fr: "Les Sphères de l'Aube",
      en: "Spheres of Dawn",
      es: "Las Esferas del Alba",
    },
    descriptions: {
      fr: "Sphères brunes, spirales d'or, rythme lent de la matière qui se réveille. Une cosmogonie des teintes de terre — ocre, or pâle, blanc de craie.",
      en: "Brown spheres, gold spirals, the slow rhythm of matter waking. A cosmogony in earth tones — ochre, pale gold, chalk white.",
      es: "Esferas marrones, espirales doradas, el ritmo lento de la materia que despierta. Una cosmogonía en tonos tierra — ocre, oro pálido, blanco de tiza.",
    },
  },
  {
    id: "le-mandala-des-souffles",
    serie: "entites",
    image: "/artworks/oeuvre-11.jpg",
    available: true,
    titles: {
      fr: "Le Mandala des Souffles",
      en: "Mandala of Breaths",
      es: "El Mandala de los Alientos",
    },
    descriptions: {
      fr: "Encadrée dans un cercle de texture bleue, une composition d'une élégance rare. Formes végétales et vents se rejoignent dans un souffle unique.",
      en: "Framed in a circle of blue texture, a composition of rare elegance. Plant forms and winds meet in a single breath.",
      es: "Enmarcada en un círculo de textura azul, una composición de rara elegancia. Formas vegetales y vientos se unen en un solo aliento.",
    },
  },
  {
    id: "la-ligne-de-vie",
    serie: "biomes",
    image: "/artworks/oeuvre-12.jpg",
    available: true,
    titles: {
      fr: "La Ligne de Vie",
      en: "The Line of Life",
      es: "La Línea de Vida",
    },
    descriptions: {
      fr: "Un anneau lumineux en haut, un serpent-forme qui descend, des créatures qui naissent en chemin. La verticale comme axe de tout ce qui vit.",
      en: "A luminous ring above, a serpent-form descending, creatures born along the way. The vertical as the axis of everything that lives.",
      es: "Un anillo luminoso arriba, una forma-serpiente que desciende, criaturas que nacen en el camino. La vertical como eje de todo lo que vive.",
    },
  },
  {
    id: "la-traversee",
    serie: "abysses",
    image: "/artworks/oeuvre-13.jpg",
    available: true,
    titles: {
      fr: "La Traversée",
      en: "The Crossing",
      es: "El Cruce",
    },
    descriptions: {
      fr: "Une diagonale blanche coupe l'obscurité. Des créatures s'y agrippent ou s'en détachent. Traverser n'est jamais sans risque — mais toujours nécessaire.",
      en: "A white diagonal cuts through the darkness. Creatures cling to it or detach from it. Crossing is never without risk — but always necessary.",
      es: "Una diagonal blanca corta la oscuridad. Las criaturas se aferran a ella o se desprenden. Cruzar nunca es sin riesgo — pero siempre necesario.",
    },
  },
  {
    id: "le-nid-des-astres",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-14.jpg",
    available: true,
    titles: {
      fr: "Le Nid des Astres",
      en: "Nest of Stars",
      es: "El Nido de los Astros",
    },
    descriptions: {
      fr: "Sphères argentées et vertes nichées dans des formes cotonneuses. Ce n'est pas l'espace — c'est l'endroit où les étoiles se reposent entre deux naissances.",
      en: "Silver and green spheres nestled in cottony forms. This is not space — it is the place where stars rest between two births.",
      es: "Esferas plateadas y verdes anidadas en formas algodonosas. Esto no es el espacio — es el lugar donde las estrellas descansan entre dos nacimientos.",
    },
  },
  {
    id: "le-passeur",
    serie: "entites",
    image: "/artworks/oeuvre-15.jpg",
    available: true,
    titles: { fr: "Le Passeur", en: "The Ferryman", es: "El Barquero" },
    descriptions: {
      fr: "Une silhouette-oiseau, sombre et précise, guide quelque chose vers l'autre rive. Sur sa gauche, une sphère de feu bleu. Ce qu'il transporte n'a pas de nom.",
      en: "A bird-silhouette, dark and precise, guides something toward the other shore. On its left, a sphere of blue fire. What it carries has no name.",
      es: "Una silueta-pájaro, oscura y precisa, guía algo hacia la otra orilla. A su izquierda, una esfera de fuego azul. Lo que transporta no tiene nombre.",
    },
  },
  {
    id: "les-semailles",
    serie: "biomes",
    image: "/artworks/oeuvre-16.jpg",
    available: true,
    titles: { fr: "Les Semailles", en: "The Sowing", es: "La Siembra" },
    descriptions: {
      fr: "Des graines flottent dans l'espace teal. Certaines touchent déjà quelque chose. D'autres dérivent encore, en attente du bon sol, du bon moment.",
      en: "Seeds float in teal space. Some have already touched something. Others still drift, waiting for the right soil, the right moment.",
      es: "Las semillas flotan en el espacio azul-verde. Algunas ya han tocado algo. Otras aún derivan, esperando el suelo correcto, el momento correcto.",
    },
  },
  {
    id: "l-emergence",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-17.jpg",
    available: true,
    titles: { fr: "L'Émergence", en: "Emergence", es: "La Emergencia" },
    descriptions: {
      fr: "Un soleil d'or en haut à gauche éclaire un monde qui sort de lui-même. Les formes teal et violettes émergent lentement de la nuit — comme si naître prenait toute une vie.",
      en: "A gold sun upper left illuminates a world pulling itself out of itself. Teal and violet forms emerge slowly from the night — as if being born took a whole lifetime.",
      es: "Un sol dorado arriba a la izquierda ilumina un mundo que sale de sí mismo. Formas teal y violetas emergen lentamente de la noche — como si nacer tardara toda una vida.",
    },
  },
  {
    id: "le-regard-multiple",
    serie: "abysses",
    image: "/artworks/oeuvre-18.jpg",
    available: true,
    titles: {
      fr: "Le Regard Multiple",
      en: "The Multiple Gaze",
      es: "La Mirada Múltiple",
    },
    descriptions: {
      fr: "Plusieurs yeux regardent depuis des profondeurs différentes. Un ruban rouge traverse tout. Quelque chose comme la conscience, fragmentée, distribuée dans plusieurs corps.",
      en: "Several eyes gaze from different depths. A red ribbon cuts through everything. Something like consciousness, fragmented, distributed across several bodies.",
      es: "Varios ojos miran desde diferentes profundidades. Una cinta roja lo atraviesa todo. Algo como la conciencia, fragmentada, distribuida en varios cuerpos.",
    },
  },
  {
    id: "la-danse-des-elements",
    serie: "biomes",
    image: "/artworks/oeuvre-19.jpg",
    available: true,
    titles: {
      fr: "La Danse des Éléments",
      en: "Dance of the Elements",
      es: "La Danza de los Elementos",
    },
    descriptions: {
      fr: "Dans un cercle de lumière bleue, trois formes végétales dansent. Elles ne s'enroulent pas l'une autour de l'autre — elles s'accordent.",
      en: "Within a circle of blue light, three plant forms dance. They do not wrap around each other — they tune to each other.",
      es: "Dentro de un círculo de luz azul, tres formas vegetales bailan. No se envuelven la una a la otra — se afinan mutuamente.",
    },
  },
  {
    id: "floraison-nocturne",
    serie: "biomes",
    image: "/artworks/oeuvre-20.jpg",
    available: true,
    titles: {
      fr: "Floraison Nocturne",
      en: "Night Bloom",
      es: "Floración Nocturna",
    },
    descriptions: {
      fr: "Une fleur succulente s'épanouit dans le noir, violette et blanche. Des spirales bleues l'entourent comme une berceuse. Elle n'a pas besoin de lumière pour fleurir.",
      en: "A succulent flower blooms in the dark, violet and white. Blue spirals surround it like a lullaby. It does not need light to bloom.",
      es: "Una flor suculenta florece en la oscuridad, violeta y blanca. Las espirales azules la rodean como una canción de cuna. No necesita luz para florecer.",
    },
  },
  {
    id: "le-messager",
    serie: "entites",
    image: "/artworks/oeuvre-21.jpg",
    available: true,
    titles: { fr: "Le Messager", en: "The Messenger", es: "El Mensajero" },
    descriptions: {
      fr: "Une créature-trompette, colorée et précise, transporte quelque chose d'important. Le message n'est pas dans sa bouche — il est dans sa forme entière.",
      en: "A trumpet-creature, colourful and precise, carries something important. The message is not in its mouth — it is in its entire form.",
      es: "Una criatura-trompeta, colorida y precisa, transporta algo importante. El mensaje no está en su boca — está en toda su forma.",
    },
  },
  {
    id: "la-saison-des-lunes",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-22.jpg",
    available: true,
    titles: {
      fr: "La Saison des Lunes",
      en: "Season of Moons",
      es: "La Estación de las Lunas",
    },
    descriptions: {
      fr: "Des lunes en croissant de toutes couleurs tournoient dans un ciel que l'on ne connaît pas. Il existe des saisons pour les astres aussi — des moments où ils se rassemblent.",
      en: "Crescent moons of all colours swirl in an unfamiliar sky. There are seasons for stars too — moments when they gather.",
      es: "Lunas en creciente de todos los colores giran en un cielo desconocido. También hay estaciones para los astros — momentos en que se reúnen.",
    },
  },
  {
    id: "l-eclosion",
    serie: "biomes",
    image: "/artworks/oeuvre-23.jpg",
    available: true,
    titles: { fr: "L'Éclosion", en: "The Hatching", es: "La Eclosión" },
    descriptions: {
      fr: "Un œil de serpent sur une tige dorée, entouré de fleurs et d'ailes. Le moment précis où quelque chose décide de devenir visible.",
      en: "A snake's eye on a golden stem, surrounded by flowers and wings. The precise moment when something decides to become visible.",
      es: "El ojo de una serpiente en un tallo dorado, rodeado de flores y alas. El momento preciso en que algo decide volverse visible.",
    },
  },
  {
    id: "la-planete-rose",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-24.jpg",
    available: true,
    titles: { fr: "La Planète Rose", en: "The Pink Planet", es: "El Planeta Rosa" },
    descriptions: {
      fr: "Une sphère bleue massive, entourée de rubans roses et violets. Elle n'orbite autour de rien — c'est elle le centre. Tout tourne autour d'elle sans qu'elle le demande.",
      en: "A massive blue sphere, surrounded by pink and violet ribbons. It orbits nothing — it is the centre. Everything turns around it without being asked.",
      es: "Una esfera azul masiva, rodeada de cintas rosas y violetas. No orbita nada — ella es el centro. Todo gira a su alrededor sin que ella lo pida.",
    },
  },
  {
    id: "la-nuit-verte",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-25.jpg",
    available: true,
    titles: { fr: "La Nuit Verte", en: "The Green Night", es: "La Noche Verde" },
    descriptions: {
      fr: "Des croissants jaune-vert flottent dans une nuit douce. En bas à droite, des cellules ou des écailles — la nuit est aussi vivante que le jour, mais plus discrète.",
      en: "Yellow-green crescents float in a gentle night. Bottom right, cells or scales — the night is as alive as day, but more discreet.",
      es: "Crecientes amarillo-verdes flotan en una noche suave. Abajo a la derecha, células o escamas — la noche está tan viva como el día, pero más discreta.",
    },
  },
  {
    id: "les-courants-profonds",
    serie: "abysses",
    image: "/artworks/oeuvre-26.jpg",
    available: true,
    titles: {
      fr: "Les Courants Profonds",
      en: "Deep Currents",
      es: "Las Corrientes Profundas",
    },
    descriptions: {
      fr: "Des bulles et des anneaux traversent un courant bleu profond. Quelque chose circule ici depuis des millions d'années, indifférent à qui l'observe.",
      en: "Bubbles and rings traverse a deep blue current. Something has been flowing here for millions of years, indifferent to who watches.",
      es: "Burbujas y anillos atraviesan una corriente azul profunda. Algo ha estado fluyendo aquí durante millones de años, indiferente a quién observa.",
    },
  },
  {
    id: "la-caverne",
    serie: "abysses",
    image: "/artworks/oeuvre-27.jpg",
    available: true,
    titles: { fr: "La Caverne", en: "The Cave", es: "La Caverna" },
    descriptions: {
      fr: "Une forme en corne ou en grotte — bleu et bordeaux — avec des racines qui pendent. Ce n'est pas un abri. C'est un passage vers ce qui est plus profond encore.",
      en: "A horn or cave form — blue and bordeaux — with roots hanging. This is not a shelter. It is a passage toward something even deeper.",
      es: "Una forma de cuerno o cueva — azul y burdeos — con raíces colgando. Esto no es un refugio. Es un pasaje hacia algo aún más profundo.",
    },
  },
  {
    id: "la-fleur-qui-voit",
    serie: "biomes",
    image: "/artworks/oeuvre-28.jpg",
    available: true,
    titles: {
      fr: "La Fleur Qui Voit",
      en: "The Flower That Sees",
      es: "La Flor Que Ve",
    },
    descriptions: {
      fr: "Une fleur-orchidée avec un œil au centre de sa tige. Elle est belle — mais elle regarde. Les plantes aussi ont une mémoire, une perception, une intention.",
      en: "An orchid-flower with an eye at the centre of its stem. It is beautiful — but it is watching. Plants too have memory, perception, intention.",
      es: "Una flor-orquídea con un ojo en el centro de su tallo. Es hermosa — pero está mirando. Las plantas también tienen memoria, percepción, intención.",
    },
  },
  {
    id: "la-trinite-des-astres",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-29.jpg",
    available: true,
    titles: {
      fr: "La Trinité des Astres",
      en: "Trinity of Stars",
      es: "La Trinidad de los Astros",
    },
    descriptions: {
      fr: "Trois sphères argentées, reliées par des fils invisibles. Elles ne se ressemblent pas — elles se complètent. Une trinité cosmique sans hiérarchie.",
      en: "Three silver spheres, connected by invisible threads. They do not resemble each other — they complete each other. A cosmic trinity without hierarchy.",
      es: "Tres esferas plateadas, conectadas por hilos invisibles. No se parecen — se complementan. Una trinidad cósmica sin jerarquía.",
    },
  },
  {
    id: "le-portail",
    serie: "entites",
    image: "/artworks/oeuvre-31.jpg",
    available: true,
    titles: { fr: "Le Portail", en: "The Portal", es: "El Portal" },
    descriptions: {
      fr: "Des cercles concentriques — violet, or, vert, blanc — autour d'un vide central. Un portail ne mène nulle part en particulier. Il mène à l'autre côté de ce que tu connais.",
      en: "Concentric circles — violet, gold, green, white — around a central void. A portal leads nowhere in particular. It leads to the other side of what you know.",
      es: "Círculos concéntricos — violeta, dorado, verde, blanco — alrededor de un vacío central. Un portal no lleva a ningún lugar en particular. Lleva al otro lado de lo que conoces.",
    },
  },
  {
    id: "le-tourbillon",
    serie: "abysses",
    image: "/artworks/oeuvre-32.jpg",
    available: true,
    titles: {
      fr: "Le Tourbillon",
      en: "The Whirlpool",
      es: "El Torbellino",
    },
    descriptions: {
      fr: "Bleu, violet, teal — une entité en rotation perpétuelle. Elle aspire les formes autour d'elle. Tout spirale finit par aspirer quelque chose. Et par libérer quelque chose d'autre.",
      en: "Blue, violet, teal — an entity in perpetual rotation. It draws in forms around it. Every spiral ends up pulling something in. And releasing something else.",
      es: "Azul, violeta, teal — una entidad en rotación perpetua. Atrae las formas a su alrededor. Toda espiral termina atrayendo algo. Y liberando otra cosa.",
    },
  },
  {
    id: "les-navigateurs",
    serie: "biomes",
    image: "/artworks/oeuvre-33.jpg",
    available: true,
    titles: {
      fr: "Les Navigateurs",
      en: "The Navigators",
      es: "Los Navegantes",
    },
    descriptions: {
      fr: "Des petites entités dispersées dans un grand espace noir. Chacune suit sa propre trajectoire. Elles ne se connaissent pas — mais elles vont dans la même direction.",
      en: "Small entities scattered across a vast black space. Each follows its own trajectory. They do not know each other — but they are heading in the same direction.",
      es: "Pequeñas entidades dispersas en un gran espacio negro. Cada una sigue su propia trayectoria. No se conocen — pero van en la misma dirección.",
    },
  },
  {
    id: "le-souffle-bleu",
    serie: "cosmogonie",
    image: "/artworks/oeuvre-34.jpg",
    available: true,
    titles: { fr: "Le Souffle Bleu", en: "The Blue Breath", es: "El Aliento Azul" },
    descriptions: {
      fr: "Un courant lumineux bleu traverse le noir. Des bulles se forment, des orbites se dessinent. C'est le premier souffle — avant les mots, avant les noms.",
      en: "A luminous blue current crosses the black. Bubbles form, orbits take shape. This is the first breath — before words, before names.",
      es: "Una corriente luminosa azul atraviesa el negro. Las burbujas se forman, las órbitas toman forma. Este es el primer aliento — antes de las palabras, antes de los nombres.",
    },
  },
  {
    id: "interieur-violet",
    serie: "biomes",
    image: "/artworks/oeuvre-09.jpg",
    available: true,
    titles: {
      fr: "Intérieur Violet",
      en: "Violet Interior",
      es: "Interior Violeta",
    },
    descriptions: {
      fr: "Des structures internes violettes, exposées comme dans une dissection douce. Ce n'est pas violent — c'est une révélation. La beauté de ce qui est caché.",
      en: "Violet internal structures, exposed as in a gentle dissection. This is not violence — it is revelation. The beauty of what is hidden.",
      es: "Estructuras internas violetas, expuestas como en una disección suave. Esto no es violencia — es revelación. La belleza de lo que está oculto.",
    },
  },
];

export function getArtworkById(id: string): Artwork | undefined {
  return artworks.find((a) => a.id === id);
}

export function getArtworksBySerie(serie: Serie): Artwork[] {
  return artworks.filter((a) => a.serie === serie);
}

export const series: Serie[] = ["cosmogonie", "entites", "biomes", "abysses"];
