import React, { Component } from 'react';
import axios from 'axios';
import BlogHeader from '../header/BlogHeader';
import Footer from '../footer/Footer';
import topImage from '../../gfx/wallpaper-1406531.jpg';
import BlogText from './BlogText';
import { apiEndpoint } from '../../config'

class Article extends Component {
    constructor(props) {
        super(props);
        const blogId = this.props.location.pathname.substring(this.props.location.pathname.lastIndexOf('/') + 1)
        
        this.state = { blogId : blogId}  
        console.log(this.state.blogId)
    }

    componentDidMount() {
        this.getBlog();
    }

    getBlog = async () => {
        let res = await axios.get(`${apiEndpoint}/blogs/${this.state.blogId}`);
        let blogData= res.data;
    
        this.setState({ blogData: blogData });
        console.log(this.state.blogData);
      };

    render() {
        return (
            <div className="Overview">
                <BlogHeader title='Serverless Blog' subTitle='' topImage={topImage}/>

                <div className="content">
                    <div className='blogList'>
                        {
                            this.state.blogData ?
                        <BlogText blogData={this.state.blogData}/>
                        : ''
                        }
                    </div>
                </div>
                <Footer  topImage={topImage}/>
            </div>
        );
    }
}

export default Article;
