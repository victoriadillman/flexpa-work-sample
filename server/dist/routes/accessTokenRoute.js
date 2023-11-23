"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// Exchange of public token received by client for an access token
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { publicToken } = req.body;
    try {
        const response = yield fetch("https://api.flexpa.com/link/exchange", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify({
                public_token: publicToken,
                secret_key: process.env.REACT_APP_FLEXPA_SECRET_KEY,
            })
        });
        const { access_token: accessToken, expires_in: expiresIn } = (yield response.json());
        // Sending back to client the accessToken and expiration
        res.send({ accessToken, expiresIn });
    }
    catch (err) {
        return res.status(500).send(`Error in accessToken request: ${err}`);
    }
    ;
}));
exports.default = router;
