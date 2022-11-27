const nodemailer = require("nodemailer");
const { obtenerEmailCliente, formatoDate } = require("../helpers/obtenerPuntoCompra");

const sendNotificationClientRegister = async (email) => {
    const registerForm =
        `
        <div class=""
            style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
            <div class="texthead">
                <h1>Bienvenido a SFC</h1>
            </div>
            <div class="cont" style=" border-radius: 8px;">
                <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px;">
                    <h4>Te damos la bienvenida a nuestro sistema de fidelización de clientes</h4>
                </div>
            </div>
        </div>
    `

    console.log("Se hace envio de correo de registro");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.brxsgo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'notificaciones@brxsgo.com', // your cPanel email address
            pass: 'Kj9JWqn}2(-x', // your cPanel email password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"REGISTRO SFC" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Registro SFC", // Subject line
        text: "Te damos la bienvenida", // plain text body
        html: registerForm, // html body
    });
    console.log("Envio exitoso de correo de registro");

}

const NotificationExpirePuntos = async (documento, bolsa) => {

    const registerForm =
        `
        <div class=""
            style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
            <div class="texthead">
                <h1>Puntos por expirar</h1>
            </div>
            <div class="cont" style=" border-radius: 8px;">
                <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px;">
                    <h4>Tus puntos estan por epxirar</h4>
                    

                    <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px; padding-bottom: 20px;">
                    <h4>DE LA BOLSA:</h4>
                    <p>Puntos restantes: ${bolsa.saldoPuntos} Pts.</p>
                    <p>Fecha de vencimiento: ${formatoDate(bolsa.fechaCaducidadPuntaje)} </p>
                    <p>Monto invertido: ${bolsa.montoOperacion} Gs.</p>
                </div>
                </div>
            </div>
        </div>
    `

    const email = await obtenerEmailCliente(documento);

    console.log("Se hace envio de correo notificaión de expiración de puntos");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.brxsgo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'notificaciones@brxsgo.com', // your cPanel email address
            pass: 'Kj9JWqn}2(-x', // your cPanel email password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"PUNTOS POR EXPIRAR" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Puntos por expirar", // Subject line
        text: "Tus puntos estan por expirar", // plain text body
        html: registerForm, // html body
    });
    console.log("Notificación exitosa de expiración de puntos");
}

const notificationCanje = async (documento, canje) => {
    const email = await obtenerEmailCliente(documento);

    const formCanje =
        `
        <div class=""
            style="justify-content: center; text-align:center; width: 550px; text-align: center; border-radius: 8px;">
            <div class="texthead">
                <h1>Puntos canjeados</h1>
            </div>
            <div class="cont" style=" border-radius: 8px; padding-bottom: 20px;">
                <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px;">
                    <h4>Tus puntos se canjearon por:</h4>
                    

                    <div class="msg" style="border: 1px solid #008F8F;; border-radius: 8px; text-align: initial;
                padding-left: 20px; padding-bottom: 20px;">
                    <h4>PREMIO:</h4>
                    <p>Documento: ${canje.documentoCliente} </p>
                    <p>Premio canjado: ${(canje.premioCanjeado)} </p>
                    <p>Puntos usados: ${canje.equivalencia} Pts.</p>
                </div>
                </div>
            </div>
        </div>
    `

    console.log("Se hace envio de correo notificaión de canjeo de premios");
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "mail.brxsgo.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'notificaciones@brxsgo.com', // your cPanel email address
            pass: 'Kj9JWqn}2(-x', // your cPanel email password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"CANJEO DE PREMIOS" <notificaciones@brxsgo.com>', // sender address
        to: email, // list of receivers
        subject: "Puntos canjeados", // Subject line
        text: "Tus puntos se canjearon por", // plain text body
        html: formCanje, // html body
    });
    console.log("Notificación exitosa de canjeos de premios")

}

module.exports = {
    NotificationExpirePuntos,
    notificationCanje,
    sendNotificationClientRegister
}