import { TypeOf, z } from 'zod';
import { ObjectId } from 'bson';
//import NodeDataType from './schema/nodeDataType';

const hexString = "be5d55129807e725bda1b061";


const PreProcessId =
  z.preprocess((arg) => {
    if (typeof arg == "string" && arg.length >= 24) return ObjectId.createFromHexString(arg)
    else if (arg instanceof ObjectId) return arg;
    else return z.undefined;
  }, z.instanceof(ObjectId).optional()) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;



const NodeDataType = z.object({
  _id: z.custom<ObjectId | undefined>((arg) => {
    console.log("custom:");
    console.log(arg);
    if (typeof arg == "string" && arg.length >= 24) {
      console.log("stringa")
      return ObjectId.createFromHexString(arg)
    }
    else if (arg instanceof ObjectId) {
      console.log("ObjectId")
      return arg;
    }
    else {
      console.log("undefined")
      return undefined;
    }
  }, "Invalid ObjectId, should be an hex string or ObjectId type")
})


type correctType = z.infer<typeof NodeDataType>
type correctInputType = z.input<typeof NodeDataType>
type correctOutputType = z.output<typeof NodeDataType>

const actualNodeDataFromObjectId = NodeDataType.parse({
  _id: ObjectId.createFromHexString(hexString)
})

const actualNodeDataFromString = NodeDataType.parse({
  _id: "be5d55129807e725bda1b061"
})

console.log(actualNodeDataFromObjectId);
console.log(actualNodeDataFromString);