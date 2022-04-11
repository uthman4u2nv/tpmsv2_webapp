// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  listbankurl:'http://localhost:8585/banks/',
  updatebankurl:'http://localhost:8585/banks/UpdateBank',
  addbankurl:'http://localhost:8585/banks/AddBank',
  searchbankurl:'http://localhost:8585/banks/search',
  listerrorurl:'http://localhost:8585/error/',
  updateerrorurl:'http://localhost:8585/error/UpdateErrorCode',
  adderrorcodeurl:'http://localhost:8585/error/AddErrorCode',
  searcherrorcodeurl:'http://localhost:8585/error/search',
  checkcodeurl:'http://localhost:8585/banks/CheckCode',
  //dashboardurl:'http://localhost:8585/dashboard',
  dashboardurl:'http://localhost:61681/api/dashboard',
  searchdashboardurl:'http://localhost:8585/dashboard/search',
  usersurl:'http://localhost:8585/users',
  rolesurl:'http://localhost:8585/users/roles',
  updateuserprofileurl:'http://localhost:8585/users/UpdateUser',
  addnewuserurl:'http://localhost:8585/users/AddUser',
  searchuserurl:'http://localhost:8585/users/search',
  resetuserurl:'http://localhost:8585/users/ResetPassword',
  colorcodeurl:'http://localhost:8585/display/',
  updatecoloururl:'http://localhost:8585/display/UpdateDisplaySettings',
  addcoloururl:'http://localhost:8585/display/addNewDisplaySettings',
  dashboardanalytics:'http://localhost:8585/dashboard/analytics',
  authurl:'http://localhost:8585/auth/login',
  updateProfileurl:'http://localhost:8585/users/UpdateProfile',
  geteffreporturl:'https://localhost:44349/api/Report',

  socketUrl:'http://localhost:8586'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
