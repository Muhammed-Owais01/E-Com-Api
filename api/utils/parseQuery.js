const parseQuery = (limit, page) => ({
    offset: (limit && page) ? parseInt(limit * page) : undefined,
    limit: limit ? parseInt(limit) : undefined
});

module.exports = parseQuery;
