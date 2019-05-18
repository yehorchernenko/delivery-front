
import React from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import { toast } from 'react-toastify';
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
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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

class UserPofileComponent extends React.Component {
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
            user: {
                email: '',
                fullName: '',
                phone: ''
            }
        };
    }

    componentDidMount() {
        authService.me().then(response => {
            console.log(response.data)
            this.setState({user: response.data})
        }).catch(error => {
            this.errorToast(error.message);
        })
    }

    render() {
        const { classes } = this.props;
        console.log(this.state.user)
        return(
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Profile
                    </Typography>
                    <form className={classes.form}>
                        <FormControl required fullWidth>
                            <TextField
                                id="fullName-field"
                                label="Full name"
                                value={this.state.user.fullName}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                id="email-field"
                                label="Email:"
                                value={this.state.user.email}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl required fullWidth>
                            <TextField
                                id="phone-field"
                                label="Telephone number"
                                value={this.state.user.phone}
                                className={classes.textField}
                                margin="normal"
                                InputProps={{
                                    readOnly: true,
                                }}
                                variant="filled"
                            />
                        </FormControl>
                        <FormControl margin="normal" fullWidth>
                            <Typography variant="h6" className={classes.textField}>
                                Orders history:
                            </Typography>
                        </FormControl>
                        <FormControl fullWidth>
                            <List>
                                <ListItem>
                                    <ListItemText primary="Order: 1232315" secondary="Jan 7, 2019" />
                                </ListItem>
                                <ListItem>
                                    <ListItemText primary="Order: 1232315" secondary="Jan 19, 2019" />
                                </ListItem>
                            </List>
                        </FormControl>
                    </form>
                </Paper>
            </main>
        );
    }
}

UserPofileComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPofileComponent)