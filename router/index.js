const router = require('koa-router')();
const query = require('../db/query.js');

// 查询成员列表
router.get('/api/list', async (ctx) => {
    let data = await query('select * from koalist')
    ctx.body = data.data;
})

// 添加成员信息
router.post('/api/add', async (ctx) => {
    let { name, age, address, phone, idCard } = ctx.request.body;
    let sql = 'insert into koalist (name,age,address,phone,idCard) values (?,?,?,?,?)';
    // let sql = `insert into koalist set name='${name},age='${age}',address='${address}',phone='${phone}'`;
    // 如果某个参数没有写
    if (!name || !age || !address || !phone || !idCard) {
        return ctx.body = { code: 0, msg: '参数不完整' }
    }
    // 如果此人存在 判断
    let isData = await query('select * from koalist where idCard=?', [idCard])
    console.log(isData)
    if (isData.data.length) {
        return ctx.body = { code: 2, msg: '此用户已存在' }
    } else {
        let data = await query(sql, [name, age, address, phone, idCard]);
        if (data.msg === 'error') {
            ctx.body = { code: 0, msg: '添加失败' }
        } else {
            ctx.body = { code: 1, msg: '添加成功' }
        }
    }
})

// 删除
router.get('/api/del', async (ctx) => {
    console.log(ctx.query);
    let {id} = ctx.query;
    let sql = 'delete from koalist where id=?';
    let res = await query(sql,[id]);
    console.log(res)
    if(res.msg === 'success'){
        ctx.body = {code:1,msg:"删除成功"}
    }else{
        ctx.body = {code:0,msg:"删除失败"}
    }
})

// 编辑 修改
router.post('/api/update',async (ctx)=>{
   let { name, age, address, phone, idCard,id } = ctx.request.body;
   let sql = 'update koalist u set u.name=?,u.age=?,u.address=?,u.phone=?,u.idCard=? where id=?'
   console.log(sql);
   if(!name || !age || !address || !phone || !idCard || !id){
       return ctx.body = {code:2,msg:'参数不完整'}
   }
   let update = await query(sql,[name, age, address, phone, idCard,id]);
    if(update.msg === 'success'){
        ctx.body = {code:1,msg:'修改成功'}
    }else{
        ctx.body = {code:0,msg:"修改失败"}
    }
})
module.exports = router;