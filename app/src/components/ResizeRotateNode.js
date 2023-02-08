import { useEffect, useState } from 'react';
import { useNodes } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';
import styles from './styles.module.css';

export default function ResizeRotateNode() {

    const [resize, setResize] = useState(false);
    const nodes = useNodes();
    const resizeFactor = 2;

    // For each node, check if there are some collisions and then, move them collided node to a new position
    // by a resizeFactor defined before. For checking the node state, useNodes() hook is called.
    function checkBorderCollision() {
        let groupNode;

        if (resize) {
            // Find the parent node looping in all the nodes available
            nodes.map((node) => {
                if (node.type === "resizeRotate") {
                    groupNode = node;
                }
            })

            // For each node that aren't the parent node, check for collision and move them away from the border
            nodes.map((child) => {
                if (child.type !== "resizeRotate") {

                    const currentNodePosition = {
                        x: child.position.x,
                        y: child.position.y,
                        width: child.width,
                        height: child.height,
                        endX: child.position.x + child.width,
                        endY: child.position.y + child.height
                    }

                    if (currentNodePosition.endX >= groupNode.position.x + groupNode.width - resizeFactor) {
                        child.position.x -= resizeFactor;
                    }

                    if (currentNodePosition.endY >= groupNode.position.y + groupNode.height - resizeFactor) {
                        child.position.y -= resizeFactor;
                    }

                    if (currentNodePosition.y <= groupNode.position.y + resizeFactor) {
                        child.position.y += resizeFactor;
                    }

                    if (currentNodePosition.x <= groupNode.position.x + resizeFactor) {
                        child.position.x += resizeFactor;
                    }
                }
            })
        }
    }


    // Each time a node data change, check for possible border collisions with parent node
    useEffect(() => {
        checkBorderCollision();
    }, [nodes]);


    return (
        <>
            <div className={styles.node}>
                <NodeResizer isVisible={true} minWidth={500} minHeight={500}
                    onResizeStart={() => setResize(true)}
                    onResizeEnd={() => setResize(false)}
                />
            </div>
        </>
    );
}
