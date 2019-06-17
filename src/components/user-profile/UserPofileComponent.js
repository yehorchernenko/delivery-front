import React from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {toast} from 'react-toastify';
import {Redirect} from "react-router-dom";
import NavigationBarComponent from '../navigation-bar/NavigationBarComponent';

const update = require('react-addons-update');
const authService = require('../../services/AuthService').authService;
const orderService = require('../../services/OrderService').orderService;
const userService = require('../../services/UserService').userService;

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
            auth: true,
            isEdit: false,
            user: {
                _id: '',
                email: '',
                fullName: '',
                phone: ''
            },
            orders: []
        };
    }

    componentDidMount() {
        authService.me().then(response => {
            this.setState({user: response.data})
        }).catch(error => {
            this.errorToast(`Profile loading error: ${error.message}`);
        });

        orderService.my().then(response => {
            this.setState({orders: response.data})
            console.log(response.data)
        }).catch(error => {
            this.errorToast(`Order loading error: ${error.message}`);
        });
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.id;

        const newState = update(this.state, {
            user: {[name]: {$set: value}}
        });
        this.setState(newState);
    };

    onEditTouched = async (event) => {
        event.preventDefault();

        if (this.state.isEdit) {
            userService.edit(this.state.user).then(user => {
                this.successToast('You have successfully updated your profile');
                this.setState({user: user, isEdit: false})
            }).catch(error => {
                this.errorToast(error.message);
                this.setState({isEdit: false})
            });
        } else {
            this.setState({isEdit: !this.state.isEdit});
        }
    };

    onLogOutTouched = (event) => {
        event.preventDefault();

        localStorage.removeItem('token');
        this.setState({auth: false});
    };

    formattedDate(timestamp) {
        const date = new Date(timestamp);

        const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = date.getDate();
        const m = strArray[date.getMonth()];
        const y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    redirectToOrderDetails = (item) => {
        console.log(item.target);
        this.setState({selectedOrderID: item});
    };

    render() {
        const {classes} = this.props;

        if (this.state.selectedOrderID != null) {
            return (<Redirect to={`/orders/byID/${this.state.selectedOrderID}`}/>);
        }

        if (this.state.auth) {
            return (
                <div>
                    <NavigationBarComponent/>
                    <main className={classes.main}>
                        <CssBaseline/>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon/>
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Profile
                            </Typography>
                            <form className={classes.form}>
                                <FormControl required fullWidth>
                                    <TextField
                                        id="fullName"
                                        name="fullName"
                                        label="Full name"
                                        className={classes.textField}
                                        value={this.state.user.fullName}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: !this.state.isEdit,
                                        }}
                                        variant="filled"
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email:"
                                        value={this.state.user.email}
                                        className={classes.textField}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: !this.state.isEdit,
                                        }}
                                        variant="filled"
                                    />
                                </FormControl>
                                <FormControl required fullWidth>
                                    <TextField
                                        id="phone"
                                        name="phone"
                                        label="Telephone number"
                                        value={this.state.user.phone}
                                        className={classes.textField}
                                        onChange={this.handleInputChange}
                                        margin="normal"
                                        InputProps={{
                                            readOnly: !this.state.isEdit,
                                        }}
                                        variant="filled"
                                    />
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.onEditTouched}
                                >
                                    {this.state.isEdit ? "Submit" : "Edit"}
                                </Button>
                                <FormControl margin="normal" fullWidth>
                                    <Typography variant="h6" className={classes.textField}>
                                        Orders history:
                                    </Typography>
                                </FormControl>
                                <FormControl fullWidth>
                                    <List>
                                        {this.state.orders.map(item => {
                                            return (
                                                <ListItem key={item._id} onClick={() => this.redirectToOrderDetails(item._id)}>
                                                    <ListItemText primary={`Order: ${item._id}`}
                                                                  secondary={`Date: ${this.formattedDate(item.info.date)}`}/>
                                                </ListItem>);
                                        })}
                                    </List>
                                </FormControl>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    className={classes.submit}
                                    onClick={this.onLogOutTouched}
                                >
                                    Log out
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            );
        } else {
            return (<Redirect to="/login"/>);
        }
    }
}

UserPofileComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPofileComponent)