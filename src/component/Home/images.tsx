import * as React from 'react';

interface ImagesProps {
    image_list : string,
    _toggleImageModal : Function
}

interface ImagesState {
    page_num : number,
    close_icon : string
}

class Images extends React.Component<ImagesProps, ImagesState> {
    public state = {
        page_num : 0,
        close_icon : "https://sejunscollection.s3.ap-northeast-2.amazonaws.com/source/close.png"
    };
  
    constructor(props: ImagesProps) {
      super(props);
    }

    componentDidMount() {
        let target : any = document.getElementsByClassName('ReactModal__Overlay')
        target = target[0];

        if(target.style) {
            target.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        }

        this.setState({
            'page_num' : 0
        })
    }

    public render() {
        const image_list = JSON.parse(this.props.image_list);

        return(
            <div id='images_div'>
                <div id='images_grid_div'>
                    <div> <h3> 이미지 모아보기 </h3> </div>
                    <div id='image_close_icon_div'> 
                        <img alt='' src={this.state.close_icon} id='close_icon' 
                             onClick={() => this.props._toggleImageModal(0, false)}
                        />
                    </div>
                </div>
                <div id='now_image_div'>
                    <img alt='' src={image_list[this.state.page_num]} />
                </div>

                <div id='image_list_div'>
                    {image_list.map( (el : string, key : number) => {
                        return(
                            <div className='image_list_divs' key={key}
                                 id={this.state.page_num === key ? "select_image" : undefined}
                                 style={{  }}
                            >
                                <img alt='' src={el} 
                                     onClick={() => this.setState({ 'page_num' : key })}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Images;
