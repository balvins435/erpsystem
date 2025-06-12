import { Drawer, List, ListItem, ListItemText, Toolbar } from "@mui/material";

const Sidebar = () => {
    return (
        <Drawer variant="permanent" anchor="left">
            <Toolbar />
            <List>
                <ListItem button component="a" href="/dashboard">
                    <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button component="a" href="/transactions">
                    <ListItemText primary="Transactions" />
                </ListItem>
                <ListItem button component="a" href="/reports">
                    <ListItemText primary="Reports" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
