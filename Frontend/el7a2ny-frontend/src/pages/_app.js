import Head from 'next/head';
import { CacheProvider } from '@emotion/react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline, IconButton } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import socket from 'src/components/socket';
import { SettingsConsumer, SettingsProvider } from '../contexts/settings-context';
import { Tooltip, SvgIcon } from '@mui/material';
import SunIcon from '@heroicons/react/24/solid/SunIcon';
import MoonIcon from '@heroicons/react/24/solid/MoonIcon';
import { useState } from 'react';

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);
  const [icon , setIcon] = useState(true);

  useEffect(() => {
    if (Cookies.get('username') !== undefined) {
      socket.on('me', (id) => {
        Cookies.set('socketID', id);
      });
      socket.emit('iAmReady', Cookies.get('username'));
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          El7a2ny Pharmacy
        </title>
        <meta
          name="viewport"
          content="initial-scale=1, width=device-width"
        />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AuthProvider>



          <AuthConsumer>
            {
              (auth) => (
                <SettingsProvider>
                  <SettingsConsumer>
                    {
                      (settings) => {
                        
                        const theme = createTheme({
                          mode: settings.mode,
                        });
                        return (
                          <ThemeProvider theme={theme}>
                            <CssBaseline />
                            {auth.isLoading
                              ? <SplashScreen />
                              :
                              (
                                <>
                                  {getLayout(<Component {...pageProps} />)}
                                  <Tooltip title="More options">
                                    <IconButton
                                      onClick={() => { 
                                        settings.handleUpdate({ mode: settings.mode === 'dark' ? 'light' : 'dark' });
                                        setIcon(!icon);
                                      }}
                                      sx={{
                                        backgroundColor: 'background.paper',
                                        borderRadius: '50%',
                                        bottom: -13,
                                        boxShadow: 16,
                                        margin: (theme) => theme.spacing(4),
                                        position: 'fixed',
                                        right: 0,
                                        zIndex: (theme) => theme.zIndex.speedDial
                                      }}
                                    >
                                      <SvgIcon>
                                        {!icon && <MoonIcon />}
                                        {icon && <SunIcon />}
                                      </SvgIcon>
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                          </ThemeProvider>
                        );
                      }
                    }
                  </SettingsConsumer>
                </SettingsProvider>
              )
            }
          </AuthConsumer>

        </AuthProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
