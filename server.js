// Dépendances
const { join }  = require("path")
const express   = require("express")


// Initialisation de l'application
const port  = process.env.PORT || 4000
const app   = express()

// Configuration d'EJS
app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

// Utilisation des "Middlewares"
app.use(express.static(join(__dirname, "public")))

// Routing
app.get("/", (req, res) => {

  res.status(200).render(index)
})

// Démarrage de l'application
app.listen(port, () => console.log(`Démarré sur http://localhost:${port}`))
