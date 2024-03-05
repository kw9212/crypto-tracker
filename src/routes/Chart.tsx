import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart({ coinId, isDark }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["ohlcv", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  // console.log(data?.map((price) => price.close));

  return (
    <h1>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            // 우리가 보내고 싶은 데이터
            {
              name: "Price",
              data: data?.map((price) => price.close) as number[], // data가 받아야 하는 건 number인데 data?.map() 읽으면 number, 못 읽으면 undefined돼서 문제. 그래서 강제로 number []로 지정.
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: {
              show: false,
            },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false, datetimeFormatter: { month: "mmm 'yy" } },
              type: "datetime",
              categories: data?.map((price) => {
                const timeClose = Number(price.time_close); // Convert to number
                return !isNaN(timeClose) ? timeClose * 1000 : null; // Check if conversion is successful
              }),
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["#0fbcf9"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${value.toFixed(2)}`,
              },
            },
          }} // 차트 레이아웃
        />
      )}
    </h1>
  );
}

export default Chart;
