import {Router} from 'express'
const router = Router()

router.get('/', (req, res)=>{
    res.send("LISTEN")
})

export default router;