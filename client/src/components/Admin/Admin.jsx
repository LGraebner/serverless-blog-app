import React, { Component } from 'react';
import axios from 'axios';
import { Auth} from '../../auth/Auth'
import './Admin.css'
import {apiEndpoint} from '../../config'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ListIcon from '@material-ui/icons/List';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';


class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
          blogList: [],
          addDialogOpen: false
        };
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
  
      console.log(this.state.blogList.length)
    };

    deleteBlog = async (blogId) => {

      console.log('delete ', blogId)
      await axios.delete(`${apiEndpoint}/blogs/${blogId}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.idToken}`
        }
      });
      this.getBlogs()
    }


      render() {

        const useStyles = makeStyles({
          table: {
            minWidth: 250,
            maxWidth: 650
          },
        });
    
        return (


              <div className='blogList'>
                    <IconButton 
                        aria-label="edit"
                        component={Link} 
                        to='/overview'
                        >
                        <ListIcon />
                    </IconButton>
                    <IconButton 
                        aria-label="edit"
                        component={Link} 
                        to='/'
                        >
                        <LogoutIcon />
                    </IconButton>
                <div>
                  <div>
                    <h1>Admin Panel</h1> 
 
                  </div>
                    <div style={{float: 'right', marginBottom: '10px'}}>
                      <Button 
                        id='addNewItem'
                        variant="contained" 
                        color="primary"
                        component={Link} 
                        to={'/admin/add'}
                      >
                      Add
                    </Button>
                     </div>
                  </div>

                    <TableContainer component={Paper}>
                    <Table className={useStyles.table} aria-label="simple table">
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell align="right">Id</TableCell>
                          <TableCell></TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {this.state.blogList.map((item) => (
                          <TableRow key={item.blogId}>
                            <TableCell component="th" scope="row">
                              {item.title}
                            </TableCell>
                            <TableCell align="right">{item.blogId}</TableCell>
                            <TableCell align="right">            
                              <IconButton 
                                aria-label="edit"
                                component={Link} 
                                to={{
                                  pathname: `/admin/edit/${item.blogId}`,
                                  state: {
                                    blogId: item.blogId,
                                    title: item.title,
                                    previewText: item.previewText,
                                    articleText: item.articleText,
                                    articleImgUrl: item.articleImgUrl

                                  }
                                }}
                              >
                                <EditIcon />
                              </IconButton>
                            </TableCell>
                            <TableCell align="right">            
                              <IconButton aria-label="delete" color="secondary" onClick={() => { this.deleteBlog(item.blogId); }}>
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>

                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>



              
              
              </div>

            
          
        );
      }
}
    
export default Admin;