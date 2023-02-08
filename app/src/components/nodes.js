const nodes = [
    {
        id: 'A',
        type: 'resizeRotate',
        data: { label: null },
        position: { x: 0, y: 0 },
        style: {
            width: 500,
            height: 500,
        },
    },
    {
        id: 'B',
        type: 'input',
        data: { label: 'child node 1' },
        position: { x: 50, y: 50 },
        parentNode: 'A',
        expandParent: true,
    },
    {
        id: 'C',
        type: 'output',
        data: { label: 'child node 2' },
        position: { x: 100, y: 140 },
        parentNode: 'A',
        expandParent: true,
    }
];

export default nodes;
