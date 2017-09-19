
import React from 'react'
import { Route, IndexRoute } from 'react-router'

import Notifications from './Containers/Notifications'

export default () => {
  const routes = (
    <Route path="">
      <Route path="notifications" omponent={Notifications} />
      <Route path="notifications/:pageNumber" omponent={Notifications} />
    </Route>
  );
  return routes;
};
