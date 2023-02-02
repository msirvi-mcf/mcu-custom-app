import {
    useMcQuery,
} from '@commercetools-frontend/application-shell';
import { GRAPHQL_TARGETS } from '@commercetools-frontend/constants';
import getSellers from './get-sellers.ctp.graphql';

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
        error,
        loading,
    };
};