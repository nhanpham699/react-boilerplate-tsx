import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FormattedMessage } from 'react-intl';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';

import { 
  TextField,
  Checkbox,
  Grid,
  Box,
  Container,
  Avatar,
  Typography,
  Button,
  FormControlLabel,
  CircularProgress,
} from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Link, useHistory } from 'react-router-dom';
import { userLogInRequest } from './actions';
import messages from './messages';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import reducer from './reducer';
import { LogInSaga } from './saga';
import { getWithExpiry } from '../App/actions';


const key = 'login';


const useStyles = makeStyles((theme) =>
	createStyles({
		root: {
			height: '100vh',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		},
		layout: {
			boxShadow: '1px 1px 10px 1px silver',
			padding: 30,
		},
		lock_icon: {
			margin: theme.spacing(1),
			background: '#e60000',
		},
		item: {
			marginTop: theme.spacing(2),
		},
		gg_btn: {
			background: '#cc0000',
			'&:hover': {
				background: '#b30000',
				transition: '.3s',
			},
		},
		gg_icon: {
			marginTop: -10,
		},
		link: {
			color: 'blue',
			fontSize: 14,
			fontFamily: 'Tahoma',
		},
	})
);

interface User {
  username: string,
  password: string
}

function LogInPage({userLogInRequest}) {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = React.useState<User>({
    username: "",
    password: "",
  })

  useInjectReducer({ key: 'home', reducer: reducer });
  useInjectSaga({ key: 'home', saga: LogInSaga });

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();    
    userLogInRequest(user);
  }

  React.useEffect(() => {
    if(getWithExpiry('token') && getWithExpiry('userId')){
      history.push("/");
    }
  },[])

  return (
    <div>
      <Helmet>
        <title>Login Page</title>
        <meta
          name="description"
          content="Feature page of React.js Boilerplate application"
        />
      </Helmet>
      <Box className={classes.root}>
        <Box className={classes.layout}>
          <Container maxWidth="xs">
            <form onSubmit={handleLogin}>
              <Grid container justify="center">
                <Grid item xs={12}>
                  <Grid container justify="center">
                    <Avatar className={classes.lock_icon}>
                      <LockOutlined />
                    </Avatar>
                  </Grid>
                  <Grid container justify="center">
                    <Typography variant="h4">Login</Typography>
                  </Grid>
                  <Grid container justify="center" spacing={2}>
                    <Grid item xs={12} className={classes.item}>
                      <TextField
                        variant="outlined"
                        type="text"
                        placeholder={'*' + 'username'}
                        required={true}
                        fullWidth={true}
                        onChange={(e) => setUser({...user, username: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        type="password"
                        placeholder={'*' + 'password'}
                        required={true}
                        fullWidth={true}
                        onChange={(e) => setUser({...user, password: e.target.value})}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container justify="flex-start">
                        <FormControlLabel
                          control={<Checkbox />}
                          label={"remember"}
                        />
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        fullWidth={true}
                        variant="contained" 
                        color="secondary"
                      >
                        <Typography component="h3">
                            Log in
                        </Typography>
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid container justify="center" className={classes.item}>
                    <Box color="gray" mt={7}>
                      Copyright &reg; {new Date().getFullYear()}
                    </Box>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogInRequest: (user) => dispatch(userLogInRequest(user)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogInPage);