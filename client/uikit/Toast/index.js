import React from 'react';
import PropTypes from 'prop-types';

import { styled, css } from '../';
import Typography from '../Typography';
import Icon from '../Icon';
import FocusWrapper from '../FocusWrapper';
import useTheme from '../utils/useTheme';
import {
  ToastBodyContainer,
  IconContainer,
  ToastContainer,
  ActionButtonsContainer,
  ActionButton,
  getBorderColor,
} from './styledComponents';

const getDefaultInteractionType = variant =>
  ({
    [TOAST_VARIANTS.INFO]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.SUCCESS]: TOAST_INTERACTION.EXPAND_DISMISS,
    [TOAST_VARIANTS.WARNING]: TOAST_INTERACTION.CLOSE,
    [TOAST_VARIANTS.ERROR]: TOAST_INTERACTION.CLOSE,
  }[variant]);

const DefaultIcon = ({ variant, size }) => {
  const fill = {
    [TOAST_VARIANTS.INFO]: 'secondary',
    [TOAST_VARIANTS.SUCCESS]: 'success',
    [TOAST_VARIANTS.WARNING]: 'warning',
    [TOAST_VARIANTS.ERROR]: 'error',
  }[variant];
  const name = {
    [TOAST_VARIANTS.INFO]: 'info',
    [TOAST_VARIANTS.SUCCESS]: 'success',
    [TOAST_VARIANTS.WARNING]: 'warning',
    [TOAST_VARIANTS.ERROR]: 'times_circle',
  }[variant];
  const width = {
    [TOAST_SIZES.MD]: '30px',
    [TOAST_SIZES.SM]: '20px',
  }[size];
  const height = width;
  return <Icon name={name} fill={fill} width={width} height={height} />;
};

const Toast = ({
  variant = TOAST_VARIANTS.INFO,
  size = TOAST_SIZES.MD,
  interactionType = getDefaultInteractionType(variant),
  title,
  content,
  expandText = 'VIEW',
  dismissText = 'DISMISS',
  icon = <DefaultIcon variant={variant} size={size} />,
  onInteraction = ({ type, event }) => {},
}) => {
  const theme = useTheme();
  const dispatchEvent = eventType => e => onInteraction({ type: eventType, event: e });
  const titleTypographyVariant = {
    [TOAST_SIZES.MD]: 'subtitle2',
    [TOAST_SIZES.SM]: 'paragraph',
  }[size];
  const bodyTypographyVariant = {
    [TOAST_SIZES.MD]: 'paragraph',
    [TOAST_SIZES.SM]: 'data',
  }[size];
  const headerVerticalMargin = {
    [TOAST_SIZES.MD]: '4px',
    [TOAST_SIZES.SM]: '0px',
  }[size];
  return (
    <ToastContainer variant={variant}>
      {icon && <IconContainer>{icon}</IconContainer>}
      <ToastBodyContainer>
        {title && (
          <Typography
            variant={titleTypographyVariant}
            bold
            css={css`
              margin: 0px;
              margin-top: ${headerVerticalMargin};
              margin-bottom: ${headerVerticalMargin};
            `}
          >
            {title}
          </Typography>
        )}
        {content && (
          <Typography
            variant={bodyTypographyVariant}
            css={css`
              margin: 0px;
            `}
          >
            {content}
          </Typography>
        )}
      </ToastBodyContainer>
      {interactionType === TOAST_INTERACTION.CLOSE && (
        <FocusWrapper
          css={css`
            margin: 8px;
            height: 15px;
            line-height: 0px;
          `}
          onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.CLOSE)}
        >
          <Icon name="times" width="15px" height="15px" fill="primary_1" />
        </FocusWrapper>
      )}
      {interactionType === TOAST_INTERACTION.EXPAND_DISMISS && (
        <ActionButtonsContainer variant={variant}>
          <ActionButton
            css={css`
              border-bottom: solid 1px ${getBorderColor({ theme, variant })};
            `}
            onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.EXPAND)}
          >
            <Typography variant={bodyTypographyVariant} component="div" bold>
              {expandText}
            </Typography>
          </ActionButton>
          <ActionButton variant={variant} onClick={dispatchEvent(TOAST_INTERACTION_EVENTS.DISMISS)}>
            <Typography variant={bodyTypographyVariant} component="div" bold>
              {dismissText}
            </Typography>
          </ActionButton>
        </ActionButtonsContainer>
      )}
    </ToastContainer>
  );
};

export const TOAST_INTERACTION_EVENTS = Object.freeze({
  CLOSE: 'CLOSE',
  EXPAND: 'EXPAND',
  DISMISS: 'DISMISS',
});

export const TOAST_VARIANTS = Object.freeze({
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
  WARNING: 'WARNING',
  ERROR: 'ERROR',
});
export const TOAST_INTERACTION = Object.freeze({
  CLOSE: 'CLOSE',
  EXPAND_DISMISS: 'EXPAND_DISMISS',
  NONE: 'NONE',
});

export const TOAST_SIZES = Object.freeze({
  MD: 'md',
  SM: 'sm',
});

Toast.propTypes = {
  title: PropTypes.node,
  content: PropTypes.node,
  icon: PropTypes.node,
  onInteraction: PropTypes.func,
  variant: PropTypes.oneOf([
    TOAST_VARIANTS.INFO,
    TOAST_VARIANTS.SUCCESS,
    TOAST_VARIANTS.WARNING,
    TOAST_VARIANTS.ERROR,
  ]),
  interactionType: PropTypes.oneOf([
    TOAST_INTERACTION.NONE,
    TOAST_INTERACTION.CLOSE,
    TOAST_INTERACTION.EXPAND_DISMISS,
  ]),
  expandText: PropTypes.string,
  dismissText: PropTypes.string,
  size: PropTypes.oneOf([TOAST_SIZES.MD, TOAST_SIZES.SM]),
};

export default Toast;