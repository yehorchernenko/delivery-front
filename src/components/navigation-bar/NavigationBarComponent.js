import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import {Link} from "react-router-dom";

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
        this.state = {
            auth: (localStorage.getItem('token') != null),
            anchorEl: null
        }
    }


    menuClicked = (event) => {
        event.preventDefault();

        this.setState({anchorEl: event.currentTarget});
    };

    handleMenuClose = () => {
        this.setState({anchorEl: null});
    };

    authLink = () => {
        if (this.state.auth) {
            return (<Link className={this.props.classes.link} to='/profile/my'>Profile</Link>)
        } else {
            return (<Link className={this.props.classes.link} to='/login'>Sign In</Link>)
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-controls="main-menu"
                                    aria-haspopup="true" onClick={this.menuClicked}>
                            <MenuIcon/>
                        </IconButton>
                        <Menu
                            id="simple-menu"
                            anchorEl={this.state.anchorEl}
                            keepMounted
                            open={Boolean(this.state.anchorEl)}
                            onClose={this.handleMenuClose}
                        >
                            <MenuItem onClick={this.handleMenuClose}>
                                <Link to="/orders/search">Search</Link>
                            </MenuItem>
                            <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
                            <MenuItem onClick={this.handleMenuClose}>Logout</MenuItem>
                        </Menu>
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