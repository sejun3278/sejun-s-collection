import * as React from 'react';

import Header from './Header/index';
import { Route, Switch } from 'react-router-dom';

import HomeIdx from './Home/index';
// import jQuery from './Home/jQuery';
// import _React from './Home/react';

interface HomeProps {
}

interface HomeState {
    page : string,
    data_search : boolean
}

class Home extends React.Component<HomeProps, HomeState> {
    public state = {
        page : "",
        data_search : false
    };
  
    constructor(props: HomeProps) {
      super(props);
    }

    _changePage : Function = (page : string) => {
        this.setState({
            'page' : page
        });
    }

    _dataSearch : Function = ( bool : boolean ) => {
        this.setState({
            'data_search' : bool
        })
    }

    public render() {
        return(
            <div id='home_div'>
                <Header 
                    page={this.state.page}
                    _changePage={this._changePage}
                    _dataSearch={this._dataSearch}
                />

                <Switch>
                    <Route path='/' render={(props) => <HomeIdx
                           page={this.state.page} 
                           data_search={this.state.data_search}
                           _dataSearch={this._dataSearch}
                        {...props}
                        />}
                    />
                </Switch>
            </div>
        )
    }
}

export default Home;
