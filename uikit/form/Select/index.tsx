/*
 * Copyright (c) 2020 The Ontario Institute for Cancer Research. All rights reserved
 *
 * This program and the accompanying materials are made available under the terms of
 * the GNU Affero General Public License v3.0. You should have received a copy of the
 * GNU Affero General Public License along with this program.
 *  If not, see <http://www.gnu.org/licenses/>.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 * OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 * SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 * INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 * TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 * OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 * ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';

import { StyledInputWrapper, INPUT_SIZES, InputSize, StyledInputWrapperProps } from '../common';
import Typography from '../../Typography';
import {
  DropdownIcon,
  OptionsList,
  Option,
  HiddenSelect,
  POPUP_POSITIONS,
  PopupPosition,
} from './styledComponents';
import useTheme from '../../utils/useTheme';
import Tooltip from 'uikit/Tooltip';

const Select: React.ComponentType<{
  ['aria-label']: string;
  options?: {
    value: any;
    content: any;
  }[];
  size?: InputSize;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  popupPosition?: PopupPosition;
  placeholder?: string;
  id?: string;
  value?: string;
  className?: string;
  style?: React.CSSProperties;
  hintText?: string;
}> = ({
  placeholder = '- Select an option -',
  id,
  value,
  onChange,
  onBlur = () => {},
  disabled = false,
  size = INPUT_SIZES.SM,
  options = [],
  error = false,
  errorMessage = '',
  popupPosition = POPUP_POSITIONS.DOWN,
  ...props
}) => {
  const [activeState, setActive] = useState('default');
  const [isExpanded, setExpanded] = useState(false);

  const HiddenSelectRef = React.createRef<HTMLSelectElement>();
  const ariaLabel = props['aria-label'];

  const selectedOption = options.find(
    ({ value: optionValue }) => String(optionValue) === String(value),
  );

  const isSomethingSelected = !!(value && selectedOption);

  const theme = useTheme();

  const wrapperRef = React.createRef<HTMLDivElement>();

  useEffect(() => {
    const documentClickHandler = e => {
      const target = e.target;
      const wrapperNode = wrapperRef.current;

      if (wrapperNode && !wrapperNode.contains(target as Node)) {
        setExpanded(false);
        setActive('default');
      }
    };

    if (isExpanded) {
      document.addEventListener('mouseup', documentClickHandler);
    } else {
      document.removeEventListener('mouseup', documentClickHandler);
    }
    return () => document.removeEventListener('mouseup', documentClickHandler);
  }, [isExpanded]);

  const styledInputWrapper = (
    <StyledInputWrapper
      ref={wrapperRef}
      id={id}
      size={size}
      style={{ zIndex: 1 }}
      disabled={disabled}
      inputState={activeState as StyledInputWrapperProps['inputState']}
      role="button"
    >
      <Typography
        variant="paragraph"
        color={
          disabled
            ? theme.input.textColors.disabled
            : isSomethingSelected || isExpanded
            ? 'black'
            : 'grey'
        }
        css={css`
          flex: 1;
          padding: 0 10px;
          line-height: 0;
        `}
      >
        {(value && selectedOption ? selectedOption.content : false) || placeholder}
      </Typography>
      <DropdownIcon disabled={disabled} theme={theme} />
    </StyledInputWrapper>
  );

  return (
    <div
      className={props.className}
      style={{ position: 'relative', ...(props.style || {}) }}
      onClick={e => {
        const wrapperNode = wrapperRef.current;
        const target = e.target;
        if (wrapperNode && wrapperNode.contains(target as Node) && isExpanded) {
          setExpanded(false);
        } else if (document.activeElement !== HiddenSelectRef.current) {
          HiddenSelectRef.current.focus();
        }
      }}
    >
      {/**
       * This HiddenSelect component exists to sync up the focus state with the browser's
       * native behavior as much as possible for improved accessibility
       **/}
      <HiddenSelect
        aria-label={ariaLabel}
        ref={HiddenSelectRef}
        value={value}
        onChange={e => {
          setActive('default');
          setExpanded(false);
          onChange(e.target.value);
        }}
        onFocus={() => {
          setActive('focus');
          setExpanded(true);
        }}
        onBlur={event => {
          onBlur(event);
          setExpanded(false);
        }}
        disabled={disabled}
      >
        {options.map(({ content, value: optionValue }) => (
          <option key={optionValue} value={optionValue}>
            {content}
          </option>
        ))}
      </HiddenSelect>
      {props.hintText ? (
        <Tooltip unmountHTMLWhenHide position="bottom" html={<span>{props.hintText}</span>}>
          {styledInputWrapper}
        </Tooltip>
      ) : (
        styledInputWrapper
      )}
      {isExpanded && (
        <OptionsList role="listbox" id={`${id}-options`} className={popupPosition}>
          {options.map(({ content, value: optionValue }) => (
            <Option
              key={optionValue}
              value={optionValue}
              onMouseDown={() => {
                onChange(optionValue);
                setExpanded(false);
                setActive('default');
              }}
            >
              {content}
            </Option>
          ))}
        </OptionsList>
      )}
    </div>
  );
};

export default Select;
