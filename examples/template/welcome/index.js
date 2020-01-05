// import zform from '../../../src/zform';

//要用 onclick 调用就只能是全局方法，即使用 export 导出，也是需要绑定到 window 的，不然还是在 webpack 内部，无法调用
//module中定义的函数不是全局的，改用事件监听

// console.info(zform.version(),zform.config({
//     form_id: 'abc',
//     API_URL: 'your uesrname',
//     NAME: 'your password'}))

//     zform.println()
