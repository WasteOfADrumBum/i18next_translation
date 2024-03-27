import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import React, { FC } from 'react'
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

const PieChart: FC<PieChartProps> = ({ data, title, labels, colors }) => {
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

	return <Pie data={chartData} />
}

export default PieChart
