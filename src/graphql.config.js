import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import apolloLogger from "apollo-link-logger";
import { from } from "apollo-link";
import { ApolloClient } from "apollo-client";

const httpLink = new HttpLink({
  uri: "https://api.graph.cool/simple/v1/ck3h4yebx07690132c670msn3"
});

const cache = new InMemoryCache();
const clientConfig = new ApolloClient({
  link: from([apolloLogger, httpLink]),
  cache
});

export default clientConfig;
