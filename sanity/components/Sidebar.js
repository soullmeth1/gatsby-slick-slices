import React from 'react';
import S from '@sanity/desk-tool/structure-builder';
import { FaHome } from 'react-icons/fa';

const Sidebar = () => {
  console.log(S.list());
  return S.list()
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => <FaHome />)
        .child(
          S.editor()
            .schemaType('storeSettings')
            .documentId('downtown')
            .title(`Today's New`)
        ),
      ...S.documentTypeListItems().filter(
        (val) => val.getId() !== 'storeSettings'
      ),
    ]);
};

export default Sidebar;
