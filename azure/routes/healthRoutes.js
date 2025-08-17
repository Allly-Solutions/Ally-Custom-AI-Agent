import express from 'express'

const router = express.Router()

router.get('/health',function(req,res){
    res.send('Server is healthy')
})

export default router