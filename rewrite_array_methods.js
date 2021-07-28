
/**
 * 7种数组遍历的方法 
 * forEach
 * map
 * filter
 * reduce
 * reduceRight
 * every
 * some
 */
 /**
  * 不会遍历稀疏数组空隙的方法
  * forEach
  * some
  * every
  * map
  * reduce
  * filter
  * 
  * 会遍历稀疏数组空隙的方法
  * for
  * find
  * findIndex 
  */
/**
 * @method forEach
 * @description 对数组的每一个元素执行一次给定的方法
 * @param {Function} callback
 * @param {any} arguments[1] 改变this指向
 * @this callback this默认指向window 
 * @notice 不会改变原数组的引用值，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）
 */

Array.prototype._forEach = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window;

    for(var i = 0; i < len; i++){
        if(arr[i] === void 0){
          continue;
        }
        callback.apply(thisArg, [arr[i], i, arr]);
    }
}

/**
 * @method filter
 * @description 返回一个新数组，其包含通过所提供函数实现的测试的所有元素
 * @param {Function} callback
 *    callback
 *        用来测试数组的每一个元素的函数。返回true表示该元素通过测试，加入到新数组中
 *        element
 *          数组当前项的值
 *        index [可选]
 *          正在处理的元素在数组中的索引
 *        array [可选]
 *          调用filter的数组本身
 * @param {any} arguments[1] 改变this指向
 * @this this默认指向window
 * @notice 
 * 1、原版filter不会改变原数组
 * 2、push如果是引用值，那么属于浅拷贝，修改newArr的引用值会影响原数组的引用值
 */

 Array.prototype._filter = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window,
        newArr = [],
        bool,
        item  //深拷贝

    for(var i = 0; i < len; i++){
        item = utils.deepClone(arr[i]);  //深拷贝解决浅拷贝问题
        bool = callback.apply(thisArg, [arr[i], i, arr]);
        return bool ? newArr.push(arr[i]) : ''; 
    }

    return newArr;
 }


/**
 *  @method map
 *  @description 返回一个新数组，其结果是该数组中每个元素是调用一次提供的函数后的返回值
 *  @param {Function} callback
 *     callback
 *         element
 *           数组中当前正在处理的元素
 *         index
 *           当前正在处理数组元素的索引
 *          array
 *           map调用时的数组         
 *  @param {any} thisArg -> 改变this指向
 *  @notice 原版map会改变原数组的引用值  _map如果不改变加深拷贝会改变原数组的引用值
 */

 Array.prototype._map = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window,
        newArr = [],
        item; //深拷贝（原版map是浅拷贝）

    for(var i = 0; i < len; i++){
        return newArr.push(callback.apply(thisArg, [arr[i], i, arr]))
    }

    return newArr;
 }

/**
 * @method every
 * @description 
 * 1、如果有一个不满足条件就停止遍历，条件就是return后面表达式
 * 2、返回一个值bool
 * @notice 不会修改原数组
 */
 Array.prototype._every = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window,
        bool = true;

        for(var i = 0; i < len; i++){

            if(!callback.apply(thisArg, [arr[i], i, arr])){
              bool = false;
              break;
            }
          }

        return bool;
}

 /**
  * @method some 
  * @description
  * 1、有一个满足条件就停止遍历，条件就是return后面表达式
  * 2、返回一个值bool
  * @notice 不会修改原数组
  */
 Array.prototype._some = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window,
        bool = false;

        for(var i = 0; i < len; i++){

            if(callback.apply(thisArg, [arr[i], i, arr])){
              bool = true;
              break;
            }
          }

        return bool;
}

/**
 * @method reduce 
 * @description 创建一个新类型的容器prev，把处理完的数组元素保存到新容器prev中返回出去
 * @param {Function} callback
 *      prev 
 *        新容器，指的是initValue的值
 *      elem 
 *        数组中正在处理的元素
 *      index [可选]
 *        当前正在处理数组元素的索引
 *      array [可选]
 *        当前调用reduce的元素   
 * @param {any} initValue [必选]
 *       initValue
 *         新类型，值赋值给prev 
 * @notice 能修改原数组的值
 */
 Array.prototype._reduce = function(callback, initValue){
    var arr = this,
        len = arr.length;

    for(var i = 0; i < len; i++){

        initValue = callback(initValue, arr[i], i, arr); 
    }

    return initValue
 }

 /**
  * @method reduceRight 
  * @description 和reduce同理，容器prev结果倒序排列
  * @param {Function} callback
  * @param {any} initValue
  * @notice 能修改原数组的值
  **/

 Array.prototype._reduce = function(callback, initValue){
    var arr = this,
        len = arr.length;

    for(var i = len - 1; i >= 0; i--){

        initValue = callback(initValue, arr[i], i, arr);
    }

    return initValue;
 }


  // ==================================== 迭代器介绍部分 ============================================== //
/**
 * @method * generate
 * @description 
 *  生成器 -> * generate 生成器对迭代的控制是通过yield关键字执行的(重点)
 *  迭代器 -> 生成器函数执行后返回的一个带有next方法的对象
 *  next方法 -> 返回数组每一项下标所对应的值value、done: false/true
 *  完成所有迭代后再次调用next方法done变为true
 */

function generate(arr){
    var newInx = 0;
      return {
        next: function(){
          return {
            value: arr[newInx ++],
            done: newInx < arr.length ? false : true
          }
        }
      }
}

 /**
 * @method entires 
 * @descirption 返回一个新的Array Iterator对象，
 * 该对象包含数组中每个索引的键/值对。
 * @returns {Array Iterator} 一个新的Array 迭代器对象。Array Iterator是对象，由Object函数构造
 *                           它的原型（__proto__:Array Iterator）上有一个next方法，
 *                           可用于遍历迭代器取得原数组的[index, value]  
 */

 Array.prototype._entries = function *(){
    for(var i = 0; i < this.length; i++){
      yield [i, this[i]];  //生成器对迭代器的控制是通过yield关键字执行的
    }    
}

/**
 * @method fill
 * @descirption 改变原数组，替换指定位置的数组值
 * @param
 *   value
 *      要替换的值
 *   start
 *      从哪里开始替换 闭区间
 *   end
 *      到哪里替换结束 开区间
 *@notice
 * start取值
 * 1、start < 0 start从start + len开始取数替换
 * 2、start > 0 从 start 开始取数替换
 * 3、start必须小于end，否则返回原数组
 * 4、start为假时，start取0 
 * end取值
 * 1、end为假时，end取len
 * 2、end为null时返回原数组
 * 3、end为undefined时 end取len
 * 4、end < 0 时 end取 len + end
 * 5、end > length时 end取len
 * */

 Array.prototype._fill = function(value, start, end){
    if(this === void 0 || this === null) {
        throw new TypeError();
    }

    var len = this.length;
    if(start === undefined) {
        start = 0;
    }
    if(end === undefined) {
        end = len;
    }

    start = Number(start);
    start = isNaN(start) ? 0 : start;
    end = Number(end);
    end = isNaN(end) ? 0 : end;
    start += start >= 0 ? 0 : length;
    end += end >= 0 ? 0 : length;

    while(start < end){
        this[start] = value;
        start++;
    }

    return this;
 }

 /**
  * @method find ES6 
  * @description find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。
  * @param
  *   callback
  *     在数组每一项上执行的函数，接收 3 个参数
  *     element
  *       当前数组遍历到的元素
  *     index
  *       当前遍历数组元素的索引值
  *     arrary
  *       数组本身
  * @notice 
  *  1、返回的元素和数组对于下标的元素是同一个引用
  *  2、find会遍历稀松数组的空隙empty，具体遍历出的值，由undefined占位
  *  3、find的遍历效率是低于ES5数组扩展方法的
  *  4、对于splice删除了对应项，该项位置不保留，在数组最后补上undefined
  *  5、使用delete、pop 删除该项的值并填入undefined
  *  6、find的函数内部指向：
  *         在非严格模式环境下，this -> window
  *         严格模式下，不传入第二个参数，this为undefined,与严格模式规定相统一
  *  7、回调函数内部无法改变原数组的元素值
  *  8、如果使用push方法向原数组加入数据，原数组可以被push进数据
  *     但find在第一次调用回调函数的时候就确认了数组的长度array.length，只会遍历原数组的长度
  *  9、回调函数返回一个bool值
  */

  Array.prototype._find = function(callback){
    if(this == void 0 || this == null){
        throw new TypeError('"this" is null');
    }
    if(typeof callback !== 'function'){
        throw new TypeError('callback must be function');
    }
    var obj = Object(this),  //包装this确保this一直是引用值不变
        len = obj.length >>> 0, //保证len是正整数
        thisArg = arguments[1];  //第二项没有参数，那么传入undefined，严格模式下this为undefined

        for(var i = 0; i < len; i++){
            if(callback.apply(thisArg, [obj[i], i, obj])){
                return obj[i];
            }
        }

        return undefined;
  }
/**
 * @method findIndex ES6
 * @descirption findIndex方法返回数组中满足提供的测试函数的第一个元素的索引，若没有找到对应元素则返回-1
 * @param
 *   callback
 *     在数组每一项上执行的函数，接收 3 个参数
 *     element
 *       当前数组遍历到的元素
 *     index
 *       当前遍历数组元素的索引值
 *     arrary
 *       数组本身
 * @notice 参考find
 * */
  Array.prototype._findIndex = function(callback){
    if(this == void 0 || this == null){
        throw new TypeError('"this" is null');
    }
    if(typeof callback !== 'function'){
        throw new TypeError('callback must be function');
    }
    var obj = Object(this),
        len = obj.length >>> 0,
        thisArg = arguments[1];

        for(var i = 0; i < len; i++){
            if(callback.apply(thisArg, [obj[i], i, obj])){
                return i;
            }
        }

        return -1;
  }

  /**
   * @method values ES6
   * @description values方法返回一个新的Array Iterator对象，该对象包含数组每个索引的值
   * @notcie 
   *  1、可以通过for of来遍历迭代值
   *  2、会遍历稀疏数组的空隙值，打印出undefined
   */

 Array.prototype._values = function *(){
    if(this === null){
        throw new TypeError('"this" is null');
    }
    var arr = this,
        len = arr.length >>> 0;

        for(var i = 0; i < len; i++){
            yield arr[i];
        }
 }

 /**
  * @method keys ES6 
  * @description keys方法会返回一个新的Array Iterator对象，该对象包含数组元素的索引
  * @notice
  * 1、可以通过for of来遍历迭代值
  * 2、会遍历稀疏数组的空隙值，打印出undefined
  */

  Array.prototype._keys = function *(){
    if(this === null){
        throw new TypeError('"this" is null');
    }
    var arr = this,
        len = arr.length >>> 0,
        i = 0;

        while(i < len){
            yield i;
            i++;
        }
  }

/**
 * @method push
 * @description puhs方法会往原数组最后一项加入元素，返回加入元素后数组的长度
 * @notice 会改变原数组
 */
  Array.prototype._push = function(){
    var len = arguments.length;

    for(var i = 0; i < len; i++){
        this[this.length] = arguments[i];
    }
    return this.length;

  }

/**
 * @method unshift 
 * @description unshift方法会将一个或多个元素添加到数组的开头，并返回该数组新的长度
 * @notice 
 *  1、该方法会改变原数组
 *  2、多个参数调用一次unshift和传入一个参数调用多次unshift，会得到不同的结果 -> MDN
 */

 Array.prototype._unshift = function(){
    var len = arguments.length;

        for(var i = 0; i < len; i++){
            this.splice(0, 0, arguments[i]);
        }

        return this.length;
 }

 /**
  * @method shift 
  * @description shift方法从数组中删除第一个元素，并返回该元素的值
  * @notice 
  * 1、此方法更改数组长度
  * 2、如果第一项为空，不会返回数组长度而会返回undefined，但第一项的空值还是能删除
  */

  Array.prototype._shift = function(){
    if(this === null){
        throw new TypeError('this is null');
    }
    if(this[0] === undefined){
        this.splice(0, 1);
        return undefined;
    }

    this.splice(0, 1);
    return this.length;
  }

 /**
  * @method pop 
  * @description pop方法从数组中删除最后一个元素，并返回该元素的值
  * @notice
  *  1、此方法更改数组长度
  *  2、如果length为0，返回undefined
  *  3、稀疏数组最后一位为空，那么删除倒数第二位，并返回其值
  */

  Array.prototype._pop = function(){
    var arr = this,
        len = arr.length;
    if(this === null){
        throw new TypeError('this is null');
    }
    if(len <= 0){
        return undefined;
    }

    var newArr = arr.splice(len - 1, 1);
    return newArr[0];
  }

/**
 * @method concat 
 * @description concat方法用于合并两个或者多个数组，并返回一个新数组
 * 但它也可以让数组合并对象、原始值
 * @notice 
 * 此方法不会改变原数组
 */


/**
 * @method toString  ES6
 * @descriotion 将数组转换为字符串并返回
 * @notice
 * 1、此方法不会改变原数组
 * 2、稀疏数组的空项可以被返回出来
 * 3、用到了join方法，等待重写
 */

  Array.prototype._toString = function(){
    var arr = this,
        len = arr.length,
        str = '';

    if(this === null){
        throw new TypeError('this is null');
    }

    return str += len > 0 ? arr.join(',') : '';
  }

 /**
  * @method isArray  Array.isArray() 用于确定传递的值是否是一个 Array。
  * @param obj 需要检查的值
  * @return 如果值是Array，则为true，否则为false
  */

  Array._isArray = function(){

  }

 /**
  * @method flat ES2019
  * @description 将多维数组转换成一维数组（数组扁平化）
  * @param 默认为1
  *  1 ~ infinity
  * @notice 
  * 1、输入负数不做任何扁平化处理
  * 2、输入数字字符串，内置通过Number处理成数字类型
  * 3、flat会剔除所有数组空隙empty  忽略empty(val !== void 0)
  */
  // 1、forEach + isArray + push + 递归
  Array.prototype._pushFlat = function(){
    var arr = this,
        deep = arguments[0] === Infinity ? Infinity : arguments[0] >>> 0,
        newArr = [];

    ;(function _(arr, deep){

        arr.forEach(function(elem){
            if(Array.isArray(elem) && deep > 0){
                _(elem, deep - 1);
            }else{
                newArr.push(elem);
            }
        })
    })(arr,deep);

    return newArr;
  }

// 2、stack pop + push
  Array.prototype._stackFlat = function(){
    var arr = this,
        stack = [...arr],
        newArr = [];

    while(stack.length) {
        var popItem = stack.pop();

        if(Array.isArray(popItem)){
            stack.push(...popItem);
        }else{
            newArr.push(...popItem);
        }
    }

    return newArr.reverse();
  }

/**
 * @method flatMap 2020
 * @description 首先使用映射函数映射每一个元素(map)，然后将结果压缩成一个新数组。
 * 它与map连着深度值为1的flat几乎相同，但flatMap通常再合并成一种方法的效率稍微高一些
 * flat + map === flatMap
 * @param 
 *      callback 可以生成一个新数组的元素的函数
 *          elem
 *             当前正在数组中处理的元素
 *          index [可选]
 *             数组中正在处理的当前元素的索引
 *          array [可选]
 *              被map调用的数组
 * @param thisArg [可选] 改变this指向
 * @notice
 *  1、flatMap是浅度扁平化 flat为一层
 *  2、不会打印出稀疏数组的空隙项
 */

 Array.prototype._flatMap = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1],
        newArr = [];
        
        arr._forEach(function(elem, index, arr){
            newArr.push(callback.apply(thisArg, [elem, index, arr]))
        })

        return newArr.flat();
 }

/**
 * @method Array.from
 * @description 可把一个可迭代对象或者是一个标准的类数组转换成一个数组，并返回一个新数组
 * @param
 *  arrLike
 *      参数第一项必须是一个可迭代对象或者是一个标准的类数组
 *  mapFn [可选]
 *      数组的每一个元素都会执行该回调函数
 *          elem
 *             正在遍历的数组元素
 *          index
 *              正在遍历的数组元素的索引
 *  thisArg [可选]
 *       执行mapFn时的this指向
 * @notice
 * 1、对于类数组 from方法正常返回一个对应的数组的必要条件：
 *  1、键名必须从0开始按数字顺序排列，from会从0开始遍历填充新数组
 *  2、length属性必须正确
 *  3、length决定了新数组的长度，属性名决定了填充该数组的位置
 * 2、返回一个新的数组引用,但新数组中的引用是浅拷贝
 * 3、参数如果是一个Symbol、数字、bool、正则、对象这些没有Symbol.iterator
 * Array.from不做处理，并且返回一个空数组
 * 4、无参数填入默认为undefined，导致报错
 * 5、每一次遍历必须返回一个值
 * 6、不会改变原数组
 * 
 */

 /**
  * @method includes ES2016 ES7
  * @param 
  *     valueToFind [必填] 如果不填返回false
  *         查询数组内是否包含某个元素，返回bool值
  *     fromIndex [可选]
  *         默认为0，从数组哪项下标开始找起
  *         fromIndex >= this.length -> return false
  *         fromIndex + this.length < 0 从0开始搜索
  * @notice
  * 1、区分字符串数字与数字
  * 2、区分大小写
  * 3、this.includes.length为 1
  * 
  * */
  Array.prototype.includes = function(value){
    var obj = Object(this),
        len = obj.length,
        fromIndex = arguments[1];

    if(this === null) {
        return new TypeError('this is null');
    }
    if(fromIndex >= len){
        return false;
    }
    if(fromIndex < 0){
      Math.max(fromIndex + len, 0);
    }

    while(fromIndex < len){
        if(obj[fromIndex] === value){
            return true;
        }
        fromIndex++;
    }

    return false; 
  }