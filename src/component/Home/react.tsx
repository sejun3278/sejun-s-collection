import * as React from 'react';

interface reactProps {
}

interface reactState {

}

class react extends React.Component<reactProps, reactState> {
    public state = {

    };
  
    constructor(props: reactProps) {
      super(props);
    }

    public render() {
        return(
            <div id='react_div'>
                react
            </div>
        )
    }
}

export default react;
