import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Avatar, Menu, MenuItem, CardHeader } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() =>
	createStyles({
		profile_layout: {
			width: '100%',
		},
		profile: {
			float: 'right',
			'&:hover': {
				cursor: 'pointer',
			},
		},
	})
);

const UserHeader: React.FC = () => {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState<boolean>(false);

	const handleClick = (): void => {
		setOpen(!open);
	};

	const logout = async () => {
		await localStorage.removeItem('token');
        await localStorage.removeItem('userId')
		history.push('/login');
	};

	return (
		<div className={classes.profile_layout}>
			<div onClick={handleClick} className={classes.profile}>
				<CardHeader
					avatar={<Avatar alt="Lionel Messi" src="static/images/avatar/1.jpg" />}
					title={"asdsad"}
					subheader="football star"
				/>
				<Menu 
                open={open}
                getContentAnchorEl={null}
                anchorOrigin={{ vertical: "top", horizontal: "right" }} >
					<MenuItem>Profile</MenuItem>
					<MenuItem onClick={logout}>Log out</MenuItem>
				</Menu>
			</div>
		</div>
	);
};
export default UserHeader;
