import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import './BlogEntry.css';
import { Link } from 'react-router-dom';

const styles = theme => ({
    button: {
      marginTop: 15,
      fontWeight: 'bold',
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      fontSize: 14
    },
    input: {
      display: 'none',
    },
  });

class BlogEntry extends Component {

    constructor(props) {
        super(props);
        console.log(props)
    }

    render() {
        const { classes } = this.props;
        return (
        <div className="blogentry rcorners">
          <div className="blogPreviewImage">
            <img src={this.props.imageUrl} style={{padding: '10px', width:'160px', height:'160px'}}></img>
            </div>
          <div className="blogPreviewText">
            <div className="blogPreviewHeaderFont">{this.props.title}</div>
            <div className="blogPreviewTextFont">
            {this.props.text}
            </div>

            <Button 
              variant="contained" 
              color="secondary" 
              className={classes.button} 
              component={Link} 
              to={this.props.link}>
              Read more
            </Button>

          </div>
        </div>
        );
    }

}

BlogEntry.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(BlogEntry);