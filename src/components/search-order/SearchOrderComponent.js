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
import {toast} from 'react-toastify';
import {Link, Redirect} from "react-router-dom";
import NavigationBarComponent from '../navigation-bar/NavigationBarComponent';
import OrderDetailView from '../../views/OrderDetailView';

const update = require('react-addons-update');
const orderService = require('../../services/OrderService').orderService;

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

class SearchOrderComponent extends React.Component {
    errorToast = (msg) => toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });

    constructor(props) {
        super(props);

        this.state = {
            orderID: "",
            foundOrder: null
        };
    }

    handleInputChange = (event) => {
        const value = event.target.value;
        const name = event.target.id;

        const newState = update(this.state,
            {[name]: {$set: value}}
        );
        this.setState(newState);
    };

    onSubmitTouched = async (event) => {
        event.preventDefault();

        orderService.byID(this.state.orderID).then(response => {
            this.setState({foundOrder: response.data});
        }).catch(error => {
            this.errorToast(error.message);
            this.setState({foundOrder: null});
        })
    };

    orderDetailView = () => {
        if (this.state.foundOrder != null) {
            return (<OrderDetailView order={this.state.foundOrder} onError={this.onError}/>);
        } else {
            return (<div/>);
        }
    };

    onError = (error) => {
        this.errorToast(error.message);
    };

    render() {
        const {classes} = this.props;
        return (
            <div>
                <NavigationBarComponent/>
                <main className={classes.main}>
                    <CssBaseline/>
                    <Paper className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Search for order by ID
                        </Typography>
                        <form className={classes.form} onSubmit={this.onSubmitTouched}>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="orderID">ID:</InputLabel>
                                <Input id="orderID" name="orderID" autoFocus
                                       value={this.state.orderID} onChange={this.handleInputChange}/>
                            </FormControl>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Search
                            </Button>
                        </form>
                        {this.orderDetailView()}
                    </Paper>
                </main>
            </div>
        );
    }
}

SearchOrderComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchOrderComponent)