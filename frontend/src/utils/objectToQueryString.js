const objectToQueryString = (queryParameters) => {
    return queryParameters ? 
        Object.entries(queryParameters).reduce(
            (queryString, [key, value]) => {
                // Only exclude undefined and null values, but include empty strings
                if (value === undefined || value === null) {
                    return queryString;
                }
                
                const symbol = queryString ? '&' : '?';
                queryString += `${symbol}${key}=${encodeURIComponent(value)}`;

                return queryString;
            }, ''
        ) : '';
};

export default objectToQueryString;