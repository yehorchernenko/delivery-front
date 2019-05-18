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

    onLogin = () => {
        this.setState({component: ComponentsEnum.Login});
        console.log('LOOOOOGIn')
    };

    currentComponent = () => {
        switch(this.state.component.key) {
            case ComponentsEnum.Register:
                return(<RegisterComponent onLogin={this.onLogin}/>)
            case ComponentsEnum.Login:
                return(<RegisterComponent onLogin={this.handleAuth}/>)
            default:
                return(<RegisterComponent onLogin={this.onLogin}/>)
        }
    }

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