import React from "react";
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

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

class OrderDetailView extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            user: {
                _id: '',
                email: '',
                fullName: '',
                phone: ''
            },
        };
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
                                        readOnly: true,
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
                                        readOnly: true,
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
                                        readOnly: true,
                                    }}
                                    variant="filled"
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