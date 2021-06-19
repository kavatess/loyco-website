import { DEFAULT_LANGUAGE } from 'app/app.constants';
import moment from 'moment';
const loyappsRest = 'loyapps-rest/v0';
// const oamServer = '/oam/server';
const identity = '/identity';
const homeRest = 'homerest/rest/v0';
const loyappsPage = '/loyapps/faces/page';
export const absenceNano = {
  nanoDonationURL: loyappsRest + '/NanoDonationSetupFoundTbl',
  nanoDonationPOSTJSON: {
    name: 'getNanoDonationFoundations',
  },
};
export const balanceDashboard = {
  balanceDashboardUrl: loyappsRest + '/BalanceTbl',
  balancePOSTJSON: {
    name: 'getCurrentUserBalances',
    parameters: [{ effectiveDate: moment().format('YYYY-MM-DD') }],
  },
  balanceDashboardSetUpUrl: loyappsRest + '/BalanceSetupTbl',
  balanceSetUpPOSTJSON: {
    name: 'checkCurrentUserHasBalanceSetup',
  },
};
export const absenceToBeValidated = {
  url: loyappsRest + '/AbsenceTaskListView',
  getNumberOfAbsencesToBeValidated: {
    name: 'getNumberOfTasksForCurrentUser',
  },
};
export const favorite = {
  favoriteWidgetsUrl: homeRest + '/UserProfileTbl/?onlyData=true&fields=FavoriteWidgets',
  updateFavoriteUrl: homeRest + '/v0/updateFavoriteWidgets',
  favoriteUpdatePOSTJSON: {
    name: 'updateFavoriteWidgets',
  },
};
export const nanoDonation = {
  nanoDonationEeSetupUrl: loyappsRest + '/NanoDonationEeSetupTbl',
  getNanoDonationSetupEE: {
    name: 'getLatestNanoDonationEeSetup',
  },
  nanoDonationListUrl: loyappsRest + '/PsNanoWidgetView',
  getNanoDonationList: {
    name: 'getNanoDonations',
  },
  nanoDonationSetupFoundURL: loyappsRest + '/NanoDonationSetupFoundTbl',
  getNanoDonationFoundations: {
    name: 'getNanoDonationFoundations',
  },
  nanoDonationSetupUrl: loyappsRest + '/NanoDonationSetupTbl',
  getNanoDonationSetupInfo: {
    name: 'getNanoDonationSetupInfo',
  },
};
export const teamAbsences = {
  url: loyappsRest + '/TeamEmployeesView',
  getTeamAbsences: {
    name: 'getTeamAbsences',
  },
};
export const nextAbsences = {
  nextAbsencesServiceUrl: loyappsRest + '/AbsenceTbl',
  getNextAbsences: {
    name: 'getNextAbsences',
  },
};
export const payslips = {
  url: loyappsRest + '/PayslipsTbl',
  getPayslips: {
    name: 'getPayslips',
  },
};
export const user = {
  userProfileTblUrl: homeRest + '/UserProfileTbl',
  userPOSTJSON: {
    name: 'getUserDetails',
  },
  employeeID: {
    name: 'getUserEmployeeId',
  },
  userLang: {
    name: 'getUserLanguage',
    parameters: [{ language: DEFAULT_LANGUAGE }],
  },
  availableApplications: {
    name: 'getAvailableApplications',
  },
  moduleSetupUrl: loyappsRest + '/ModuleSetupTbl',
  moduleSetup: {
    name: 'getActivatedModules',
  },
};
export const timesheetValidation = {
  url: loyappsRest + '/TimesheetTbl',
  getNumberOfTasksForCurrentUser: {
    name: 'getNumberOfTasksForCurrentUser',
  },
};
export const absence = {
  url: loyappsRest + '/AbsenceTbl?onlyData=true&fields=',
};
export const absenceReason = {
  url: loyappsRest + '/AbsenceSetupWithDetailsView',
  getAbsenceReasons: {
    name: 'getAbsenceReasons',
  },
};
export class Result {
  result: string;
  constructor() {
    this.result = '';
  }
}
export const logoutURL = identity + '/adfAuthentication?logout=true&end_url=https%3A%2F%2Fwww.loyco.ch';
export const loyappsEmployeeAbsence = loyappsPage + '?id=employee_absence&Loyco-home=1';
export const loyappsManager = loyappsPage + '?id=manager&Loyco-home=1';
export const payslipDownload = '/loyapps/downloadPayslips?fileName=';
