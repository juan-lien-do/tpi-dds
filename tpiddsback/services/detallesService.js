const detalles = require("../models/detalles");
const { ValidationError, Op } = require('sequelize');

async function getAll(factura_id){
    let where = {};
    if (factura_id != undefined && factura_id !== "") {
        where.factura_id = {
          [Op.eq]: factura_id,
        };
      }
    return await detalles.findAll({where:where});
}

async function getById(id){
    return await detalles.findOne({
        where: {
            id_detalle: id,
            activo: true
        }
    })

}

async function create(body){
    try{
        let nuevo_detalle_factura = await detalles.create(
            //req.body
            {
                producto_id: body.producto_id,
                factura_id: body.factura_id,
                cantidad: body.cantidad,
                precio: body.precio
            }
        );
        return await detalles.findByPk(nuevo_detalle_factura.id_detalle);

    }catch(err) {
        throw err;
    }
}


async function update(id, body){
    try{

        let det_actualizar = await detalles.findOne({
            where: {
                id_detalle: id
            }
        });

        if (det_actualizar == null) throw new Error;

        det_actualizar.cantidad = body.cantidad ?? det_actualizar.cantidad;

        det_actualizar.producto_id = body.producto_id ?? det_actualizar.producto_id;
        
        return await det_actualizar.save();
    } catch(error){
        throw error;
    }
}

async function deleteById(id){
    try{
        let detalle_borrar = await detalles.findOne({
            where: {
                id_detalle: id
            }
        });
        if(!detalle_borrar) return false;
    
        detalle_borrar.activo = false;
        await detalle_borrar.save();
        return true;
    }catch(error){
        throw Error;
    }
}

const detallesService = {
create : create,
getAll : getAll,
getById : getById,
update : update,
deleteById : deleteById
};


module.exports = detallesService;