const router = require('koa-router')()

let product = [
  {
    id: 1,
    name: 'iPhone XR',
    price: 542500,
    detail: "这个是iPhone XR"
  },
  {
    id: 2,
    name: 'Apple iPad Air 3',
    price: 377700,
    detail: "这个是Apple iPad Air 3"
  },
  {
    id: 3,
    name: 'Macbook Pro 15.4',
    price: 1949900,
    detail: "这个是Macbook Pro 15.4"
  },
  {
    id: 4,
    name: 'Apple iMac',
    price: 1629900,
    detail: "这个是Apple iMac"
  },
  {
    id: 5,
    name: 'Apple Magic Mouse',
    price: 72900,
    detail: "这个是Apple Magic Mouse"
  },
  {
    id: 6,
    name: 'Apple Watch Series 4',
    price: 599900,
    detail: "这个是Apple Watch Series 4"
  }
]

router.prefix('/products')

router.get('/', function (ctx, next) {
  ctx.body = product;
})

module.exports = router
