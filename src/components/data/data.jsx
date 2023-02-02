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
import {useSellerData} from '../../hooks/use-data';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { getErrorMessage } from '../../helpers';
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
  formatLocalizedString,
  transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import './data.css';

const initialVisibleColumns = [
  { key: 'name', label: 'Seller Name' },
  { key: 'key', label: 'Key' },
  { key: 'createdAt', label: 'Creation Date', isSortable: true },
];

const initialHiddenColumns = [
  { key: 'roles', label: 'Roles' },
];

const itemRenderer = (item, column,dataLocale,projectLanguages) => {
  switch (column.key) {
    case 'roles':
      return item.roles.join(', ');
    case 'name':
      return formatLocalizedString(
        { name: transformLocalizedFieldToLocalizedString(item.nameAllLocales) },
        {
          key: 'name',
          locale: dataLocale,
          fallbackOrder: projectLanguages,
          fallback: NO_VALUE_FALLBACK,
        }
      );

    default:
      return item[column.key] ? item[column.key] : '--';
  }
};

const Data = (props) => {
  const intl = useIntl();
  const [searchValue, setSearchValue] = useState('');
  const match = useRouteMatch();
  const { page, perPage } = usePaginationState();

  const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
  const { channelsPaginatedResult, error, loading } = useSellerData({
    page,
    perPage,
    tableSorting,
  });
 
  
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
    
  };


  if (error) {
    return (
      <ContentNotification type="error">
        <Text.Body>{getErrorMessage(error)}</Text.Body>
      </ContentNotification>
    );
  }

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

      {loading && <LoadingSpinner size="s">Loading</LoadingSpinner>}

      {!loading && (
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

          {channelsPaginatedResult ? (
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
                  rows={channelsPaginatedResult.results}
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
                totalItems={channelsPaginatedResult.total}
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
