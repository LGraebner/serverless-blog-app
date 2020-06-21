import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import './BlogHeader.css';

const styles = theme => ({
    root: {
      display: 'inline-block'
    },
    icon: {
      margin: theme.spacing.unit * 2,
    },
    iconHover: {
      margin: theme.spacing.unit * 2,
      color: 'white',
      '&:hover': {
        color: blueGrey[200],
      },
    },
  });

class BlogHeader extends Component {

    constructor(props) {
        super(props);
    }

    btnClick() {
        console.log("test");
    }

    render() {
        const { classes } = this.props;
        console.log(window.location.href);
        return (
            <div className="header topImage darken" style={{backgroundImage: "url(" + this.props.topImage + ")"}}>
            <div style={{display: 'flex'}}>
                <div style={{marginTop: 50}}>


                </div>
                <div style={{marginLeft: '15%'}}>
                    <div className="headerTitle">{this.props.title}</div>
                    <div className="headerSubTitle">{this.props.subTitle}</div>
                </div>
            </div>
            </div>
        );
    }

}

export default withStyles(styles)(BlogHeader);