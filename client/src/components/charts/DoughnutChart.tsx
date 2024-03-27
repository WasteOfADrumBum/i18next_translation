import { useTheme } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { useAddOpacityToHexColors } from '../../utils'

ChartJS.register(ArcElement, Tooltip, Legend)

interface DoughnutChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

interface DoughnutChartOptions {
	plugins: {
		legend: {
			position: 'top'
			labels: {
				color: string
			}
		}
	}
}

const DoughnutChart: FC<DoughnutChartProps> = ({ data, title, labels, colors }) => {
	const ref = useRef(null)
	const theme = useTheme()
	const colorsWithOpacity = useAddOpacityToHexColors(colors, 0.7)

	const options: DoughnutChartOptions = {
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

	return <Doughnut ref={ref} options={options} data={chartData} />
}

export default DoughnutChart
