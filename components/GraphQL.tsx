import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { getRequestContext } from "@cloudflare/next-on-pages";

const url = "https://api.cloudflare.com/client/v4/graphql";

async function GraphQL() {
  // VARIABLES
  const ACCT_ID = getRequestContext().env.ACCT_ID;
  const ZONE_ID = getRequestContext().env.ZONE_ID;
  const DATE_START = getRequestContext().env.DATE_START;
  const DATE_END = getRequestContext().env.DATE_END;

  const gq = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
    headers: {
      Authorization: "Bearer " + getRequestContext().env.CLOUDFLARE_GQL_TOKEN,
    },
  });
  console.log(getRequestContext().env);
  const chartdatas = await gq
    .query({
      query: gql`
        query timeseries(
          $ACCT_ID: string!
          $ZONE_ID: string!
          $DATE_START: Date
          $DATE_END: Date
        ) {
          viewer {
            accounts(filter: { accountTag: $ACCT_ID }) {
              zones(filter: { zoneTag: $ZONE_ID }) {
                httpRequestsAdaptiveGroups(
                  filter: { date_geq: $DATE_START, date_leq: $DATE_END }
                  limit: 1000
                ) {
                  dimensions {
                    datetimeFiveMinutes
                  }
                  avg {
                    edgeDnsResponseTimeMs
                    edgeTimeToFirstByteMs
                    originResponseDurationMs
                  }
                }
              }
            }
          }
        }
      `,
      variables: {
        ACCT_ID: ACCT_ID,
        ZONE_ID: ZONE_ID,
        DATE_START: DATE_START,
        DATE_END: DATE_END,
      },
    })
    .then((result) => {
      console.log(result);
      const data = result.data.viewer as ResultSet;
      return data;
    })
    .then((data) => {
      const zoneData = data.accounts[0].zones[0];
      return zoneData;
    })
    .then((zoneData) => {
      let chartdatas = [] as ChartData[];
      zoneData.httpRequestsAdaptiveGroups.map((chartdata) => {
        chartdatas.push(chartdata);
      });
      return chartdatas;
    });
  console.log(chartdatas);
  return chartdatas;
}

export default GraphQL;
