export const getMethodsOfReceipt = (t: (key: string) => string) => {
	return [
		{ key: 'Phone', value: t('values.methodsOfReceipt.phone') },
		{ key: 'Email', value: t('values.methodsOfReceipt.email') },
		{ key: 'Mail', value: t('values.methodsOfReceipt.mail') },
		{ key: 'Fax', value: t('values.methodsOfReceipt.fax') },
		{ key: 'In-person', value: t('values.methodsOfReceipt.inPerson') },
		{ key: 'Text message', value: t('values.methodsOfReceipt.textMessage') },
		{ key: 'Online portal', value: t('values.methodsOfReceipt.onlinePortal') },
		{ key: 'Mobile app notification', value: t('values.methodsOfReceipt.mobileAppNotification') },
		{ key: 'Courier delivery', value: t('values.methodsOfReceipt.courierDelivery') },
		{ key: 'Video call', value: t('values.methodsOfReceipt.videoCall') },
	]
}
