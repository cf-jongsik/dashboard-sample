"use client";

import { BarChart } from "@tremor/react";

type Props = {
  chartdatas: ChartData[];
};

function Graph({ chartdatas }: Props) {
  return (
    <BarChart
      className="h-80"
      data={chartdatas}
      index="dimentions.datetimeFiveMinutes"
      categories={[
        "avg.edgeTimeToFirstByteMs",
        "avg.edgeDnsResponseTimeMs",
        "avg.originResponseDurationMs",
      ]}
      colors={["indigo", "rose"]}
      yAxisWidth={60}
      onValueChange={(v) => console.log(v)}
    />
  );
}
export default Graph;
