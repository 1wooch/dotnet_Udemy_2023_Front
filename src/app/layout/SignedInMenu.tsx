import { Button, Fade, Link, ListItem, Menu, MenuItem } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { signOut } from "../../feature/account/accountSlice";
import { clearBasket } from "../../feature/basket/basketSlice";
import { NavLink } from "react-router-dom";

export default function SignedInMenu() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.account);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
  
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button
          color='inherit'
          onClick={handleClick}
          sx={{ typography: 'h6' }}
        >
          {user?.email}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <ListItem component={NavLink} to='/orders'> My Orders</ListItem>
          <MenuItem onClick={() => {
            dispatch(signOut());
            dispatch(clearBasket());
          }}>Logout</MenuItem>
        </Menu>
      </>
    );
  }