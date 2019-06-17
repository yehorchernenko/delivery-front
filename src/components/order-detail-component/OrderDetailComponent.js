import React from "react";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CircularProgress from '@material-ui/core/CircularProgress';
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
    progress: {
        margin: theme.spacing.unit,
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

class OrderDetailComponent extends React.Component {
    errorToast = (msg) => toast.error(msg, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true
    });

    constructor(props) {
        super(props);

        this.state = {
            foundOrder: null
        };
    }

    componentDidMount() {
        const handle = this.props.match.params;

        orderService.byID(handle.id).then(response => {
            this.setState({foundOrder: response.data});
        }).catch(error => {
            this.errorToast(error.message);
            this.setState({foundOrder: null});
        })
    }

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
                            {`Order #${this.props.match.params.id}`}
                        </Typography>
                        {this.state.foundOrder != null
                            ? (<OrderDetailView order={this.state.foundOrder} onError={this.onError}/>)
                            : (<CircularProgress className={classes.progress} color="secondary" />)}
                    </Paper>
                </main>
            </div>
        );
    }
}

OrderDetailComponent.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderDetailComponent)