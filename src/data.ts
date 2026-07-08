import { Product } from "./types";

export const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Le Sablier de Chronos",
    tagline: "Maîtrisez l'écoulement du temps cérébral",
    description: "Ce sablier contient un sable d'or de quartz cristallisé et d'éclats supraconducteurs qui interagissent avec votre champ électromagnétique. Il s'écoule plus lentement lorsque vous entrez en phase de concentration profonde, matérialisant l'état d'hyperfocus.",
    price: 129,
    category: "Focus",
    imageUrl: "https://images.unsplash.com/photo-1543157145-f78c636d023d?w=600&auto=format&fit=crop&q=80",
    energyIndex: "94%",
    components: ["Quartz cristallisé noir", "Laiton antique de Neptune", "Champ d'induction passif"],
    primaryColor: "#6366F1"
  },
  {
    id: "p2",
    name: "Le Prisme de Solitude",
    tagline: "Réfractez le bruit ambiant en lumière pure",
    description: "Taillé dans un cristal de spinelle rare de laboratoire, ce prisme pyramidal décompose la lumière naturelle en spectres chromatiques précis. Idéal pour purifier la pièce des ondes négatives et instaurer une atmosphère de méditation absolue.",
    price: 149,
    category: "Calm",
    imageUrl: "https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80",
    energyIndex: "97%",
    components: ["Cristal de spinelle de laboratoire", "Base d'obsidienne polie", "Dépôt de titane sous vide"],
    primaryColor: "#8B5CF6"
  },
  {
    id: "p3",
    name: "La Bougie d'Aura Stellaire",
    tagline: "Une flamme coulée sous votre constellation",
    description: "Une bougie olfactive coulée à la main lors de l'alignement de votre constellation dominante. Elle diffuse une odeur céleste de cèdre cosmique, de vétiver humide et de poussière lunaire pour réguler l'anxiété et ancrer vos pensées.",
    price: 89,
    category: "Calm",
    imageUrl: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80",
    energyIndex: "91%",
    components: ["Cire de soja organique pressée", "Mèche de bois crépitant", "Infusion d'huiles de comète"],
    primaryColor: "#EC4899"
  },
  {
    id: "p4",
    name: "L'Infuseur Nébuleuse",
    tagline: "Alchimie des herbes et des énergies astrales",
    description: "Ce flacon de double verre borosilicaté est doté d'une chambre d'ionisation magnétique. Il prépare des élixirs chauds en dynamisant les molécules d'eau, optimisant l'assimilation des principes actifs pour un regain d'énergie cognitive immédiat.",
    price: 179,
    category: "Energy",
    imageUrl: "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80",
    energyIndex: "95%",
    components: ["Verre borosilicaté double paroi", "Filtre en titane chirurgical", "Bague d'ionisation magnétique"],
    primaryColor: "#F59E0B"
  },
  {
    id: "p5",
    name: "Le Capteur de Songes Lucides",
    tagline: "Prenez les rênes de vos mondes nocturnes",
    description: "Tissé à la main à l'aide de fils d'alliage de cuivre pur, de soie de mûrier et de perles de labradorite brute. Placé au-dessus du lit, ce capteur harmonise les ondes cérébrales thêta durant le sommeil paradoxal pour favoriser la lucidité onirique.",
    price: 219,
    category: "Lucidity",
    imageUrl: "https://images.unsplash.com/photo-1515516969-d4008cc6241a?w=600&auto=format&fit=crop&q=80",
    energyIndex: "98%",
    components: ["Fils d'alliage de cuivre pur", "Labradorite iridescente brute", "Soie lunaire naturelle"],
    primaryColor: "#10B981"
  },
  {
    id: "p6",
    name: "Le Pendule d'Harmonie Vibratoire",
    tagline: "Réalignez vos pôles énergétiques intérieurs",
    description: "Un pendule en améthyste de Madagascar équilibré au micro-gramme, suspendu à une chaîne en argent sterling. Utilisé pour mesurer vos méridiens, il apporte des réponses claires à vos questions de positionnement spirituel quotidien.",
    price: 99,
    category: "Focus",
    imageUrl: "https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?w=600&auto=format&fit=crop&q=80",
    energyIndex: "93%",
    components: ["Améthyste de Madagascar grade AAA", "Chaîne d'argent sterling 925", "Noyau de résonance magnétique"],
    primaryColor: "#3B82F6"
  }
];

// Map a user friendly keyword (like 'hourglass' or 'crystal') to high-quality curated images
export function getImageUrlByKeyword(keyword: string): string {
  switch (keyword?.toLowerCase()) {
    case "hourglass":
      return "https://images.unsplash.com/photo-1543157145-f78c636d023d?w=600&auto=format&fit=crop&q=80";
    case "crystal":
      return "https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80";
    case "candle":
      return "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=600&auto=format&fit=crop&q=80";
    case "incense":
      return "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80";
    case "bottle":
      return "https://images.unsplash.com/photo-1556881286-fc6915169721?w=600&auto=format&fit=crop&q=80";
    case "prism":
    default:
      return "https://images.unsplash.com/photo-1515260268569-9271009adfdb?w=600&auto=format&fit=crop&q=80";
  }
}
