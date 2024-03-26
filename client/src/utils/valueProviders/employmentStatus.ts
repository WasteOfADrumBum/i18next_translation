import { useTranslation } from 'react-i18next'

export const getEmploymentStatuses = () => {
	const { t } = useTranslation()

	return [
		{ key: 'Full-time', value: t('values.employmentStatus.fullTime') },
		{ key: 'Part-time', value: t('values.employmentStatus.partTime') },
		{ key: 'Contract', value: t('values.employmentStatus.contract') },
		{ key: 'Internship', value: t('values.employmentStatus.internship') },
		{ key: 'Temporary', value: t('values.employmentStatus.temporary') },
		{ key: 'Freelance', value: t('values.employmentStatus.freelance') },
		{ key: 'Commission', value: t('values.employmentStatus.commission') },
		{ key: 'Apprenticeship', value: t('values.employmentStatus.apprenticeship') },
		{ key: 'Zero-hour', value: t('values.employmentStatus.zeroHour') },
		{ key: 'Self-employed', value: t('values.employmentStatus.selfEmployed') },
		{ key: 'Volunteer', value: t('values.employmentStatus.volunteer') },
		{ key: 'Seasonal', value: t('values.employmentStatus.seasonal') },
		{ key: 'Other', value: t('values.employmentStatus.other') },
	]
}
