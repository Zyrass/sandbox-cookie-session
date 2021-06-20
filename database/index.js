require('mongoose').connect(
  'mongodb+srv://zyrass:demo@expresssession.zve6h.mongodb.net/demo',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => console.log('Connecté à la base de donnée'))
.catch(err => console.log('La connexion à la base de donnée à échoué', err))
