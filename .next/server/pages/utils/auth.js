"use strict";
(() => {
var exports = {};
exports.id = 599;
exports.ids = [599];
exports.modules = {

/***/ 961:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {


const jwt = __webpack_require__(Object(function webpackMissingModule() { var e = new Error("Cannot find module 'jsonwebtoken'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
const secret = process.env.SECRET;
module.exports = {
    authMiddleware: function({ req  }) {
        let token = req.body.token || req.query.token || req.headers.authorization;
        if (req.headers.authorization) {
            token = token.split(" ").pop().trim();
        }
        if (!token) {
            return req;
        }
        try {
            const { data  } = jwt.verify(token, secret, {
                maxAge: "2h"
            });
            req.user = data;
        } catch  {
            console.log("Invalid token");
        }
        return req;
    },
    signToken: function({ email , name , _id  }) {
        const payload = {
            email,
            name,
            _id
        };
        return jwt.sign({
            data: payload
        }, secret, {
            expiresIn: "2h"
        });
    }
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(961));
module.exports = __webpack_exports__;

})();