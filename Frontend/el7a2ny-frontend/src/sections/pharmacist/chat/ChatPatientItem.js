import { Avatar, Box, InputAdornment, OutlinedInput, Stack, SvgIcon, Typography, Divider } from '@mui/material';

export const ChatPatientItem = (props) => {

    const { chat, patient, index, selectedChat, setSelectedChat, username, getMessages } = props;
    return (
        <Stack
            component="li"
            direction="row"
            onClick={() => { setSelectedChat(chat); getMessages(chat.chat._id); }}
            spacing={2}
            sx={{
                borderRadius: 2.5,
                cursor: 'pointer',
                px: 3,
                py: 2,
                '&:hover': {
                    backgroundColor: 'action.hover'
                },
                ...(selectedChat && selectedChat.patient &&selectedChat.patient.Username === patient.Username && {
                    backgroundColor: 'action.hover'
                })
            }}
        >
            <div>
            <Avatar alt={patient.FirstName + " " + patient.LastName} src={patient.Picture == null ? `/assets/avatars/${index % 16}.png` : patient.Picture} />
            </div>
            <Box sx={{flexGrow: 1,overflow: 'hidden'}}>
                <Typography variant='subtitle2' noWrap>
                    {patient.FirstName + " " + patient.LastName}
                </Typography>
                {chat.latestMessage && 
                <Typography color="text.secondary" noWrap sx={{ flexGrow: 1 }} variant="subtitle2">
                    {chat.latestMessage.sender == 'admin' ? "Me: " : ""} {chat.latestMessage.content}
                </Typography>}
            </Box>

        </Stack>
    );
};