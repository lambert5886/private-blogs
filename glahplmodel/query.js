import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLID
} from 'graphql';

import {
  articleModel
} from '../mongoose/model';

const menuQueryType = new GraphQLObjectType({
    name: 'BlogPost',
    fields: {
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
 
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }


    }
})

const getMenus  = {
    type: new GraphQLList(menuQueryType),
    args: {},
    resolve(root, params, options) {
        return articleModel.find();
    }
}

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'blogsQuery',
        fields: {
            getMenus
        }
    })
})