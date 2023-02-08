import { useEffect, useCallback, useState } from 'react';
import { useNodes } from 'reactflow';
import { NodeResizer } from '@reactflow/node-resizer';

import '@reactflow/node-resizer/dist/style.css';
import styles from './styles.module.css';

export default function ResizeRotateNode() {

    const [rotation, setRotation] = useState(0);
    const [resizable, setResizable] = useState(true);
    const [resize, setResize] = useState(false);
    const nodes = useNodes();
    const resizeFactor = 2;

    function checkCollision() {
        let groupNode;

        if (resize) {
            nodes.map((node) => {
                if (node.type === "resizeRotate") {
                    groupNode = node;
                }
            })

            // handle intersection between x and y coordinates
            nodes.map((child) => {
                if (child.type !== "resizeRotate") {
                    if ((child.position.x + child.width >= groupNode.position.x + groupNode.width) && (child.position.x > 0)) {
                        child.position.x -= 2;
                    } else if ((child.position.y + child.height >= groupNode.position.y + groupNode.height) && (child.position.y > 0)) {
                        child.position.y -= 2;
                    } else if ((child.position.y <= groupNode.position.y) && (child.position.x < groupNode.position.x + groupNode.width)) {
                        child.position.y += 2;
                    } else if ((child.position.x <= groupNode.position.x) && (child.position.y < groupNode.position.y + groupNode.height)) {
                        child.position.x += 2;
                    }
                }
            })
        }
    }


    useEffect(() => {
        checkCollision();
    }, [nodes]);

    const onResize = useCallback(
        () => {
            setResize(true);

        }, [nodes]
    );

    return (
        <>
            <div
                className={styles.node}
            >
                <NodeResizer isVisible={resizable} minWidth={500} minHeight={500}
                    onResize={onResize}
                    //onResizeStart={() => setResize(true)}
                    onResizeEnd={() => setResize(false)}
                />
            </div>
        </>
    );
}
