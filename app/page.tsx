import AreaGraph from "@/components/AreaGraph";
import BarGraph from "@/components/BarGraph";
import DonutGraph from "@/components/DonutGraph";
import LineGraph from "@/components/LineGraph";

import GraphQL from "@/components/GraphQL";
export default async function Home() {
  const chartdatas: ChartData[] = await GraphQL();
  return (
    <div className="flex-wrap">
      <div className="p-10 bg-dark-tremor-background w-2/3">
        <AreaGraph chartdatas={chartdatas} />
      </div>
      <div className="flex-between">
        <div className="p-10 bg-dark-tremor-background-muted w-2/3">
          <BarGraph chartdatas={chartdatas} />
        </div>
        <div className="p-10 bg-dark-tremor-ring w-1/3">
          <DonutGraph chartdatas={chartdatas} />
        </div>
      </div>
      <div className="p-10 bg-dark-tremor-brand-inverted w-2/3">
        <LineGraph chartdatas={chartdatas} />
      </div>
    </div>
  );
}
