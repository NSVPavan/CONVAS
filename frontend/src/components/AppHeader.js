import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Person2Icon from '@mui/icons-material/Person2';
import LogoutIcon from '@mui/icons-material/Logout';
import ConfirmationModal from './ConfirmModal';

const AppHeader = ({isProfilePage}) => {

  const fullname = localStorage.getItem('fullname');
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [isLogoutConfirm, setLogoutConfirm] = useState(false);

  const menuOptions = [
    {
      title: 'profile',
      icon: <Person2Icon />,
      path: '/profile'
    },
    {
      title: 'logout',
      icon: <LogoutIcon />,
      action: () => handleLogout()
    }
  ];

  const handleAvatarIconClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    setLogoutConfirm(true)
  }

  const handleLogoutConfirm = () => {
    console.log(`handleLogoutConfirm called`);
    setLogoutConfirm(false)

    localStorage.clear();
    navigate('/login')
  }

  const handleLogoutDialogClose = () => {
    console.log(`handleLogoutDialogClose called`);
    setLogoutConfirm(false)
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            CoSketch
          </Typography>
          {!isProfilePage &&
            <>
              <Typography>
                {fullname}
              </Typography>
              <IconButton onClick={handleAvatarIconClick} color="inherit">
                <AccountCircleIcon />
              </IconButton>
            </>
          }
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleAvatarMenuClose}
          >
            {menuOptions.map((option, index) => (
              <MenuItem sx={{ padding: 2 }} key={index} onClick={option.action || handleAvatarMenuClose}>
                {option.path ? (
                  <Link to={option.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {option.icon} {option.title}
                  </Link>
                ) : (
                  <>
                    {option.icon} {option.title}
                  </>
                )}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      <ConfirmationModal
        open={isLogoutConfirm}
        title="Logout Confirmation"
        content="Are you sure you want to logout?"
        onConfirm={handleLogoutConfirm}
        onClose={handleLogoutDialogClose}
      />
    </>
  );
};

export default AppHeader;
