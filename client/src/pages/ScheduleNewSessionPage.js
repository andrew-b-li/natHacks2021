import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { useHistory, useParams } from 'react-router-dom';

// Styling
import {
  Typography,
  Grid,
  Divider,
  Box,
  Badge,
  Avatar,
  IconButton,
  TextField,
  Checkbox,
  Select,
  MenuItem,
  Switch,
  RadioGroup,
  FormControlLabel,
  Radio,
  Slider,
  FormControl,
  FormLabel,
  FormGroup,
  Button,
  FormHelperText,
  Fade,
  Slide,
  makeStyles,
  useMediaQuery,
  Chip,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import theme from 'config/theme';
import styled, { css, keyframes } from 'styled-components';
import { darken, getLuminance, lighten, mix, rgba } from 'polished';
import { AnimatePresence, motion } from 'framer-motion';
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
import { DateTimePicker } from '@material-ui/pickers';

// Helpers
import {
  ClearBlock,
  GridContainer,
  GridItem,
  Link,
  MotionGrid,
  PageContainer,
  SpacedGridContainer,
  CTAButton,
} from 'components/styles/global';
import moment from 'moment';

// Hooks
import useDidMountEffect from 'components/useDidMountEffect';
import useDidMount from 'components/useDidMount';

// Scripts and actions
// import script from 'python/script.py';
import { loginUser } from 'actions/authActions';
import { fetchUserById, getUserById } from 'actions/userActions';
import { addEventToPatientCalendar } from 'actions/userActions';

const SNSP__DateTimeInput = styled(
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
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateChange = (v) => {
      setSelectedDate(v);
      return v;
    };

    useDidMount(() => {
      let schema = {};
      if (typeof validationSchema === 'object') {
        schema = validationSchema;
      } else {
        schema = {
          [name]: yup.string().required(`Please complete this item continue.`),
        };
      }
      updateFormSchema(schema);
    });

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={selectedDate}
        render={({ field, fieldState }) => {
          const { ref, ...remainingFieldProps } = field;
          return (
            <GridContainer>
              <Grid item>
                <DateTimePicker
                  {...remainingFieldProps}
                  value={selectedDate}
                  onChange={(v) => field.onChange(handleDateChange(v))}
                />
              </Grid>
              <Grid item>
                <FormHelperText error={!!errors?.[name]}>
                  {helperText || errors?.[name]?.message}
                </FormHelperText>
              </Grid>
            </GridContainer>
          );
        }}
      />
    );
  }
)``;

const SNSP__RadioInput = styled(
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

const SNSP__AutoInput = styled(
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
    multiple,
    min = 1,
    max = 1,
    placeholder,
    selectCallback = () => {},
    textfieldProps,
    autocompleteProps,
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
            .array()
            .of(yup.object())
            .required(`Please complete this item to continue.`)
            .typeError(`Please select a valid option.`)
            .min(
              min || 0,
              `Please select at least ${min} option${min > 1 ? 's' : ''}.`
            )
            .max(
              max || items?.length || Infinity,
              `Please select at most ${max} option${max > 1 ? 's' : ''}.`
            )
            .nullable(false),
        };
      }
      updateFormSchema(schema);
    });

    // const [inputValue, setInputValue] = useState('');
    // const [checkedValues, setCheckedValues] = useState(getValues(name) || []);
    // const handleSelect = (newValues) => {
    //   console.log(newValues);
    //   setCheckedValues(newValues);
    //   selectCallback(newValues);
    //   return newValues;
    // };

    const [inputValue, setInputValue] = useState('');
    const [checkedValues, setCheckedValues] = useState(getValues(name) || []);
    const handleSelect = (givenNewValues) => {
      let newValues = givenNewValues;
      //   if (!multiple) {
      //     newValues = [givenNewValues];
      //   }
      console.log(newValues);
      setCheckedValues(newValues);
      return newValues;
    };

    const CheckBoxGroupCss = css``;

    return (
      <SpacedGridContainer>
        <Grid item xs={12}>
          <Controller
            name={name}
            control={control}
            // defaultValue={checkedValues}
            render={({ field }) => (
              <>
                <Autocomplete
                  {...field}
                  multiple={true}
                  id={name}
                  options={items || []}
                  onChange={(e, v, r) => {
                    field.onChange(handleSelect(v));
                  }}
                  value={field.value || []}
                  disableCloseOnSelect
                  getOptionLabel={(option) => String(option.label || '')}
                  getOptionSelected={(option, value) =>
                    option.label == value.label
                  }
                  renderOption={(option, { selected }) => (
                    <GridContainer justifyContent="space-evenly" spacing={0}>
                      <Grid item xs={4}>
                        {/* <GridContainer justifyContent="center"> */}
                        <Box
                          sx={{
                            position: 'relative',
                            display: 'block',
                            width: '80px',
                            minHeight: '80px',
                            backgroundColor: theme._colors.grey,
                          }}
                        >
                          &nbsp;
                        </Box>
                        {/* </GridContainer> */}
                      </Grid>
                      <Grid item xs={8}>
                        <SpacedGridContainer spacing={1}>
                          <Grid item>
                            <Typography variant="h5">{option.label}</Typography>
                          </Grid>
                          <Grid item>
                            <Typography variant="body1" component="div">
                              <SpacedGridContainer
                                justifyContent="flex-start"
                                spacing={2}
                              >
                                <Grid item>Tags:</Grid>
                                <Grid item>
                                  {option.tags.split(',').map((v, k) => (
                                    <Chip
                                      key={k}
                                      label={v}
                                      component={'span'}
                                    />
                                  ))}
                                </Grid>
                              </SpacedGridContainer>
                            </Typography>
                          </Grid>
                        </SpacedGridContainer>
                      </Grid>
                    </GridContainer>
                  )}
                  css={`
                    /* width: 500px; */
                  `}
                  // ChipProps={{
                  //   // deleteIcon: (
                  //   //   <CrossCircledIcon
                  //   //     css={`
                  //   //       width: 0.875rem;
                  //   //       height: 0.875rem;
                  //   //     `}
                  //   //   />
                  //   // ),
                  // }}
                  inputValue={inputValue}
                  onInputChange={(_, v) => {
                    setInputValue(v);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant={'outlined'}
                      label={label}
                      fullWidth={false}
                      placeholder={placeholder}
                      css={`
                        width: 100%;
                        /* prettier-ignore */
                        > .MuiInputBase-root > .MuiChip-root {
                    border-radius: 10px;
                    background: ${(props) => props.theme._colors.grey3};
                  }
                      `}
                      {...textfieldProps}
                    />
                  )}
                  {...autocompleteProps}
                />
              </>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <FormHelperText error={!!errors?.[name]}>
            {helperText || errors?.[name]?.message}
          </FormHelperText>
        </Grid>
      </SpacedGridContainer>
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

const SNSP__DropdownInput = styled(
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
    multiple,
    placeholder,
    selectCallback = () => {},
    textfieldProps,
    autocompleteProps,
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
            .nullable(true)
            .typeError(`Please select an option.`)
            .required(`Please complete this item continue.`),
        };
      }
      updateFormSchema(schema);
    });

    const [inputValue, setInputValue] = useState('');
    const [checkedValues, setCheckedValues] = useState(getValues(name) || []);
    const handleSelect = (newValues) => {
      setCheckedValues(newValues);
      selectCallback(newValues);
      return newValues;
    };

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={false}
        render={({ field }) => (
          <SpacedGridContainer>
            <Grid item xs={12}>
              <Select variant={'outlined'} {...props} {...field}>
                {items.map((optionText, jdx) => {
                  return (
                    <MenuItem key={jdx} value={optionText}>
                      {optionText}
                    </MenuItem>
                  );
                })}
              </Select>
            </Grid>
            <Grid item xs={12}>
              <FormHelperText error={!!errors?.[name]}>
                {helperText || errors?.[name]?.message}
              </FormHelperText>
            </Grid>
          </SpacedGridContainer>
        )}
      />
    );
  }
)`
  width: 100%;

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

const SNSP__NumericInput = styled(
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
    min,
    max,
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
            .number()
            .typeError('Please provide a number')
            .required(`Please complete this item continue.`)
            .min(min || -Infinity)
            .max(max || Infinity),
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
            css={``}
            {...field}
            variant={'outlined'}
            error={errors?.[name] ? true : false}
            required={required}
            label={label}
            helperText={helperText || errors?.[name]?.message}
            type="number"
            InputProps={{ inputProps: { min: min, max: max } }}
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

const TaskSelectionCard = styled(SpacedGridContainer)`
  ${(props) => props.theme._funcs.card({ variant: 'paper-1' })};
  padding: ${(props) => props.theme.spacing(4)}px;
`;
const SNSP__Form = styled.form`
  display: flex;
  justify-content: center;
`;

const SNSP__CreateTaskForm = styled(
  ({ handleSubmit, onSubmit, patientData, formElementProps, ...props }) => {
    return (
      <SNSP__Form onSubmit={handleSubmit(onSubmit)} {...props}>
        <Grid item xs={11} sm={11} md={8}>
          <Grid item xs={11} sm={11} md={8}>
            <TaskSelectionCard gap={25}>
              <Grid item xs={12} sm={8}>
                <Typography variant="h4" align="left">
                  Schedule a new session for {patientData?.name.split(' ')[0]}.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={8}>
                <SNSP__AutoInput
                  name="task"
                  label={`Select a task to schedule for ${patientData?.name}`}
                  items={taskList}
                  //   selectCallback={(val) => setTaskSelected(val)}
                  multiple={false}
                  min={1}
                  max={1}
                  {...formElementProps}
                />
              </Grid>
            </TaskSelectionCard>
          </Grid>
        </Grid>
        <Grid item xs={11} sm={11} md={8}>
          <TaskSelectionCard gap={25}>
            <Grid item xs={11}>
              <Typography variant="h6">General information</Typography>
            </Grid>
            <Grid item xs={10} key={'datetime-input'}>
              <SpacedGridContainer spacing={2} justifyContent="space-evenly">
                <Grid item xs={12}>
                  <Typography variant="body1" align="left">
                    Date and time:
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <GridContainer>
                    <SNSP__DateTimeInput
                      name="scheduledFor"
                      {...formElementProps}
                    />
                  </GridContainer>
                </Grid>
              </SpacedGridContainer>
            </Grid>
            <Grid item xs={10}>
              <SpacedGridContainer spacing={2} justifyContent="space-evenly">
                <Grid item xs={12}>
                  <Typography variant="body1" align="left">
                    Primary diagnosis
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <SNSP__RadioInput
                    name="primaryDiagnosis"
                    required
                    items={['ADHD', 'ASD', 'OCD']}
                    {...formElementProps}
                  />
                </Grid>
              </SpacedGridContainer>
            </Grid>
            <Grid item xs={11} key={'session-config'}>
              <Typography variant="h6">Session configuration</Typography>
            </Grid>
            <Grid item xs={12} key={'protocol-input'}>
              <SpacedGridContainer container direction="row" spacing={2}>
                <Grid item xs={12}>
                  <Typography align="center" variant="h6">
                    Neurofeedback protocol
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <SNSP__RadioInput
                    name="protocol"
                    required
                    items={['TBR', 'SCP', 'SMR']}
                    validationSchema={{
                      protocol: yup
                        .string()
                        .transform((value) => (value == 'false' ? '' : value))
                        .transform((value) => value.toLowerCase())
                        .typeError(`Please select an option.`)
                        .required(),
                    }}
                    {...formElementProps}
                  />
                </Grid>
              </SpacedGridContainer>
            </Grid>
            <Grid item xs={12} key={'reps-length'}>
              <SpacedGridContainer justifyContent="space-evenly">
                <Grid item xs={4}>
                  <SpacedGridContainer spacing={2}>
                    <Grid item>
                      <Typography variant="body1">Session reps</Typography>
                    </Grid>
                    <Grid item>
                      <SNSP__NumericInput
                        {...formElementProps}
                        name="sessionReps"
                        min={0}
                        max={100}
                      />
                    </Grid>
                  </SpacedGridContainer>
                </Grid>
                <Grid item xs={4}>
                  <SpacedGridContainer spacing={2}>
                    <Grid item>
                      <Typography variant="body1">
                        Session duration (minutes)
                      </Typography>
                    </Grid>
                    <Grid item>
                      <SNSP__NumericInput
                        {...formElementProps}
                        name="sessionDuration"
                        min={0}
                        max={100}
                      />
                    </Grid>
                  </SpacedGridContainer>
                </Grid>
              </SpacedGridContainer>
            </Grid>
            <Grid item xs={12} key={'difficulty-level'}>
              <SpacedGridContainer justifyContent="space-evenly">
                <Grid item xs={4}>
                  <SpacedGridContainer spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1">Difficulty level</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <SNSP__DropdownInput
                        {...formElementProps}
                        required
                        name="difficultyLevel"
                        items={['Easy', 'Medium', 'Hard']}
                      />
                    </Grid>
                  </SpacedGridContainer>
                </Grid>
                <Grid item xs={4}>
                  <SpacedGridContainer spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="body1">Analysis type</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <SNSP__DropdownInput
                        {...formElementProps}
                        required
                        name="scoreCalcMethod"
                        items={[
                          'scoreCalcMethod 1',
                          'scoreCalcMethod 2',
                          'scoreCalcMethod 3',
                        ]}
                      />
                    </Grid>
                  </SpacedGridContainer>
                </Grid>
              </SpacedGridContainer>
            </Grid>
            <Grid item xs={12}>
              <GridContainer>
                <Box py={2}>
                  <CTAButton fullWidth size="large" type="submit">
                    Schedule Task
                  </CTAButton>
                </Box>
              </GridContainer>
            </Grid>
          </TaskSelectionCard>
        </Grid>
      </SNSP__Form>
    );
  }
)``;

const taskList = [
  {
    label: 'Weightlifting Game',
    tags: 'ADHD, TBR, SCP, SMR',
    description: 'Lift, lift, lift',
  },
];

const ScheduleNewSessionPage = styled(({ ...props }) => {
  const notification = useNotificationQueue();
  const appCtx = useContext(AppContext);
  const [userCtx, dispatch] = useContext(UserContext);

  // This page needs a userId (patientId) param in the URL
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  useMemo(() => {
    if (!patientData) {
      getUserById({ userId: patientId }, setPatientData);
    }
  }, [patientId]);

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

  const [taskSelected, setTaskSelected] = useState(null);

  //   useEffect(() => {
  //     // console.log(taskSelected);
  //   }, [taskSelected]);

  //   const setTaskSelected = useCallback((val) => {
  //   })

  // User state change listeners
  //   useDidMountEffect(() => {
  //     if (userCtx.auth.isAuthenticated) {
  //       history.push('/user/dashboard');
  //     }
  //   }, [userCtx.auth?.isAuthenticated]);

  //   Form submission handling
  const onSubmit = (data) => {
    console.log('onSubmit', data);
    const startDate = moment(data.scheduledFor).toDate();
    const endDate = moment(data.scheduledFor)
      .add(Number(data.sessionDuration), 'minutes')
      .toDate();
    addEventToPatientCalendar({
      targetId: patientId,
      events: [
        {
          title: data.task[0].label,
          startDate: startDate,
          endDate: endDate,
        },
      ],
      sessionInfo: {
        ...data,
        totalDuration: moment
          .duration(moment(endDate).diff(startDate))
          .asMinutes(),
      },
    });
  };

  return (
    <PageContainer alignContent="center" defeaultPadding {...props}>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
      <Grid item xs={12}>
        <SpacedGridContainer gap={50}>
          <Grid item xs={11}>
            <SpacedGridContainer spacing={4}></SpacedGridContainer>
          </Grid>
          <Grid item xs={11}>
            <SpacedGridContainer justifyContent="center" spacing={2}>
              <SNSP__CreateTaskForm
                {...{ patientData, handleSubmit, onSubmit, formElementProps }}
              />
            </SpacedGridContainer>
          </Grid>
        </SpacedGridContainer>
      </Grid>
      <ClearBlock xs={12} pb={{ xs: 20, sm: 20, md: 30, lg: 30, xl: 30 }} />
    </PageContainer>
  );
})``;

export default ScheduleNewSessionPage;
