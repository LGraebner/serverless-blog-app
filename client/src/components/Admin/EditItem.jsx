import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle } from '@material-ui/lab';
import  { apiEndpoint, imageBucketUrl } from '../../config'



class EditItem extends Component {
  constructor(props) {
      super(props);
      console.log(this.props)
      this.state= { 
        redirect: null,
        isUploadSuccesful: false
      }
      this.idToken = localStorage.getItem('idToken')
      console.log(this.idToken)
  }

  componentDidMount() {
      this.setState({
        blogId : this.props.location.state.blogId,
        title: this.props.location.state.title,
        previewText: this.props.location.state.previewText,
        articleText: this.props.location.state.articleText,
        articleImgUrl: this.props.location.state.articleImgUrl
      })

  }

  updateBlog = async () => {
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
    await axios.patch(`${apiEndpoint}/blogs/${this.state.blogId}`, addItem, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.idToken}`
      }
    });
    this.setState({ redirect: "/admin" });
  }

  handleCapture = async ({ target }) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(target.files[0]);
    fileReader.onload = async (e) => {
        const result = e.target.result
        const base64Data = new Buffer.from(result.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        this.setState({ fileData : base64Data});
        console.log('loaded file')
        const uploadUrl = await this.getUploadImageUrl()
        console.log(uploadUrl)
        this.uploadImage(uploadUrl)
    };

  };

  getUploadImageUrl = async () => {
    console.log('generateUrl ', this.idToken)
    const response = await axios.post(`${apiEndpoint}/blogs/${this.state.blogId}/attachment`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.idToken}`
      }
    })
    return response.data.uploadUrl
  }

  uploadImage = async (uploadUrl) => {
    await axios.put(uploadUrl, this.state.fileData)
    this.setState({articleImgUrl: `${imageBucketUrl}/${this.state.blogId}`, isUploadSuccesful: true})
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
          <h1>Edit Item</h1>
          <p> {`${this.state.blogId}`}</p>
          <form className={useStyles.root} noValidate autoComplete="off">
            <div>
              <TextField
                id="standard-textarea"
                label="Title of blog entry"
                placeholder="Title"
                value={this.state.title}
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
                id="standard-textarea"
                label="Preview text of blog entry"
                placeholder="Preview"
                value={this.state.previewText}
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
                id="standard-textarea"
                label="Content of blog entry"
                placeholder="Text"
                value={this.state.articleText}
                fullWidth
                multiline
                onChange={event => {
                  console.log('edit text')
                  const { value } = event.target;
                  this.setState({articleText : value})
                }}
              />
              <br/><br/>
            </div>
            <div>
            <TextField style={{width : '475px'}}
                id="standard-textarea"
                label="Image Url for Blog"
                placeholder="ImageUrl"
                value = {this.state.articleImgUrl}
                multiline
                onChange={event => {
                  console.log('edit text')
                  const { value } = event.target;
                  this.setState({articleImgUrl : value})
                }}
              />

            <Button
              style = {{marginLeft:'25px'}}
              variant="contained"
              component="label"
            >
              Upload File
              <input
                type="file"
                style={{ display: "none" }}
                onChange={this.handleCapture}
              />
            </Button>
            </div>
            {
                this.state.isUploadSuccesful ?
                (
                    <div>
                        <br></br>
                        <Alert severity="success">
                            <AlertTitle>Success</AlertTitle>
                            <strong>File upload was successful</strong>
                        </Alert>
                    </div>
                ) : ('')
            }
          </form>
          <br></br>
          <div style={{spacing: '5px'}}>
          <Button 
            id='updateItem'
            variant="contained" 
            color="primary"
            onClick={() => this.updateBlog()}
            >
            Update
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

export default EditItem;