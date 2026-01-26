import { T as TSS_SERVER_FUNCTION } from "../server.js";
import { createClient } from "tinacms/dist/client";
const createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
const ChapterPartsFragmentDoc = gql`
    fragment ChapterParts on Chapter {
  __typename
  title
  synopsis
  body
}
    `;
const ChapterDocument = gql`
    query chapter($relativePath: String!) {
  chapter(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ChapterParts
  }
}
    ${ChapterPartsFragmentDoc}`;
const ChapterConnectionDocument = gql`
    query chapterConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ChapterFilter) {
  chapterConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ChapterParts
      }
    }
  }
}
    ${ChapterPartsFragmentDoc}`;
function getSdk(requester) {
  return {
    chapter(variables, options) {
      return requester(ChapterDocument, variables, options);
    },
    chapterConnection(variables, options) {
      return requester(ChapterConnectionDocument, variables, options);
    }
  };
}
const generateRequester = (client2) => {
  const requester = async (doc, vars, options) => {
    let url = client2.apiUrl;
    if (options?.branch) {
      const index = client2.apiUrl.lastIndexOf("/");
      url = client2.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client2.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
const queries = (client2) => {
  const requester = generateRequester(client2);
  return getSdk(requester);
};
const client = createClient({ cacheDir: "/home/avitham/code/lakehouse-stories/tina/__generated__/.cache/1769384945623", url: "https://content.tinajs.io/2.0/content/4eaf47a6-9439-4844-9136-b24ec2700231/github/rewrite/tanstack-start", token: "dbdb9205aa892af15585299ea54e1ed2b7d3142b", queries });
export {
  client as a,
  createServerRpc as c
};
