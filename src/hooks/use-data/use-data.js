import {
    useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import getSellers from './get-sellers.ctp.graphql';
import { useState, useEffect } from 'react';

export const useSellerData = ({ page, perPage, tableSorting }) => {
    const { data, error, loading } = useMcQuery(getSellers, {
        variables: {
            limit: perPage.value,
            offset: (page.value - 1) * perPage.value,
            sort: [`${tableSorting.value.key} ${tableSorting.value.order}`],
        },
        context: {
            target: GRAPHQL_TARGETS.COMMERCETOOLS_PLATFORM,
        },
    });

    return {
        channelsPaginatedResult: data?.channels,
        channels: data?.channels.results,
        error,
        loading,
    };
};
export const useSearchApi = ({ page, perPage, tableSorting }) => {
    const { channelsPaginatedResult, channels, error, loading } = useSellerData({ page, perPage, tableSorting });
    console.log(channelsPaginatedResult);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    useEffect(() => {
        if (channels) {
            setFilteredData(
                channels.filter(item => {
                    return (
                        item.key.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        item.nameAllLocales.some(locale =>
                            locale.value.toLowerCase().includes(searchTerm.toLowerCase())
                        )
                    )
                }
                )
            );
        }

    }, [channels, searchTerm]);

    return { channelsPaginatedResult, channels, filteredData, searchTerm, setSearchTerm, error, loading };
};