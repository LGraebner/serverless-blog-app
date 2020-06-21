import React, { Component } from 'react';
import axios from 'axios';
import './Overview.css';
import '../BlogList/BlogList.css'
import topImage from '../../gfx/wallpaper-1406531.jpg';
import BlogHeader from '../header/BlogHeader';
import BlogEntry from '../BlogEntry/BlogEntry';
import Footer from '../footer/Footer';

class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {blogList: []};
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    let res = await axios.get("https://6gpbo7h0j3.execute-api.eu-central-1.amazonaws.com/dev/blogs");
    let items = res.data.items;

    this.setState({ blogList: items });
    console.log(this.state.blogList);
  };

  render() {

    //const blogList = this.state.blogList.items;

    return (
      <div className="Overview">
        
        <BlogHeader title='Serverless Blog' subTitle='' topImage={topImage}/>
  
        <div className="content">
          <div className='blogList'>
          {this.state.blogList.map((item) => {
                return <BlogEntry title={item.title} text={item.previewText} imageUrl={item.articleImgUrl} link={'/blogentry/' +  item.blogId}/>
          })
        }
          
          </div>
        </div>
        <Footer  topImage={topImage}/>
      </div>
        
      
    );
  }
}

export default Overview;
