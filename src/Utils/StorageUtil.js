/**
 * 本地持久化处理
 */

const FormatUtil = require('./FormatUtil');

const StorageUtil = {

	/**
	 * 取得本地存储值
	 */
	getLocalJsonValue: function(key) {

		console.debug('StorageUtil getLocalValue key=' + key);

		var storage = window.localStorage;
		// storage.clear();

		console.debug(storage);

        if(storage.hasOwnProperty(key)){
            if (FormatUtil.isEmpty(storage[key]) || storage[key] == undefined) {
                return null;
            }else {
                return JSON.parse(storage[key]);
            }
		}else{
        	return null
		}
	},

	/**
	 * 删除本地存储值
	 */
	removeLocalValue: function(key) {

		console.debug('StorageUtil removeLocalValue key=' + key);

		var storage = window.localStorage;
		storage[key] = '';

	},

	/**
	 * 设定本地存储值
	 */
	setLocalJsonValue: function(key, jsonValue) {

		console.debug('StorageUtil setLocalValue key=' + key);
		console.debug(jsonValue);

		var storage = window.localStorage;
		storage.setItem(key, JSON.stringify(jsonValue));

		// console.debug(storage);
	},

	clear: function(){
        var storage = window.localStorage;
        storage.clear()
	}
}

export default StorageUtil;