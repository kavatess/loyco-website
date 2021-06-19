export function formatString(str: string, replacements: any): string {
  return str.replace(
    /{(\w+)}/g,
    (placeholderWithDelimiters, placeholderWithoutDelimiters) => replacements[placeholderWithoutDelimiters] || placeholderWithDelimiters
  );
}

export function removeAttributes(obj: any, keysToRemove: any) {
  let result: any = null;
  if (!obj) return result;

  result = { ...obj };
  keysToRemove?.forEach((key: any) => {
    delete result[key];
    if (!Object.keys(result).length) result = null;
  });
  return result;
}

const applicationMap = {
  absences: {
    url: '/loyapps/?Loyco-home=1',
  },
  analytics: {
    url: '/analytics',
  },
  activities: {
    url: '/activities/?Loyco-home=1',
  },
  payslips: {
    url:
      '/psc/hcm92prd/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_AGSTARTPAGE_NUI.GBL?CONTEXTIDPARAMS=TEMPLATE_ID%3APTPPNAVCOL&scname=ADMN_MY_PAY_DOCUMENTS&PanelCollapsible=Y&PTPPB_GROUPLET_ID=MY_PAY_DOCUMENTS&CRefName=ADMN_NAVCOLL_1&languageCd={language}',
  },
  psft_employee: {
    url: '/psc/hcm92prd/EMPLOYEE/HRMS/c/EL_EMPLOYEE_FL.HR_EE_ADDR_FL.GBL?XX_ROLE=EE&languageCd={language}',
  },
  psft_manager: {
    url: '/psc/hcm92prd/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL?XX_ROLE=MGR&languageCd={language}',
  },
  psft_hr: {
    url: '/psc/hcm92prd/EMPLOYEE/HRMS/c/NUI_FRAMEWORK.PT_LANDINGPAGE.GBL?XX_ROLE=HR&languageCd={language}',
  },
  identity_admin: {
    url: '/identity/faces/adminresetpwd',
  },
  loyins: {
    url: '/loyins/?Loyco-home=1',
  },
  mf: {
    url: '/mfiles',
  },
  finance: {
    url: '/finance',
  },
  fleet: {
    url: '/loyapps/faces/fleetApplication?Loyco-home=1',
  },
  hra: {
    url: '/loyapps/faces/hraApplication?Loyco-home=1',
  },
  dropfile: {
    url: '/dropfile',
  },
  dropfile_deloitte: {
    url: '/deloitte',
  },
};
export function getApplicationURL(appKey: string, languageIso2: string): string {
  let language = languageIso2.toLowerCase();
  if (language === 'fr') language = 'FRA';
  else if (language === 'de') language = 'GER';
  else language = 'ENG';
  return formatString(applicationMap[appKey].url, { language });
}
