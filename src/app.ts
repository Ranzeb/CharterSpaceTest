import { z, ZodTypeDef } from 'zod';
import { ObjectId } from 'bson';

const mySchema = z.object({
  //_id: z.instanceof(ObjectId).or(stringTypeCheck).or(z.undefined())
  _id: z.instanceof(ObjectId).or(z.undefined()).or(z.string().transform((val) => { return ObjectId.createFromHexString(val) }))
})

const hexString = "be5d55129807e725bda1b061";

type correctType = z.infer<typeof mySchema>
type correctInputType = z.input<typeof mySchema>
type correctOutputType = z.output<typeof mySchema>


const actualNodeDataFromObjectId = mySchema.parse({
  _id: ObjectId.createFromHexString(hexString)
})

const actualNodeDataFromString = mySchema.parse({
  _id: hexString
})


/*
  const NodeData = z.object({
    _id: z.union([z.string(), z.instanceof(Types.ObjectId)]),//z.string().or(z.instanceof(Types.ObjectId)),
    coordinateX: z.number() || undefined,
    coordinateY: z.number() || undefined
  });
*/

/* z.instanceof(ObjectId).or(z.string().transform((val) => {
  return ObjectId.createFromHexString(val);

})) */

const NodeStringType = z.object({
  val: z.instanceof(ObjectId)
    .or(z.string()).transform((val) => {
      const parsed = val instanceof ObjectId ? val : ObjectId.createFromHexString(val);
      return parsed;
    })
})



const NodeData = (): z.ZodType<ObjectId | undefined, ZodTypeDef, ObjectId | undefined> =>
  z
    .instanceof(ObjectId)

/*
const NodeDataType = z.object({
  //_id: z.instanceof(ObjectId).or(z.string().transform((val) => { return ObjectId.createFromHexString(val) })).or(z.undefined())
  _id: z.instanceof(ObjectId).or(z.undefined())
})

*/


const NodeInput = z.object({
  value: z.instanceof(ObjectId).or(z.coerce.string().transform((val) => { return ObjectId.createFromHexString(val) })).or(z.undefined())
})

const stringTypeCheck = z.preprocess(arg => typeof arg == 'string' ? ObjectId.createFromHexString(arg) : arg, z.instanceof(ObjectId))
type correctStringType = z.input<typeof stringTypeCheck>
//const stringTypeCheck = z.string().transform((val) => { return ObjectId.createFromHexString(val) })

const objectString = (schema: z.ZodTypeAny) =>
  z.preprocess((a) => {
    if (typeof a === 'string') {
      return ObjectId.createFromHexString(a)
    } else {
      return a;
    }
  }, schema) as z.ZodEffects<z.ZodTypeAny, ObjectId | undefined, ObjectId | undefined>;

const stringObj: z.ZodType<ObjectId | undefined, z.ZodTypeDef, string | undefined> = z.string().transform((val) => { return ObjectId.createFromHexString(val) })


const test: z.ZodType<ObjectId | undefined, z.ZodTypeDef, ObjectId | string | undefined> = z.instanceof(ObjectId).or(z.string().transform((val) => { return ObjectId.createFromHexString(val) })).or(z.undefined())

type test = z.output<typeof stringObjSchema>

const schema: z.Schema<Input, z.ZodTypeDef, test> = z.object({
  _id: z.instanceof(ObjectId).or(z.undefined()).or(stringObj)
})

const NodeDataType = z.object({
  //_id: z.instanceof(ObjectId).or(stringTypeCheck).or(z.undefined())
  _id: z.preprocess((arg) => typeof arg == 'string' ? ObjectId.createFromHexString(arg) : arg, z.instanceof(ObjectId)).or(z.undefined())
})

const testRefine = z.object({
  _id: z.instanceof(ObjectId).or(z.string().min(24).transform((val) => {
    return ObjectId.createFromHexString(val);
  }))
})

