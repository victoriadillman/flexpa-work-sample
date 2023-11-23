import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

interface AccessTokenRequest {
  publicToken: string;
}
interface LinkAccessResponse {
  access_token: string;
  expires_in: number;
}
// Exchange of public token received by client for an access token
router.post('/', async (req: Request, res: Response) => {
  const { publicToken } = req.body as AccessTokenRequest;
  
  try {
    const response = await fetch("https://api.flexpa.com/link/exchange", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        public_token: publicToken,
        secret_key: process.env.REACT_APP_FLEXPA_SECRET_KEY,
      })
    });
    const { access_token: accessToken, expires_in: expiresIn } = (await response.json()) as LinkAccessResponse;
    // Sending back to client the accessToken and expiration
    res.send({ accessToken, expiresIn});
  } catch (err) {
    return res.status(500).send(`Error in accessToken request: ${err}`)
  };
});

export default router;