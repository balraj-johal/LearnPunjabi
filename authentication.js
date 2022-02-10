const passport = require("passport");
const jwt = require("jsonwebtoken");
const dev = process.env.NODE_ENV !== "production";

exports.REFRESH_COOKIE_OPTIONS = {
    httpOnly: true,
    // // Since localhost does not have https protocol,
    // // secure cookies do not work correctly (in postman)
    // secure: !dev,
    // signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    // sameSite: "none",
}

// generate jwt token
exports.getNewToken = user => {
    return jwt.sign({
            _id : user._id,
            username : user.username,
        }, process.env.JWT_SECRET, {
        expiresIn: eval(process.env.SESSION_EXPIRY),
    });
}

// generate refresh token
exports.getNewRefreshToken = user => {
    const refreshToken = jwt.sign({user : user, message: "refresh"}, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY),
    });
    return refreshToken;
}

exports.verifyToken = (req) => { // TODO: add correct error codes to this Promise
    return new Promise((resolve, reject) => {
        // retrieve token from cookies
        let jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            try {
                // verify refresh token against JWT_SECRET and extract user id from it
                jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        reject(Error(`Unauthorised: JWT verification failed: ${err}`));
                    }
                    // find user 
                    const userId = decoded.id;
                    User.findOne({ _id: userId })
                        .then(user => {
                            if (user) {
                                resolve(user);
                            } else {
                                reject(Error(`Unauthorized: User not found.`));
                            }
                        },
                        err => next(err)
                        )
                })
            } catch (err) {
                reject(Error(`Unauthorized: Error in jwt verify or user.find.`));
            }
        } else {
            reject(Error(`Unauthorized: JWT Token not present.`));
        }
    })
}

exports.verifyRefreshToken = (req) => { // TODO: add correct error codes to this Promise
    return new Promise((resolve, reject) => {
        // retrieve token from cookies
        let refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            try {
                // verify refresh token against JWT_SECRET and extract user id from it
                jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        reject(Error(`Unauthorised: JWT verification failed: ${err}`));
                    }
                    // find user 
                    const userId = decoded.id;
                    User.findOne({ _id: userId })
                        .then(user => {
                            if (user) {
                                resolve(user);
                            } else {
                                reject(Error(`Unauthorized: User not found.`));
                            }
                        },
                        err => next(err)
                        )
                })
            } catch (err) {
                reject(Error(`Unauthorized: Error in jwt verify or user.find.`));
            }
        } else {
            reject(Error(`Unauthorized: JWT Token not present.`));
        }
    })
}