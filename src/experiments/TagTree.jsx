import { useState, useEffect } from 'react';
import { Tree } from 'react-arborist';

const xdata = [
  { id: '1', name: 'Unread' },
  { id: '2', name: 'Threads' },
  {
    id: '3',
    name: 'Chat Rooms',
    children: [
      { id: 'c1', name: 'General' },
      { id: 'c2', name: 'Random' },
      {
        id: 'c3',
        name: 'Open Source Projects',
        children: [{ id: 'z3', name: 'deeper' }],
      },
    ],
  },
  {
    id: '4',
    name: 'Direct Messages',
    children: [
      { id: 'd1', name: 'Alice' },
      { id: 'd2', name: 'Bob' },
      { id: 'd3', name: 'Charlie' },
    ],
  },
];

// Derived from https://stackoverflow.com/a/73030226
export const normalize = (obj) => {
  return Object.assign(
    {
      [obj.id]: {
        ...obj,
        children: obj.children.map((v) => v.id),
      },
    },
    ...obj.children.map(normalize)
  );
};

// Derived from https://stackoverflow.com/a/73030226
// Unused here, need to denormalize differently
const denormalize = (norm) => {
  const treeHash = Object.fromEntries(
    Object.entries(norm).map(([k, v]) => [k, { ...v }])
  );

  Object.values(norm).forEach((v) => {
    // hook up children
    treeHash[v.id].children = v.children.map((k) => treeHash[k]);
  });

  // return parents
  return Object.values(treeHash).filter((tag) => !tag.parentId);
};

export default function TagTree() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function () {
      const tags = await import('./tags.json').then((module) => module.default);
      const d = tags.map(normalize).reduce((all, o) => {
        return Object.assign(all, o);
      }, {});
      // Need to deal with duplicate IDs, maybe with cuid2(), or set id = name
      const allTags = Object.values(d)
        .filter((v) => v.parentId === null)
        .reduce(function me(accum, v) {
          const { id, name } = v;
          const allChildren = v.children.map((id) => d[id]).reduce(me, []);
          return [...accum, { id: String(id), name, children: allChildren }];
        }, []);
      setData(allTags);
    })();
  }, []);

  return <>{!data.length <= 0 ? null : <Tree initialData={data} />}</>;
}
