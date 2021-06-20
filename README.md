# Les Sessions avec Express

Découverte des Sessions avec Express et son package officiel "express-session"

## Etape 1 - Installer "express-session"

```sh
npm install express-session
```

## Etape 2 - Importer "express-session"

```js
// ES5
const session = require('express-session');

// ES6 et les modules
import session from 'express-session';
```

## Etape 3 - Utilisation du middelware

```js
app.use(session({

  // 3 clés obligatoire : secret, resave, saveUninitialized
  secret: "Une clé vraiment secrete",
  resave: false, // Evite de sauvegarder la session même sans changement.
  saveUninitialized; true,

  // ajout de la clé "cookie" en lui passant un objet.
  cookie: {
    httpOnly: true,
    secure: true,
    path: "/",
    maxAge: 123456789
  }

}));
```

## Etape 4 - Récupération de la session dans la console

```js
app.get('/', (req, res) => {
  // Affiche le contenu de la session
  console.log(req.session);

  // Affiche l'ID de la session
  console.log(res.session.id);
});
```

## Etape 5 - Ajout d'une clé "views"

> Attention avec la configuration précédente et plus précisément avec la key "secure" fixé à true, pour que la vue fonctionne, il faudra OBLIGATOIREMENT être en HTTPS. Auquel cas pour tester cette étape, il faudra passer cette même clé à "false"

```js
app.get('/', (req, res) => {
  if (req.session.views) {
    req.session.views += 1;
  } else {
    req.session.views = 1;
  }

  // Voir le contenu de la session avec la clé "views" qui s'incrémente.
  console.log(req.session);
});
```

## Etape 6 - Persisté les cookies en base de donnée.

### Etape 6.1 - Installation des dépendances

```sh
npm install mongoose connect-mongo
```

### Etape 6.2 - Création d'un fichier pour la connection à la DB

> Pas besoin d'expliquer cette étape, seulement on aura besoin de mongoose.

### Etape 6.3 - Import de connect-mongo (version 4.4.1 utilisé ici)

```js
const MongoStore = require('connect-mongo');
```

### Etape 6.4 - Utilisation de MongoStore

```js
app.use(
  session({
    secret: 'Je suis une super phrase secrète',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    store: MongoStore.create({
      mongoUrl:
        'mongodb+srv://<pseudo>:<password>@expresssession.zve6h.mongodb.net/<db_name>',
      ttl: 60 * 60 * 24 * 7,
      touchAfter: 60 * 60 * 24,
      autoRemove: 'native',
      crypto: {
        secret: this.secret,
      },
    }),
  })
);
```
