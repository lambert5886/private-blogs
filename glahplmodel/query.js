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

const blogPostType = new GraphQLObjectType({
    name: 'BlogPost',
    fields: {
         _id: {
      type: GraphQLID
    },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }


    }
})

const blogs = {
    type: new GraphQLList(blogPostType),
    args: {},
    resolve(root, params, options) {
        return articleModel.find();
    }
}

export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'blogsQuery',
        fields: {
            blogs
        }
    })
})