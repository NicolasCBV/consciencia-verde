import algoliasearch from "algoliasearch/lite";

const appId = String(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID);
const searchKey = String(process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY);

const searchClient = algoliasearch(appId, searchKey);

export { searchClient };
