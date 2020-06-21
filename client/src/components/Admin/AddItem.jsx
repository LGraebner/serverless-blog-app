import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';



class AddItem extends Component {
  constructor(props) {
      super(props);
      console.log(props)
      this.state= { 
        redirect: null,
        title: "",
        previewText: "",
        articleText: "",
        articleImgUrl: "",
        fileData: null 
      }
  }


  addBlog = async () => {
    console.log('add Blog ')
    const addItem = 
    {
        "title"  : this.state.title,
        "previewText" : this.state.previewText,
        "articleText" : this.state.articleText,
        "articleImgUrl" : this.state.articleImgUrl
    }
    const options = {
      headers: {'Content-Type': 'application/json'}
    };
    await axios.post(`https://6gpbo7h0j3.execute-api.eu-central-1.amazonaws.com/dev/blogs`, addItem, options);
    this.setState({ redirect: "/admin" });
  }



  render() {
    const useStyles = makeStyles((theme) => ({
      root: {
        '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
        },
      },
    }));

    const value = 'test'

    if (this.state.redirect != null) {
      return <Redirect to={this.state.redirect} />
    }
    else {

      return(
        <div style={{padding:'25px', width: '650px'}}>
          <h1>Add Item</h1>
          <form className={useStyles.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="txtTitleText"
                label="Title of blog entry"
                placeholder="Title"
                fullWidth
                multiline
                onChange={event => {
                  console.log('edit title')
                  const { value } = event.target;
                  this.setState({title : value})
                }}
              />
              <br/><br/>
            </div>
            <div>
              <TextField
                id="txtPreviewText"
                label="Preview text of blog entry"
                placeholder="Preview"
                fullWidth
                multiline
                onChange={event => {
                  console.log('edit preview')
                  const { value } = event.target;
                  this.setState({previewText : value})
                }}
              />
              <br/><br/>
            </div>
            <div>
              <TextField
                id="txtArticleText"
                label="Content of blog entry"
                placeholder="Text"
                fullWidth
                multiline
                onChange={event => {
                  console.log('edit text')
                  const { value } = event.target;
                  this.setState({articleText : value})
                }}
              />
              </div>
              <br/>
              <div>
                <TextField
                  id="txtImgUrl"
                  label="Image Url for Blog"
                  placeholder="ImageUrl"
                  multiline
                  fullWidth
                  onChange={event => {
                    console.log('edit text')
                    const { value } = event.target;
                    this.setState({articleImgUrl : value})
                  }}
                />
              </div>
              <br/><br/>
           

          </form>
          <br></br>
          <div style={{spacing: '5px'}}>
          <Button 
            id='addItem'
            variant="contained" 
            color="primary"
            onClick={() => this.addBlog()}
            >
            Add
          </Button>
          <Button 
            variant="contained" 
            color="secondary" 
            style={{marginLeft:'10px'}}
            component={Link} 
            to={'/admin'}>
            Cancel
          </Button>
          </div>
        </div>
      );
    }
  }
}

export default AddItem;