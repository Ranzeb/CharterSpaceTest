# CharterSpaceTest 

In this project I've walk through my implementation for the Charter Space take home assignment.

For the first task, I had to implement a NodeType to check if the node _id is an ObjectId or a String if not, throw an error.

In my implementation that you can find under src/schema/nodeDataType.ts file, I've created a z.object that can accept either an ObjectId or a String checking if the string
is less than 24 characters (Valid Hex String) and the transform it to an ObjectId so we always have the same type inside _id.

For the second task, I've implemented a custom parent node that can be resized and shrinked when children are moved around the border.

For the resized part I've used the NodeResizer type from ReactFlow API adding expandParent: true property to all children node so the parent can resize accordingly.

For the shrink instead, I've used onResizeStart() and onResizeEnd() hooks to check if there are some children close to the border when the parent start to resize.

I've created a custom function to check possible collisions using useNodes() hook to see x,y position and width of all the nodes in my ReactFlowComponent.
