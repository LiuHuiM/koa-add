const Koa = require('koa');
const app = new Koa();
const path = require('path');
const staticpath = require('koa-static');
const bodyparser = require('koa-bodyparser');
const router = require('./router/index.js');

app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(staticpath(path.join(process.cwd(),'public')));

app.listen(7878,()=>{
    console.log('服务启动成功')
})