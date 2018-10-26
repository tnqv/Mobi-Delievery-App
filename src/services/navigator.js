import { NavigationActions,StackActions } from 'react-navigation';

let _navigator;


function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      type: NavigationActions.NAVIGATE,
      routeName,
      params,
    })
  );
}

function goBackToMainTabBar(params){
  Promise.all([
    _navigator.dispatch(
      StackActions.reset({
          index: 0,
          // key: keyParams,
          actions: [
            NavigationActions.navigate({
              routeName: params,
            }),
          ]
      })
    )
  ]).then(() => {})
  .catch(e => console.log(e));
}

function reset(routeName,tabRoute,params) {
    _navigator.dispatch(
        StackActions.reset({
          // key: 'MainTabBar',
          index: 0,
          actions: [
                  NavigationActions.navigate({
                      type: NavigationActions.NAVIGATE,
                      routeName,
                      params,
                  }),
                //   NavigationActions.navigate({
                //     type: NavigationActions.NAVIGATE,
                //     tabRoute,
                //     params,
                // })

          ]
        })
    );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  reset,
  goBackToMainTabBar,
};