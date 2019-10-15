const router = require('koa-router')();
const query = require('../db/query.js');

router.get('/api/list',async (ctx)=>{
    let data = await query('select * from koalist')
    ctx.body = data;
})

module.exports = router;