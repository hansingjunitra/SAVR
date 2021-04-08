let replacer = (key, value) => {  
    // if we get a function, give us the code for that function  
    if (typeof value === 'function') {    
      return value.toString();  
    }   
    return value;
  } 

const data = {
    paywave: {
        spent: 691.67,
        percentage: 0.05,
        cap: 20
    },
    online: {
        spent: 261.34,
        percentage: 0.05,
        cap: 20
    },
    excluded: {
        spent: 0,
        percentage: 0.05,
        cap: 20
    },
    getRebate: function () {
        let res = 0
        res = res + ((this.paywave.spent * this.paywave.percentage) <= this.paywave.cap ? (this.paywave.spent * this.paywave.percentage) : this.paywave.cap)
        res = res + ((this.online.spent * this.online.percentage) <= this.online.cap ? (this.online.spent * this.online.percentage) : this.online.cap)
        res = res + ((this.excluded.spent * this.excluded.percentage) <= this.excluded.cap ? (this.excluded.spent * this.excluded.percentage) : this.excluded.cap)
        return res
        // return 10;
    }
    // func1: 'return this.attr1 + this.attr2'
}

// console.log(data.func1())

const str_data = JSON.stringify(data, replacer)

// console.log(str_data)
const obj_data = JSON.parse(str_data)
obj_data.getRebate = new Function(obj_data.getRebate.slice(13, -1));
// console.log(obj_data);

console.log(obj_data.getRebate());

// console.log(eval("afunc = " + obj_data.func1))
// eval("afunc = " + obj_data.func1)

// /console.log(afunc())

// console.log(eval("a = " + obj_data.func1))

// const a = new Function(obj_data.func1)
// console.log('this is a', a)
// console.log(a())
// console.log(typeof(a))

