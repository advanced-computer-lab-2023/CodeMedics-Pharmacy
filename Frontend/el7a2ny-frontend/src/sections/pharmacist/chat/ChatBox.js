import PaperAirplaneIcon from '@heroicons/react/24/solid/PaperAirplaneIcon';
import { Stack, Box, Container, Divider, Unstable_Grid2 as Grid, Typography, Avatar, Card, OutlinedInput, InputAdornment, SvgIcon, IconButton, Tooltip } from '@mui/material';
import { Message } from './Message';
import { ChatBoxTop } from './ChatBoxDoctor-top';
import { Chat } from '@mui/icons-material';
import{ ChatMessages } from './ChatMessages';
import { Scrollbar } from 'src/components/scrollbar';
import { ChatMessageAdd } from './ChatMessageAdd';
import { ChatBoxPatientTop } from './ChatBoxPatient-top';

export const ChatBox = (props) => {
    const { selectedChat, messages, username ,  sendMessage} = props;
    return (
        <Stack sx={{ flexGrow: 1 }}>
            {selectedChat && selectedChat.doctor && <ChatBoxTop selectedChat={selectedChat} />}
            {selectedChat && selectedChat.patient && <ChatBoxPatientTop selectedChat={selectedChat} />}
            <Divider />
            <Box
                sx={{
                    flexGrow: 1,
                    overflow: 'hidden',
                    height: 420
                }}
            >
                <Scrollbar
                    sx={{ maxHeight: '100%' }}
                >
                   <ChatMessages messages={messages} username={username}/>
                </Scrollbar>
            </Box>
            <Divider />
            <ChatMessageAdd selectedChat={selectedChat} onSend={sendMessage}/>
        </Stack>
    );
};