import mongoose from 'mongoose';

import {
  menuModel
} from '../mongoose/model';

const saveMenu = async (req, res, next) => {
  const opts = req.body;
  let _update = null;
 
  if (opts.isChildren) {
    _update = await menuModel.updateOne({
      _id: opts.parentId
    }, {
      $addToSet: {
        childrenList: [new menuModel(opts)]
      }

    }, (err) => {
      console.log('err', err)
    });


  } else {
    let menuSave = new menuModel(opts);
    _update = await menuSave.save();

  };
  return _update;
 
};

const editMenu = async (req, res, next) => {
  let opts = req.body;
  let _ids = opts._id;
  let _editMenu = null;

  if (opts.isChildren) {

    _editMenu = await menuModel.updateOne({
      _id: opts.parentId
    }, {
      $set: {
        childrenList: [new menuModel(opts)]
      }
    }, (err, result) => {

    });
  } else {

    _editMenu = await menuModel.updateOne({
      _id: _ids
    }, {
      $set: opts
    }, (err, result) => {

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
  let _childrenId = _opts._id;
  let _childrenValue = _opts.value;
  let _deleteMenu = null;

  if (_opts.isChildren) {

    _deleteMenu = await menuModel.updateOne({
      _id: _parentId
    }, {
      $pull: {
        "childrenList": {
          'value': _childrenValue
        }
      }
    }, {
      multi: true
    }, (err, result) => {

    });

  } else {
    _deleteMenu = await menuModel.deleteOne({
      _id: _childrenId
    }, (err, result) => {

    })
  }

  return _deleteMenu;
}





export {
  saveMenu,
  getMenu,
  editMenu,
  deleteMenu
}
