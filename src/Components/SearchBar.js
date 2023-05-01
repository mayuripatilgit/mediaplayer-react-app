import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     alignItems: 'center',
//     backgroundColor: '#485c97',
//     borderRadius: theme.shape.borderRadius,
//     '& .MuiTextField-root': {
//       marginRight: theme.spacing(1),
//       marginLeft: theme.spacing(1),
//       // width: '100%',
//       width: 'auto',
//       flexGrow:1,
//       '& .MuiInputBase-root': {
//         color: '#fff',
//       },
//       '& .MuiFormLabel-root': {
//         color: '#fff',
//       },
//       // '& .MuiOutlinedInput-notchedOutline': {
//       //   borderColor: '#fff',
//       // },
//       // '&:hover .MuiOutlinedInput-notchedOutline': {
//       //   borderColor: '#fff',
//       // },
//       // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
//       //   borderColor: '#fff',
//       // },
//     },
//     '& .MuiIconButton-root': {
//       color: '#fff',
//     },
//   },
// }));

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
      backgroundColor: '#303539',
      // backgroundColor: '#485c97',
    borderRadius: theme.shape.borderRadius,
    '& .MuiTextField-root': {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      '& .MuiOutlinedInput-input': {
        width: '35rem',
        color: '#fff',
      },
      '& .MuiFormLabel-root': {
        color: '#f40058',
      },
      // '& .MuiOutlinedInput-notchedOutline': {
      //   borderColor: '#fff',
      // },
      // '&:hover .MuiOutlinedInput-notchedOutline': {
      //   borderColor: '#fff',
      // },
      // '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      //   borderColor: '#fff',
      // },
    },
    '& .MuiIconButton-root': {
      color: '#fff',
    },
  },
}));



function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const classes = useStyles();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    navigate(`/search?title=${searchTerm}`);
  };

  return (
    <div className={classes.root}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleInputChange}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
}

export default SearchBar;
