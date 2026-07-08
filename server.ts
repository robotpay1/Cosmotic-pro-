import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory simple storage for active session orders & reviews
const orderStore: any[] = [];
const reviewStore: any[] = [
  {
    id: "r1",
    author: "Éléonore M.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    date: "Il y a 2 jours",
    productName: "Le Sablier de Chronos",
    comment: "Cet objet a totalement transformé mon espace de travail. Le sable scintille d'une lueur bleutée apaisante qui me permet d'entrer instantanément en état d'hyperfocus. Absolument magique !"
  },
  {
    id: "r2",
    author: "Aurélien D.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
    rating: 5,
    date: "Il y a 5 jours",
    productName: "Prisme de Solitude",
    comment: "Les refractions chromatiques de ce prisme au coucher du soleil sont indescriptibles. Un investissement rentable pour mon bien-être mental."
  },
  {
    id: "r3",
    author: "Zarah V.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
    rating: 4,
    date: "Il y a 1 semaine",
    productName: "Bougie d'Aura Stellaire",
    comment: "L'odeur de cèdre et de poussière stellaire est incroyablement subtile et relaxante. Le fait qu'elle ait été coulée sur mesure selon mon signe astrologique apporte un vrai plus."
  }
];

// Lazy-loaded Gemini AI client helper
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        aiClient = new GoogleGenAI({
          apiKey: apiKey,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });
      } catch (err) {
        console.error("Erreur d'initialisation du client Gemini:", err);
      }
    }
  }
  return aiClient;
}

// 1. API: Health Check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date() });
});

// 2. API: Personalize Cosmic Artifact (AI Generator)
app.post("/api/personalize", async (req, res) => {
  const { zodiac, emotion, light, intention } = req.body;

  if (!zodiac || !emotion || !light) {
    return res.status(400).json({ error: "Paramètres manquants pour la personnalisation" });
  }

  const client = getGeminiClient();

  if (client) {
    try {
      const prompt = `Génère un artéfact cosmique et mystique unique et personnalisé pour une boutique de luxe en ligne en fonction des critères suivants :
- Signe du Zodiaque : ${zodiac}
- Émotion ou état recherché : ${emotion}
- Spectre lumineux favori : ${light}
- Intention personnelle : ${intention || "Harmonie globale"}

Renvoie un objet JSON VALIDE (sans markdown, sans balises \`\`\`json) contenant EXACTEMENT les clés suivantes en français :
- "name": Le nom de l'objet (poétique, mystique, luxueux en français, max 5 mots).
- "tagline": Une courte phrase d'accroche envoûtante (max 10 mots).
- "description": Une description poétique et engageante de l'objet, expliquant comment il utilise le zodiaque, la lumière choisie et l'intention pour infuser de l'énergie (max 3-4 phrases).
- "components": Une liste de 3 éléments rares ou métaphoriques constitutifs de l'objet (ex: "Éclats d'obsidienne noire", "Essence de comète condensée").
- "price": Un prix de vente réaliste pour un objet de luxe (nombre entre 89 et 249).
- "imageUrl": Choisis l'un des mots-clés d'image suivants qui correspond le mieux visuellement à la description : "hourglass", "crystal", "prism", "candle", "incense", "bottle".
- "primaryColor": Une couleur hexadécimale sombre ou mystique qui représente le spectre lumineux choisi.
- "energyIndex": Un pourcentage (ex: "94%") décrivant le taux de résonance spirituelle de l'artéfact.`;

      const response = await client.models.generateContent({
        model: "gemini-3.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const cleanJson = responseText.replace(/```json/g, "").replace(/```/g, "").trim();
      const parsedData = JSON.parse(cleanJson);
      return res.json({ success: true, artifact: parsedData });
    } catch (error) {
      console.error("Erreur lors de la génération Gemini:", error);
      // Fallback on error or API limit
    }
  }

  // Polished local fallback if Gemini is unavailable
  console.log("Utilisation du fallback de génération locale...");
  const fallbacks: Record<string, any> = {
    "hourglass": {
      name: `Le Sablier Éthéré de ${zodiac}`,
      tagline: "Maîtrisez les courants du temps et de l'esprit.",
      description: `Façonné spécifiquement pour le signe ${zodiac}, ce sablier renferme un sable imprégné de l'énergie lumineuse ${light}. Conçu pour calmer l'émotion ${emotion}, il permet de concrétiser votre intention de : ${intention || "Sérénité temporelle"}.`,
      components: ["Sable de quartz cristallisé", "Larmes de comète d'or", "Cadre en laiton brossé de Neptune"],
      price: 129,
      imageUrl: "hourglass",
      primaryColor: light === "Aura Cosmique" ? "#8B5CF6" : light === "Or Solaire" ? "#F59E0B" : "#10B981",
      energyIndex: "96%"
    },
    "crystal": {
      name: `Le Cristal de Résonance ${zodiac}`,
      tagline: "Amplifiez votre harmonie intérieure céleste.",
      description: `Un prisme d'obsidienne et de quartz pur accordé aux fréquences vibratoires de ${zodiac}. Sa réfraction sous le spectre ${light} dissipe les tensions liées à l'état ${emotion} pour libérer la puissance de votre vœu : ${intention || "Harmonisation globale"}.`,
      components: ["Obsidienne noire polie", "Poussière d'étoile de Sirius", "Noyau de cuivre supraconducteur"],
      price: 149,
      imageUrl: "crystal",
      primaryColor: light === "Aura Cosmique" ? "#EC4899" : light === "Or Solaire" ? "#EF4444" : "#6366F1",
      energyIndex: "98%"
    },
    "candle": {
      name: `La Bougie Astrale d'Intention`,
      tagline: "Brûlez vos doutes sous la lueur des astres.",
      description: `Coulée à la main lors de la pleine lune pour le signe ${zodiac}, cette cire de soja intègre des huiles essentielles rares choisies pour équilibrer l'émotion ${emotion}. Elle diffuse un halo de lumière ${light} parfait pour focaliser sur : ${intention || "L'illumination de l'âme"}.`,
      components: ["Cire de soja bio infusée", "Mèche en bois crépitant", "Éclats d'améthyste véritable"],
      price: 89,
      imageUrl: "candle",
      primaryColor: light === "Aura Cosmique" ? "#A78BFA" : light === "Or Solaire" ? "#FBBF24" : "#34D399",
      energyIndex: "92%"
    }
  };

  const keys = Object.keys(fallbacks);
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  const selectedFallback = fallbacks[randomKey];

  return res.json({ success: true, artifact: selectedFallback, fallbackUsed: true });
});

// 3. API: Save and Retrieve Orders
app.post("/api/order", (req, res) => {
  const { cartItems, shippingAddress, paymentDetails, total } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "Le panier est vide" });
  }

  const orderId = "ORD-" + Math.floor(100000 + Math.random() * 900000);
  const order = {
    id: orderId,
    date: new Date().toLocaleDateString("fr-FR"),
    cartItems,
    shippingAddress,
    total,
    status: "En cours de préparation",
    step: 1, // Progress tracking
    steps: [
      { name: "Commande validée", done: true, desc: "Votre transaction a été approuvée avec succès." },
      { name: "Alchimie & Assemblage", done: false, desc: "Nos artisans réunissent les minéraux et essences requis." },
      { name: "Infusion Énergétique", done: false, desc: "L'artéfact est purifié sous le spectre lumineux idoine." },
      { name: "Expédition Cosmique", done: false, desc: "Remise au transporteur prioritaire Téléport Express." }
    ]
  };

  orderStore.push(order);
  res.json({ success: true, order });
});

app.get("/api/orders", (req, res) => {
  res.json({ success: true, orders: orderStore });
});

// Simulate updating order step over time for realistic interactive tracking!
app.post("/api/orders/simulate-step", (req, res) => {
  const { orderId } = req.body;
  const order = orderStore.find(o => o.id === orderId);
  if (order) {
    if (order.step < 4) {
      order.step += 1;
      order.steps[order.step - 1].done = true;
      if (order.step === 4) {
        order.status = "Livré en orbite";
      } else {
        order.status = order.steps[order.step - 1].name;
      }
    }
    return res.json({ success: true, order });
  }
  res.status(404).json({ error: "Commande non trouvée" });
});

// 4. API: Save and Retrieve Reviews
app.get("/api/reviews", (req, res) => {
  res.json({ success: true, reviews: reviewStore });
});

app.post("/api/reviews", (req, res) => {
  const { author, rating, productName, comment } = req.body;

  if (!author || !rating || !comment) {
    return res.status(400).json({ error: "Champs requis manquants" });
  }

  const newReview = {
    id: "r" + (reviewStore.length + 1),
    author,
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=faces",
    rating: Number(rating),
    date: "À l'instant",
    productName: productName || "Artéfact Céleste",
    comment
  };

  reviewStore.unshift(newReview);
  res.json({ success: true, review: newReview });
});

// 5. API: Dashboard Analytics Simulator (Shows "high profitability" & realistic activity!)
app.get("/api/analytics", (req, res) => {
  const totalSales = orderStore.reduce((acc, o) => acc + o.total, 0) + 12540; // Fictional base + real orders
  const ordersCount = orderStore.length + 84;
  const averageBasket = Math.round(totalSales / ordersCount);
  
  res.json({
    success: true,
    stats: {
      totalSales,
      ordersCount,
      averageBasket,
      visitorCount: 1420 + orderStore.length * 5,
      conversionRate: "5.8%",
      activeUsers: Math.floor(Math.random() * 15) + 3
    },
    liveFeed: [
      { city: "Paris", item: "Le Sablier de Chronos", amount: 129, time: "Il y a 2 min" },
      { city: "Genève", item: "Prisme de Solitude", amount: 149, time: "Il y a 8 min" },
      { city: "Bruxelles", item: "Bougie d'Aura Stellaire", amount: 89, time: "Il y a 15 min" },
      ...orderStore.map(o => ({
        city: o.shippingAddress?.city || "Paris",
        item: o.cartItems[0]?.name || "Artéfact Personnalisé",
        amount: o.total,
        time: "À l'instant"
      }))
    ]
  });
});

// Vite & Static assets server routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
