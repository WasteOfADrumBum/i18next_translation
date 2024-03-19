export interface EntityFormData {
	_id?: string
	parentId: string | null
	parentName: string
	type: string
	personNameFirst: string
	personNameMiddle?: string | null
	personNameLast: string
	personNameSuffix?: string | null
	personDob: Date
	personAge?: string | null
	personNativeLanguage?: string | null
	personIdentificationSsn?: string | null
	personIdentificationPassportNumber?: string | null
	personIdentificationPassportCountry?: string | null
	personIdentificationDriverLicenseNumber?: string | null
	personIdentificationDriverLicenseState?: string | null
	personIdentificationNationalIdNumber?: string | null
	personIdentificationVisaType?: string | null
	personIdentificationVisaExpiryDate?: Date
	personIdentificationIsLegalResident?: boolean | null
	personIdentificationIllegalStatusDescription?: string | null
	personEmploymentJobTitle?: string | null
	personEmploymentDepartment?: string | null
	personEmploymentEmployeeId?: string | null
	personEmploymentHireDate?: Date
	personEmploymentEmploymentStatus?: string | null
	organizationContactName: string
	organizationLegalLegalName: string
	organizationLegalLegalEntityType?: string | null
	organizationLegalLegalStatus?: string | null
	organizationLegalIncorporationDate?: Date
	organizationLegalBusinessRegistrationNumber?: string | null
	contactPhone: string
	contactEmail: string
	contactSocialMedia?: string | null
	addressAddress: string
	addressCity: string
	addressState: string
	addressZip: number
	addressCounty?: string | null
	addressCountry: string
}
