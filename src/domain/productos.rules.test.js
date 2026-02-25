const { validarProducto } = require('./productos.rules');

test('rechaza nombre vacio', () => {
    const r = validarProducto({nombre: '', precio: 100});
    expect(r.ok).toBe(false)
})

test('rechaza nombre que no sea string', () => {
    const r = validarProducto({nombre: 12, precio: 100});
    expect(r.ok).toBe(false)
})

test('rechaza precio mayor a 0', () => {
    const r = validarProducto({nombre: 'Mouse', precio: 0});
    expect(r.ok).toBe(false)
});

test('rechaza precio igual a 0', () => {
    const r = validarProducto({nombre: 'Mouse', precio: 0});
    expect(r.ok).toBe(false)
});

test('convierte precio de string a numerico', () => {
    const r = validarProducto({ nombre: 'Mouse', precio: '250'});
    expect(r.ok).toBe(true);
    expect(r.data.precio).toBe(250);
})

//TDD
//Test Driven Development
