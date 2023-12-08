import mongoose from 'mongoose';






const actionSchema = new mongoose.Schema(
  {
    action: { type: String, required: true},
    detail: { type: String, required: true},
    practice: { type: String, required: true },
    img: { type: String, required: true },
    slug: { type: String, required: true},
    vdo: { type: String, required: true},
  },
  {
    timestamps: true,
  }
);

const Action = mongoose.model('Action', actionSchema);
export default Action;