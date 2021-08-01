import React, { useContext, useEffect, useState, useCallback } from 'react';

// Styling
import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
  useMediaQuery,
} from '@material-ui/core';
import theme from 'config/theme';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, opacify, rgba } from 'polished';
import { motion } from 'framer-motion';
import 'styled-components/macro';

// Forms
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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

// Scripts
// import script from 'python/script.py';
import useDidMountEffect from 'components/useDidMountEffect';
import { AppContext } from 'contexts/AppContext';
import useDidMount from 'components/useDidMount';
import { registerUser } from 'actions/authActions';
import { useNotificationQueue } from 'contexts/NotificationsContext';
import { UserContext } from 'contexts/UserContext';
import { useHistory } from 'react-router-dom';

// #region LEFT COLUMN
const SUP__LeftColumn = styled(Grid)`
  ${(props) => props.theme.breakpoints.down('sm')} {
    position: absolute;
    z-index: -1;
  }
`;
const SUP__LandingImageContainer = styled(GridContainer)`
  position: relative;
  ${(props) => props.theme.breakpoints.up('md')} {
    &:before {
      z-index: -1;
      background: ${(props) => props.theme._colors.blue};
      position: absolute;
      top: 0;
      left: calc(50% - clamp(25vw, 480px) / 2);
      transform: translate3d(0, -10%, 0);
      content: '';
      width: 25vw;
      height: 25vw;
      max-width: 480px;
      max-height: 480px;
      border-radius: 50%;
    }
  }
`;
const LandingImage = styled(motion.img)`
  width: 100%;
  height: 100%;
`;
const SUP__Heading = styled((props) => <Typography {...props} />)`
  color: ${(props) => props.theme._colors.brown};
  font-weight: 800;
`;
const SUP__Description = styled((props) => <Typography {...props} />)`
  color: ${(props) => props.theme._colors.brown};
`;
// #endregion

// #region RIGHT COLUMN
const SUP__RightColumn = styled(Grid)``;
const Logo = styled((props) => <Typography {...props}>neural.ly</Typography>)`
  font-family: Fredericka the Great;
  font-style: normal;
  font-weight: normal;
  /* font-size: 64px; */
  line-height: 78px;
  letter-spacing: 0.1em;
  color: #5551ff;
`;
const SUP__SignUpCard = styled(SpacedGridContainer)`
  ${(props) =>
    props.theme._funcs.card({
      variant: 'paper-1',
      bg: opacify(-0.04, props.theme._colors.white),
    })}
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
const SUP__TextInput = styled(
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

const SUP__RadioInput = styled(
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
    items,
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
          [name]: yup
            .string()
            .transform((value) => (value == 'false' ? '' : value))
            .typeError(`Please select an option.`)
            .required(),
        };
      }
      updateFormSchema(schema);
    });

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <GridContainer direction="column">
            <Grid item>
              <RadioGroup
                row
                {...field}
                onChange={(e) => {
                  field.onChange(String(e.target.value));
                }}
                {...props}
              >
                {items.map((optionText, jdx) => {
                  return (
                    <FormControlLabel
                      value={optionText}
                      key={jdx}
                      control={<Radio />}
                      label={
                        <Typography
                          variant="body2"
                          align="center"
                          // noWrap
                          css={`
                            display: flex;
                            align-items: center;
                          `}
                        >
                          {optionText}
                        </Typography>
                      }
                      labelPlacement="top"
                    />
                  );
                })}
              </RadioGroup>
            </Grid>
            <Grid item>
              <FormHelperText error={!!errors?.[name]}>
                {helperText || errors?.[name]?.message}
              </FormHelperText>
            </Grid>
          </GridContainer>
        )}
      />
    );
  }
)`
  .MuiIconButton-root {
  }
  .MuiIconButton-root:hover {
    background-color: ${(props) => rgba(props.theme._colors.blue, 0.05)};
  }
  .Mui-checked {
    color: ${(props) => props.theme._colors.blue};
    svg {
      color: ${(props) => props.theme._colors.blue};
    }
  }
`;
// #endregion

const SignUpPage = styled(({ ...props }) => {
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
      pageTitle: 'Sign Up | neural.ly',
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
      ...data,
    };
    registerUser(userData, dispatch, notification); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
  };

  //   #region SIGN UP CARD
  const SignUpCard = (
    <>
      {/* Sign Up Card */}
      <SUP__SignUpCard spacing={2}>
        {/* Logo */}
        <Grid item xs={12} zeroMinWidth>
          <Logo
            align="center"
            variant={isXSmall ? 'h2' : isSmall ? 'h2' : 'h3'}
            noWrap
          />
        </Grid>

        <Grid item xs={12}>
          <Typography align="center" variant="h5">
            Create your account
          </Typography>
        </Grid>

        {/* Form */}
        <Grid item xs={10}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <SpacedGridContainer justifyContent="flex-start" spacing={2}>
              {/* Name */}
              <Grid item xs={12}>
                <SpacedGridContainer>
                  <Grid item xs={12}>
                    <FormLabel variant="h6">Name</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <SUP__TextInput
                      fullWidth
                      name="name"
                      required
                      validationSchema={{
                        email: yup.string().required(),
                      }}
                      {...formElementProps}
                    />
                  </Grid>
                </SpacedGridContainer>
              </Grid>

              {/* Email */}
              <Grid item xs={12}>
                <SpacedGridContainer>
                  <Grid item xs={12}>
                    <FormLabel variant="h6">Email address</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <SUP__TextInput
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
                    <SUP__TextInput
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

              {/* Password */}
              <Grid item xs={12}>
                <SpacedGridContainer>
                  <Grid item xs={12}>
                    <FormLabel variant="h6">I am a ...</FormLabel>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container justifyContent="space-evenly">
                      <SUP__RadioInput
                        name="userType"
                        required
                        items={['Patient', 'Clinician']}
                        validationSchema={{
                          userType: yup
                            .string()
                            .transform((value) =>
                              value == 'false' ? '' : value
                            )
                            .transform((value) => value.toLowerCase())
                            .typeError(`Please select an option.`)
                            .required(),
                        }}
                        {...formElementProps}
                      />
                    </Grid>
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
                    Sign Up
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

        {/* Already have an account? Sign in */}
        <Grid item xs={12}>
          <Box py={2}>
            <Typography variant="h6" align="center" gutterBottom>
              Already have an account? &nbsp; <Link to="/">Sign in</Link>
            </Typography>
          </Box>
        </Grid>
      </SUP__SignUpCard>
    </>
  );
  //#endregion

  return (
    <PageContainer alignContent="center" {...props}>
      {/* <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} /> */}
      <Grid item xs={11}>
        <SpacedGridContainer
          spacing={isSmall ? 4 : 0}
          direction={isSmall ? 'column' : 'row'}
        >
          {/* Left */}
          <SUP__LeftColumn item xs={12} md={6}>
            <SpacedGridContainer
              alignItems="center"
              justifyContent="center"
              alignContent="center"
              spacing={4}
            >
              <Grid item>
                <SUP__LandingImageContainer>
                  <LandingImage src={'img/signup.svg'} />
                </SUP__LandingImageContainer>
              </Grid>
              <Grid item>
                <SUP__Heading align="left" variant="h2"></SUP__Heading>
              </Grid>
            </SpacedGridContainer>
          </SUP__LeftColumn>

          {/* Right */}
          <SUP__RightColumn item xs={12} md={6}>
            <Grid container justifyContent="center">
              <Grid item xs={12} sm={8} md={10} lg={8} xl={6}>
                {SignUpCard}
              </Grid>
            </Grid>
          </SUP__RightColumn>
        </SpacedGridContainer>
      </Grid>
      {/* <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} /> */}
    </PageContainer>
  );
})`
  position: relative;
`;

export default SignUpPage;
