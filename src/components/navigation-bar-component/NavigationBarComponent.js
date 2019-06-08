import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import { Link } from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    link: {
        textDecoration: 'none',
        color: 'white'
    }
};

class NavigationBarComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth: false }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        this.setState({auth: (token !== null && token !== 'undefined')});
    }

    authLink = () => {
        if (this.state.auth) {
            return (<Link className={this.props.classes.link} to='/profile/my'>Profile</Link>)
        } else {
            return (<Link className={this.props.classes.link} to='/login'>Sign In</Link>)
        }
    };

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Delivery+
                        </Typography>
                        {this.authLink()}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

NavigationBarComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavigationBarComponent)