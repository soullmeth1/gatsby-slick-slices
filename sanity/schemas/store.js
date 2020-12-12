import { MdStoreMallDirectory as icon } from 'react-icons/md';

export default {
  name: 'storeSettings',
  title: 'Settings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'The name of your store',
    },
    {
      name: 'slicemasters',
      title: 'Slicemasters Currently Slicing',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'person' }],
        },
      ],
    },
    {
      name: 'pizzascurrent',
      title: 'Hot Slice available in the case',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'pizza' }] }],
    },
  ],
};
