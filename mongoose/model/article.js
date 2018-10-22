import mongoose from 'mongoose';

import {articleSchema} from '../schema';

export  default mongoose.model('article', articleSchema);
 