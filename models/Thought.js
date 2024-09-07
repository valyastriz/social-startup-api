const { Schema, model, Types } = require('mongoose');


// schema to create Thought model

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {

            }
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    },
)

// virtual property to get friend count
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});