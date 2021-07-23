/**
 * @method forEach
 * @description 对数组的每一个元素执行一次给定的方法，不会改变原数组的引用值，那些已删除或者未初始化的项将被跳过（例如在稀疏数组上）。
 * @param {Function} callback
 * @param {any} arguments[1] 改变this指向
 * @this callback this默认指向window 
 */

Array.prototype._forEach = function(callback){
    var arr = this,
        len = arr.length,
        thisArg = arguments[1] || window;

    for(var i = 0; i < len; i++){
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
  