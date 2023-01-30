import PropTypes from 'prop-types';
import { lazy, useState } from 'react';
import { useIntl } from 'react-intl';
import {
    Link as RouterLink,
    Switch,
    useHistory,
    useRouteMatch,
} from 'react-router-dom';
import { useApplicationContext } from '@commercetools-frontend/application-shell-connectors';
// import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
    usePaginationState,
    useDataTableSortingState,
    useRowSelection
} from '@commercetools-uikit/hooks';
import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { BackIcon } from '@commercetools-uikit/icons';
import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
// import {
//     formatLocalizedString,
//     transformLocalizedFieldToLocalizedString,
// } from '@commercetools-frontend/l10n';
import messages from './messages';
import {
    useProcessList
  } from '../../hooks/use-process-details';
// import { getErrorMessage } from '../../helpers';

const ProcessDetails = lazy(() => import('../process-detail'));
const rows = [{
    'id': 418,
    'type': 'API',
    'name': 'POST mcm/product/sync',
    'createAt': '23-12-2022',
    'duration': '1s',
    'file': '',
    'output': 'sending data ...',
    'processStatus': 'COMPLETED',
    'miraklStatus': 'PROCESSING',
    'reportFile': '',
    'action': ''
}];
const initialVisibleColumns = [
    { key: '_id', label: 'ID' },
    { key: 'entity', label: 'Entity', isSortable: true },
    { key: 'processedAt', label: 'Processed At' },
    { key: 'source', label: 'Source'},
    { key: 'destination', label: 'Destination' }
];
const initialHiddenColumns = [
    { key: 'error', label: 'Error', isSortable: true },
    { key: 'errorDetail', label: 'Error Detail', isSortable: true }    
]

const itemRenderer = (item, column) => {
    switch (column.key) {
        case 'error':
          return item[column.key]?item[column.key]['name']:'-';
        case 'errorDetail':
          return item['error']?item['error']['message']:'-';
        default:
            return item[column.key]?item[column.key]:'UNKNOWN';
    }
};

const Processes = (props) => {
    const intl = useIntl();
    const match = useRouteMatch();
    const { push } = useHistory();
    const { page, perPage } = usePaginationState();
    const tableSorting = useDataTableSortingState({ key: 'key', order: 'asc' });
    const { dataLocale, projectLanguages } = useApplicationContext((context) => ({
        dataLocale: context.dataLocale,
        projectLanguages: context.project.languages,
    }));
    const [isCondensed, setIsCondensed] = useState(false);
    const [isWrappingText, setIsWrappingText] = useState(false);
    const initialColumnsState = [...initialVisibleColumns, ...initialHiddenColumns];
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
        isWrappingText
    };
    const UPDATE_ACTIONS = {
        COLUMNS_UPDATE: 'columnsUpdate',
        IS_TABLE_CONDENSED_UPDATE: 'isTableCondensedUpdate',
        IS_TABLE_WRAPPING_TEXT_UPDATE: 'isTableWrappingTextUpdate'
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
    const { processList, total, loading, error } = useProcessList({page,perPage});

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
    const columnsWithSelect = [
        ...visibleColumns,
    ];
    // if (error) {
    //     return (
    //       <ContentNotification type="error">
    //         <Text.Body>Something went wrong! Make sure the backend is running</Text.Body>
    //       </ContentNotification>
    //     );
    //   }
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

            {loading && <LoadingSpinner />}

            {processList ? (
                <Spacings.Stack scale="l">
                    <DataTableManager
                        columns={withRowSelection ? columnsWithSelect : initialVisibleColumns}
                        columnManager={columnManager}
                        displaySettings={displaySettings}
                        onSettingsChange={(action, nextValue) => {

                            tableSettingsChangeHandler[action](nextValue);
                        }} >
                        <DataTable
                            isCondensed
                            columns={initialVisibleColumns}
                            disableDisplaySettings
                            rows={processList}
                            itemRenderer={(item, column) =>
                                itemRenderer(item, column, dataLocale, projectLanguages)
                            }
                            sortedBy={tableSorting.value.key}
                            sortDirection={tableSorting.value.order}
                            onSortChange={tableSorting.onChange}
                            onRowClick={(row) => push(`${match.url}/${row._id}`)}
                        /></DataTableManager>
                    <Pagination
                        page={page.value}
                        onPageChange={page.onChange}
                        perPage={perPage.value}
                        onPerPageChange={perPage.onChange}
                        totalItems={total}
                    />
                    <Switch>
                        <SuspendedRoute path={`${match.path}/:id`}>
                            <ProcessDetails  />
                        </SuspendedRoute>
                    </Switch>
                </Spacings.Stack>
            ) : null}
        </Spacings.Stack>
    );
};
Processes.displayName = 'Processes';
Processes.propTypes = {
    linkToWelcome: PropTypes.string.isRequired,
};

export default Processes;
