import * as React from 'react';
import Modal from 'react-modal';

import Images from './images';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};

interface HomeIndexProps {
    page : string,
    data_search : boolean,
    _dataSearch : Function
}

interface HomeIndexState {
    profile : string,
    move_icon : string,
    project_data : string,
    data_limit : number,
    start_data : number,
    filter_data : string,
    loading : boolean,
    able_scrolling : boolean,
    detail_info_number : number | null,
    image_modal : null | number,
    image_list : string
}

class HomeIndex extends React.Component<HomeIndexProps, HomeIndexState> {
    public state = {
        profile : "https://sejunscollection.s3.ap-northeast-2.amazonaws.com/source/20210420_233452+(1).jpg",
        move_icon : "https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../assets/preview/2017/png/iconmonstr-arrow-71.png&r=171&g=171&b=171",
        project_data : JSON.stringify([]),
        data_limit : 5,
        start_data : 0,
        filter_data : JSON.stringify([]),
        loading : false,
        able_scrolling : true,
        detail_info_number : null,
        image_modal : null,
        image_list : JSON.stringify([])
    };
  
    constructor(props: HomeIndexProps) {
      super(props);
    }

    componentDidMount() {
        // 초기 모든 데이터 가져오기
        this._getProjectData();

        // Y 축 스크롤 이동시 실행되는 함수 (무한 스크롤링 함수)
        window.addEventListener("scroll", this._scrolling);
    }

    componentDidUpdate() {
        // const projects = JSON.parse(this.state.project_data);

        if(this.props.data_search === false) {
            this._getProjectData();
        }
    }

    componentWillUnmount() {
        // 언마운트 될때에, 스크롤링 이벤트 제거
        window.removeEventListener("scroll", this._scrolling);
    }

    // 프로젝트 데이터 가져오기
    _getProjectData = () => {
        const props : any = this.props;
        const page = props.location.pathname;

        const data = require('../data.json');

        const save : any = {
            'search' : true,
            'start_data' : 0,
            'end_data' : this.state.data_limit,
            'filter_data' : JSON.stringify([]),
            'loading' : false,
            'able_scrolling' : true,
            'detail_info_number' : null
        }

        if(page !== '/') {
            const arr : any = [];

            // 제이쿼리 및 리액트 주소에 있을 경우
            data.forEach( (el : any) => {
                const page_name = page.slice(1, page.length)
                
                if(el.type === page_name) {
                    arr.push(el);
                }
            })
            save['project_data'] = JSON.stringify(arr.reverse());

        } else {
            save['project_data'] = JSON.stringify(data.reverse());
        }

        this.props._dataSearch(true);
        this.setState(save);

        window.setTimeout( () => {
            this._filterData(0);
        }, 200)
    }

    // 데이터 필터
    _filterData = (start_data : number) => {
        const { data_limit } = this.state;
        // const start = start_data === 0 ? 0 : start_data + data_limit;
        const end = ( start_data + 1 ) * data_limit;

        const dataList = JSON.parse(this.state.project_data);
        const filter_data = [];

        for(let i = 0; i < end; i++) {
            if(dataList[i] !== undefined) {
                filter_data.push(dataList[i])
            }
        }

        this.setState({ 
            'filter_data' : JSON.stringify(filter_data),
            'loading' : false,
            'start_data' : start_data
        })

        const extra = Math.trunc(dataList.length / data_limit);
        const scroll_able = start_data < extra;

        if(scroll_able === false) {
            this.setState({
                'able_scrolling' : false
            })
        }
    }

    // 스크롤링
    _scrolling = () => {
        const { able_scrolling, loading, start_data, data_limit } = this.state;
        const dataList = JSON.parse(this.state.project_data);

        if(able_scrolling === true) {
            // Y 축 스크롤바가 최하단에 위치할 경우 10개의 데이터를 추가로 가져옴
            const { innerHeight } = window;
            const { scrollHeight } = document.body;

            // 가져올 데이터가 남는지 확인
            const extra = Math.trunc(dataList.length / data_limit);
            const scroll_able = start_data < extra;

            // 중복 실행 방지
            if(loading === false && scroll_able === true) {
                const scrollTop = Math.round(document.documentElement.scrollTop) + innerHeight;

                if(scrollTop > scrollHeight - 80) {
                    this.setState({ 
                        'loading' : true
                    })

                    return window.setTimeout( () => {
                        this._filterData(start_data + 1);
                    }, 200)
                }
            }
        }
    }

    _clickDetailInfo = (num : number) => {
        const { detail_info_number } = this.state;

        if(detail_info_number !== num) {
            this.setState({ 'detail_info_number' : num })

        } else if(detail_info_number === num) {
            this.setState({ 'detail_info_number' : null })
        }
    }

    // 모달창 열기
    _toggleImageModal = (num : number, bool : boolean) => {
        const data_list = JSON.parse(this.state.filter_data);

        if(bool === true) {
            this.setState({
                "image_modal" : num,
                "image_list" : JSON.stringify(data_list[num].images)
            })

        } else if(bool === false) {
            this.setState({
                "image_modal" : null,
                "image_list" : JSON.stringify([])
            })
        }
    }

    public render() {
        const props : any = this.props;
        // const page = props.location.pathname;
        const page = props.page;

        const filter_data = JSON.parse(this.state.filter_data);

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
                        <img id='profile_image_div' alt=''
                             src={this.state.profile}
                            // style={{ 'backgroundImage' : `url(${this.state.profile})` }}
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

                    {/* <Modal
                        isOpen={this.state.image_modal !== null}
                        // onAfterOpen={afterOpenModal}
                        onRequestClose={() => this._toggleImageModal(0, false)}
                        style={customStyles}
                        contentLabel="Example Modal"
                    >
                        <Images
                            _toggleImageModal={this._toggleImageModal}
                            image_list={this.state.image_list}
                        />
                    </Modal> */}
                    
                    <div id='project_list_div'>
                        {filter_data.map( (el : any, key : number) => {
                            return(
                                <div className='project_info_div' key={key}
                                     style={ (filter_data.length - 1) === key ? { 'borderBottom' : 'none' } : undefined }
                                >   
                                    <div className='project_thumbnail_div'>
                                        <div className='project_thumbnail'
                                             onClick={() => this._toggleImageModal(key, true)}
                                        >
                                            <img alt='' src={el.thumb} />
                                        </div>

                                            {el.mobile === true
                                                ?  
                                                    <div className='project_option_div'>
                                                        반응형
                                                    </div>

                                                : undefined
                                            }
                                    </div>

                                    <div className='project_detail_info_div'>
                                        <div className='project_title_grid_div'>

                                            <div className='project_title_div'
                                                style={el.complate !== 100 ? { 'color' : '#ababab' } : undefined}
                                            > 
                                                <div className='project_keyword_div'>
                                                    {el.keyword[0]}
                                                </div>
                                                    {el.title} 
                                                    {el.complate !== 100
                                                        ? ' ( 미완성 )'

                                                        : undefined
                                                    }
                                            </div>

                                            <div className='project_move_icon_div'>
                                                <a target="_blank" href={el.url} >
                                                    <img alt='' src={this.state.move_icon} title='페이지 이동'/>
                                                </a>
                                            </div>
                                        </div>

                                        <div className='project_info_web_div'>
                                            <div className='project_category_and_date_grid_div'>
                                                <div className='project_category_div'>
                                                    카테고리　|　{el.type === 'react' ? 'React' : 'jQuery'}
                                                </div>

                                                <div className='project_date_div'>
                                                    {el.complate === 100 ? '개발 완료일' : '개발 시작일'}　|　
                                                    {el.date}
                                                </div>
                                            </div>

                                            <div className='project_comment_div' 
                                                 dangerouslySetInnerHTML={{ __html : el.comment }}
                                            />

                                            <div className='project_skill_stack_div'>
                                                사용 스택　|　
                                                {el.stack.map( (cu : any, key2 : number) => {
                                                    return(
                                                        <div key={key2} className='project_skill_divs'>
                                                            {cu}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>

                                        <div className='project_info_mobile_div'>
                                            <input className='toggle_detail_info_button' type='button' 
                                                //    value='▼ 상세 내용' 
                                                   value={this.state.detail_info_number === key ? '▲ 닫기' : '▼ 상세 내용'}
                                                   onClick={() => this._clickDetailInfo(key)}
                                            />

                                            {this.state.detail_info_number !== null
                                                ? this.state.detail_info_number === key 
                                                    ? <div id='project_mobile_detail_info_div'>
                                                        <div className='detail_grid_div'>
                                                            <div className='aRight'> 카테고리　|　</div>
                                                            <div> {el.type} </div>
                                                        </div>

                                                        <div className='detail_grid_div'>
                                                            <div className='aRight'>
                                                                {el.complate === 100
                                                                    ? '개발 완료일'

                                                                    : '개발 시작일'
                                                                }
                                                                　|　
                                                            </div>
                                                            <div> {el.date} </div>
                                                        </div>

                                                        <div id='detail_comment_div' 
                                                             dangerouslySetInnerHTML={{ __html : el.comment }}
                                                        />

                                                        <div className='detail_grid_div'>
                                                            <div> 사용 스택 </div>
                                                            <div> 　 </div>
                                                        </div>

                                                        <div id='detail_skill_divs'>
                                                            {el.stack.map( (cu : any, key2 : number) => {
                                                                return(
                                                                    <div key={key2} className='detail_stack_divs'>
                                                                        {cu}
                                                                    </div>
                                                                )
                                                            })}
                                                        </div>
                                                      </div>

                                                    : undefined
                                                : undefined
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {this.state.able_scrolling === false
                    ? <div id='scrolling_end'>
                        <h4> 모든 데이터 조회 완료</h4>
                      </div>

                    : undefined
                }
            </div>
        )
    }
}

export default HomeIndex;
