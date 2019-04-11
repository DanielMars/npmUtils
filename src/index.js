import AsyncValidator from 'async-validator';

export function mobileValidator(rule, value, callback, source, options) {
  if (!value) {
    callback();
    return;
  }
  if (value.length == 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/.test(value)) {
    callback();
  } else {
    callback('error');
  }
}

export function remoteValidator(rule, value, callback, source, options) {
  const { field, action, queryData = {}, format, modelName } = rule;
  if (!action) {
    console.warn('action is required');
    return;
  };

  let data = {
    ...queryData,
    [field]: value
  };
  data = format && typeof format === 'function' ? format(data, source, options) : data;

  fetch(action, queryData).then(res => {
    if (res[modelName] === true) callback();
    else callback('error');
  });
}

//真实姓名（只能汉字，且小于16位）
export function realName(value) {
  return {
    result: /^[\u4e00-\u9fa5|·|•|.|●]+$/gi.test(value) && value.length <= 16,
    msg: '请输入真实姓名'
  };
}

export function idcard(rule, value, callback, source, options) {
  if (!value) {
    callback();
    return;
  }
  if (/^([1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3})|([1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|[X|x]))$/.test(value)) {
    callback();
  } else {
    callback('error');
  }
}

export function email(rule, value, callback, source, options) {
  if (!value) {
    callback();
    return;
  }
  if (/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
    callback();
  } else {
    callback('error');
  }
}

export function input(rule, value, callback) {
  let reg = /[\/':;\\|\/%&#*]/;
  if (reg.test(value)) {
    callback('error');
    return
  }
  callback();
}

export function numberPassword(rule, value, callback) {

  if (!value) return callback()

  if (!/^\d{4}$/.test(value)) {
    callback('error');
    return
  }

  if (/([0-9])\1{3}/.test(value)) {
    callback('error');
    return
  }

  let asc = /(0(?=1)|1(?=2)|2(?=3)|3(?=4)|4(?=5)|5(?=6)|6(?=7)|7(?=8)|8(?=9)){3}\d/,
    desc = /(9(?=8)|8(?=7)|7(?=6)|6(?=5)|5(?=4)|4(?=3)|3(?=2)|2(?=1)|1(?=0)){3}\d/
  if (asc.test(value) || desc.test(value)) {
    callback('error');
    return
  }
  callback();
}

export function dateValidator(rule, value, callback) {
  console.log(/^\d{4}-\d{2}-\d{2}$/.test(value))
  if (/^\d{4}-\d{2}-\d{2}$/.test(value) === false) {
    callback('error')
    return
  }
  var d = new Date(value.replace(/-/g, '/'))
  console.log(d)
  if (d.toString() == 'Invalid Date') {
    callback('error')
    return
  }
  callback()
}

AsyncValidator.register('mobile', mobileValidator);
AsyncValidator.register('remote', remoteValidator);
AsyncValidator.register('idcard', idcard);
AsyncValidator.register('email', email);
AsyncValidator.register('input', input);
AsyncValidator.register('numberPassword', numberPassword);
AsyncValidator.register('dates', dateValidator);
