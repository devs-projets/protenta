// "use client";

// import * as React from "react";
// // import Box from "@mui/material/Box";
// // import Drawer from "@mui/material/Drawer";
// // import Button from "@mui/material/Button";
// // import List from "@mui/material/List";
// // import Divider from "@mui/material/Divider";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// import SettingTabs from "./SettingTabs";

// const Setting = () => {
//   const [state, setState] = React.useState({
//     right: false,
//   });

//   const tabData = [
//     {
//       id: "actionnaires",
//       label: "Actionnaires",
//       content: "Actionnaires Tab",
//     },
//     {
//       id: "limites",
//       label: "Limites",
//       content: "Limites Tab",
//     },
//   ];

//   const toggleDrawer =
//     (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
//       if (
//         event.type === "keydown" &&
//         ((event as React.KeyboardEvent).key === "Tab" ||
//           (event as React.KeyboardEvent).key === "Shift")
//       ) {
//         return;
//       }

//       setState({ ...state, right: open });
//     };

//   const list = () => (
//     <Box
//       sx={{ width: 250 }}
//       role="presentation"
//       onClick={toggleDrawer(false)}
//       onKeyDown={toggleDrawer(false)}
//     >
//       <List>
//         {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//       <Divider />
//       <List>
//         {["All mail", "Trash", "Spam"].map((text, index) => (
//           <ListItem key={text} disablePadding>
//             <ListItemButton>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );
//   return (
//     <div>
//       {/* Bouton pour ouvrir le Drawer à droite */}
//       <button
//         className="bg-green-600 text-white p-2 rounded-tl-lg rounded-bl-lg"
//         onClick={toggleDrawer(true)}
//       >
//         Params
//         {/* <Button onClick={toggleDrawer(true)}>Params</Button> */}
//       </button>
//       <Drawer anchor="right" open={state.right} onClose={toggleDrawer(false)}>
//         <div className="bg-red-300 h-full">
//           <div className="w-96">
//             <h2 className="text-2xl text-center font-bold mt-3">Paramètre</h2>
//             <hr className="my-3" />
//           </div>
//           <SettingTabs tabData={tabData} />
//         </div>
//         {/* {list()} */}
//       </Drawer>
//     </div>
//   );
// };

// export default Setting;
