import * as apiTesterActions from './apiTesterActions';
import * as loginActions from './loginActions';
import * as updateOrderActions from './updateOrderActions';
import * as fetchActiveOrdersActions from './fetchActiveOrdersActions';

const actions = {
  ...apiTesterActions,
  ...loginActions,
  ...updateOrderActions,
  ...fetchActiveOrdersActions,
};

export { actions };
