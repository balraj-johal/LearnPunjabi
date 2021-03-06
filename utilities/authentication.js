const jwt = require("jsonwebtoken");
const sanitize = require("mongo-sanitize");

const dev = process.env.NODE_ENV !== "production";

exports.AUTH_COOKIE_OPTIONS = {
    httpOnly: true,
    // secure: !dev,
    // signed: true,
    maxAge: eval(process.env.REFRESH_TOKEN_EXPIRY) * 1000,
    // sameSite: "none",
}

/** Generate a new JWT, encoding the users ID
 * @name getNewToken
 * @param {String} userID 
 * @returns {String} jwtToken - used to authenticate user
 */
exports.getNewToken = userID => {
    return jwt.sign(
        { userID : userID }, 
        process.env.JWT_SECRET, 
        { expiresIn: eval(process.env.SESSION_EXPIRY) }
    );
}

/** Generate a new refresh Token, encoding the users ID
 * @name getNewRefreshToken
 * @param {String} userID 
 * @returns {String} refreshToken - used to generate a new JWT for the user
 */
exports.getNewRefreshToken = userID => {
    return jwt.sign(
        { userID : userID }, 
        process.env.REFRESH_TOKEN_SECRET, 
        { expiresIn: eval(process.env.REFRESH_TOKEN_EXPIRY) }
    );
}

/** generates a new promise checking if a user has supplied a valid JWT.
 * @name verifyToken
 * @param {Object} req - HTTP request object
 * @returns {Object} user - returns user object from database if token is valid
 */
exports.verifyToken = (req) => { 
    // TODO: add correct error codes to this Promise
    return new Promise((resolve, reject) => {
        let jwtToken = req.cookies.jwtToken;
        if (jwtToken) {
            try {
                // verify refresh token against JWT_SECRET and extract user id from it
                jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
                    if (err) {
                        console.log(err);
                        reject(`Unauthorised: JWT verification failed: ${err}`);
                    }
                    // find user 
                    const userId = decoded.userID;
                    User.findOne({ _id: {$eq: sanitize(userId)} })
                        .then(user => {
                            if (user) {
                                resolve(user);
                            } else {
                                reject(`Unauthorized: User not found.`);
                            }
                        },
                        err => next(err)
                        )
                })
            } catch (err) {
                reject(`Unauthorized: Error in jwt verify or user.find.`);
            }
        } else {
            reject(`Unauthorized: JWT Token not present.`);
        }
    })
}

/** generates a promise checking if a user has supplied a valid Refresh Token.
 * @name verifyRefreshToken
 * @param {Object} req - HTTP request object
 * @returns {Object} user, refreshToken - returns user object and new token
 */
exports.verifyRefreshToken = (req) => { 
    const rejectionObject = {
        code: 500,
        message: ""
    }
    // TODO: add correct error codes to this Promise
    return new Promise((resolve, reject) => {
        // retrieve token from cookies
        let refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            rejectionObject.code = 401;
            rejectionObject.message = `Refresh Token not present in request`;
            return reject(rejectionObject);
        }
        try {
            // verify refresh token against JWT_SECRET and extract user id from it
            const SECRET = process.env.REFRESH_TOKEN_SECRET;
            jwt.verify(refreshToken, SECRET, (err, decoded) => {
                if (err) {
                    rejectionObject.code = 400;
                    rejectionObject.message = `JWT verification failed: ${err}`;
                    return reject(rejectionObject);
                }
                // find user 
                const userId = decoded.userID;
                User.findOne({ _id: {$eq: sanitize(userId)} })
                    .then(user => {
                        if (user) {
                            resolve({user: user, refreshToken: refreshToken});
                        } else {
                            rejectionObject.code = 404;
                            rejectionObject.message = `User not found`;
                            reject(rejectionObject);
                        }
                    })
                    .catch(error => {
                        reject(error);
                    })
            })
        } catch (err) {
            rejectionObject.code = 500;
            rejectionObject.message = `Error in jwt verify or user.find`;
            reject(rejectionObject);
        }
    })
}