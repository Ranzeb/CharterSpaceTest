import { z } from 'zod';
import { ObjectId } from 'bson';

// NodeDataType to check if the input value is an ObjectId or if it is a string, the schema will try to parse it into an ObjectId otherwise, 
// return an error if the string is not a correct hex string for ObjectId.createFromHexString() function.
// The schema will also check in advance that the string is at least 24 characters long because we already know that's not a valid hex string. 
// It should be at least 24 characters or 12 bytes long
/*
const PreProcessId =
  z.preprocess((arg) => {
    if (typeof arg == "string" && arg.length >= 24) return ObjectId.createFromHexString(arg)
    else if(arg instanceof ObjectId) return arg;
    else return undefined;
  }, z.instanceof(ObjectId).optional()) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;
*/

/*
const PreProcessId =
  z.preprocess((arg) => {
    return ObjectId.createFromHexString(String(arg))
  }, z.instanceof(ObjectId).optional()) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;
*/

const PreProcessId = z.instanceof(ObjectId).optional().or(z.string().transform((val) => { return ObjectId.createFromHexString(val); })) as unknown as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;

type correctType = z.infer<typeof PreProcessId>
type correctInputType = z.input<typeof PreProcessId>
type correctOutputType = z.output<typeof PreProcessId>


const NodeDataType = z.object({
  _id: PreProcessId
});

const isValidId = (id: string): id is `${string}/${string}` =>
  id.split("/").length === 2;

const baseSchema = z.preprocess((arg) => {
  return ObjectId.createFromHexString(String(arg))
}, z.instanceof(ObjectId).optional()) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;

type Input = z.input<typeof baseSchema>

type Output = z.output<typeof baseSchema>

const schema: z.ZodType<Output, z.ZodTypeDef, Input> = baseSchema

type correctTypeschema = z.infer<typeof schema>
type correctInputTypeschema = z.input<typeof schema>
type correctOutputTypeschema = z.output<typeof schema>

export default NodeDataType;