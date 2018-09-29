import mongoose from 'mongoose';

import {
    menuSchema
} from '../schema';

export default mongoose.model('menu', menuSchema);
