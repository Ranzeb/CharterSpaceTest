import { z } from 'zod';
import { ObjectId } from 'bson';
//import NodeDataType from './schema/nodeDataType';

const hexString = "be5d55129807e725bda1b061";


const PreProcessId =
  z.preprocess((arg) => {
    if (typeof arg == "string" && arg.length >= 24) return ObjectId.createFromHexString(arg)
    else if (arg instanceof ObjectId) return arg;
    else return undefined;
  }, z.instanceof(ObjectId).optional()) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;


const NodeDataType = z.object({
  _id: PreProcessId
});

type correctType = z.infer<typeof NodeDataType>
type correctInputType = z.input<typeof NodeDataType>
type correctOutputType = z.output<typeof NodeDataType>

const actualNodeDataFromObjectId = NodeDataType.parse({
  _id: ObjectId.createFromHexString(hexString)
})

const actualNodeDataFromString = NodeDataType.parse({
  _id: hexString
})

console.log(actualNodeDataFromObjectId);
console.log(actualNodeDataFromString);
