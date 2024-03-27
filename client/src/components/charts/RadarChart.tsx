import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Radar } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

interface RadarChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

const RadarChart: FC<RadarChartProps> = ({ data, title, labels, colors }) => {
	const ref = useRef()
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

	return <Radar ref={ref} data={chartData} />
}

export default RadarChart
