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

export {
  saveMenu,
  getMenu,
  editMenu
}
