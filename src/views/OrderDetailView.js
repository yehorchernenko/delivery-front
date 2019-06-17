import React from "react";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const userService = require('../services/UserService').userService;

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
    title: {
        marginTop: theme.spacing.unit * 3,
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
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

class OrderDetailView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            sender: null,
            receiver: null
        }
    }

    componentDidMount() {
        //sender
        userService.get(this.props.order.sender).then(response => {
            this.setState({sender: response.data});
        }).catch(error => {
            this.props.onError(error);
            this.setState({sender: null})
        });

        //receiver
        userService.get(this.props.order.receiver).then(response => {
            this.setState({receiver: response.data});
        }).catch(error => {
            this.props.onError(error);
            this.setState({receiver: null})
        })
    }

    formattedDate(timestamp) {
        const date = new Date(timestamp);

        const strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const d = date.getDate();
        const m = strArray[date.getMonth()];
        const y = date.getFullYear();
        return '' + (d <= 9 ? '0' + d : d) + '-' + m + '-' + y;
    }

    render() {
        const {classes} = this.props;

        return (
            <div>
                <main className={classes.main}>
                    <CssBaseline/>
                        <Typography component="h1" variant="h5" className={classes.title}>
                            Order Detail:
                        </Typography>
                        <form className={classes.form}>
                            <FormControl required fullWidth>
                                <TextField
                                    multiline
                                    id="sender"
                                    name="sender"
                                    label="Sender:"
                                    className={classes.textField}
                                    value={this.state.sender != null ?
                                    `Name: ${this.state.sender.fullName}\nPhone: ${this.state.sender.phone}\nEmail: ${this.state.sender.email}`
                                    : "None"
                                    }
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl required fullWidth>
                                <TextField
                                    multiline
                                    id="receiver"
                                    name="receiver"
                                    label="Receiver:"
                                    className={classes.textField}
                                    value={this.state.receiver != null ?
                                        `Name: ${this.state.receiver.fullName}\nPhone: ${this.state.receiver.phone}\nEmail: ${this.state.receiver.email}`
                                        : "None"
                                    }
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl required fullWidth>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Shipping info:"
                                    value={`${this.props.order.senderAddress.city} -> ${this.props.order.receiverAddress.city}`}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl required fullWidth>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Delivery date:"
                                    value={this.formattedDate(this.props.order.info.date)}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                            <FormControl required fullWidth>
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Delivery date:"
                                    value={`${this.props.order.info.price} UAH.`}
                                    className={classes.textField}
                                    margin="normal"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    variant="outlined"
                                />
                            </FormControl>
                        </form>
                </main>
            </div>
        );
    }
}

OrderDetailView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderDetailView)