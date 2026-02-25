function validarProducto({nombre, precio}){//esta entre {} porque es un objeto
    if (!nombre || typeof nombre !== 'string'){
        console.log(nombre)
        return {ok: false, error: 'Nombre inválido'}
    }
    const p = Number(precio);
    if(!Number.isFinite(p) || p <= 0){
        return {ok: false, error: 'Precio inválido'}
    }
    return {ok: true, data: {nombre, precio: p}}
}

module.exports={ validarProducto };