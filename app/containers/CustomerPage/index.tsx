import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { customerRequest } from './actions';
import { CustomerSaga } from "./saga";
import { useHistory } from "react-router";
import reducer from './reducer';
import { connect } from 'react-redux';
import { useDispatch, useSelector } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectError,
  makeSelectLoading,
  makeSelectRepos,
} from 'containers/App/selectors';
import { makeSelectCustomer } from './selectors';
import { getWithExpiry } from '../App/actions';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import Modal from 'components/Modal';

interface Req {
  pageNum: number,
  pageSize: number,
  userIds: [number],
}

const stateSelector = createStructuredSelector({
  repos: makeSelectRepos(),
  customer: makeSelectCustomer(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const useStyles = makeStyles((theme) => ({
  icon: {
    margin: 12,
    fontSize: 35,
    float: "right",
    "&:hover": {
      cursor: "pointer",
      fontSize: 40,
      trasitions: .5,
    }
  },
}));

function CustomerPage({customerRequest}) {
  const classes = useStyles();
  const { customer } = useSelector(stateSelector);
  const history = useHistory();
  const [open, setOpen] = React.useState<boolean>(false);
  const [isStatus, setStatus] = React.useState<boolean>(false);
  const columns = [
    { name: "address", label: "Address" },
    { name: "birthday", label: "Birth date" },
    { name: "cname", label: "C name" },
    { name: "createUser", label: "Created user" },
    { name: "createdTime", label: "Created time" },
    { name: "mobile", label: "Mobile phone" },
    { name: "name", label: "Name" },
    { name: "nextTime", label: "Next time" },
    { name: "ownerUser", label: "Owner user" },
    { name: "updatedTime", label: "Updated time" },
    { name: "remark", label: "Remark" },
    { name: "website", label: "Website" },
  ];

  const options = {
    filter: true,
    filterType: "dropdown",
  };

  const getCustomers = async () => {
    const item: any = localStorage.getItem('userId');
    const userId = JSON.parse(item).value;
    const req: Req = {pageNum: 1, pageSize: 20, userIds: [userId]};
    customerRequest(req)
  }


  useInjectReducer({ key: 'customer', reducer: reducer });
  useInjectSaga({ key: 'customer', saga: CustomerSaga });

  const handleModal = () => setOpen(!open);

  useEffect(() => {
    if(!getWithExpiry('token')){
      history.push("/login");
    }else getCustomers();

  },[])

  // console.log(customer);

  
  return (
    <React.Fragment>
      <Modal getCustomer={getCustomers} open={open} handleModal={handleModal} />
      <AddCircleIcon 
      color="primary"
      className={classes.icon}
      onClick={handleModal}
      />
      <MUIDataTable
        title={"Customer list"}
        data={customer.list}
        columns={columns}
        options={options}
      />
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    customerRequest: (req) => dispatch(customerRequest(req)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerPage);
