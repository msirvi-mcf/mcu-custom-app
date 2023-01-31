import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink, Switch, useRouteMatch } from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
import {
  usePaginationState,
  useDataTableSortingState,
} from '@commercetools-uikit/hooks';
import { BackIcon } from '@commercetools-uikit/icons';
import FlatButton from '@commercetools-uikit/flat-button';
import TextInput from '@commercetools-uikit/text-input';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Label from '@commercetools-uikit/label';
import Text from '@commercetools-uikit/text';
import PrimaryButton from '@commercetools-uikit/primary-button';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import messages from './messages';
import { SearchIcon } from '@commercetools-uikit/icons';
import './data.css';

const initialVisibleColumns = [
  { key: 'sellerName', label: 'Seller Name' },
  { key: 'key', label: 'Key' },
  { key: 'creationDate', label: 'Creation Date' },
];

const initialHiddenColumns = [];

const initialData = [
  {
    sellerName: 'John Doe',
    key: '12edd335fggg5',
    creationDate: '2023-01-31T12:23:34.249Z',
  },
  {
    sellerName: 'Mary Smith',
    key: '452345435g52',
    creationDate: '2023-01-31T12:23:34.249Z',
  },
  {
    sellerName: 'Test User',
    key: 'vrggr3231ffs',
    creationDate: '2023-01-31T12:23:34.249Z',
  },
  {
    sellerName: 'Michael Thompson',
    key: 'ff35662ssa2',
    creationDate: '2023-01-31T12:23:34.249Z',
  },
];

const itemRenderer = (item, column) => {
  switch (column.key) {
    case 'error':
      return item[column.key] ? item[column.key]['name'] : '-';
    case 'errorDetail':
      return item['error'] ? item['error']['message'] : '-';
    case 'status': {
      if (item[column.key] === 'Inprogress') {
        return 'Inprogress';
      } else {
        return item['error'] ? 'Error' : 'Completed';
      }
    }

    default:
      return item[column.key] ? item[column.key] : 'unknown';
  }
};

const Data = (props) => {
  const intl = useIntl();
  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const match = useRouteMatch();
  const { page, perPage } = usePaginationState();

  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
    dataLocale: context.dataLocale,
    projectLanguages: context.project.languages,
  }));
  const [isCondensed, setIsCondensed] = useState(false);
  const [isWrappingText, setIsWrappingText] = useState(false);
  const initialColumnsState = [
    ...initialVisibleColumns,
    ...initialHiddenColumns,
  ];
  const [tableData, setTableData] = useState({
    columns: initialColumnsState,
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
  });
  const withRowSelection = true;
  const columnManager = {
    areHiddenColumnsSearchable: true,
    searchHiddenColumns: (searchTerm) => {
      setTableData({
        ...tableData,
        columns: initialColumnsState.filter(
          (column) =>
            tableData.visibleColumnKeys.includes(column.key) ||
            column.label
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase())
        ),
      });
    },
    disableColumnManager: false,
    visibleColumnKeys: tableData.visibleColumnKeys,
    hideableColumns: tableData.columns,
  };
  const displaySettings = {
    disableDisplaySettings: false,
    isCondensed,
    isWrappingText,
  };
  const UPDATE_ACTIONS = {
    COLUMNS_UPDATE: 'columnsUpdate',
    IS_TABLE_CONDENSED_UPDATE: 'isTableCondensedUpdate',
    IS_TABLE_WRAPPING_TEXT_UPDATE: 'isTableWrappingTextUpdate',
  };

  const tableSettingsChangeHandler = {
    [UPDATE_ACTIONS.COLUMNS_UPDATE]: (visibleColumnKeys) =>
      setTableData({
        ...tableData,
        visibleColumnKeys,
      }),
    [UPDATE_ACTIONS.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
    [UPDATE_ACTIONS.IS_TABLE_WRAPPING_TEXT_UPDATE]: setIsWrappingText,
  };
  const [row, setRow] = useState();
  const [dataList, setDataList] = useState(initialData);

  const total = dataList.length;

  if (row) {
    dataList.unshift(row);
  }

  const mappedColumns = tableData.columns.reduce(
    (columns, column) => ({
      ...columns,
      [column.key]: column,
    }),
    {}
  );

  const visibleColumns = tableData.visibleColumnKeys.map(
    (columnKey) => mappedColumns[columnKey]
  );
  const columnsWithSelect = [...visibleColumns];

  const searchDataHandler = (event) => {
    if (event.target.value.length > 20) {
      setSearchValue(event.target.value.substr(0, 20));
    } else {
      setSearchValue(event.target.value);
    }
  };

  const resetSearchHandler = () => {
    setSearchValue('');
    setDataList(initialData);
  };

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      setDataList(() => {
        const newData = initialData.filter((item) => {
          return (
            item.sellerName.toLowerCase().includes(searchValue.toLowerCase()) ||
            item.key.includes(searchValue) ||
            item.creationDate.includes(searchValue)
          );
        });

        return newData;
      });
    } else {
      setDataList(initialData);
    }
  }, [searchValue]);

  return (
    <Spacings.Stack scale="xl">
      <Spacings.Stack scale="xs">
        <FlatButton
          as={RouterLink}
          to={props.linkToWelcome}
          label={intl.formatMessage(messages.backToWelcome)}
          icon={<BackIcon />}
        />
        <Text.Headline as="h2" intlMessage={messages.title} />
      </Spacings.Stack>

      {isLoading && <LoadingSpinner size="s">Loading</LoadingSpinner>}

      {!isLoading && (
        <Spacings.Stack scale="s">
          <Spacings.Inline alignItems="center">
            <Label htmlFor="searchData" isBold>
              Search:
            </Label>
            <TextInput
              id="searchData"
              value={searchValue}
              horizontalConstraint={7}
              placeholder="Search data..."
              onChange={searchDataHandler}
            />
            <PrimaryButton
              id="resetSearch"
              type="submit"
              style={{ width: 'fit-content' }}
              label="Reset"
              onClick={resetSearchHandler}
            />
          </Spacings.Inline>

          {dataList ? (
            <Spacings.Stack scale="l">
              <DataTableManager
                columns={
                  withRowSelection ? columnsWithSelect : initialVisibleColumns
                }
                columnManager={columnManager}
                displaySettings={displaySettings}
                onSettingsChange={(action, nextValue) => {
                  tableSettingsChangeHandler[action](nextValue);
                }}
              >
                <DataTable
                  isCondensed
                  columns={initialVisibleColumns}
                  disableDisplaySettings
                  rows={dataList}
                  itemRenderer={(item, column) =>
                    itemRenderer(item, column, dataLocale, projectLanguages)
                  }
                  sortedBy={tableSorting.value.key}
                  sortDirection={tableSorting.value.order}
                  onSortChange={tableSorting.onChange}
                />
              </DataTableManager>
              <Pagination
                page={page.value}
                onPageChange={page.onChange}
                perPage={perPage.value}
                onPerPageChange={perPage.onChange}
                totalItems={total}
              />
              <Switch>
                <SuspendedRoute path={`${match.path}/:id`}></SuspendedRoute>
              </Switch>
            </Spacings.Stack>
          ) : null}
        </Spacings.Stack>
      )}
    </Spacings.Stack>
  );
};

Data.displayName = 'Data';
Data.propTypes = {
  linkToWelcome: PropTypes.string.isRequired,
};

export default Data;
