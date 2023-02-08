import { z } from 'zod';
import { ObjectId } from 'bson';

// NodeDataType to check if the input value is an ObjectId or if it is a string, the schema will try to parse it into an ObjectId otherwise, 
// return an error if the string is not a correct hex string for ObjectId.createFromHexString() function.
// The schema will also check in advance that the string is at least 24 characters long because we already know that's not a valid hex string. 
// It should be at least 24 characters or 12 bytes long

const NodeDataType = z.object({
    _id: z.instanceof(ObjectId).optional().or(z.string().min(24).transform((input, ctx) => {
        try {
            return ObjectId.createFromHexString(input);
        } catch (error) {
            ctx.addIssue({
                message: error.message,
                code: z.ZodIssueCode.custom,
                params: { input },
            })
        }
    }))
})

export default NodeDataType;