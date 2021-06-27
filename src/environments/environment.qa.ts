// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  aws_region: "ap-southeast-1",
  cognito_upool_id: "ap-southeast-1_EtzeEuvzM",
  cognito_user_pool_web_wlient_id: "5u17pkmj2b94ntndl171ku1dp7",
  commodities_api_base_url: "https://api.test.epraman.com/api",
  cognito_hosted_ui_domain: "auth.test.epraman.com",
  self_host: "https://test.epraman.com"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
