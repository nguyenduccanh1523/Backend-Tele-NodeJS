const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const generalAccessToken = (payload) => {
    const access_token = jwt.sign({
        ...payload
    }, process.env.ACCESS_TOKEN, {
        expiresIn: '30m'
    });
    return access_token;
}

const generalRefreshToken = (payload) => {
    const refresh_token = jwt.sign({
        ...payload
    }, process.env.REFRESH_TOKEN, {
        expiresIn: '365d'
    });
    return refresh_token;
}

const refreshTokenJwtService = (token) => {
    return new Promise((resolve, reject) => {
        try {
            jwt.verify(token, process.env.REFRESH_TOKEN, async (err, user) => {
                if (err) {
                resolve({
                    status: "ERR",
                    message: "Unauthorized",
                });
                }
                const access_token = await generalAccessToken({
                    id: user?.id,
                    isAdmin: user?.isAdmin,
                });
                //console.log('access_token', access_token);  
                resolve({
                    status: "OK",
                    message: "Get user success",
                    access_token,
                  });
            });
        } catch (e) {
          reject(e);
        }
      });
    
}

module.exports = {generalAccessToken, generalRefreshToken, refreshTokenJwtService};