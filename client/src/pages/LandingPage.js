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

// Helpers
import { docReady, checkVisible } from 'utils/helpers';

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

// #region LEFT COLUMN
const LP__LeftColumn = styled(Grid)``;
const LP__LightBlueCircleBackground = styled(motion.div)`
  ${(props) => props.theme.breakpoints.up('md')} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    &:before {
      z-index: -1;
      background: ${(props) => props.theme._colors.lightblue};
      position: absolute;
      top: 0px;
      left: 50%;
      transform: translate3d(-45%, -25%, 0);
      ${(props) => props.theme.breakpoints.only('xl')} {
        margin-left: -35%;
      }
      ${(props) => props.theme.breakpoints.only('lg')} {
        margin-left: -40%;
        transform: translate3d(-45%, -25%, 0);
      }
      ${(props) => props.theme.breakpoints.down('md')} {
        margin-left: -48%;
        transform: translate3d(-40%, -5%, 0);
      }
      content: '';
      width: 80vw;
      height: 80vw;
      max-height: 1400px;
      border-radius: 50%;
      overflow: hidden;
    }
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    position: relative;
    width: 100%;
    &:before {
      z-index: -1;
      background: ${(props) => props.theme._colors.lightblue};
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      transform: translate3d(0px, 20%, 0);
      content: '';
      width: clamp(95vw, 95vw, 500px);
      height: clamp(95vw, 95vw, 500px);
      border-radius: 50%;
      overflow: hidden;
    }
  }
`;
const LP__LandingImageContainer = styled(GridContainer)`
  position: relative;
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: ${(props) => props.theme._colors.blue};
      position: absolute;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(0, -30%, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 480px;
      max-height: 480px;
      border-radius: 50%;
    }
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    &:before {
      z-index: -1;
      background: ${(props) => props.theme._colors.blue};
      position: absolute;
      top: 0;
      left: calc(50% - clamp(50vw, 800px) / 2);
      transform: translate3d(0, -30%, 0);
      content: '';
      width: 50vw;
      height: 50vw;
      max-width: 800px;
      max-height: 800px;
      border-radius: 50%;
    }
  }
`;
const LandingImage = styled(motion.img)`
  width: 50%;
  height: 50%;
`;
const LP__Heading = styled((props) => <Typography {...props} />)`
  color: ${(props) => props.theme._colors.brown};
  font-weight: 800;
`;
const LP__Description = styled((props) => <Typography {...props} />)`
  color: ${(props) => props.theme._colors.brown};
`;
// #endregion

// #region RIGHT COLUMN
const LP__RightColumn = styled(Grid)``;
const Logo = styled((props) => <Typography {...props}>neural.ly</Typography>)`
  font-family: Fredericka the Great;
  font-style: normal;
  font-weight: normal;
  /* font-size: 64px; */
  line-height: 78px;
  letter-spacing: 0.1em;
  color: #5551ff;
`;
const LP__LoginCard = styled(SpacedGridContainer)`
  ${(props) => props.theme._funcs.card({ variant: 'paper-1' })}
`;
// Form Inputs
const FormLabel = styled(Typography)`
  color: ${(props) => props.theme._colors.text};
  font-weight: 500;
`;
const CTAButton = styled(Button)`
  .MuiButton-label {
    letter-spacing: 0.25rem;
  }
  /* padding: 18px 77px; */
  padding-top: ${(props) => props.theme.spacing(2)}px;
  padding-bottom: ${(props) => props.theme.spacing(2)}px;
  background: ${(props) => props.theme._colors.blue};
  background: linear-gradient(
    0deg,
    rgba(84, 82, 255, 1) 0%,
    rgba(97, 94, 255, 1) 100%
  );
  border-radius: 5px;
  font-weight: bold;
  color: #fff;
  &:hover {
  }
`;
const LP__TextInput = styled(
  ({
    // RHF
    reset,
    getValues,
    setValue,
    register,
    control,
    errors,
    formSchema,
    setFormSchema,
    updateFormSchema,
    // ENDRHF
    name,
    label,
    required,
    helperText,
    defaultValue,
    validationSchema,
    ...props
  }) => {
    useDidMount(() => {
      let schema = {};
      if (typeof validationSchema === 'object') {
        schema = validationSchema;
      } else {
        schema = {
          [name]: yup.string().required(),
        };
      }
      updateFormSchema(schema);
    });

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue || ''}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            name={name}
            variant={'outlined'}
            error={errors?.[name] ? true : false}
            required={required}
            label={label}
            helperText={helperText || errors?.[name]?.message}
            type="string"
            {...props}
          />
        )}
      />
    );
  }
)`
  .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline,
  .MuiOutlinedInput-notchedOutline {
    /* border-color: rgba(0, 0, 0, 0.23); */
    border-color: ${(props) => props.theme._colors.blue};
  }

  .MuiOutlinedInput-root.Mui-focused:not(.Mui-error)
    > .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme._colors.blue};
    color: ${(props) => props.theme._colors.blue};
    transition: border-color 200ms, color 200ms;
  }

  .MuiOutlinedInput-root.Mui-error > .MuiOutlinedInput-notchedOutline {
    border-color: ${(props) => props.theme._colors.red};
    color: ${(props) => props.theme._colors.red};
    transition: border-color 200ms, color 200ms;
  }
`;
// #endregion

const LandingPage = styled(({ ...props }) => {
  const history = useHistory();
  const [formSchema, setFormSchema] = useState({});
  const updateFormSchema = (newItem) => {
    setFormSchema((prevFormSchema) => ({ ...prevFormSchema, ...newItem }));
  };
  const {
    handleSubmit,
    reset,
    setValue,
    getValues,
    control,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {},
    // mode: 'onBlur',
    resolver: yupResolver(yup.object().shape(formSchema)),
  });
  const formElementProps = {
    reset,
    getValues,
    setValue,
    register,
    control,
    errors,
    formSchema,
    setFormSchema,
    updateFormSchema,
  };

  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // Set layout options (e.g. page title, dispaly header, etc.)
  useEffect(() => {
    appCtx.setMainLayoutOptions({
      pageTitle: 'neural.ly - neurofeedback from home.',
      hideHeader: true,
    });
  }, [appCtx.setMainLayoutOptions]);

  //   Screen size
  const isXSmall = useMediaQuery(theme.breakpoints.down('xs'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  // User state change listeners
  useDidMountEffect(() => {
    if (userCtx.auth.isAuthenticated) {
      history.push('/user/dashboard');
    }
  }, [userCtx.auth?.isAuthenticated]);

  //   Form submission handling
  const onSubmit = (data) => {
    const userData = {
      email: data.email,
      password: data.password,
    };
    loginUser(userData, dispatch, notification); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  //   #region LOGIN CARD
  const LoginCard = (
    <>
      {/* Login Card */}
      <LP__LoginCard spacing={2}>
        {/* Logo */}
        <Grid item xs={12} zeroMinWidth>
          <Logo
            align="center"
            variant={isXSmall ? 'h2' : isSmall ? 'h2' : 'h3'}
            noWrap
          />
        </Grid>

        {/* Form */}
        <Grid item xs={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SpacedGridContainer justifyContent="flex-start" spacing={2}>
              {/* Email */}
              <Grid item xs={12}>
                <SpacedGridContainer>
                  <Grid item xs={12}>
                    <FormLabel variant="h6">Email address</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <LP__TextInput
                      fullWidth
                      name="email"
                      required
                      validationSchema={{
                        email: yup.string().email().required(),
                      }}
                      {...formElementProps}
                    />
                  </Grid>
                </SpacedGridContainer>
              </Grid>

              {/* Password */}
              <Grid item xs={12}>
                <SpacedGridContainer>
                  <Grid item xs={12}>
                    <FormLabel variant="h6">Password</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <LP__TextInput
                      fullWidth
                      name="password"
                      type="password"
                      required
                      validationSchema={{
                        password: yup.string().required(),
                      }}
                      {...formElementProps}
                    />
                  </Grid>
                </SpacedGridContainer>
              </Grid>

              {/* Login Button*/}
              <Grid item xs={12}>
                <Box py={2}>
                  <CTAButton
                    fullWidth
                    size="large"
                    type="submit"
                    //   onClick={}
                  >
                    Sign In
                  </CTAButton>
                </Box>
              </Grid>
            </SpacedGridContainer>
          </form>
        </Grid>

        {/* Divider */}
        <Grid item xs={12}>
          <SpacedGridContainer>
            <Grid item xs={10} md={9}>
              <Divider />
            </Grid>
          </SpacedGridContainer>
        </Grid>

        {/* Don't have an account? Sign up */}
        <Grid item xs={12}>
          <Box py={2}>
            <Typography variant="h6" align="center" gutterBottom>
              Don’t have an account? &nbsp; <Link to="/signup">Sign up</Link>
            </Typography>
          </Box>
        </Grid>
      </LP__LoginCard>
    </>
  );
  //#endregion

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <LP__LightBlueCircleBackground />
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
      <Grid item xs={11}>
        <SpacedGridContainer
          spacing={isSmall ? 4 : 0}
          direction={isSmall ? 'column' : 'row'}
        >
          {/* Left */}
          <LP__LeftColumn item xs={12} md={6}>
            <SpacedGridContainer
              alignItems="flex-start"
              direction="column"
              spacing={4}
            >
              <Grid item>
                <LP__LandingImageContainer>
                  <LandingImage src={'img/landing.svg'} />
                </LP__LandingImageContainer>
              </Grid>
              <Grid item>
                <LP__Heading align="left" variant="h2">
                  Neurofeedback from home.
                </LP__Heading>
              </Grid>
              <Grid item>
                <LP__Description variant="h4">
                  Connect with a healthcare provider to access powerful
                  neurofeedback therapies, delivered right to your browser.
                  <br />
                  <Link to="/about">Learn more.</Link>
                </LP__Description>
              </Grid>
            </SpacedGridContainer>
          </LP__LeftColumn>

          {/* Right */}
          <LP__RightColumn item xs={12} md={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={10} lg={8} xl={6}>
                {LoginCard}
              </Grid>
            </Grid>
          </LP__RightColumn>
        </SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
    </PageContainer>
  );
})`
  position: relative;
`;

export default LandingPage;
