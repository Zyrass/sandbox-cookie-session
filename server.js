// Dépendances
require("./database")
const { join }    = require("path")
const express     = require("express")
const session     = require("express-session")
const MongoStore  = require("connect-mongo")

// Initialisation de l'application
const port  = process.env.PORT || 4000
const app   = express()

// Configuration d'EJS
app.set("views", join(__dirname, "views"))
app.set("view engine", "ejs")

// Utilisation des "Middlewares"
app.use(express.static(join(__dirname, "public")))
app.use(session({
  secret: "Je suis un super secret très difficile à cerner...",
  resave: false,
  saveUninitialized: true,
  cookie: {
    path: "/",
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 jours
    secure: false
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://zyrass:demo@expresssession.zve6h.mongodb.net/demo',
    ttl: 60 * 60 * 24 * 7,
    touchAfter: 3600 * 24,
    autoRemove: "native",
    crypto: {
      secret: this.secret
    }
  })
}))

// Routing
app.get("/", (req, res) => {
  
  console.log( req.session.id )

  if ( req.session.views ) {
    req.session.views += 1
  } else {
    req.session.views = 1
  }

  console.log( req.session )

  res.status(200).render('index')
})

// Démarrage de l'application
app.listen(port, () => console.log(`Démarré sur http://localhost:${port}`))
