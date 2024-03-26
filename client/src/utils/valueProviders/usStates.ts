import { useTranslation } from 'react-i18next'

export const getStates = () => {
	const { t } = useTranslation()

	return [
		{ key: 'Alabama', value: t('values.states.alabama') },
		{ key: 'Alaska', value: t('values.states.alaska') },
		{ key: 'Arizona', value: t('values.states.arizona') },
		{ key: 'Arkansas', value: t('values.states.arkansas') },
		{ key: 'California', value: t('values.states.california') },
		{ key: 'Colorado', value: t('values.states.colorado') },
		{ key: 'Connecticut', value: t('values.states.connecticut') },
		{ key: 'Delaware', value: t('values.states.delaware') },
		{ key: 'Florida', value: t('values.states.florida') },
		{ key: 'Georgia', value: t('values.states.georgia') },
		{ key: 'Hawaii', value: t('values.states.hawaii') },
		{ key: 'Idaho', value: t('values.states.idaho') },
		{ key: 'Illinois', value: t('values.states.illinois') },
		{ key: 'Indiana', value: t('values.states.indiana') },
		{ key: 'Iowa', value: t('values.states.iowa') },
		{ key: 'Kansas', value: t('values.states.kansas') },
		{ key: 'Kentucky', value: t('values.states.kentucky') },
		{ key: 'Louisiana', value: t('values.states.louisiana') },
		{ key: 'Maine', value: t('values.states.maine') },
		{ key: 'Maryland', value: t('values.states.maryland') },
		{ key: 'Massachusetts', value: t('values.states.massachusetts') },
		{ key: 'Michigan', value: t('values.states.michigan') },
		{ key: 'Minnesota', value: t('values.states.minnesota') },
		{ key: 'Mississippi', value: t('values.states.mississippi') },
		{ key: 'Missouri', value: t('values.states.missouri') },
		{ key: 'Montana', value: t('values.states.montana') },
		{ key: 'Nebraska', value: t('values.states.nebraska') },
		{ key: 'Nevada', value: t('values.states.nevada') },
		{ key: 'New Hampshire', value: t('values.states.newHampshire') },
		{ key: 'New Jersey', value: t('values.states.newJersey') },
		{ key: 'New Mexico', value: t('values.states.newMexico') },
		{ key: 'New York', value: t('values.states.newYork') },
		{ key: 'North Carolina', value: t('values.states.northCarolina') },
		{ key: 'North Dakota', value: t('values.states.northDakota') },
		{ key: 'Ohio', value: t('values.states.ohio') },
		{ key: 'Oklahoma', value: t('values.states.oklahoma') },
		{ key: 'Oregon', value: t('values.states.oregon') },
		{ key: 'Pennsylvania', value: t('values.states.pennsylvania') },
		{ key: 'Rhode Island', value: t('values.states.rhodeIsland') },
		{ key: 'South Carolina', value: t('values.states.southCarolina') },
		{ key: 'South Dakota', value: t('values.states.southDakota') },
		{ key: 'Tennessee', value: t('values.states.tennessee') },
		{ key: 'Texas', value: t('values.states.texas') },
		{ key: 'Utah', value: t('values.states.utah') },
		{ key: 'Vermont', value: t('values.states.vermont') },
		{ key: 'Virginia', value: t('values.states.virginia') },
		{ key: 'Washington', value: t('values.states.washington') },
		{ key: 'West Virginia', value: t('values.states.westVirginia') },
		{ key: 'Wisconsin', value: t('values.states.wisconsin') },
		{ key: 'Wyoming', value: t('values.states.wyoming') },
	]
}
