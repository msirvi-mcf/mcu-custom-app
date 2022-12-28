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
import { NO_VALUE_FALLBACK } from '@commercetools-frontend/constants';
import {
    usePaginationState,
    useDataTableSortingState,
} from '@commercetools-uikit/hooks';
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
import {
    formatLocalizedString,
    transformLocalizedFieldToLocalizedString,
} from '@commercetools-frontend/l10n';
import messages from './messages';
// import { useChannelsFetcher } from '../../hooks/use-channels-connector';
// import { getErrorMessage } from '../../helpers';

const Process = lazy(() => import('../process-detail'));

const initialVisibleColumns = [
    { key: 'id', label: 'ID' },
    { key: 'type', label: 'Type', isSortable: true },
    { key: 'name', label: 'Name' },
    { key: 'createAt', label: 'Created At' },
    { key: 'processStatus', label: 'Process Status', isSortable: true }

];
const hideableColumns = [
    { key: 'duration', label: 'Duration', isSortable: true },
    { key: 'file', label: 'File' },
    { key: 'output', label: 'Output' },
    { key: 'miraklStatus', label: 'Mirakl Status' },
    { key: 'reportFile', label: 'Report File' },
    { key: 'action', label: 'Action', isSortable: true },
]
const columnManager = {
    visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
    hideableColumns
}
const itemRenderer = (item, column, dataLocale, projectLanguages) => {
    switch (column.key) {
        // case 'roles':
        //   return item.roles.join(', ');
        // case 'name':
        //   return formatLocalizedString(
        //     { name: transformLocalizedFieldToLocalizedString(item.nameAllLocales) },
        //     {
        //       key: 'name',
        //       locale: dataLocale,
        //       fallbackOrder: projectLanguages,
        //       fallback: NO_VALUE_FALLBACK,
        //     }
        //   );
        default:
            return item[column.key];
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
    const displaySettings = { isCondensed }
    const initialColumnsState = [...initialVisibleColumns, ...hideableColumns];
    const [tableData, setTableData] = useState({
        columns: initialColumnsState,
        visibleColumnKeys: initialVisibleColumns.map(({ key }) => key),
      });
    //   TODO : coloumn manager
    const tableSettingsChangeHandler = {
        ['a'.COLUMNS_UPDATE]: (visibleColumnKeys) =>
          setTableData({
            ...tableData,
            visibleColumnKeys,
          }),
        ['b'.IS_TABLE_CONDENSED_UPDATE]: setIsCondensed,
      };
    //   const { channelsPaginatedResult, error, loading } = useChannelsFetcher({
    //     page,
    //     perPage,
    //     tableSorting,
    //   });

    //   if (error) {
    //     return (
    //       <ContentNotification type="error">
    //         <Text.Body>{getErrorMessage(error)}</Text.Body>
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

            <Constraints.Horizontal max={13}>
                <ContentNotification type="info">
                    <Text.Body intlMessage={messages.demoHint} />
                </ContentNotification>
            </Constraints.Horizontal>

            {/* {loading && <LoadingSpinner />} */}

            {true ? (
                <Spacings.Stack scale="l">
                    <DataTableManager
                        columns={initialVisibleColumns}
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
                            rows={[{
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
                            }]}
                            itemRenderer={(item, column) =>
                                itemRenderer(item, column, dataLocale, projectLanguages)
                            }
                            maxHeight={600}
                            sortedBy={tableSorting.value.key}
                            sortDirection={tableSorting.value.order}
                            onSortChange={tableSorting.onChange}
                            onRowClick={(row) => push(`${match.url}/${row.id}`)}
                        /></DataTableManager>
                    <Pagination
                        page={page.value}
                        onPageChange={page.onChange}
                        perPage={perPage.value}
                        onPerPageChange={perPage.onChange}
                        totalItems={20}
                    />
                    <Switch>
            {/* <SuspendedRoute path={`${match.path}/:id`}>
              <Process onClose={() => push(`${match.url}`)} />
            </SuspendedRoute> */}
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
