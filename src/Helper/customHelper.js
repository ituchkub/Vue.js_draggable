/* eslint-disable */
export default {
  de_base64(input) {
    var str = input
    for (var i = 0; i < input.length; i++) {
      str = str.replace("%3D", "=")
    }
    var decodedData = window.atob(str);
    return decodedData;
  },
  en_base64(input) {
    var encodedData = window.btoa(input);
    return encodedData;
  },
  isNullOrEmpty(val) {
    return (val === undefined || val == null || val.length <= 0) ? true : false;
  },
  uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  },
  onUploadFils(e, fileExten) {
    const fileExtension = (fileExten === null || typeof fileExten === 'undefined') ? ['ppt', 'pptm', 'pptx', 'eps', 'otf', 'zip', 'ai', 'msg', 'psd', 'rar', '7z', 'jpeg', 'jpg', 'png', 'pdf', 'csv', 'xlsx'] : fileExten
    const fileSize = 358400000
    const _objtemp = {
      msg: '',
      status: false,
      data: []
    }
    if (e.target.files === null) {
      _objtemp.msg = 'Data is Null.'
      return _objtemp
    }
    for (var i = 0; i < e.target.files.length; i++) {
      const file = e.target.files[i]
      const newBlob = new Blob([file])
      const newUrl = URL.createObjectURL(newBlob)
      console.log(file.name.split('.').pop().toLowerCase())
      if (fileExtension.indexOf(file.name.split('.').pop().toLowerCase()) === -1) {
        _objtemp.msg = 'Only formats are allowed : ' + fileExtension.join(', ')
        break
      } else if (file.size > fileSize) {
        console.log('file.size : ' + file.size + ' max.size : ' + fileSize)
        _objtemp.msg = 'Maximum attatchment file size is 350MB'
        break
      } else {
        _objtemp.data.push({
          name: file.name,
          data: file,
          status: 'upload',
          url: newUrl
        })
      }
    }
    if (_objtemp.msg === '') {
      _objtemp.status = true
    }
    return _objtemp
  }
}