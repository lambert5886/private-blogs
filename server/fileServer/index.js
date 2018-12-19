import multipart  from 'connect-multiparty';
import fs from 'fs';
import tools from '../tools';
const fsPromise = fs.promises;

let multipartMiddleware = multipart();
 
const getFiles = async (req, res) => {
  let _file = req.files.file;

  let dirname = tools.formateDate('YYYY-MM-DD');
  let times = tools.formateDate('YYYY-MM-DD HH:MM:SS');
  let dirPath = __dirname + '/fileStore/'+ dirname;
 
 if(!fs.existsSync(dirPath)){
  await fsPromise.mkdir(dirPath);
 }
    
  
  let _savePath = dirPath + '/' + times +'-'  + _file.originalFilename;
 
  let _data = await fsPromise.readFile(_file.path);
  let _writeEnd = await fsPromise.writeFile(_savePath, _data, );
 
  return _writeEnd;

}

export default {
  multipartMiddleware,
  getFiles
}
