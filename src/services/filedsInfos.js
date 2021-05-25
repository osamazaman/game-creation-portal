import listCompanies from '../services/listCompanies'
import filterLists from '../services/filterList'

export default {
    loaded: true,
    loaderContent: "Loading",
    isAlert: false,
    alertText: "Failed",
    alertType: "error",
    filterList: filterLists,
    listofCompanies: listCompanies,
    companiesFilter: listCompanies,
    registrationCheckBox: false,
    bgImage:'transparent',
    userName: '',
    tower:[],
    login: false,
    currentStep : 'adminLogin',
    adminLogin: {
        email: '',
        password: '',
        authToken: ''
    },
    adminEmail:'' ,
    adminPassword:'',
    company: {
        name: '',
        website: '',
        industryType: '',
        bio: ''
    },
    companyId:'',
    companyName: '',
    companyWebsite: '',
    companyIndustryType: '',
    companyBio:'',
    user: {
        email: '',
        password: '',
        name: '',
        firstname: '',
        lastname: '',
        country: '',
        address: '',
        phone: '',
        dob: '',
        type: ''
    },
    userEmail: '',
    userPassword: '',
    userFirstname: '',
    userLastname: '',
    userCountry: '',
    userAddress: '',
    userPhone: '',
    userDob: '',
    userUserType: '',
    userName: '',
    client: {
        name: '',
        email: '',
        phone: '',
        bio: ''
    },
    clientName: '',
    clientEmail: '',
    campaign: {
        name: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: '',
        clientId: ''
    },
    campaignStartupComponentId: '',
    campaignName: '',
    campaignTitle: '',
    campaignDescription: '',
    campaignStartDate: '',
    campaignEndDate: '',
    campaignActive: '',
    campaignClientId: '',
    campaignConfig: {
        language: 'configLanguage'
    },
    registrationFields: {
        checkedList: ['First, Last Name','Email address','University'], 
        indeterminate: false,
        checkAll: true,
    },
    checkedList: [    
        'email',
        'password',
        'userType',
        'status',
        'name',
        'gender',
        'cnic',
        'fatherName',
        'phone'
    ],
    indeterminate: false,
    checkAll: true,
    plainOptions : [
        'email',
        'name',
        'gender',
        'cnic',
        'fatherName',
        'phone',
        'city',
        'region',
        'country',
        'address',
        'dob',
        'bio',
        'resume',
        'cityOther',
        'countryOther',
        'areaOfInterest1',
        'areaOfInterest2',
        'preferredCity',
        'currentlyEmployed',
        'currentEmployerName',
        'healthDisability',
        'nationality',
        'cnicIssuanceDate',
        'currentCountry'

    ],
    acadmic: [ 'gradingSystem',
    'gradingValue',
    'university',
    'otherUniversity',
    'graduationDate',
    'qualification',
    'degreeDuration',
    'specialization']

}