import express, { Router, Request, Response } from "express";

const router: Router = express.Router();

// Checking if cookie exists, if we have access token to use without user needing to sign in again
router.get('/', (req: Request, res: Response) => {
  if (!req.cookies || !req.cookies.has_access) {
    res.send(false);
  } else {
    res.json({access: req.cookies.has_access});
  }
});

export default router;