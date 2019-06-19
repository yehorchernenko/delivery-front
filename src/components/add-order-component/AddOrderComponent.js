import React from "react";
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {toast} from 'react-toastify';
import {Link, Redirect} from "react-router-dom";
import NavigationBarComponent from '../navigation-bar/NavigationBarComponent';
import Select from '@material-ui/core/Select';
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";

const authService = require('../../services/AuthService').authService;
const userService = require('../../services/UserService').userService;
const orderService = require('../../services/OrderService').orderService;
const cities = require('../../utils/cities');

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

class AddOrderComponent extends React.Component {
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
            order: {
                senderAddress: {
                    region: {city: []},
                    city: "",
                    address: ""
                },
                receiverAddress: {
                    region: {city: []},
                    city: "",
                    address: ""
                }
            },
            users: [],
            user: {}
        };
    }

    componentDidMount() {
        userService.list().then(response => {
            let state = this.state;
            state.users = response.data;
            this.setState(state);
        }).catch(error => {
            this.errorToast(error.message);
        });

        authService.me().then(response => {
            let state = this.state;
            state.me = response.data;
            this.setState(state);
        }).catch(error => {
            this.errorToast(error.message);
        });
    };

    onSubmitTouched = async (event) => {
        event.preventDefault();

        let body = this.state.order;
        body.receiver = this.state.user._id;

        orderService.add(body).then(response => {
            this.successToast("Order successfully added.")
        }).catch(error => {
            this.errorToast(error.message)
        });
    };

    senderRegionChanged = event => {
        let state = this.state;
        state.order.senderAddress.region = event.target.value;

        this.setState(state);
    };

    senderCityChanged = event => {
        let state = this.state;
        state.order.senderAddress.city = event.target.value;

        this.setState(state);
    };

    receiverRegionChanged = event => {
        let state = this.state;
        state.order.receiverAddress.region = event.target.value;

        this.setState(state);
    };

    receiverCityChanged = event => {
        let state = this.state;
        state.order.receiverAddress.city = event.target.value;

        this.setState(state);
    };

    senderAddressChanged = event => {
        let state = this.state;
        state.order.senderAddress.address = event.target.value;

        this.setState(state);
    };

    receiverAddressChanged = event => {
        let state = this.state;
        state.order.receiverAddress.address = event.target.value;

        this.setState(state);
    };

    handleReceiverSelection = event => {
        let state = this.state;
        state.user = event.target.value;

        this.setState(state);
    };

    render() {
        const {classes} = this.props;

        if (this.state.isRegistered) {
            return (<Redirect to="/login"/>)
        } else {
            return (
                <div>
                    <NavigationBarComponent/>
                    <main className={classes.main}>
                        <CssBaseline/>
                        <Paper className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                Create new order
                            </Typography>
                            <form className={classes.form} onSubmit={this.onSubmitTouched}>
    /*Sender*/
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="senderRegion">Sender region:</InputLabel>
                                    <Select
                                        value={this.state.order.senderAddress.region}
                                        inputProps={{
                                            name: 'senderRegion',
                                            id: 'senderRegion-id',
                                        }}
                                        onChange={this.senderRegionChanged}
                                    >
                                        {cities.regions.map(region => {
                                            return (<MenuItem value={region} key={region._name}>{region._name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="senderCity">Sender city:</InputLabel>
                                    <Select
                                        value={this.state.order.senderAddress.city}
                                        inputProps={{
                                            name: 'senderCity',
                                            id: 'senderCity-id',
                                        }}
                                        onChange={this.senderCityChanged}
                                    >
                                        {this.state.order.senderAddress.region.city.map(city => {
                                            return (<MenuItem value={city._name} key={city._name}>{city._name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="senderAddressDetail">Detail:</InputLabel>
                                    <Input name="senderAddressDetail" type="text" id="senderAddressDetail"
                                           value={this.state.order.senderAddress.address} onChange={this.senderAddressChanged}/>
                                </FormControl>
/*Receiver*/
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="receiverRegion">Receiver region:</InputLabel>
                                    <Select
                                        value={this.state.order.receiverAddress.region}
                                        inputProps={{
                                            name: 'receiverRegion',
                                            id: 'receiverRegion-id',
                                        }}
                                        onChange={this.receiverRegionChanged}
                                    >
                                        {cities.regions.map(region => {
                                            return (<MenuItem value={region} key={region._name}>{region._name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="receiverCity">Sender city:</InputLabel>
                                    <Select
                                        value={this.state.order.receiverAddress.city}
                                        inputProps={{
                                            name: 'receiverCity',
                                            id: 'receiverCity-id',
                                        }}
                                        onChange={this.receiverCityChanged}
                                    >
                                        {this.state.order.receiverAddress.region.city.map(city => {
                                            return (<MenuItem value={city._name} key={city._name}>{city._name}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="receiverAddressDetail">Detail:</InputLabel>
                                    <Input name="receiverAddressDetail" type="text" id="senderAddressDetail"
                                           value={this.state.order.receiverAddress.address} onChange={this.receiverAddressChanged}/>
                                </FormControl>
    /*Users*/
                                <FormControl margin="normal" required fullWidth>
                                    <InputLabel htmlFor="receiver">Receiver</InputLabel>
                                    <Select
                                        value={this.state.user}
                                        inputProps={{
                                            name: 'receiver',
                                            id: 'receiver-id',
                                        }}
                                        onChange={this.handleReceiverSelection}
                                    >
                                        {this.state.users.map(user => {
                                            return (<MenuItem value={user} key={user._id}>{user.fullName}</MenuItem>)
                                        })}
                                    </Select>
                                </FormControl>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    className={classes.submit}
                                >
                                    Create new order
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </div>
            );
        }
    }
}

AddOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddOrderComponent)