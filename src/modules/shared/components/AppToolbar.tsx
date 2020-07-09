import React from 'react';
import styled from 'styled-components';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from 'react-router-dom';

const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>(
  (props, ref) => (
    <RouterLink ref={ref} to="/getting-started/installation/" {...props} />
  )
);

export default ({ buttonLeft = { to: '/', icon: 'arrow_back' } }: any) => {
  const classes = useStyles();

  return (
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="go-back"
        component={RouterLink}
        to={buttonLeft.to}
        className={classes.buttonTop}
      >
        <Icon>{buttonLeft.icon}</Icon>
      </IconButton>
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonTop: {
      // margin: '10px',
      padding: '0',
    },
  })
);

const Toolbar = styled.div`
  flex-direction: row;
  width: 100%;
  display: flex;
  text-align: left;
  color: #fff;
  padding: 10px 0;
`;
