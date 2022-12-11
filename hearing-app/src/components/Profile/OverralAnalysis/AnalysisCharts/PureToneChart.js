import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import {randomColor, shadeColor} from "../../../../data/util";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: "bottom",
        },
        scales: {
            xAxis: {
                type: 'logarithmic',
            },
            yAxis: {
                type: 'logarithmic',
            }
        }
    }
};

const resultToDatasets = (result) => {
    const resultName = `${result.type}#${result.id}`;
    const color1 = result.color;
    const color2 = shadeColor(color1, 10);
    return [
        {
            label: `${resultName} - Left`,
            data: Object.entries(result.data.left).map(([k,v]) => v),
            borderColor: color1,
        },
        {
            label: `${resultName} - Right`,
            data: Object.entries(result.data.right).map(([k,v]) => v),
            borderColor: color2,
        }
    ]
}

export default function PureToneChart(props) {
    const {results, selectedResultIds} = props;
    const selectedResults = results.filter((result) => selectedResultIds.includes(result.id));

    const labels = ["30","50","100","200","300","400","500","600","700","800","900","1000","1500","2000","3000","4000","5000","6000","8000","10000","12000","14000","16000","20000"];
    const datasets = selectedResults.flatMap(resultToDatasets);

    const data = {
        labels,
        datasets
    }

    return <Line options={options} data={data} />;
}
