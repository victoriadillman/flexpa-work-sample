"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Checking if cookie exists, if we have access token to use without user needing to sign in again
router.get('/', (req, res) => {
    if (!req.cookies || !req.cookies.has_access) {
        res.send(false);
    }
    else {
        res.json({ access: req.cookies.has_access });
    }
});
exports.default = router;
