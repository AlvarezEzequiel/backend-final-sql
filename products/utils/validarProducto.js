
const PROPIEDADES_NECESARIAS = ['titulo', 'precio', 'stock', 'codigo', 'descripcion']

const VALIDACIONES_PRODUCTO = {
    'precio':{
        validacion: (valor) => {
            return Boolean(valor) && !isNaN(valor) && valor > 1
        },
        errorText: 'Precio Debe ser un numero'
    },
    'titulo': {
        validacion: (valor) => {
            return Boolean(valor) && (typeof(valor) === 'string') && valor.length > 3
        },
        errorText: 'titulo Debe ser un string y tener mas de 3 caracteres'
    }, 
    'stock': {
        validacion: (valor) => {
            return Boolean(valor) && !isNaN(valor) && valor > 1
        },
        errorText: 'stock Debe ser un numero y ser mayor a 1'
    },
    'descripcion': {
        validacion: (valor) => {
            return Boolean(valor) && isNaN(valor) && valor.length > 20 && (typeof(valor) === 'string')
        },
        errorText: 'descripcion Debe ser un string y tener mas de 20 caracteres'
    },
    'codigo': {
        validacion: (valor) => {
            return Boolean(valor) && valor.length > 3 
        },
        errorText: 'codigo Debe ser un string y tener mas de 3 caracteres'
    }
}

const validarPropiedadesProducto = (producto) => {
    try{
        const propiedades_producto = Object.keys(producto)
        const propiedades_faltantes = []
        const propiedades_sobrantes = []

        for (let propiedad_necesaria of PROPIEDADES_NECESARIAS) {
            if (!propiedades_producto.includes(propiedad_necesaria)) {
                propiedades_faltantes.push(propiedad_necesaria)
            }

        }
        if (propiedades_faltantes.length > 0) {
            throw { status: 400, message: 'Faltan las propiedades: [' + propiedades_faltantes.join(', ') + ']' }
        }
        for (propiedad of propiedades_producto) {
            if (!PROPIEDADES_NECESARIAS.includes(propiedad)) {
                propiedades_sobrantes.push(propiedad)
            }
        }
        if (propiedades_sobrantes.length > 0) {
            throw { status: 400, message: 'Sobran las propiedades: [' + propiedades_sobrantes.join(', ') + ']' }
        }
        for (propiedad in VALIDACIONES_PRODUCTO) {
            let valor = producto[propiedad]
            if(!VALIDACIONES_PRODUCTO[propiedad].validacion(valor)){
                throw {status: 400, message: VALIDACIONES_PRODUCTO[propiedad].errorText}
            }
        }
        return true
    }
    catch(error){
        throw error
    }
        
}

module.exports = {validarPropiedadesProducto}

