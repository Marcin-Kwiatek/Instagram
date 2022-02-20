import React, { useState } from 'react';
import './ProfileDropdownMenu.css';
import { BsFillPersonFill } from "react-icons/bs";
import ClickAwayListener from 'react-click-away-listener';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";



function ProfileDropdownMenu() {

    const [isProfileDropdownMenuOpen, setIsProfileDropdownMenuOpen] = useState(false);
    
    const history = useHistory()

    const showProfileDropdownMenu = () => {
        setIsProfileDropdownMenuOpen(true)
    }
    const hideProfileDropdownMenu = () => {
        setIsProfileDropdownMenuOpen(false)
    }
    const LogOut = () => {
        localStorage.removeItem('currentUserId');
        localStorage.removeItem('accessToken');
        history.push("/SignIn");
    }

    return (

        <div className="oneIcon" onClick={showProfileDropdownMenu} style={{ position: 'relative' }}>
            <BsFillPersonFill></BsFillPersonFill>
            {isProfileDropdownMenuOpen &&
                <ClickAwayListener onClickAway={hideProfileDropdownMenu}>
                    <div className='my-events'>
                        <Link className='iconLink' to='/myProfile'>
                            <div className='my-event'>
                                <BsFillPersonFill></BsFillPersonFill>Profile
                            </div>
                        </Link>
                        <div className='my-event' id='my-event-log-out' onClick={LogOut}>
                            Log Out
                        </div>
                    </div>
                </ClickAwayListener>
            }
        </div>
    );
}
export default ProfileDropdownMenu;