import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import styled, { css } from 'styled-components';
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
} from '@material-ui/core';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';

import 'styled-components/macro';
import useDidMountEffect from 'components/useDidMountEffect';

const classNames = require('classnames');

export const CenterBlock = styled.div`
  display: block;
  text-align: center;
  margin: 0 auto;
`;
export const CenterFlex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const GridContainer = styled((props) => (
  <Grid container justifyContent="center" alignItems="center" {...props}></Grid>
))`
  height: 100%;
  ${(props) =>
    props.gap
      ? css`
          gap: ${parseInt(props.gap) + 'px'};
        `
      : null};
`;

export const SectionContainer = styled(GridContainer)`
  min-height: inherit;
  > div {
    min-height: inherit;
  }
`;
export const MainContainer = styled(GridContainer)`
  min-height: inherit;
  align-content: stretch;
  /* background: url('static/img/mesh/1.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: center;
  background-size: cover; */
  /* background: linear-gradient(
      135deg,
      rgba(204, 240, 255, 0.4) 11.29%,
      rgba(255, 203, 209, 0.3) 49.19%,
      rgb(237, 234, 251, 1) 86.44%
    ),
    #ffffff; */
`;
export const FlexDivCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  height: 100%;
`;
export const RequiredSymbol = ({ variant = 'body1' }) => (
  <Typography
    variant={variant}
    display="inline"
    css={`
      color: ${(props) => props.theme._colors.red};
    `}
  >
    *
  </Typography>
);

export const PageContainer = styled((props) => (
  <AnimateSharedLayout
    type="crossfade"
    {...(props?.animateSharedLayoutProps || {})}
  >
    <SectionContainer
      {...(props?.gridContainerProps || {})}
      className={props.className}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        {...(props?.gridItemProps || {})}
      >
        <MainContainer
          {...(props?.mainContainerProps || {})}
          css={`
            ${props.mainCss}
            align-content: ${props.alignContent || 'initial'};
          `}
        >
          {props.children}
        </MainContainer>
      </Grid>
    </SectionContainer>
  </AnimateSharedLayout>
))`
  min-height: inherit;
  > div {
    min-height: inherit;
  }
  ${(props) =>
    props.adjustDimensionsForNavBar !== false &&
    css`
      ${(props) => props.theme.breakpoints.up('sm')} {
        width: calc(100% - ${(props) => props.theme.spacing(16)}px);
        margin-left: auto;
      }
      ${(props) => props.theme.breakpoints.down('sm')} {
        width: 100%;
        margin: 0;
      }
    `}
`;

export const SpacedGridContainer = styled(
  React.forwardRef(
    (
      { boxProps = { display: 'flex', flexGrow: 1 }, boxCss, ...props },
      ref
    ) => (
      <Box
        css={css`
          ${boxCss}
        `}
        sx={{ padding: props.spacing ? props.spacing * 2 : 'auto' }}
        ref={ref}
        {...boxProps}
      >
        <GridContainer {...props} className={props.className}>
          {props.children}
        </GridContainer>
      </Box>
    )
  )
)`
  // position: relative;
`;

export const GridItemBlock = styled(
  ({
    itemProps,
    containerProps,
    contentProps,
    boxProps,
    justifyContent,
    alignContent,
    alignItems,
    ...props
  }) => (
    <GridItem
      xs={12}
      className={props.className}
      {...(itemProps ?? {})}
      {...props}
    >
      <GridContainer
        justifyContent={justifyContent}
        alignItems={alignItems}
        alignContent={alignContent}
        {...(containerProps ?? {})}
      >
        <GridItem xs={12} {...(contentProps ?? {})}>
          {/* {boxProps ? (
            <Box {...boxProps}>{props.children}</Box>
          ) : (
            props.children
          )} */}
          <Box {...(boxProps ?? {})}>{props.children}</Box>
        </GridItem>
      </GridContainer>
    </GridItem>
  )
)``;

export const GridItem = styled(({ alignSelf, justifySelf, ...props }) => (
  <Grid item xs={12} {...props}></Grid>
))`
  /* alignSelf */
  ${(props) =>
    props.alignSelf &&
    css`
      align-self: ${props.alignSelf};
    `}
  /* justifySelf */
  ${(props) =>
    props.justifySelf &&
    css`
      justify-self: ${props.justifySelf};
    `}
`;

export const GridItemBox = styled(({ itemProps, boxProps, ...props }) => (
  <Grid item xs={12} {...(itemProps ?? {})} {...props}>
    <Box
      display="inherit"
      justifyContent="inherit"
      alignItems="inherit"
      alignContent="inherit"
      {...(boxProps ?? {})}
    >
      {props.children}
    </Box>
  </Grid>
))``;

export const GridContainerBox = styled(
  ({ containerProps, boxProps, ...props }) => (
    <GridContainer {...(containerProps ?? {})} {...props}>
      <Box
        width="inherit"
        height="inherit"
        display="inherit"
        justifyContent="inherit"
        alignItems="inherit"
        alignContent="inherit"
        {...(boxProps ?? {})}
      >
        {props.children}
      </Box>
    </GridContainer>
  )
)``;

export const GridContainerBlock = styled(
  ({ containerProps, itemProps, ...props }) => (
    <SpacedGridContainer {...(containerProps ?? {})} {...props}>
      <GridItemBlock {...(itemProps ?? {})}>{props.children}</GridItemBlock>
    </SpacedGridContainer>
  )
)``;

export const MotionGrid = styled(motion(Grid))`
  display: flex;
`;

export const MotionSpacedGridContainer = styled(motion(SpacedGridContainer))``;

export const ClearBlock = styled(
  ({ pb = 15, boxProps, className, ...props }) => (
    <Grid item xs={12} {...props} className={`ClearBlock ${className}`}>
      <Box
        pb={typeof pb !== 'object' ? pb : undefined}
        {...(boxProps ?? {})}
      ></Box>
    </Grid>
  )
)`
  ${(props) => props.theme.breakpoints.up('xs')} {
    padding-bottom: ${(props) =>
      props.pb?.xs
        ? isNaN(props.pb.xs)
          ? props.pb.xs
          : props.theme.spacing(Number(props.pb.xs)) + 'px'
        : 'initial'};
  }
  ${(props) => props.theme.breakpoints.up('sm')} {
    padding-bottom: ${(props) =>
      props.pb?.sm
        ? isNaN(props.pb.sm)
          ? props.pb.sm
          : props.theme.spacing(Number(props.pb.sm)) + 'px'
        : 'initial'};
  }
  ${(props) => props.theme.breakpoints.up('md')} {
    padding-bottom: ${(props) =>
      props.pb?.md
        ? isNaN(props.pb.md)
          ? props.pb.md
          : props.theme.spacing(Number(props.pb.md)) + 'px'
        : 'initial'};
  }
  ${(props) => props.theme.breakpoints.up('lg')} {
    padding-bottom: ${(props) =>
      props.pb?.lg
        ? isNaN(props.pb.lg)
          ? props.pb.lg
          : props.theme.spacing(Number(props.pb.lg)) + 'px'
        : 'initial'};
  }
  ${(props) => props.theme.breakpoints.up('xl')} {
    padding-bottom: ${(props) =>
      props.pb?.xl
        ? isNaN(props.pb.xl)
          ? props.pb.xl
          : props.theme.spacing(Number(props.pb.xl)) + 'px'
        : 'initial'};
  }
`;

export const defaultVariantMappings = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
};

export const HideUntil = ({ trigger, children }) => {
  const [display, setDisplay] = useState(false);
  useDidMountEffect(() => {
    setDisplay(true);
  }, [trigger]);

  if (display) return children;
  return <></>;
};
