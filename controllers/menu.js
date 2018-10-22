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
  console.log('opts >>> ', opts)
  let menuSave = new menuModel(opts);
  let _editMenu = await menuSave.save(opts );

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
