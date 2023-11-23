"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Setting cookie with accessToken for client side to use
router.post('/', (req, res) => {
    const { expiresIn, accessToken } = req.body;
    if (!expiresIn)
        res.send('no expiration time given');
    const cookieOptions = {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        domain: 'localhost',
        path: '/',
        maxAge: expiresIn * 1000,
    };
    res.cookie('has_access', `${accessToken}`, cookieOptions);
    res.sendStatus(200);
});
exports.default = router;
