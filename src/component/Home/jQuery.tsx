import * as React from 'react';

interface jQueryProps {
}

interface jQueryState {

}

class jQuery extends React.Component<jQueryProps, jQueryState> {
    public state = {

    };
  
    constructor(props: jQueryProps) {
      super(props);
    }

    public render() {
        return(
            <div id='jQuery_div'>
                jQuery
            </div>
        )
    }
}

export default jQuery;
