import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	LineElement,
	PointElement,
	Title,
	Tooltip,
} from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

interface LineChartProps {
	labels: string[]
	datasets: {
		label: string
		data: number[]
		borderColor: string
		backgroundColor: string
	}[]
	title?: string
}

interface LineChartOptions {
	responsive?: boolean
	plugins?: {
		legend?: {
			position?: 'top' | 'right' | 'bottom' | 'left'
		}
		title?: {
			display?: boolean
			text?: string
		}
	}
}

const LineChart: FC<LineChartProps> = ({ labels, datasets, title }) => {
	const ref = useRef()
	const displayTitle = !!title
	const titleText = title || ''

	const options: LineChartOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: 'top',
			},
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

	return <Line ref={ref} options={options} data={data} />
}

export default LineChart
