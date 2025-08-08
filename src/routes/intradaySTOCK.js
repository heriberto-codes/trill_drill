import { Router } from "express";

const router = Router();

router.get("/:symbol", async (req, res) => {
    console.log(req)
    console.log(res)
})

export default router;