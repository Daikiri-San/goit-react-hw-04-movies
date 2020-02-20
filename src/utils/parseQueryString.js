import queryString from 'query-string';

export default function getQueryParams(StringURL) {
  return queryString.parse(StringURL);
}
