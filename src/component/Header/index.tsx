import * as React from 'react';
import Category from './category';

import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

interface HeaderProps {
}

interface HeaderState {

}

class Header extends React.Component<HeaderProps, HeaderState> {
    public state = {

    };
  
    constructor(props: HeaderProps) {
      super(props);
    }

    public render() {
        return(
            <div id='header_div'>
                <div id='header_title_div'>
                    <Link to='/'> <h2> Sejun's Collection </h2> </Link>
                </div>

                <Route path='/' component={Category} />
            </div>
        )
    }
}

export default Header;
