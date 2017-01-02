

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

/** 
 * 判断对象是否为空
 */
function isEmpty(obj) {

	if (obj === null || obj === '') {
		return true;
	}

	if (typeof(obj) === 'string') {
		return false;
	}

	for (var key in obj) {
		return false;
	}
	return true;
}

module.exports = {

	isPasswordValid: function(pwd) {

		if (isEmpty(pwd)) {
			return false;
		}

		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',_\+\\\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

		if (pwd.length < 6 || pwd.length > 20 || pattern.test(pwd)) {
			return false;
		}

		return true;
	},

	/**
	 * 检查密码格式
	 */
	checkPasswordFormat: function(pwd) {

		var validation = {
			label: '',
			code: '',
		};

		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',_\+\\\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

		// 判断长度
		if (pwd.length < 6 || pwd.length > 20) {
			validation.label = '请输入6-12位密码';
			validation.code = 'error';
		}
		// 应为数字
		else if (pattern.test(pwd)){
			validation.label = '密码应只包含英文数字或点号(.)';
			validation.code = 'error';
		}
		// 验证通过
		else {
			validation.label = '';
			validation.code = 'success';
		}

		return validation;
	},

	/**
	 * 检查短线验证码格式
	 */
	isSmsCodeValid: function(smsCode) {

		if (isEmpty(smsCode)) {
			return false;
		}
		else if (smsCode.length !== 6 || !/^[0-9]*$/.test(smsCode)) {
			return false;
		}

		return true;
	},
	
	/**
	 * 检查短信验证码格式
	 */
	checkSmsCodeFormat: function(smsCode) {

		var validation = {
			label: '',
			code: '',
		};

		// 判断长度
		if (smsCode.length !== 6) {
			validation.label = '验证码应为6位数字';
			validation.code = 'error';
		}
		// 验证通过
		else {
			validation.label = '';
			validation.code = 'success';
		}

		return validation;
	},

	/**
	 * 检查手机号格式是否正确
	 */
	isMobileValid: function(mobile) {

		console.debug('checkMobileFormat mobile=' + mobile);

		if (mobile.length !== 11 || !/^[0-9]*$/.test(mobile)) {
			return false;
		}

		return true;
	},

	/**
	 * 检查手机号格式
	 */
	checkMobileFormat: function(mobile) {

		console.debug('checkMobileFormat mobile=' + mobile);

		var validation = {
			label: '',
			code: '',
		};

		// 判断是否为11位数字
		if (mobile.length !== 11 || !/^[0-9]*$/.test(mobile)) {
			validation.label = '请输入正确格式的手机号';
			validation.code = 'error';
		}
		// 验证通过
		else {
			validation.label = '';
			validation.code = 'success';
		}

		return validation;
	},

	/**
	 * 检查用户名格式
	 */
	checkNameFormat: function(name) {

		var validation = {
			label: '',
			code: '',
		};

		var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\+\\\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");

		// 判断长度
		if (name.length < 2 || name.length > 20) {
			validation.label = '请输入20个以内字符';
			validation.code = 'error';
		}
		// 判断是否为特殊字符
		else if (pattern.test(name)) {
			validation.label = '请输入中英字符、数字、点号(.)或下划线(_)';
			validation.code = 'error';
		}
		// 验证通过
		else {
			validation.label = '',
			validation.code = 'success';
		}

		return validation;
	},

	validateUsername: function(username) {

	},
 
	/**
	 * 判断是否为空
	 */
	isEmpty: function(obj) {
		return isEmpty(obj);
	}
}