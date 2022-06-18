/**
 * @module email
 */

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_KEY);

const FROM_ADMIN = {
    email: 'admin@learnpunjabi.academy',
    name: 'Learn Punjabi'
}

// what happens if email is never verified? can a user make another account with that email?
// I need to delete the user document after verify email timeout

let buildVerifCodeEmail = (params) => {
    const link = `https://www.learnpunjabi.academy/account/verify-email/${params.code}`
    return msg = {
        to: params.recipient, // Change to your recipient
        from: FROM_ADMIN, // Change to your verified sender
        subject: 'Verify your account!',
        html: `
            <table style="width:600px;background:linear-gradient(180deg, #E786FF 0%, #E786FF 8.33%, #86E2FF 100%);">
                <tr style="background-color:transparent;color:white;height:80px;">
                    <th colspan="3" style="">
                        Learn Punjabi
                    </th>
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
                                Verify your account!
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
    let link = `https://www.learnpunjabi.academy/account/reset-password/${params.code}`
    return msg = {
        to: params.recipient, // Change to your recipient
        from: FROM_ADMIN, // Change to your verified sender
        subject: 'Reset Password',
        html: `
            <table style="width:600px;background:linear-gradient(180deg, #E786FF 0%, #E786FF 8.33%, #86E2FF 100%);">
                <tr style="background-color:transparent;color:white;height:80px;">
                    <th colspan="3" style="">
                        Learn Punjabi
                    </th>
                </tr>
                <tr>
                    <td colspan="3" style="">
                        <p>
                            Click on the link below to reset your password.
                        </p>
                    </td>
                </tr>
                <tr>
                    <td colspan="1" style="">
                    </td>
                        <td colspan="1" style="background-color:white;text-align:center;">
                            <a href="${link}" target="_blank">
                                Reset Password!
                            </a>
                        </td>
                    <td colspan="1" style="">
                    
                    </td>
                </tr>
            </table>
        `,
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
let buildTestEmailToMe = () => {
    return msg = {
        to: 'balrajsjohal@gmail.com', // Change to your recipient
        from: FROM_ADMIN, // Change to your verified sender
        subject: 'My test email',
        // text: `link: ${link}`,
        html: `
            <table style="width:600px;background:linear-gradient(180deg, #E786FF 0%, #E786FF 8.33%, #86E2FF 100%);">
                <tr style="background-color:transparent;color:white;height:80px;">
                    <th colspan="3" style="">
                        Learn Punjabi
                    </th>
                </tr>
                <tr>
                    <td colspan="3" style="">
                        <p>
                            BING CHILLING
                        </p>
                    </td>
                </tr>
            </table>
        `,
    }
}
let testEmail = buildTestEmailToMe();
sgMail
    .send(testEmail)
    .then(() => { console.log('Email sent'); })
    .catch((error) => {
        console.error("sendgrid err: ", error.response.body)
    })
