
export const customSelectStyles = {
  container: (provided, state) => ({
    ...provided,
    width: '15rem',
    borderRadius: '3px',
  }),

  menuList: (provided, state) => ({
    ...provided,
    backgroundColor: '#101010',

  }),

  option: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
    letterSpacing: '3px',
    textTransform: 'uppercase',
    backgroundColor: '#101010',
    color: '#76FF03',
    fontSize: '10px',
    cursor: 'pointer',
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    padding: '0.75rem',
    fontFamily: 'monospace', 
    backgroundColor: '#101010',
    paddingRight: '0px',
    paddingLeft: '0.75rem',
    cursor: 'pointer',
  }),
  singleValue: (provided, state) => ({
    color: '#76FF03',
    fontSize: '10px',
    letterSpacing: '3px',
    textTransform: 'uppercase',
  }),
  control: (provided, state) => ({
    ...provided,
    border: 'none',
    borderRadius: '3px',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    backgroundColor: '#101010',
    border: '0px solid black',
    color: '#76FF03',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    backgroundColor: 'black',
    border: '0px solid black',
    cursor: 'pointer',
    color: '#76FF03',
  }),
  
}