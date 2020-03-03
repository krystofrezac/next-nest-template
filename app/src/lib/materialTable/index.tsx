import React from 'react';
import MaterialTablePrefab, { MaterialTableProps } from 'material-table';
import materialTableIcons from 'lib/materialTable/icons';

const MaterialTable = (props: MaterialTableProps<any>) => {
  return (
    <MaterialTablePrefab
      {...props}
      icons={materialTableIcons}
      components={{
        Container: p => p.children,

        ...props.components,
      }}
      options={{ toolbar: false, ...props.options }}
      localization={{
        pagination: {
          nextTooltip: 'Další stránka',
          previousTooltip: 'Předchozí stránka',
          lastTooltip: 'Poslední stránka',
          firstTooltip: 'První stránka',
          labelRowsSelect: 'řádků',
          labelDisplayedRows: '{from}-{to} z {count}',
        },
        header: {
          actions: 'Akce',
        },
      }}
    />
  );
};

export default MaterialTable;
