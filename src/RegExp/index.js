/**
 * 输入限制
 * @param {String} types 1中文 2字母 3数字 (使用多个条件时，用逗号分隔) 例: 1,2,3
 * @param {String} spec 特殊符号，多个符号间无分割符 例： ,~`/
 */
 function isAllow(words, types, spec){
    var types = types.split(',')
    var finalRegExp = []
    var letter = 'a-zA-Z'
    var chinese = '\\u4e00-\\u9fa5'
    var number = '0-9'
  
    // 中文
    if(types.indexOf('1') != -1){
      finalRegExp.push(chinese)
    }
    // 字母
    if(types.indexOf('2') != -1){
      finalRegExp.push(letter)
    }
    // 数字
    if(types.indexOf('3') != -1){
      finalRegExp.push(number)
    }
  
    // 存在限制
    var reg = finalRegExp.length ? new RegExp(`[^${finalRegExp.join('|')}]`) : ''
    var specReg = spec ? new RegExp(`[^${spec}]`) : ''
    /**
     *  正则表达式的test方法一会是false, 一会是true 是怎么回事？
     *  
     *  参考这个文章，是因为开启了global模式的问题
     *  https://blog.csdn.net/weixin_45337170/article/details/116599089
     */


    if(reg || specReg){
      // var reg = new RegExp(`[^${finalRegExp.join('')}]`, 'gi')
    
      // console.log(reg, specReg);
      var strWord = String(words)
      for (let i = 0; i < strWord.length; i++) {
        console.log('+++++++++++++++++++++++');
        // console.log(reg.test(strWord.charAt(i)), strWord.charAt(i));
        // console.log(!(reg.test(strWord.charAt(i))));
  
        // debugger
        var firstNotValid = false
        var secondNotValid = false
        if(reg){
          var res = reg.test(strWord.charAt(i)) // 选中中文，输入框输入asd， 解开上面的debug，这个赋值右侧的正则结果一会是false,一会是true(鼠标移入移出) ???
          firstNotValid = !res
        }
        if(specReg){
          var res = specReg.test(strWord.charAt(i))
          secondNotValid = !res
        }
        // var firstNotValid = reg && !())
        // var secondNotValid = specReg && !(specReg.test(strWord.charAt(i)))
  
        // console.log(reg && !(reg.test(strWord.charAt(i))), firstNotValid);
        // console.log(999, firstNotValid, secondNotValid);
        console.log('+++++++++++++++++++++++');
  
  
        if(firstNotValid || secondNotValid) {
          if(reg){
            console.log('正则: ', reg);
            console.log('当前字符:', strWord.charAt(i));
            console.log('exec: ', reg.exec(strWord.charAt(i)));
            console.log('test: ', reg.test(strWord.charAt(i)));
          }
          if(specReg){
            console.log('正则: ', specReg);
            console.log('当前字符:', strWord.charAt(i));
            console.log('exec: ', specReg.exec(strWord.charAt(i)));
            console.log('test: ', specReg.test(strWord.charAt(i)));
          }
  
          // reg && console.log(111, reg, '---->', reg.exec(strWord.charAt(i)), '---->', reg.test(strWord.charAt(i)), '---->', strWord.charAt(i));
  
          // specReg && console.log(222, specReg, '---->', specReg.exec(strWord.charAt(i)), '---->', specReg.test(strWord.charAt(i)), '---->', strWord.charAt(i));
  
          return false
        }
      }
    }
  
  
    return true
  
    // return reg.test(words)
  }
  
  /**
   * 测试
   * @param {*} params 参数 words, types, spec
   * @param {*} res 期望结果
   */
  function test(params, res){
    let { words, types = '', spec = '' } = params
    let result = isAllow(words, types, spec)
  
    console.log(result, result === res ? '通过':'失败', '\n')
  }
  
  const testData = [
    // [{words: '中文', types: '1', spec: ''}, false],
    // [{words: 'letter', types: '2', spec: ''}, false],
    // [{words: '555', types: '3', spec: ''}, false],
    // [{words: ',中,文,', types: '1,2,3', spec: ''}, false],
    // [{words: ',中,文,', types: '2,3', spec: ''}, true],
    // [{words: '4at2啊', types: '1', spec: ''}, false],
  ]
  
  for (let i = 0; i < testData.length; i++) {
    test(testData[i][0], testData[i][1])
  }
  
  // /[^a-zA-Z|\u4e00-\u9fa5|0-9]/g.test('')
  // /[^a-zA-Z\u4e00-\u9fa50-9]/g.test('')