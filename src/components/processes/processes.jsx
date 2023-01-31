import PropTypes from 'prop-types';
import { lazy, useState, useEffect } from 'react';
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
    useDataTableSortingState
} from '@commercetools-uikit/hooks';
// import CheckboxInput from '@commercetools-uikit/checkbox-input';
import { BackIcon,OperationsIcon } from '@commercetools-uikit/icons';
// import Constraints from '@commercetools-uikit/constraints';
import FlatButton from '@commercetools-uikit/flat-button';
import LoadingSpinner from '@commercetools-uikit/loading-spinner';
import DataTableManager from '@commercetools-uikit/data-table-manager';
import DataTable from '@commercetools-uikit/data-table';
import { ContentNotification } from '@commercetools-uikit/notifications';
import { Pagination } from '@commercetools-uikit/pagination';
import Spacings from '@commercetools-uikit/spacings';
import Text from '@commercetools-uikit/text';
import { SuspendedRoute } from '@commercetools-frontend/application-shell';
import messages from './messages';
import {
    useProcessList
} from '../../hooks/use-process-details';
import SecondaryButton from '@commercetools-uikit/secondary-button';
import CollapsiblePanel from '@commercetools-uikit/collapsible-panel';
import jobConfigData from '../../data/jobConfigData.json'
import { useGetSettingsData, useGetSettingsCTP } from '../../hooks/use-settings';
import { removeNotification } from '@commercetools-frontend/notifications';
import { useShowNotification } from '@commercetools-frontend/actions-global';
// import { getErrorMessage } from '../../helpers';

const ProcessDetails = lazy(() => import('../process-detail'));
const initialVisibleColumns = [
    { key: '_id', label: 'ID' },
    { key: 'entity', label: 'Entity' },
    { key: 'source', label: 'Source' },
    { key: 'destination', label: 'Destination' },
    { key: 'status', label: 'Status' },
    { key: 'processedAt', label: 'Processed At' }

];
const initialHiddenColumns = [
    { key: 'error', label: 'Error', isSortable: true },
    { key: 'errorDetail', label: 'Error Detail', isSortable: true }
]

const itemRenderer = (item, column) => {
    switch (column.key) {
        case 'error':
            return item[column.key] ? item[column.key]['name'] : '-';
        case 'errorDetail':
            return item['error'] ? item['error']['message'] : '-';
        case 'status':
            {
                if(item[column.key] === "Inprogress") {
                    return "Inprogress"
                } else {
                    return item['error'] ? "Error" : 'Completed';
                }
            }
           
        default:
            return item[column.key] ? item[column.key] : 'unknown';
    }
};

const Processes = (props) => {
    const intl = useIntl();
    const match = useRouteMatch();
    const { push } = useHistory();
    const { page, perPage } = usePaginationState();
    const { baseurl, settingsError } = useGetSettingsCTP();
    const showNotification = useShowNotification();
    const {execute} = useGetSettingsData();
    const [config,setConfig] = useState("");
    const [loadingConfig,setLoadingConfig] = useState(true);
    useEffect(() => {
        if (
            typeof baseurl !== 'undefined' &&
            baseurl
        ) {
            execute(baseurl)
                .then((result) => {
                    setLoadingConfig(false);
                    setConfig(result.data);
                })
                .catch(() => {
                    // TODO: handle error
                });
        }
    }, [baseurl]);
    
    
    const { syncTypes } = jobConfigData;
    let jobsAll = false
    syncTypes.map((data, index) => {
        if(config[data.id]) {
            jobsAll = true
            return jobsAll; 
        }
        return jobsAll;
    })
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
    const [row,setRow] = useState();
    const { processList, total, loading, error } = useProcessList({ page, perPage });
    
    const executeJobsHandler = (label, entity) => {
        const rowDummy = createDummyRow(entity);
        
        setRow(rowDummy);
        showNotification({
            kind: 'success',
            domain: 'side',
            text: intl.formatMessage( {id: `${label}.execute`,
            defaultMessage: `${label} - ${entity} executed`}, {}),
          });
    }
    const createDummyRow = (entity) => {
       const row =  {_id: `${ "63d8ead53ef73b30828943" + Math.floor(1000 + Math.random() * 9000)}`,
        entity: `${entity}`,source: '',destination: '',
       status: 'Inprogress', processedAt: `${new Date().toISOString()}`,error:'', errorDetail:''}
        switch (entity) {
            case "category":
                row['source'] = 'COMMERCETOOLS';
                row['destination'] = 'MIRAKL';
                return row;
            case "product":
                row['source'] = 'MIRAKL';
                row['destination'] = 'COMMERCETOOLS';
                return row;
            case "offer":
                row['source'] = 'MIRAKL';
                row['destination'] = 'COMMERCETOOLS';
                return row;
            case "orderexport":
                row['source'] = 'COMMERCETOOLS';
                row['destination'] = 'MIRAKL';
                return row;
            case "orderimport":
                row['source'] = 'MIRAKL';
                row['destination'] = 'COMMERCETOOLS';
                return row;
            default: 
            return {};
        }
         
    }
    if (row){
         processList.unshift(row);
        } else processList;
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
    if(!loadingConfig && !config['connectorEnabled']) {
        return (
            <ContentNotification type="error">
                <Text.Body>connector disabled</Text.Body>
            </ContentNotification>
        ); 

    }
    if (error) {
        return (
            <ContentNotification type="error">
                <Text.Body>Something went wrong! Please make sure the backend is running</Text.Body>
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

           
            {config ? (
                <CollapsiblePanel
                    header="Active Sync Jobs"
                    id="jobConfigurationPanel"
                    isDefaultClosed={true}
                >
                    <Spacings.Inline scale="xxl" alignItems="baseline">
                        <Spacings.Stack scale="l">
                            {syncTypes.map((data, index) => {
                                if(config[data.id])
                                {
                                    return (
                                        <Spacings.Inline key={index} alignItems='center' justifyContent='space-between'>
                                            <div style={{ fontWeight: 'bold', width: '50%', whiteSpace: 'nowrap' }}>{data.label}</div>
                                            <div style={{  width: '20%' }}>{config[data.modeId].toUpperCase()}</div>
                                            <div style={{  width: '50%' }}>{config[data.modeId+'Schedule'] && (
                                                config[data.modeId+'Schedule']
                                            )}</div>
                                            {/* TODO: Fix this css, temporary */}
                                            <SecondaryButton
                                                onClick={() => {executeJobsHandler(data.label, data.entity)}}
                                                iconLeft={<OperationsIcon />}
                                                label= "Execute Now"
                                            />
                                            
                                        </Spacings.Inline>
                                    );
                                } 
                            })}
                            {!jobsAll ? (
                                
                            <Spacings.Inline key="nodata" alignItems='center' justifyContent='space-between'>
                                <div> All sync jobs are disabled</div>
                            </Spacings.Inline>
                                   
                            ): null}
                        </Spacings.Stack>
                    </Spacings.Inline>
                </CollapsiblePanel>
            ) : null}
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
                            <ProcessDetails />
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
