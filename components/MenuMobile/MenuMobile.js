import React from 'react';
import { Container, Grid, Icon, Menu, Dropdown, Divider } from 'semantic-ui-react';

const MenuMobile = ({ show = false , setShow }) => {
    return (
        <div className={`menu-mobile ${show ? '' : 'menu-mobile-hide'}`}>
            <section className="menu-mobile__actions">
                <Icon name="close" size="big"  onClick={() => setShow(false)} />
            </section>
            <Divider />
            <Menu vertical>
                <Menu.Item>Tutorial</Menu.Item>
                <Menu.Item>Materiales</Menu.Item>
                <Dropdown item text='Recursos'>
                    <Dropdown.Menu direction="left">
                        <Dropdown.Item>Electronics</Dropdown.Item>
                        <Dropdown.Item>Automotive</Dropdown.Item>
                        <Dropdown.Item>Home</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item>Servicios</Menu.Item>
                <Menu.Item>Blog</Menu.Item>
                <Menu.Item>Tutoriales</Menu.Item>
            </Menu>
       </div>
    );
};

export default MenuMobile;