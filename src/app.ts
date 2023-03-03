import { TypeOf, z } from 'zod';
import { ObjectId } from 'bson';
import NodeDataType from './schema/nodeDataType';

const hexString = "be5d55129807e725bda1b061";

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