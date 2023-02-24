import { z } from 'zod';
import { ObjectId } from 'bson';
//import NodeDataType from './schema/nodeDataType';

const hexString = "be5d55129807e725bda1b061";

/*
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
*/

const myUnion = z.discriminatedUnion("status", [
  z.object({ status: z.literal("success"), data: z.string() }),
  z.object({ status: z.literal("failed"), error: z.instanceof(Error) }),
]);


const checkString = z.optional(z.string().min(24).transform((input, ctx) => {
  try {
    return ObjectId.createFromHexString(input);
  } catch (error) {
    ctx.addIssue({
      message: error.message,
      code: z.ZodIssueCode.custom,
      params: { input },
    })
  }
})).optional();

const checkObjectId = z.instanceof(ObjectId).optional();

const NodeDataType = z.union([checkString, checkObjectId]);

const PreprocessType = z.preprocess((arg) => {
  if (typeof arg == "string") return ObjectId.createFromHexString(arg)
  else return arg;
}, z.instanceof(ObjectId).optional())

const FinalDataType: z.ZodType<ObjectId | undefined, z.ZodTypeDef, ObjectId | undefined> = z.object({
  _id: PreprocessType
})

type correctPreprocessTypeInput = z.input<typeof FinalDataType>
type correctPreprocessType = z.infer<typeof FinalDataType>
type correctPreprocessTypeOutput = z.output<typeof FinalDataType>

const NodeDataUpdatedType = z.object({
  _id: z.instanceof(ObjectId).optional()
})

type correctType = z.infer<typeof NodeDataType>
type correctInputType = z.input<typeof NodeDataType>
type correctOutputType = z.output<typeof NodeDataUpdatedType>


const actualNodeDataFromObjectId = FinalDataType.parse({
  _id: ObjectId.createFromHexString(hexString)
})

const actualNodeDataFromString = FinalDataType.parse({
  _id: hexString
})

console.log("objectId: " + actualNodeDataFromObjectId);
console.log("hexString: " + actualNodeDataFromString);