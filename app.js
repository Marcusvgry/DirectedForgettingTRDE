// app.js
import express from "express";
import { randomBytes } from "crypto";
import fs from "fs";
import path from "path";

// (Nur für ESM) __filename und __dirname definieren
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateRandomID(length = 15) {
  return randomBytes(length).toString("hex").slice(0, length);
}

// ================================
//  Express App
// ================================
const app = express();

const distPath = path.join(__dirname, "dist");
const docsPath = path.join(__dirname, "docs");
const publicPath = path.join(__dirname, "public");
const buildRoots = [distPath, docsPath, publicPath];
const staticRoot =
  buildRoots.find((root) => fs.existsSync(path.join(root, "index.html"))) ??
  publicPath;
const appBase = (process.env.BASE_PATH || "/DirectedForgettingTRDE").replace(
  /\/$/,
  "",
);
const indexPath = path.join(staticRoot, "index.html");

// Statische Verzeichnisse (dist/docs bevorzugt)
app.use(express.static(staticRoot));
if (appBase) {
  app.use(appBase, express.static(staticRoot));
}
app.use("/assets", express.static(path.join(publicPath, "assets")));

// Body parser über Express-Bordmittel
app.use(express.json({ limit: "10000kb" }));
app.use(
  express.text({
    type: ["text/csv", "text/plain"],
    limit: "10000kb",
  }),
);

// ================================
//  Routen
// ================================

const sendIndex = (_req, res) => {
  if (!fs.existsSync(indexPath)) {
    return res.status(500).send(`index.html nicht gefunden: ${indexPath}`);
  }
  return res.sendFile(indexPath);
};

app.get("/", sendIndex);
if (appBase) {
  app.get(appBase, sendIndex);
  app.get(`${appBase}/`, sendIndex);
}

// POST: data (CSV)
app.post("/data", (req, res) => {
  const dataCSV = req.body;
  const subject_id = generateRandomID();
  const filename = `${subject_id}.csv`;

  const dataDir = path.join(__dirname, "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const filePath = path.join(dataDir, filename);
  fs.writeFile(filePath, dataCSV, (err) => {
    if (err) {
      return res.status(500).send("Fehler beim Speichern der Daten");
    }
    return res.status(200).send("Daten erfolgreich gespeichert");
  });
});

// ================================
//  Serverstart
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`[INFO] Server listening on port ${PORT}`);
});
