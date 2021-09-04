import React, { Component, Fragment } from 'react';

import Select from 'react-select';
import "./SingleSelect.scss";

export default class SingleSelect extends Component {
  render() {
    const {
      name,
      placeholder,
      options,
      value,
      defaultValue = '',
      className = '',
      isDisabled = false,
      isLoading = false,
      isSearchable = false,
      isClearable = false,
      onChange = ()=>{}
    } = this.props;

    return (
      <Fragment>
        <Select
          className={`basic-single ${className}`}
          classNamePrefix='select'
          defaultValue={defaultValue}
          value={value}
          isLoading={isLoading}
          isClearable={isClearable}
          isDisabled={isDisabled}
          isSearchable={isSearchable}
          name={name}
          options={options}
          placeholder={placeholder}
          onChange={(value) => {
            onChange(value);
          }}
        />
      </Fragment>
    );
  }
}
