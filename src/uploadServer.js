const multer = require('multer')
const path = require('path')
const fs = require('fs')

const upload = multer({
  dest: './static/upload' // 上传文件存放路径
});
const fileMidle = upload.single('file') // file中间件

const updataCallback = (req, res) => {
  const fileType = path.parse(req.file.originalname)
  const filePath = req.file.path
  // 不符合邀请的文件直接删除
  if (fileType !== 'png' && fileType !== 'jpg') {
    // 如果不是邀请的文件类型和文件大小，执行删除
    fs.unlink(filePath, (err) => {
      if (err) {
        throw err
      }
      res.send({
        returnCode: 201,
        message: '请选择正确的png或jpg图片上传！',
        result: null
      })
    })
    return
  }

  const newname = filePath.replace(req.file.filename, '') + new Date().getTime() + fileType
  fs.rename(filePath, newname, (err) => {
    if (err) {
      res.send({
        returnCode: 202,
        message: '上传失败',
        result: null
      });
    } else {
      res.send({
        returnCode: 201,
        message: '上传成功',
        result: {
          fileUrl: '/' + newname
        }
      })
    }
  })
}

module.exports = {
  fileMidle,
  updataCallback
}
