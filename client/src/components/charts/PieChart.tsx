import { useTheme } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Pie } from 'react-chartjs-2'
import { useAddOpacityToHexColors } from '../../utils'

ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

interface PieChartOptions {
	plugins: {
		legend: {
			position: 'top'
			labels: {
				color: string
			}
		}
	}
}

const PieChart: FC<PieChartProps> = ({ data, title, labels, colors }) => {
	const ref = useRef(null)
	const theme = useTheme()
	const colorsWithOpacity = useAddOpacityToHexColors(colors, 0.7)

	const options: PieChartOptions = {
		plugins: {
			legend: {
				position: 'top',
				labels: {
					color: theme.palette.text.primary,
				},
			},
		},
	}

	const chartData = {
		labels,
		datasets: [
			{
				label: title,
				data,
				backgroundColor: colorsWithOpacity,
				borderWidth: 1,
			},
		],
	}

	return <Pie ref={ref} options={options} data={chartData} />
}

export default PieChart
