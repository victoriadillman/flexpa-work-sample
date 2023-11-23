import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Request of benefit resources vai the Flexpa API
router.get('/', async (req: Request, res: Response) => {
  const { authorization } = req.headers as { authorization?: string};
  
  try {
    const headers: Record<string, string> = {
      "content-type": "application/json",
      "x-flexpa-law": "0",
    }
    if (!authorization) {
      return res.status(401).send("Authentication needed to complete request")
    }
    headers.Authorization = authorization;

    // Requesting introspect for patient id
    const patientIdReq = await fetch("https://api.flexpa.com/link/introspect", {
      headers: headers,
    })
    const {sub } = await patientIdReq.json();

    // With patient id, now calling patient benefits 
    const response = await fetch(`https://api.flexpa.com/fhir/ExplanationOfBenefit?patient=${sub}`, {
      method: "GET",
      headers: headers,
    })
    const result = await response.json();
    res.send(result);
  } catch (err) {
    return res.status(500).send(`Error in benefit request: ${err}`)
  }
})

export default router;