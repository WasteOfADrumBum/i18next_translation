import { BarController, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import { useAddOpacityToHexColors } from '../../utils'

ChartJS.register(BarController, CategoryScale, LinearScale, Title, Tooltip, Legend)

interface BarChartProps {
	labels: string[]
	datasets: {
		label: string
		data: number[]
	}[]
	colors: string[] // Accepts an array of colors
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

const BarChart: FC<BarChartProps> = ({ labels, datasets, colors, vertical, title }) => {
	const ref = useRef()
	const indexAxis = vertical ? 'y' : 'x'
	const displayTitle = !!title
	const titleText = title || ''

	const colorsWithOpacity = useAddOpacityToHexColors(colors, 0.7)

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
		datasets: datasets.map((dataset, index) => ({
			...dataset,
			backgroundColor: colorsWithOpacity[index % colorsWithOpacity.length], // Cycle through colorsWithOpacity array
			borderColor: colorsWithOpacity[index % colorsWithOpacity.length], // Cycle through colorsWithOpacity array
		})),
	}

	return <Bar ref={ref} options={options} data={data} />
}

export default BarChart
