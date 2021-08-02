import React, { useContext, useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

// Styling
import {
  Box,
  Button,
  Divider,
  Grid,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import theme from 'config/theme';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// Contexts
import { AppContext } from 'contexts/AppContext';
import { UserContext } from 'contexts/UserContext';
import { useNotificationQueue } from 'contexts/NotificationsContext';

// Components
import { Scheduler } from '@aldabil/react-scheduler';

// Helpers
import {
  ClearBlock,
  GridContainer,
  GridItem,
  Link,
  PageContainer,
  SpacedGridContainer,
} from 'components/styles/global';

// Hooks
import useDidMountEffect from 'components/useDidMountEffect';
import useDidMount from 'components/useDidMount';

// Scripts and actions
// import script from 'python/script.py';
import { loginUser } from 'actions/authActions';

// Plotting
import Chart from 'react-apexcharts';

// Scripts
import script from 'python/script.py';

const updateVisualizer = ({
  pythonFile,
  loadedNumpy,
  slidersNamespace,
  setData,
}) => {
  if (pythonFile && loadedNumpy) {
    window.pyArgs = { ...slidersNamespace };
    const runPyScript = window.pyodide.runPython(pythonFile);
    const gen_data = window.pyodide.runPython(`generate_data()`);
    const get_data = window.pyodide.runPython(`get_data()`);
    console.log(get_data);

    // setData();

    setData(get_data);

    // setData(output.toJs())

    return () => {
      runPyScript.destroy();
      gen_data.destory();
      get_data.destroy();
      // output.destroy();
      // generate_data.destroy();
    };
  }
};

const GamePage = styled(({ ...props }) => {
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // Set layout options (e.g. page title, dispaly header, etc.)
  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'neural.ly - neurofeedback from home.',
      hideHeader: false,
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const [pythonFile, setPythonFile] = useState(null);
  const [loadedNumpy, setLoadedNumpy] = useState(false);
  const [data, setData] = useState([]);

  //   Slider vars
  const [tAmp, setTAmp] = useState(0.2);
  const [bAmp, setBAmp] = useState(0.2);
  const [sliderUpdateComplete, setSliderUpdateComplete] = useState(true);
  const [slidersNamespace, setSlidersNamespace] = useState({
    epochDuration: 0.25,
    samplingRate: 512,
    tAmp: tAmp, // 0 - 0.5 mV
    tFreq: 5, // 3.5 - 7
    tNoise: 1, // 0 - 10
    bAmp: bAmp, // 0 - 0.5 mV
    bFreq: 15, // 12 - 20
    bNoise: 1, // 0 - 10
  });

  const [sliderConfigs, setSliderConfigs] = useState({ minAmp: 0, maxAmp: 10 });

  useEffect(() => {
    if (!pythonFile || !loadedNumpy) {
      window.languagePluginLoader.then(() => {
        fetch(script)
          .then((src) => src.text())
          .then((code) => setPythonFile(code))
          .then(() =>
            window.pyodide
              .loadPackage(['numpy'])
              .then(() => setLoadedNumpy(true))
          );
      });
    }
  }, [loadedNumpy, pythonFile]);

  const visualizeData = useCallback(() => {
    // Once python script and numpy have been loaded
    updateVisualizer({ pythonFile, loadedNumpy, slidersNamespace, setData });
  }, [pythonFile, loadedNumpy]);

  useDidMountEffect(() => {
    if (
      pythonFile &&
      loadedNumpy &&
      data &&
      slidersNamespace &&
      !sliderUpdateComplete
    ) {
      //   console.log(slidersNamespace.bAmp, slidersNamespace.tAmp);
      // window.pyodide.registerJsModule('sliders_namespace', slidersNamespace);
      updateVisualizer({ pythonFile, loadedNumpy, slidersNamespace, setData });
      setSliderUpdateComplete(true);
    }
  }, [pythonFile, loadedNumpy, data, slidersNamespace, sliderUpdateComplete]);

  const sliderCB = (value, type) => {
    let sliders_namespace = {
      ...slidersNamespace,
      tAmp: type === 'theta' ? value : slidersNamespace.tAmp, // 0 - 0.5 mV
      bAmp: type === 'beta' ? value : slidersNamespace.bAmp, // 0 - 0.5 mV
    };
    setSlidersNamespace(sliders_namespace);
    setSliderUpdateComplete(false);
  };

  const chartData = {
    options: {
      chart: {
        id: 'data',
      },
      xaxis: {
        type: 'numeric',
      },
      yaxis: {
        decimalsInFloat: 2,
      },
    },
    series: [
      {
        name: 'series-1',
        data: data,
      },
    ],
  };

  const Phaser = require('phaser');
  const PreloadScene =
    require('../games/lifting/scripts/scenes/preloadScene.js').default;
  const MainScene =
    require('../games/lifting/scripts/scenes/mainScene.js').default;

  const DEFAULT_WIDTH = 1280;
  const DEFAULT_HEIGHT = 720;

  const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    loaderBaseURL: '%PUBLIC_URL%',
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
    },
    scene: [PreloadScene, MainScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 400 },
      },
    },
  };

  useEffect(() => {
    if (!window.liftingGame) window.liftingGame = new Phaser.Game(config);

    return () => {
      window.liftingGame.destroy();
      window.liftingGame = null;
    };
  }, [Phaser, PreloadScene, MainScene]);

  // User state change listeners
  //   useDidMountEffect(() => {
  //     if (userCtx.auth.isAuthenticated) {
  //       history.push('/user/dashboard');
  //     }
  //   }, [userCtx.auth?.isAuthenticated]);

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      {/* <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} /> */}
      <Grid item xs={11} md={6}>
        <SpacedGridContainer
          spacing={isSmall ? 4 : 0}
          direction={isSmall ? 'column' : 'row'}
        >
          <Grid item xs={12}>
            <GridContainer
              css={`
                &,
                *,
                > canvas {
                  width: 100%;
                  height: 100%;
                }
              `}
            >
              <Grid item id="phaser-game"></Grid>
            </GridContainer>
          </Grid>
        </SpacedGridContainer>
      </Grid>
      <Grid item xs={11} md={6}>
        <Grid container justifyContent="center">
          <Grid item xs={12} sm={8} md={6}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
            />
          </Grid>
          <ClearBlock pb={10} />
          <Grid item xs={8}>
            <SpacedGridContainer spacing={4} justifyContent="center">
              <Grid item xs={6}>
                <GridContainer>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="initial" align="center">
                      Theta amplitude
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Slider
                      //   defaultValue={0.2}
                      value={slidersNamespace.tAmp}
                      step={0.1}
                      min={sliderConfigs.minAmp}
                      max={sliderConfigs.maxAmp}
                      valueLabelDisplay="auto"
                      onChange={(e, v) => sliderCB(v, 'theta')}
                    />
                  </Grid>
                </GridContainer>
              </Grid>
              <Grid item xs={6}>
                <GridContainer>
                  <Grid item xs={12}>
                    <Typography variant="h6" color="initial" align="center">
                      Beta amplitude
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Slider
                      //   defaultValue={0.2}
                      value={slidersNamespace.bAmp}
                      step={0.1}
                      min={sliderConfigs.minAmp}
                      max={sliderConfigs.maxAmp}
                      valueLabelDisplay="auto"
                      onChange={(e, v) => sliderCB(v, 'beta')}
                    />
                  </Grid>
                </GridContainer>
              </Grid>
            </SpacedGridContainer>
          </Grid>
        </Grid>
      </Grid>
      {/* <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} /> */}
    </PageContainer>
  );
})``;

export default GamePage;
