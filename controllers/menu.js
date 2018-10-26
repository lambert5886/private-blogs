import {
  menuModel
} from '../mongoose/model';

const saveMenu = async (req, res, next) => {
  const opts = req.body;

  if (opts.isChildren) {
    let _update = await menuModel.updateOne({
      _id: opts.parentId
    }, {
        childrenList: [new menuModel(opts)]
      }, (err) => {
        console.log('err', err)
      });

    return _update;
  } else {
    let menuSave = new menuModel(opts);
    const _menuSave = await menuSave.save();
    return _menuSave;
  }
};

const editMenu = async (req, res, next) => {
  let opts = req.body;
  let _ids = opts._id;
  let _editMenu = null;
 
  if (opts.isChildren) {

    _editMenu = await menuModel.updateOne({ _id: opts.parentId },
      { $set: { childrenList: [new menuModel(opts)] } }, (err, result) => {

      });
  } else {

    _editMenu = await menuModel.updateOne({ _id: _ids },
      { $set: opts }, (err, result) => {

      });
  }



  return _editMenu;
}

const getMenu = async (req, res, next) => {
  const _data = await menuModel.find();

  return _data;
}

const deleteMenu = async (req, res, next) => {


  let _opts = req.body;
  let _parentId = _opts.parentId;
  let  _childrenId = _opts._id;
  let  _deleteMenu = null;
  
  console.log(  'deleteMenu <<< ')

 
  let _menu = mongoose.model('menu');

  console.log(_menu.children,  'deleteMenu <<< ')

    // _deleteMenu = await menuModel.updateOne({_id: _parentId },
    //  { '$pull': {childrenList: {_id: _childrenId} } }, (err, result) => {
    //     console.log('err >>>> ', err)
    //  });

    _deleteMenu = await menuModel.children.id(_childrenId).remove();
     return _deleteMenu;
}




export {
  saveMenu,
  getMenu,
  editMenu,
  deleteMenu
}
