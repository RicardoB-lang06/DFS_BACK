const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const { pool } = require('./src/db');
const { sign, authMiddleware } = require('./src/auth');
const { router: productosRouter } = require('./src/routes/productos.routes');
const { router: usersRouter } = require('./src/routes/users.routes');

const PORT = process.env.PORT || 3000
const app = express()

const allowed = [
  'http://localhost:3000',
  'http://localhost:3001',
];

const limiter = rateLimit({
    windowMs: 15 * 60 *1000,//15 minutos
    max: 90,//límite de solicitudes por IP
    message: 'Demasiadas solicitudes, por favor intente de nuevo más tarde'
})

app.use(limiter);

app.use(cors({
  origin: function (origin, cb) {
    if (!origin) return cb(null, true); // Postman
    if (allowed.includes(origin)) return cb(null, true);
    return cb(new Error('CORS bloqueado: ' + origin));
  }
}));

app.use(express.json())

app.use

app.get('/', (req, res) => {
  res.send('API OK');
})
app.use('/productos', productosRouter);
app.use('/users', usersRouter);


app.get('/privado', authMiddleware, (req, res) => {
  return res.json({
    ok: true,
    user: req.user
  })
});


app.listen(PORT, () => {
  console.log(`Servidor Corriendo en el puerto ${PORT}`)
})

app.get('/health', async (req, res) => {
    try{
        await pool.query('select 1');
        return res.json({ok: true});
    }catch(err){
        return res.status(500).json({ok: false})
    }
  res.json({ok:true, service:'api'})
})

app.get('/health/db', async (req, res) => {
  try {
    const r = await pool.query('select 1 as ok');
    return res.json({ok:true, db:r.rows[0].ok})
  } catch (err) {
    console.log('DB Error', err.message)
    return res.status(500).json({ok:false, error:'DB no disponible'})
  }
})

const { errorHandler } = require('./src/middlewares/error.middleware');
app.use(errorHandler);