import { useCallback, useState } from 'react';
import ReactFlow, { addEdge, applyEdgeChanges, applyNodeChanges, Background } from 'reactflow';
import 'reactflow/dist/style.css';

import initialNodes from './nodes.js';
import initialEdges from './edges.js';
import ResizeRotateNode from './ResizeRotateNode';
const rfStyle = {
    backgroundColor: '#D0C0F7',
};

const nodeTypes = {
    resizeRotate: ResizeRotateNode,
};

function Flow() {
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [setNodes]
    );
    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
        [setEdges]
    );
    const onConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const resizeFactor = 3;
    const handleDragEnd = useCallback(
        (event, node) => {
            let groupNode = node;
            console.log(node.type, node.id);
            if (node.type === "group" || node.id === "A") return;

            nodes.forEach((nds) => {
                if (nds.type === "group" || node.id === "A") {
                    groupNode = nds;
                }
            });

            console.log("current node pos: ", node.position.x, node.position.y, node.width, node.height);
            console.log("current group pos: ", groupNode.position.x, groupNode.position.y, groupNode.width, groupNode.height);
            if ((node.position.x + node.width) >= (groupNode.width - resizeFactor)) {
                const newWidth = groupNode.width + resizeFactor;
                const newHeight = groupNode.height;
                groupNode.width = newWidth;
                groupNode.height = newHeight;
                groupNode.style = { width: newWidth, height: newHeight }
                console.log("new width height: ", groupNode.width, groupNode.height);
                //groupNode.width += 10;
                //groupNode.style = { width: groupNode.style.width + 10, heigth: groupNode.style.height + 10 }
            } else if ((node.position.y + node.height) >= (groupNode.height - resizeFactor)) {
                const newWidth = groupNode.width;
                const newHeight = groupNode.height + resizeFactor;
                groupNode.width = newWidth;
                groupNode.height = newHeight;
                groupNode.style = { width: newWidth, height: newHeight }
                console.log("new width height: ", groupNode.width, groupNode.height);
            }

            //if (node.height) node.height += 10;
            if (groupNode.id !== node.id) {
                setNodes((prevNodes) => {
                    return prevNodes.map((nds) => {
                        if (nds.id === node.id) {
                            nds.parentNode = groupNode?.id;
                            nds.extent = "parent";
                            nds.position = {
                                x: node.positionAbsolute?.x - groupNode.position.x,
                                y: node.positionAbsolute?.y - groupNode.position.y
                            };
                        }
                        return nds;
                    });
                });
            } else {
                console.log("out");
                setNodes((prevNodes) => {
                    return prevNodes.map((nds) => {
                        if (nds.id === node.id) {
                            nds.parentNode = undefined;
                            nds.position = node.positionAbsolute;
                            if (groupNode.height) {
                                console.log(groupNode);
                                groupNode.height = 400;
                                console.log(groupNode.height);
                                console.log(groupNode);
                            }
                        }
                        return nds;
                    });
                });
            }
        },
        [nodes, setNodes]
    );

    return (
        <ReactFlow
            nodeTypes={nodeTypes}
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeDrag={handleDragEnd}
            onConnect={onConnect}
            fitView
            style={rfStyle}
            attributionPosition="top-right"
        >
            <Background />
        </ReactFlow>
    );
}

export default Flow;
