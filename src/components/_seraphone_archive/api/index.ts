export { ApiError } from './core/errors';
export { request } from './core/request';
export { getToken, setToken, removeToken } from './core/token';
export { withAbort } from './core/abort';

// Modules
export * from './modules/auth';
export * from './modules/users';
export * from './modules/telephony';
export * from './modules/businessSettings';
export * from './modules/conversations';
export * from './modules/businessInfo';
export * from './modules/subscriptions';
export * from './modules/personalSettings';
export * from './modules/integrations';
export * from './modules/analytics';
export * from './modules/callerProfiles';
export * from './modules/routing';
export * from './modules/reports';
export * from './modules/kg';
export * from './modules/actionItems.ts';
//export * from './modules/oncall';


import * as auth from './modules/auth';
import * as telephony from './modules/telephony';
import * as businessSettings from './modules/businessSettings';
import * as personalSettings from './modules/personalSettings';
import * as integrations from './modules/integrations';
import * as analytics from './modules/analytics';
import * as callerProfiles from './modules/callerProfiles';
import * as routing from './modules/routing';
import * as reports from './modules/reports';
import * as oncall from './modules/oncall';
import * as subscriptions from './modules/subscriptions';
import * as businessInfo from './modules/businessInfo';
import * as users from './modules/users';
import * as kg from './modules/kg';
import * as actionItems from './modules/actionItems';

const api = {
  auth,
  telephony,
  businessSettings,
  personalSettings,
  integrations,
  analytics,
  callerProfiles,
  routing,
  reports,
  oncall,
  subscriptions,
  businessInfo,
  users,
    kg,
    actionItems
};

export default api;