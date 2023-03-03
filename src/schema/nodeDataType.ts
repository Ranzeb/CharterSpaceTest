import { z } from 'zod';
import { ObjectId } from 'bson';

// NodeDataType to check if the input value is an ObjectId or if it is a string, the schema will try to parse it into an ObjectId otherwise, 
// return an error if the string is not a correct hex string for ObjectId.createFromHexString() function.
// The schema will also check in advance that the string is at least 24 characters long because we already know that's not a valid hex string. 
// It should be at least 24 characters or 12 bytes long

const NodeDataType = z.object({
  _id: z.undefined().or(z.custom<ObjectId>((arg) => {
    if (typeof arg == "string" && arg.length >= 24) return ObjectId.createFromHexString(arg)
    else if (arg instanceof ObjectId) return arg;
  }, "Invalid ObjectId, should be an hex string or ObjectId type"))
})

export default NodeDataType;