import * as apiTesterActions from './apiTesterActions';
import * as loginActions from './loginActions';
import * as updateOrderActions from './updateOrderActions';
import * as fetchActiveOrdersActions from './fetchActiveOrdersActions';
import * as serviceActions from './serviceActions';
import * as fetchInStoreOrdersActions from './fetchInStoreOrdersActions';

const actions = {
  ...apiTesterActions,
  ...loginActions,
  ...updateOrderActions,
  ...fetchActiveOrdersActions,
  ...serviceActions,
  ...fetchInStoreOrdersActions,
};

export { actions };
