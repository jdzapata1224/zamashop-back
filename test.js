const mongoose = require('mongoose');

// Reemplaza con TU string de conexión
const uri = 'mongodb+srv://zamashop-user:Ap69WONrxbnGUrUI@clusterdev.bn4cwwc.mongodb.net/?appName=ClusterDev';
console.log('Intentando conectar a:', uri.substring(0, 30) + '...');
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri,clientOptions)
  .then(() => {
    console.log('✅ Conectado a MongoDB exitosamente');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error de conexión:', error.message);
    console.error('Código de error:', error.code);
    process.exit(1);
  });