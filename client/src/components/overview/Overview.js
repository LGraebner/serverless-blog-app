import React, { Component } from 'react';
import axios from 'axios';
import './Overview.css';
import '../BlogList/BlogList.css'
import { apiEndpoint } from '../../config'
import topImage from '../../gfx/wallpaper-1406531.jpg';
import BlogHeader from '../header/BlogHeader';
import BlogEntry from '../BlogEntry/BlogEntry';
import Footer from '../footer/Footer';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

class Overview extends Component {

  constructor(props) {
    super(props);
    this.state = {blogList: []};
    this.idToken = localStorage.getItem('idToken')
    console.log(this.idToken)
  }

  componentDidMount() {
    this.getBlogs();
  }

  getBlogs = async () => {
    let res = await axios.get(`${apiEndpoint}/blogs`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.idToken}`
      }
    });
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
                    <IconButton 
                        aria-label="edit"
                        component={Link} 
                        to='/admin'
                        >
                      <SettingsIcon />
                    </IconButton>
                    <IconButton 
                        aria-label="edit"
                        component={Link} 
                        to='/login'
                        >
                      <LogoutIcon />
                    </IconButton>
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
