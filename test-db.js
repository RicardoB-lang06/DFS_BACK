const { pool } = require('./src/db');

(async ()=>{
    const r1 = await pool.query('select 1 as ok');
    console.log('Prueba select 1:', r1.rows);

    const r2 = await pool.query(
        'select id, nombre, precio from "Productos" order by id asc limit 3 offset 3;'//si quiero ver pagina 2 uso 2-1*3
    )
    console.log(r2.rows)
})();