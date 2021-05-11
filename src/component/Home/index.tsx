import * as React from 'react';

interface HomeIndexProps {
}

interface HomeIndexState {
    profile : string
}

class HomeIndex extends React.Component<HomeIndexProps, HomeIndexState> {
    public state = {
        profile : "https://sejunscollection.s3.ap-northeast-2.amazonaws.com/source/20210420_233452+(1).jpg"
    };
  
    constructor(props: HomeIndexProps) {
      super(props);
    }

    public render() {
        const props : any = this.props;
        const page = props.location.pathname;

        let filter = ' ( jQuery / React ) ';
        if(page === '/jQuery') {
            filter = ' ( jQuery ) ';
            
        } else if(page === '/react') {
            filter = ' ( React ) ';
        }

        return(
            <div id='home_idx_div'>
                <div id='my_profile_div' className='index_div'>
                    <h4> 개발자 소개 </h4>

                    <div id='my_profile_info'>
                        <div id='profile_image_div'
                            style={{ 'backgroundImage' : `url(${this.state.profile})` }}
                        />
                        <div id='developer_info_div'>
                            <div className='info_grid_div'> 
                                <div> <b> 이름 </b> </div>
                                <div> 김세준 </div>
                            </div>

                            <div className='info_grid_div'> 
                                <div> <b> 지역 </b> </div>
                                <div> 경기도 광명시 </div>
                            </div>

                            <div className='info_grid_div'
                                 style={{ 'borderBottom' : 'none' }}
                            > 
                                <div> <b> 개발 언어 </b> </div>
                                <div> 
                                    <div> 
                                        <div className='gray'> <b> - Front </b> </div>
                                        jQuery, React (Redux), TypeScript, SCSS 
                                    </div> 

                                    <div> 
                                        <div className='gray'> <b> - Back </b> </div>
                                        NodeJS (Express), PHP, MySQL 
                                    </div>    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id='my_project_info' className='index_div'>
                    <h4> 진행 프로젝트　{filter} </h4>
                    
                </div>
            </div>
        )
    }
}

export default HomeIndex;
