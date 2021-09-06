import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DateFnsUtils from '@date-io/date-fns';
import { CustomerCreate } from 'containers/CustomerPage/saga';
import { useDispatch } from 'react-redux';
import { customerRequest } from 'containers/CustomerPage/actions';
import Swal from 'sweetalert2';

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
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

function getModalStyle() {
  const top = 50 
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
interface Req {
    pageNum: number,
    pageSize: number,
    userIds: [number],
  }
const useStyles = makeStyles((theme) => 
    createStyles({
        item: {
            marginTop: theme.spacing(2),
        },
        link: {
            color: 'blue',
            fontSize: 14,
            fontFamily: 'Tahoma',
        },
        paper: {
            position: 'absolute',
            width: 500,
            backgroundColor: theme.palette.background.paper,
            boxShadow: '1px 1px 10px 1px gray',
            padding: 40,
            maxHeight: 700,
            overflow: "scroll"
        },
        gender: {
            color: "gray",
            marginTop: 9,
        }
    })
);

interface ICustomer {
    name: string,
    cname: string,
    address: string,
    mobile: string,
    areaId: number,
    birthday: any,
    cityId: number,
    contactsId: number,
    industry: number,
    level: number,
    nextTime: any,
    provinceId:number,
    remark: string,
    sex: number,
    source:number,
    telephone: string,
    website: string,  
}

export default function SimpleModal(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { open, handleModal, getCustomer } = props;
  const [customer, setCustomer] = React.useState<ICustomer>({
      name: "",
      cname: "",
      address: "",
      mobile: "",
      areaId: 0,
      birthday: null,
      cityId: 0,
      contactsId: 0,
      industry: 0,
      level: 2,
      nextTime: null,
      provinceId: 0,
      remark: "",
      sex: 0,
      source: 0,
      telephone: "",
      website: "",  
  })
  const [mobileErr, setMobileErr] = React.useState<boolean>(false) 
  const [modalStyle] = React.useState(getModalStyle);

  const handleMobile = (e) => {
    const mobile = e.target.value;
    setCustomer({...customer, mobile: mobile});
    if(mobile[0] != 1 || (mobile[1] !=3 && mobile[1] != 7)){
        setMobileErr(true);
    }else if(mobile.length != 11){
        setMobileErr(true);
    }else {
        setMobileErr(false);
    }
  }
  const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(!mobileErr){
        const res = await CustomerCreate(customer);
        if(res.data.data){
            handleClose();
            Swal.fire({
                icon: 'success',
                title: 'Yeahhhhh.....',
                text: 'Add customer successfully',
            })
        }
    }    
  }

  const handleClose = () => {
    handleModal();
  };

  return (
    <Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      > 
        <Box style={modalStyle} className={classes.paper}>
            <Container maxWidth="xs">
                <form onSubmit={handleAdd}>
                <Grid container justify="center">
                    <Grid item xs={12}>
                        <Grid container justify="center">
                            <Typography variant="h4">Add a customer</Typography>
                        </Grid>
                        <Grid container justify="center" spacing={2}>
                            <Grid item xs={12} className={classes.item}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Name'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, name: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Cname'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, cname: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container >
                                        <KeyboardDatePicker
                                        fullWidth={true}
                                        disableToolbar
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Birth day"
                                        value={customer.birthday}
                                        onChange={(date) => setCustomer({...customer, birthday: date})}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />            
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Mobile'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => handleMobile(e)}
                                    error={mobileErr}
                                    helperText={mobileErr ? "mobile Invalid!" : ""}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <RadioGroup
                                aria-label="gender" 
                                name="gender1" 
                                value={customer.sex} 
                                onChange={(e) => setCustomer({...customer, sex: Number(e.target.value)})}
                                >
                                    <Box marginLeft={2} display="flex">
                                        <Typography className={classes.gender}>Gender</Typography>
                                        <Box display="flex" marginLeft={4}>
                                            <FormControlLabel value={1} control={<Radio />} label="Female" />
                                            <FormControlLabel value={0} control={<Radio />} label="Male" />
                                        </Box>
                                    </Box>
                                </RadioGroup>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Address'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, address: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Grid container>
                                        <KeyboardDatePicker
                                        fullWidth={true}
                                        disableToolbar
                                        inputVariant="outlined"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Next time"
                                        value={customer.nextTime}
                                        onChange={(date) => setCustomer({...customer, nextTime: date})}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        />            
                                    </Grid>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Remark'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, remark: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Website'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, website: e.target.value})}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    type="text"
                                    placeholder={'*' + 'Telephone'}
                                    required={true}
                                    fullWidth={true}
                                    onChange={(e) => setCustomer({...customer, telephone: e.target.value})}
                                />
                            </Grid> 
                            <Grid item xs={12}>
                                <Box display="flex">
                                    <Button
                                        type="submit"
                                        fullWidth={true}
                                        variant="contained" 
                                        color="primary"
                                    >
                                        <Typography component="h3">
                                            create
                                        </Typography>
                                    </Button>
                                    <Button
                                        fullWidth={true}
                                        variant="contained" 
                                        color="default"
                                        onClick={handleClose}
                                    >
                                        <Typography component="h3">
                                            cancel
                                        </Typography>
                                    </Button>
                                </Box>
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
      </Modal>
    </Box>
  );
}