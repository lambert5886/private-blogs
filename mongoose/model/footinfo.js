import mongoose from 'mongoose';

import { footInfoSchema } from '../schema';

export default mongoose.model('footInfo', footInfoSchema);