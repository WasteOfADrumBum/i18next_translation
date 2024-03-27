import { BarController, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarController, CategoryScale, LinearScale, Title, Tooltip, Legend)

interface BarChartProps {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		borderColor: string
		backgroundColor: string
	}[]
	vertical?: boolean
	title?: string
}

interface BarChartOptions {
	indexAxis?: 'x' | 'y'
	responsive?: boolean
	plugins?: {
		title?: {
			display?: boolean
			text?: string
		}
	}
}

const BarChart: FC<BarChartProps> = ({ labels, datasets, vertical, title }) => {
	const ref = useRef()
	const indexAxis = vertical ? 'y' : 'x'
	const displayTitle = !!title
	const titleText = title || ''

	const options: BarChartOptions = {
		indexAxis: indexAxis,
		responsive: true,
		plugins: {
			title: {
				display: displayTitle,
				text: titleText,
			},
		},
	}

	const data = {
		labels: labels,
		datasets: datasets,
	}

	return <Bar ref={ref} options={options} data={data} />
}

export default BarChart
