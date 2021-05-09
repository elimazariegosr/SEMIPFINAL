const mysql = require('mysql');
const uuid = require('uuid');
const Router = require("express");
const app = Router();
const aws_keys = require('./users');


//instanciamos el sdk
var AWS = require('aws-sdk');

//instanciamos los servicios a utilizar con sus respectivos accesos.
const s3 = new AWS.S3(aws_keys.s3);
const rek = new AWS.Rekognition(aws_keys.rekognition);
const translate = new AWS.Translate(aws_keys.translate);

//MySQL base de datos
var conn = mysql.createPool(aws_keys.db_credentials);

const perfiles = "AtJob";
const oficios = "Oficios";
const bucket = "practica1-g30-imagenes";


/*******************************************************************************************************/
/*********************************************%%%%%****%***%********************************************/
/*********************************************%***%*****%*%*********************************************/
/*********************************************%%%%%******%**********************************************/
/*********************************************%**********%**********************************************/
/*********************************************%**********%**********************************************/
/*******************************************************************************************************/

//CREACIONES
app.post("/crearUsuario", async (req, res) => {
    console.log("CREAR USUARIO----------------->")
    let body = req.body;
    let nombre = body.nombre;
    let apellido = body.apellido;
    let email = body.email;
    let pass = body.pass;
    let dpi = body.dpi;
    let base64 = body.base64;
    let tipo = body.tipo;

    //Decodificar imagen
    let decodedImage = Buffer.from(base64, 'base64');

    //Parámetros para subir imagen a S3
    var paramsS3 = {
        Bucket: bucket,
        Key: `${perfiles}/${nombre}-${uuid()}.${tipo}`,
        Body: decodedImage,
        ContentType: "image",
        ACL: 'public-read',
    };

    s3.upload(paramsS3, function sync(err, data) {
        if (err) {
            console.log('Error uploading photo:', err);
            res.send(null)
        } else {
            url = data.Location;

            let consulta = `call crearUsuario('${nombre}', '${apellido}', '${email}', '${pass}', ${dpi}, '${url}');`;
            conn.query(consulta, function (err, result) {
                if (err) {
                    res.send(null);
                } else {
                    res.send(`{"res": "si"`);
                }
            });

        }

    });

});

app.post("/crearOficio", async (req, res) => {
    console.log("CREAR OFICIO----------------->")
    let body = req.body;

    let nombre = body.nombre;

    let consulta = `call crearOficio('${nombre}');`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send('{"res" : "si"}');
        }
    });

});

app.post("/crearServicio", async (req, res) => {
    console.log("CREAR SERVICIO----------------->")
    let body = req.body;

    let nombre = body.nombre;
    let descripcion = body.descripcion;
    let fecha = body.fecha;
    let empleado = body.empleado;
    let cliente = body.cliente;
    let oficio = body.oficio;
    let base64 = body.base64;
    let tipo = body.tipo;

    //Decodificar imagen
    let decodedImage = Buffer.from(base64, 'base64');

    //Parámetros para subir imagen a S3
    var paramsS3 = {
        Bucket: bucket,
        Key: `${oficios}/${nombre}-${uuid()}.${tipo}`,
        Body: decodedImage,
        ContentType: "image",
        ACL: 'public-read',
    };

    s3.upload(paramsS3, function sync(err, data) {
        if (err) {
            console.log('Error uploading photo:', err);
            res.send(null)
        } else {
            url = data.Location;

            let consulta = `call crearServicio('${nombre}', '${descripcion}', '${url}', '${fecha}', ${empleado}, ${cliente}, ${oficio});`;
            conn.query(consulta, function (err, result) {
                if (err) {
                    res.send(null);
                } else {
                    res.send(`{"res": "si"`);
                }
            });

        }

    });

});


//BUSQUEDAS
app.post("/buscarUsuario", async (req, res) => {
    console.log("BUSCAR USUARIO----------------->")
    let body = req.body;

    let email = body.email;
    let pass = body.pass;

    let consulta = `call buscarUsuario('${email}', '${pass}');`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/buscarOficio", async (req, res) => {
    console.log("BUSCAR OFICIO----------------->")

    let consulta = `call buscarOficio();`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/buscarEstado", async (req, res) => {
    console.log("BUSCAR ESTADO----------------->")

    let consulta = `call buscarEstado();`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/buscarServicios", async (req, res) => {
    console.log("BUSCAR SERVICIOS----------------->")

    let consulta = `call buscarServicios();`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});

app.post("/buscarServicio", async (req, res) => {
    console.log("BUSCAR SERVICIO----------------->")
    let body = req.body;

    let id = body.id;

    let consulta = `call buscarServicios(${id});`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(result);
        }
    });

});


//ACTUALIZACIONES
app.post("/actualizarUsuario", async (req, res) => {
    console.log("ACTUALIZAR USUARIO----------------->")
    let body = req.body;

    let id = body.id;
    let nombre = body.nombre;
    let apellido = body.apellido;
    let email = body.email;
    let pass = body.pass;
    let dpi = body.dpi;
    let foto = body.foto;
    let base64 = body.base64;

    if (foto != '') {
        let consulta = `call actualizarUsuario(${id}, '${nombre}', '${apellido}', '${email}', '${pass}', ${dpi}, '${foto}');`;
        conn.query(consulta, function (err, result) {
            if (err) {
                res.send(null);
            } else {
                res.send(`{"res": "si"`);
            }
        });
    } else {
        //Decodificar imagen
        let decodedImage = Buffer.from(base64, 'base64');

        //Parámetros para subir imagen a S3
        var paramsS3 = {
            Bucket: bucket,
            Key: `${perfiles}/${nombreFoto}-${uuid()}.${tipo}`,
            Body: decodedImage,
            ContentType: "image",
            ACL: 'public-read',
        };

        s3.upload(paramsS3, function sync(err, data) {
            if (err) {
                console.log('Error uploading photo:', err);
                res.send(null)
            } else {
                url = data.Location;

                let consulta = `call actualizarUsuario(${id}, '${nombre}', '${apellido}', '${email}', '${pass}', ${dpi}, '${url}');`;
                conn.query(consulta, function (err, result) {
                    if (err) {
                        res.send(null);
                    } else {
                        res.send(`{"res": "si"`);
                    }
                });

            }

        });
    }
});

app.post("/actualizarServicio", async (req, res) => {
    console.log("ACTUALIZAR SERVICIO----------------->")
    let body = req.body;

    let id = body.id;
    let empleado = body.empleado;
    let cliente = body.cliente;
    let estado = body.estado;


    let consulta = `call actualizarServicio(${id}, ${empleado}, ${cliente}, ${estado});`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(`{"res": "si"`);
        }
    });

});


//ELIMINACION
app.post("/eliminarUsuario", async (req, res) => {
    console.log("ELIMINAR USUARIO----------------->")
    let body = req.body;

    let id = body.id;

    let consulta = `call eliminarUsuario(${id});`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(`{"res": "si"`);
        }
    });

});

app.post("/eliminarServicio", async (req, res) => {
    console.log("ELIMINAR SERVICIO----------------->")
    let body = req.body;

    let id = body.id;

    let consulta = `call eliminarServicio(${id});`;
    conn.query(consulta, function (err, result) {
        if (err) {
            res.send(null);
        } else {
            res.send(`{"res": "si"`);
        }
    });

});


module.exports = app;