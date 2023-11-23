import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

interface ExpireRequest {
  expiresIn: number;
  accessToken: string,
}

// Setting cookie with accessToken for client side to use
router.post('/', (req: Request, res: Response) => {
  const { expiresIn, accessToken } = req.body as ExpireRequest;
  
  if (!expiresIn) res.send('no expiration time given')

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: 'none' as const,
    domain: 'localhost',
    path: '/',
    maxAge: expiresIn * 1000,
  }
  res.cookie('has_access', `${accessToken}`, cookieOptions);
  res.sendStatus(200);
});

export default router;