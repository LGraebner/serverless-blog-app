import React, { Component } from 'react';
import './BlogText.css';

class BlogText extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        return(
            <div className='blogText'>
            <div className="blogText-frame blogText-rcorners" >
                <div className="blogText-publishDate">{this.props.blogData.createdAt}</div>
                <div className="blogText-header">{this.props.blogData.title}</div>
                <hr></hr>
                <div className="blogText-content">
                    {this.props.blogData.previewText}
                    <br></br>
                    {this.props.blogData.articleText}
                </div>
            </div>
            </div>
        );
    }
}

export default BlogText;