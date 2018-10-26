import * as apiTesterActions from './apiTesterActions';
import * as loginActions from './loginActions';

const actions = {
  ...apiTesterActions,
  ...loginActions,
};

export { actions };
