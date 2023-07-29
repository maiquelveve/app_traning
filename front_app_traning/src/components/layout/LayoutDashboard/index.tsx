import { useState } from "react";
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Divider, 
  Drawer, 
  IconButton, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon,
  ListItemText, 
  Paper, 
  Stack, 
  Toolbar, 
  Typography 
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";

import { FabChangeMode } from "../../FabChangeMode";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

const menus = (
  <Stack flex={1}>
    <List>
      {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {["All mail", "Trash", "Spam"].map((text, index) => (
        <ListItem key={text} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  </Stack>
);

export const LayoutDashboard: React.FC<IAppProps & Props>= ({ window, children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const container = window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <FabChangeMode />
      <CssBaseline />
      <Box
        component="main"
        height="100vh"
        flexDirection="column"
        sx={{
          display: "flex",
          flex: "1 1 auto",
        }}
      >
        <Box sx={{ display: "flex"}} >
          <AppBar
            position="fixed"
            sx={{
              ml: { sm: `${drawerWidth}px` },
              backgroundColor: "",
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap component="div">
                Responsive drawer
              </Typography>
            </Toolbar>
          </AppBar>
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            aria-label="mailbox folders"
          >
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
            >
              {menus}
            </Drawer>
            <Drawer
              variant="permanent"
              sx={{
                display: { xs: "none", sm: "block" },
                width: drawerWidth,
                "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
              }}
              open
            >
              <Toolbar />
              <Box sx={{ overflow: "auto" }}>
                {menus}
              </Box>
            </Drawer>
          </Box>
      
          <Box component="main" sx={{ flexGrow: 1, p: 2, width: { sm: `calc(100% - ${drawerWidth}px)` }}}>
            <Toolbar />
            <Box
              component={Paper}
              p={2}
              flexDirection="column"
            >
              {children}
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
