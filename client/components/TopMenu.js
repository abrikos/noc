import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, UncontrolledDropdown,} from "reactstrap";
import {A, navigate, usePath} from "hookrouter";
import "client/style/navbar.sass"
import logo from "client/images/logo-text.svg"
import YouTube from "client/images/youtube.svg"
import Instagram from "client/images/instagram.svg"

export default function TopMenu(props) {
    const [menuPulled, pullMenu] = useState(false);
    const currentPath = usePath();

    function isActive(path) {
        return path === currentPath;
    }

    return (
        <Navbar light expand="md">
            <NavbarBrand href='#' onClick={e => navigate('/')} className='mr-auto site-logo'>
                <img src={logo} alt="logo" className="logo"/>
            </NavbarBrand>
            <NavbarToggler onClick={e => pullMenu(!menuPulled)} className="dark"/>
            <Collapse isOpen={menuPulled} navbar>
                <Nav className="m-auto" navbar>
                    {props.items.map((item, i) => {
                        if (item.hidden) return <span key={i}></span>;
                        return item.items ? <UncontrolledDropdown nav inNavbar key={i}>
                                <DropdownToggle nav caret>
                                    {item.label}
                                </DropdownToggle>
                                <DropdownMenu>
                                    {item.items.map((itemSub, i) => {
                                        const ps = itemSub.path ? {href: itemSub.path} : itemSub.onClick ? {href: '#', onClick: itemSub.onClick} : {href: '#'}
                                        return <DropdownItem key={i}>
                                            <A {...ps}>{itemSub.label}</A>
                                        </DropdownItem>
                                    })}
                                </DropdownMenu>
                            </UncontrolledDropdown>
                            :
                            <NavItem key={i} active={isActive(item.path)}>
                                <A href={item.path || '#'} onClick={item.onClick} className={'nav-link'}>{item.label}</A>
                            </NavItem>
                    })}


                    {/*<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Language')}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => langSwitch('ru')}>
                                    RU
                                </DropdownItem>
                                <DropdownItem onClick={() => langSwitch('en')}>
                                    EN
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>*/}

                </Nav>
                <Nav>
                    <NavItem >
                        <A href="/search" className={'nav-link'}><span role="img" aria-label="Search">🔍</span></A>
                    </NavItem>
                    <NavItem >
                        <a href="https://www.instagram.com/academy_of_sciences" target="_blank" rel="noopener noreferrer" className={'nav-link svg-circle'}><img src={Instagram} alt="Instagram"/></a>
                    </NavItem>
                    <NavItem >
                        <a href="https://www.youtube.com/channel/UC-ACL2rOnpLvtNYw9HZJQKQ" target="_blank" rel="noopener noreferrer" className={'nav-link svg-circle'}><img src={YouTube} alt="Видео"/></a>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );

}

TopMenu.propTypes = {
    items: PropTypes.array.isRequired,
    title: PropTypes.string
};
