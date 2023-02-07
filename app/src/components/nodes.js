const nodes = [
    {
        id: 'A',
        type: 'group',
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
        extent: 'parent',
    },
    {
        id: 'C',
        type: 'output',
        data: { label: 'child node 2' },
        position: { x: 100, y: 140 },
        parentNode: 'A',
        extent: 'parent',
    },
];

export default nodes;
