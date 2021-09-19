const obj = { name: 'V', skill: ['surf the Internet'] }

obj.skill = (obj.skill || []).push('climb mount') // obj.skill --> ['surf the Internet', 'climb mount']

console.log(obj.skill); // 2


/**
 * 
 * push()方法的返回值是push后数组的长度。
 * 
 * Array.prototype.push()  return a value with its length.
 * 
 */