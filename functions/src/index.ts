const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});
admin.initializeApp();

exports.addAminRole = functions.https.onCall((data: any, cotext: any) => {
    // get user and add custom claim (admin)
    return cors(function(req: any, res: any) {
        return admin.auth().getUserByEmail(data.email).then((user: any) => {
            return admin.auth().setCustomUserClaims(user.uid, {
                admin: true
            });
        }).then(() => {
            return {
                message: `Success! ${data.email} has been made an admin`
            }
        }).catch((err: any) => {
            return err;
        })
    })
})