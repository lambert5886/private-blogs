import {
    graphql,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    isQutputType
} from 'graphql';

import mongoose from 'mongoose';
const articleSchema = mongoose.model('articleSchema');

