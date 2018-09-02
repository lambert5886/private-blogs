import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID
} from 'graphql';

import articleModel from '../mongoose/schema/article';

const blogPostType = new GraphQLObjectType({
    name: 'BlogPost',
    field: {
        _id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        title: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        }

       
    }
})


const queries = {
    type: blogPostType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLID)
        }
    },
    resolve(root, params, options){
        console.log('articleModel >>> ',params)

        return articleModel.find();
    }

};


export default new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'Query',
        field:{
            ...queries
        }
    })
})