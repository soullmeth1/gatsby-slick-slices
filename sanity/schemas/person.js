import { FaUserAlt as icon } from 'react-icons/fa';

export default {
  name: 'person',
  title: 'Slicemaster',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'description',
      title: 'Desc',
      description: 'Tell about the person',
      type: 'text',
    },

    {
      name: 'image',
      title: 'Image',
      type: 'image',
    },
  ],
};
