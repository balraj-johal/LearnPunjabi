/**
 * @module email
 */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

console.log("email js run");

let buildVerifCodeEmail = (params) => {
    let link = `${params.host}/verify-email/${params.code}`
    return msg = {
        to: params.recipient, // Change to your recipient
        from: 'balrajsjohal@gmail.com', // Change to your verified sender
        subject: 'Verify your account!',
        text: `link: ${link}`,
        html: `'<strong>link: ${link}</strong>'`,
    }
}
exports.sendVerifCodeEmail = (params) => {
    let email = buildVerifCodeEmail(params);
    sgMail
        .send(email)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error("sendgrid err: ", error.response.body)
        })
}
let buildPWResetEmail = (params) => {
    let link = `${params.host}/reset-password/${params.code}`
    return msg = {
        to: params.recipient, // Change to your recipient
        from: 'balrajsjohal@gmail.com', // Change to your verified sender
        subject: 'Reset Password',
        text: `link: ${link}`,
        html: `'<strong>link: ${link}</strong>'`,
    }
}
exports.sendPWResetEmail = (params) => {
    let email = buildPWResetEmail(params);
    sgMail
        .send(email)
        .then(() => { console.log('Email sent'); })
        .catch((error) => {
            console.error("sendgrid err: ", error.response.body)
        })

}