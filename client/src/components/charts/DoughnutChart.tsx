import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

const DoughnutChart: FC<DoughnutChartProps> = ({ data, title, labels, colors }) => {
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: title,
				data: data,
				backgroundColor: colors,
			},
		],
	}

	return <Doughnut data={chartData} />
}

export default DoughnutChart
