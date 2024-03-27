import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Radar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface RadarChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

const RadarChart: FC<RadarChartProps> = ({ data, title, labels, colors }) => {
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

	return <Radar data={chartData} />
}

export default RadarChart
