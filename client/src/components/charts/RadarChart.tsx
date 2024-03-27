import { useTheme } from '@mui/material'
import { ArcElement, Chart as ChartJS, Legend, RadialLinearScale, Tooltip } from 'chart.js'
import 'chart.js/auto'
import React, { FC, useRef } from 'react'
import { Radar } from 'react-chartjs-2'
import { useAddOpacityToHexColors } from '../../utils'

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend)

interface RadarChartProps {
	data: number[]
	title: string
	labels: string[]
	colors: string[]
}

interface RadarChartOptions {
	plugins: {
		legend: {
			position: 'top'
			labels: {
				color: string
			}
		}
	}
	scales: {
		r: {
			ticks: {
				beginAtZero: boolean
				color: string
				backdropColor: string
			}
			pointLabels: {
				color: string
			}
			grid: {
				color: string
			}
			angleLines: {
				color: string
			}
		}
	}
}

// TODO: Fix data not displaying correctly

const RadarChart: FC<RadarChartProps> = ({ data, title, labels, colors }) => {
	const ref = useRef(null)
	const theme = useTheme()
	const colorsWithOpacity = useAddOpacityToHexColors(colors, 0.7)

	const options: RadarChartOptions = {
		plugins: {
			legend: {
				position: 'top',
				labels: {
					color: theme.palette.text.primary,
				},
			},
		},
		scales: {
			r: {
				ticks: {
					beginAtZero: true,
					color: theme.palette.text.primary,
					backdropColor: 'rgba(0, 0, 0, 0)',
				},
				pointLabels: {
					color: theme.palette.text.primary,
				},
				grid: {
					color: theme.palette.secondary.main,
				},
				angleLines: {
					color: theme.palette.secondary.main,
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

	return <Radar ref={ref} options={options} data={chartData} />
}

export default RadarChart
