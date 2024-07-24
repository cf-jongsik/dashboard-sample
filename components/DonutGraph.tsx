"use client";

import { DonutChart } from "@tremor/react";

type Props = {
  chartdatas: ChartData[];
};

function Graph({ chartdatas }: Props) {
  return (
    <DonutChart
      data={chartdatas}
      index="dimentions.datetimeFiveMinutes"
      category="avg.edgeTimeToFirstByteMs"
      colors={["indigo", "rose"]}
      onValueChange={(v) => console.log(v)}
    />
  );
}
export default Graph;
