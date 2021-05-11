import * as React from 'react';

import Header from './Header/index';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import HomeIdx from './Home/index';
import jQuery from './Home/jQuery';
import _React from './Home/react';

interface HomeProps {
}

interface HomeState {

}

class Home extends React.Component<HomeProps, HomeState> {
    public state = {

    };
  
    constructor(props: HomeProps) {
      super(props);
    }

    public render() {
        return(
            <div id='home_div'>
                <Header />

                <Switch>
                    <Route path='/' component={HomeIdx} />
                    {/* <Route path='/react' component={_React} />
                    <Route path='/jQuery' component={jQuery} /> */}
                    
                </Switch>
            </div>
        )
    }
}

export default Home;
