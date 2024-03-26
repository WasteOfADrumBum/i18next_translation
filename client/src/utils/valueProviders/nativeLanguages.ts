import { useTranslation } from 'react-i18next'

export const getNativeLanguages = () => {
	const { t } = useTranslation()

	return [
		{ key: 'English', value: t('values.nativeLanguages.english') },
		{ key: 'Mandarin Chinese', value: t('values.nativeLanguages.mandarinChinese') },
		{ key: 'Spanish', value: t('values.nativeLanguages.spanish') },
		{ key: 'Hindi', value: t('values.nativeLanguages.hindi') },
		{ key: 'French', value: t('values.nativeLanguages.french') },
		{ key: 'Standard Arabic', value: t('values.nativeLanguages.standardArabic') },
		{ key: 'Bengali', value: t('values.nativeLanguages.bengali') },
		{ key: 'Russian', value: t('values.nativeLanguages.russian') },
		{ key: 'Portuguese', value: t('values.nativeLanguages.portuguese') },
		{ key: 'Urdu', value: t('values.nativeLanguages.urdu') },
		{ key: 'Indonesian', value: t('values.nativeLanguages.indonesian') },
		{ key: 'German', value: t('values.nativeLanguages.german') },
		{ key: 'Japanese', value: t('values.nativeLanguages.japanese') },
		{ key: 'Swahili', value: t('values.nativeLanguages.swahili') },
		{ key: 'Marathi', value: t('values.nativeLanguages.marathi') },
		{ key: 'Telugu', value: t('values.nativeLanguages.telugu') },
		{ key: 'Turkish', value: t('values.nativeLanguages.turkish') },
		{ key: 'Tamil', value: t('values.nativeLanguages.tamil') },
		{ key: 'Vietnamese', value: t('values.nativeLanguages.vietnamese') },
		{ key: 'Korean', value: t('values.nativeLanguages.korean') },
		{ key: 'Other', value: t('values.nativeLanguages.other') },
	]
}
