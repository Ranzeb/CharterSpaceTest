import { string, z, ZodTypeDef } from 'zod';
import { Types, Schema } from 'mongoose';



const hexString = "3614b7d78bca5b671295e804";
/*
  const NodeData = z.object({
    _id: z.union([z.string(), z.instanceof(Types.ObjectId)]),//z.string().or(z.instanceof(Types.ObjectId)),
    coordinateX: z.number() || undefined,
    coordinateY: z.number() || undefined
  });
*/

const NodeData = (): z.Schema<any, ZodTypeDef, Types.ObjectId | string> =>
  z
    .instanceof(Types.ObjectId)
    .or(z.string())
    .transform((val) => {
      const parsed = val instanceof Types.ObjectId ? val : Types.ObjectId.createFromHexString(val);
      return parsed;
    });

  

  const User = z.object({
    username: z.string(),
  });
  
  const Node = NodeData.parse({ _id: "Ludwig"});
  const NodeObjectId = NodeData.parse({_id: Types.ObjectId.createFromHexString(hexString), coordinateX: 10, coordinateY: 200});

 
  console.log(NodeObjectId);
  console.log(Node);
  // extract the inferred type
  type User = z.infer<typeof User>;

  
  //User.parse({ username: "Ludwig" });
  
  // extract the inferred type
  //type User = z.infer<typeof NodeData>;

  type correctType = z.infer<typeof NodeData>
  type correctInputType = z.input<typeof NodeData>
  type correctOutputType = z.output<typeof NodeData>
  // all 3 of them should emit:
  // {
  // ...<other arbitrary attributes>...
  // _id?: ObjectId | undefined;
  // }
  //both invocations should not fail
 
 /*
  const actualNodeDataFromString = NodeData.parse({
    _id: "random hex string here"
  })
*/
/*  console.log(actualNodeDataFromString);

  const actualNodeDataFromObjectId = NodeData.parse({
    _id: Types.ObjectId.createFromHexString("hex string here")
  })*/

  //both invocations should return something that emits
  // {
  // ...
  // _id?: ObjectId | undefined;
  // }
