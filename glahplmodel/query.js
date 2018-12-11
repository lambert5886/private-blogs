import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLBoolean,
  GraphQLID
} from 'graphql';

import {
  menuModel
} from '../mongoose/model';
const menutItemFields = {
       _id: {
      type: GraphQLID
    },
    id: {
      type: GraphQLString
    },
    menuType: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString
    },

    path: {
      type: GraphQLString
    },

    parentId: {
      type: GraphQLString
    },
    isChildren: {
      type: GraphQLBoolean
    },
    title: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
};

const menuItemType =  new GraphQLObjectType({
  name: 'menuItem',
 
  fields: {
      ...menutItemFields
  }
});


const menuQueryType = new GraphQLObjectType({
  name: 'BlogPost',
  fields: {
      childrenList: {
          type: new GraphQLList(menuItemType)
      },
    ...menutItemFields,
   


  }
})

const getMenus = {
  type: new GraphQLList(menuQueryType),
  args: {},
  resolve(root, params, options) {

    return menuModel.find();
  }
}

const menuEditType =  new GraphQLObjectType({
  name: 'blogEdit',
  fields: {
    ...menutItemFields
  }
})

const editMenu = {
  
  type: menuEditType,
  args: {
    ...menutItemFields
  },
  resolve(root, params, options){

    console.log(' 保存 menu >>>>  ', root, params, options)

  }
}

export default new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'blogsQuery',
    fields: {
      getMenus
    }
  }),
  mutation: new GraphQLObjectType({
    name: 'blogsMutation',
    fields: {
      editMenu
    }
  })
})
