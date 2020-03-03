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
      options={{ toolbar: false, paginationType: 'stepped', ...props.options }}
      localization={{
        pagination: {
          nextTooltip: 'Další stránka',
          previousTooltip: 'Předchozí stránka',
          lastTooltip: 'Poslední stránka',
          firstTooltip: 'První stránka',
          labelRowsSelect: 'řádků',
        },
        header: {
          actions: 'Akce',
        },
      }}
    />
  );
};

export default MaterialTable;
