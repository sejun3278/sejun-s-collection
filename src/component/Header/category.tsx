import * as React from 'react';

import { Link } from 'react-router-dom';
import catData from './cat_data.json';

interface CategoryProps {
    _clickCategory : Function,
    _dataSearch : Function
}

interface CategoryState {

}

class Category extends React.Component<CategoryProps, CategoryState> {
    public state = {

    };
  
    constructor(props: CategoryProps) {
      super(props);
    }

    public render() {
        const props : any = this.props;
        const cat_name : string = props.location.pathname

        return(
            <div id='category_div'>
                <div id='category_list_div'>
                    {catData.map( (el : any, key : number) => {

                        return(
                            <Link to={el.url} key={key}>
                                <div
                                    onClick={() => props._clickCategory(el.url)}
                                    id={cat_name === el.url ? "select_cat" : undefined}
                                >
                                    {el.name}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Category;
