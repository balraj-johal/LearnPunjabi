/**
 * @module email
 */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

console.log("email js run");

// what happens if email is never verified? can a user make another account with that email?
// I need to delete the user document after verify email timeout

let buildVerifCodeEmail = (params) => {
    let link = `https://${params.host}/verify-email/${params.code}`
    return msg = {
        to: params.recipient, // Change to your recipient
        from: 'balrajsjohal@gmail.com', // Change to your verified sender
        subject: 'Verify your account!',
        // text: `link: ${link}`,
        html: `
            <table style="width:600px;">
                <tr style="background-color:blue;color:white;height:80px;">
                    <th colspan="3" style="">Learn Punjabi</th>
                </tr>
                <tr>
                    <td colspan="3" style="">
                        <p>
                            Thanks for signing up to Learn Punjabi!
                        </p>
                        <p>
                            Click on the link below to verify your account.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="1" style="">
                    </td>
                        <td colspan="1" style="background-color:white;text-align:center;">
                            <a href="${link}" target="_blank">
                                Click Me!
                            </a>
                        </td>
                    <td colspan="1" style="">
                    
                    </td>
                </tr>
            </table>
        `,
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