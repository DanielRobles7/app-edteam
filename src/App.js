import React from 'react';
import { Route, Switch } from 'react-router-dom'

import PostListContainer from './component/posts/containers/PostListContainer'
import Navbar from './component/header/Navbar'

const App = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <Switch>
        <Route exact path="/" component={PostListContainer} />
      </Switch>
    </div>
  );
}

export default App;
