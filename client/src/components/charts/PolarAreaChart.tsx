import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { PolarArea } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PolarAreaChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

const PolarAreaChart: FC<PolarAreaChartProps> = ({ data, title, labels, colors }) => {
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

	return <PolarArea data={chartData} />
}

export default PolarAreaChart
