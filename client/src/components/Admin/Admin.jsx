import React, { Component } from 'react';
import axios from 'axios';
import { Auth} from '../../auth/Auth'

class Admin extends Component {

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
    
        console.log(this.state.blogList.length)
      };

      render() {

        //const blogList = this.state.blogList.items;
    
        return (
          <div className="Overview">
            
            <BlogHeader title='Serverless Blog' subTitle='' topImage={topImage}/>
      
            <div className="content">
              <div className='blogList'>
              {this.state.blogList.map((item) => {
                    return <BlogEntry title={item.title} text={item.previewText} link={'/blogentry/' +  item.blogId}/>
              })
            }
              
              </div>
            </div>
            <Footer  topImage={topImage}/>
          </div>
            
          
        );
      }
}
    
export default Admin;