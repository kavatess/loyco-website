// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = process.env.VERSION;
export const DEBUG_INFO_ENABLED = Boolean(process.env.DEBUG_INFO_ENABLED);
export const SERVER_API_URL = DEBUG_INFO_ENABLED ? window.location.origin.replace(':9000', ':7101') : window.location.origin;
export const BUILD_TIMESTAMP = process.env.BUILD_TIMESTAMP;
export const CLIENT_URL = process.env.CLIENT_URL;
export const CONTEXT_PATH = '/homeangular/';
export const enum ROLES {
  LOYAPPS_EMPLOYEE = 'LOYAPPS_EMPLOYEE',
  LOYAPPS_MANAGER = 'LOYAPPS_MANAGER',
  XX_GP_Employee = 'XX GP Employee',
  LOYAPPS_USER = 'LOYAPPS_USER',
}
export const enum MODULES {
  PLAN_ABSENCE_MODULE = 1,
  TIMESHEET_MODULE = 4,
  NANODONATION_MODULE = 7,
}
export const enum ROUND_DOWN_MY_SALARY {
  YES = '1',
  NO = '0',
}
export const enum ABSENCE_REASONS {
  HOLIDAY = 1,
}
export const enum SCREENS {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}
export const enum DAY_TIMES {
  MORNING = 1,
  MIDDAY = 2,
  EVENING = 3,
}
export const enum ROUNDING_TYPE {
  NOT_ROUND = '1',
  ROUND_LOWER_FRANC = '2',
  ROUND_LOWER_TEN_FRANCS = '3',
}
export const enum SHARE_EE_INFORMATION {
  YES = '1',
  NO = '0',
}
export const DEFAULT_LANGUAGE = 'en';
export const enum ROUTES {
  ALL = 'all',
  DASHBOARD = 'dashboard',
  ACTIONS = 'actions',
  APPLICATIONS = 'applications',
  FAVORITES = 'favorites',
  LOGIN = 'login',
}
export const MIN_MEDIUM_WIDTH = 768;
export const MIN_LARGE_WIDTH = 1024;
export const DATE_FORMAT = 'DD/MM/YYYY';
export const EMPTY_STRING = '';
export const enum WIDGETS {
  BALANCE = 'balance',
  NEXT_ABSENCES_WIDGET = 'myNextAbsences',
  TEAM_ABSENCES = 'team-absences',
  TIMESHEET_VALIDATION_WIDGET = 'timesheet-validation',
  ABSENCES_TO_BE_VALIDATED = 'absences-to-be-validated',
  PAYSLIPS = 'payslips',
  NANODONATIONS = 'nano-donation',
  NANO_DONATION_FORM = 'nano-donation-ee-form',
}
