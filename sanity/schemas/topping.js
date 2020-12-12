import { FaPepperHot as icon } from 'react-icons/fa';

export default {
  name: 'topping',
  title: 'Toppings',
  type: 'document',
  icon,
  fields: [
    {
      name: 'name',
      title: 'Topping Name',
      type: 'string',
      description: 'Top what you want to put it on pizza',
    },
    {
      name: 'vegetarian',
      title: 'Vegetarian',
      type: 'boolean',
      description: 'For vegetarian people',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'vegetarian',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: subtitle ? 'vegetarian' : 'not vegetarian',
      };
    },
  },
};
