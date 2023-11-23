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
// Request of benefit resources vai the Flexpa API
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorization } = req.headers;
    try {
        const headers = {
            "content-type": "application/json",
            "x-flexpa-law": "0",
        };
        if (!authorization) {
            return res.status(401).send("Authentication needed to complete request");
        }
        headers.Authorization = authorization;
        // Requesting introspect for patient id
        const patientIdReq = yield fetch("https://api.flexpa.com/link/introspect", {
            headers: headers,
        });
        const { sub } = yield patientIdReq.json();
        // With patient id, now calling patient benefits 
        const response = yield fetch(`https://api.flexpa.com/fhir/ExplanationOfBenefit?patient=${sub}`, {
            method: "GET",
            headers: headers,
        });
        const result = yield response.json();
        res.send(result);
    }
    catch (err) {
        return res.status(500).send(`Error in benefit request: ${err}`);
    }
}));
exports.default = router;
