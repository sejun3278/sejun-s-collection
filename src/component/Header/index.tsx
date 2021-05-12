import * as React from 'react';
import Category from './category';

import { Route, Link } from 'react-router-dom';

interface HeaderProps {
    _changePage : Function,
    _dataSearch : Function,
    page : string
}

interface HeaderState {

}

class Header extends React.Component<HeaderProps, HeaderState> {
    public state = {

    };
  
    constructor(props: HeaderProps) {
      super(props);
    }

    _clickCategory : Function = (name : string) => {
        if(this.props.page !== name) {
            this.props._changePage(name)
            this.props._dataSearch(false);
        }
    }

    public render() {
        return(
            <div id='header_div'>
                <div id='header_title_div'>
                    <Link to='/'> 
                        <h2 onClick={() => this._clickCategory('/')}> Sejun's Collection </h2> 
                    </Link>
                </div>

                <Route path='/' render={(props) => <Category
                    _clickCategory={this._clickCategory}
                    _dataSearch={this.props._dataSearch}
                    {...props}
                    />}
                />
            </div>
        )
    }
}

export default Header;
