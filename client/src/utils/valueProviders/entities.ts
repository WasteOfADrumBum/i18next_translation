export const getEntityTypes = (t: (key: string) => string) => {
	return [
		{ key: 'Person', value: t('values.entities.entityTypes.person') },
		{ key: 'Organization', value: t('values.entities.entityTypes.organization') },
		{ key: 'Other', value: t('values.entities.entityTypes.other') },
	]
}

export const getBusinessLegalEntityTypes = (t: (key: string) => string) => {
	return [
		{ key: 'Sole Proprietorship', value: t('values.entities.businessLegalEntityTypes.soleProprietorship') },
		{ key: 'Partnership', value: t('values.entities.businessLegalEntityTypes.partnership') },
		{ key: 'Limited Liability Company (LLC)', value: t('values.entities.businessLegalEntityTypes.llc') },
		{ key: 'Corporation', value: t('values.entities.businessLegalEntityTypes.corporation') },
		{ key: 'Nonprofit Organization', value: t('values.entities.businessLegalEntityTypes.nonprofitOrganization') },
	]
}

export const getBusinessLegalStatuses = (t: (key: string) => string) => {
	return [
		{ key: 'Active', value: t('values.entities.businessLegalStatus.active') },
		{ key: 'Inactive', value: t('values.entities.businessLegalStatus.inactive') },
		{ key: 'Dissolved', value: t('values.entities.businessLegalStatus.dissolved') },
		{ key: 'Pending', value: t('values.entities.businessLegalStatus.pending') },
		{ key: 'Under Investigation', value: t('values.entities.businessLegalStatus.underInvestigation') },
	]
}
