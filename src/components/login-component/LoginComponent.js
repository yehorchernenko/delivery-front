import React from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
import { Link, Redirect} from "react-router-dom";
const update = require('react-addons-update');
const authService = require('../../services/AuthService').authService;

const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
        margin: theme.spacing.unit,
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit,
    },
    submit: {
        marginTop: theme.spacing.unit * 3,
    },
});

class LoginComponent extends React.Component {
    successToast = (msg) => toast.success(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });
    errorToast = (msg) => toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });

    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            credentials: {
                email: '',
                password: ''
            }
        };
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.id;

        const newState = update(this.state, {
            credentials: { [name]: {$set: value} }
        });
        this.setState(newState);
    };

    onSubmitTouched = async (event) => {
        event.preventDefault();

        authService.login(this.state.credentials).then(response => {
            localStorage.setItem('token', response.data.token);
            this.setState({loggedIn: true})
        }).catch(error => {
            this.errorToast(error.message);
            this.setState({loggedIn: true})
        });
    };

    render() {
        const { classes } = this.props;

        if (this.state.loggedIn){
            return (<Redirect to="/profile/my"/>)
        } else {
            return(
                <main className={classes.main}>
                    <CssBaseline />
                    <Paper className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign In
                        </Typography>
                        <form className={classes.form} onSubmit={this.onSubmitTouched}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus value={this.state.credentials.email} onChange={this.handleInputChange}/>
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.credentials.password} onChange={this.handleInputChange}/>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Link to="/register">Don't have an account? Register now!</Link>
                    </Paper>
                </main>
            );
        }
    }
}

LoginComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginComponent)