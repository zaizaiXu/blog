---
title: JS计算精度丢失
---
JS计算精度丢失

## 代码
```js
const toInteger = (floatNum) => {
    const ret = { times: 1, num: 0 }
    const isNegative = floatNum < 0
    if (Math.floor(floatNum) === floatNum) {
        ret.num = floatNum
        return ret
    }
    const strfi = String(floatNum)
    const dotPos = strfi.indexOf('.')
    const len = strfi.substr(dotPos + 1).length
    const times = Math.pow(10, len)
    let intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
    ret.times = times
    if (isNegative) {
        intNum = -intNum
    }
    ret.num = intNum
    return ret
}

const calculate = (a, b, op) => {
  const o1 = this.toInteger(Number(a))
  const o2 = this.toInteger(Number(b))
  const n1 = o1.num
  const n2 = o2.num
  const t1 = o1.times
  const t2 = o2.times
  const max = t1 > t2 ? t1 : t2
  let result = null
  switch (op) {
    case '+':
      if (t1 === t2) {
        // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) {
        // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else {
        // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return result / max
    case '-':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return result / max
    case '*':
      result = (n1 * n2) / (t1 * t2)
      return result
    case '/':
      result = (n1 / n2) * (t2 / t1)
      return result
  }
}
```

## 使用
两个需要计算的数字和符号：
```js
calculate(50, 589, '+')
```