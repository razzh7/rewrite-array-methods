/**
 * @method forEach
 * @description 对数组的每一个元素执行一次给定的方法
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
 *          数组中当前正在处理的元素
 *        index [可选]
 *          正在处理的元素在数组中的索引
 *        array [可选]
 *          调用filter的数组本身
 * @param {any} arguments[1] 改变this指向
 * @this this默认指向window
 * @notice 
 * 1、不会改变原数组
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
 *           数组中当前正在处理的函数
 *         index
 *           当前正在处理数组元素的索引
 *          array
 *           map调用时的数组         
 *  @param {any} thisArg -> 改变this指向
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
