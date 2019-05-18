import React from "react";
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import {withStyles} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu'
import RegisterComponent from '../register-component/RegisterComponent';
import LoginCompoent from '../login-component/LoginComponent';

const ComponentsEnum = Object.freeze({'Login':1, 'Register':2, 'Profile': 3});

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
};

class StartPageComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth: false, component: ComponentsEnum.Register}
    }

    handleAuth = () => {
      //this.setState({auth: !this.state.auth})
        console.log('fuck you')
    };

    showLogin = () => {
        this.setState({component: ComponentsEnum.Login});
    };

    onLogin = (token) => {
        console.log("Logged in successfully" + token);
    };

    showRegister = () => {
        this.setState({component: ComponentsEnum.Register});
    };

    currentComponent = () => {
        switch(this.state.component) {
            case ComponentsEnum.Register:
                return(<RegisterComponent
                    showLogin={this.showLogin}
                />);
            case ComponentsEnum.Login:
                return(<LoginCompoent
                    showRegister={this.showRegister}
                    onLogin={this.onLogin}
                />);
            default:
                return(<div/>)
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
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                </AppBar>
                <div>{this.currentComponent()}</div>

            </div>
        );
    }
}

StartPageComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StartPageComponent)