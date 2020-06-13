import React from 'react';
import { useHistory } from 'react-router-dom';

import MaterialTable from 'material-table';
import { Paper, ThemeProvider, createMuiTheme } from '@material-ui/core';

import '../../styles/Utils/Table.css';

const Table = ({ data, isReadyToDisplay, artType }) => {
  const history = useHistory();
  const getAddButton = () => {
    return (
      <button
        className='button add-button'
        onClick={() => history.push(`/${artType}/add`)}
      >
        Ajouter un tableau
      </button>
    );
  };

  return (
    <div className='table-container'>
      <ThemeProvider
        theme={createMuiTheme({
          typography: { fontSize: 22, fontFamily: 'Quicksand' },
        })}
      >
        <MaterialTable
          title={getAddButton()}
          columns={[
            {
              title: 'Nom',
              field: 'name',
              cellStyle: { textAlign: 'center', fontWeight: 'bold' },
            },
            {
              title: 'Année',
              field: 'creationYear',
              cellStyle: { textAlign: 'center' },
            },
            {
              title: 'Format',
              field: 'format',
              cellStyle: { textAlign: 'center' },
            },
            {
              title: 'Prix',
              field: 'price',
              type: 'currency',
              cellStyle: { textAlign: 'center' },
              currencySetting: {
                currencyCode: 'EUR',
                locale: 'right',
                minimumFractionDigits: 0,
              },
            },
            {
              title: 'Vendu ?',
              field: 'isSold',
              type: 'boolean',
              cellStyle: { textAlign: 'center' },
            },
            {
              title: 'Prix de vente',
              field: 'sellPrice',
              type: 'currency',
              cellStyle: { textAlign: 'center' },
              currencySetting: {
                currencyCode: 'EUR',
                locale: 'right',
                minimumFractionDigits: 0,
              },
              emptyValue: '/',
            },
            {
              title: 'Client',
              field: 'customer',
              cellStyle: { textAlign: 'center' },
              emptyValue: '/',
            },
            {
              title: 'Home ?',
              field: 'isOnHome',
              type: 'boolean',
              cellStyle: { textAlign: 'center' },
            },
            {
              title: "Date d'ajout",
              field: 'addDate',
              type: 'date',
              cellStyle: { textAlign: 'center' },
              defaultSort: 'desc',
            },
          ]}
          data={data}
          options={{
            paging: false,
            filtering: false,
            headerStyle: {
              fontWeight: 'bold',
              fontSize: 17,
              lineHeight: 1.3,
              textAlign: 'center',
            },
            thirdSortClick: false,
          }}
          components={{
            Container: (props) => <Paper {...props} elevation={0} />,
          }}
          localization={{
            body: {
              editRow: {
                deleteText: 'Tu veux vraiment supprimer ce tableau ?',
              },
              emptyDataSourceMessage:
                'Aucun tableau trouvé (attention aux accents !)',
            },
            pagination: {
              labelDisplayedRows: '{from} à {to} sur {count}',
              labelRowsSelect: 'résultats par page',
              labelRowsPerPage: 'résultats par page',
              firstAriaLabel: 'Première page',
              firstTooltip: 'Première page',
              previousAriaLabel: 'Page précédente',
              previousTooltip: 'Page précédente',
              nextAriaLabel: 'Page suivante',
              nextTooltip: 'Page suivante',
              lastAriaLabel: 'Dernière page',
              lastTooltip: 'Dernière page',
            },
            toolbar: {
              searchPlaceholder: 'Rechercher',
              searchTooltip: 'Rechercher',
            },
          }}
          onRowClick={(event, rowData, togglePanel) =>
            history.push(`/${artType}/${rowData.shortId}`)
          }
        />
      </ThemeProvider>
      <style>
        {`
        .table-container {
          opacity: ${isReadyToDisplay ? '1' : '0'};
          transition: opacity 0.5s;
        }
        `}
      </style>
    </div>
  );
};

export default Table;
