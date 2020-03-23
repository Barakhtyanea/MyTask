import React, { useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import TextField from '@material-ui/core/TextField';


const useButtonStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
      background: theme.palette.secondary.light,
      borderRadius: 4,
      color: 'primary',
    },
  },
}));

const EditForm = ({
  changeElement, data, theadLabels, theadValues, openEditor, cancelClose
}) => {

  console.log("EditForm", data, theadLabels, theadValues)

  const classes = useButtonStyles();

  const [firstValue, setFirstValue] = useState(data[theadValues.valueOne]);
  const [secondValue, setSecondValue] = useState(data[theadValues.valueTwo]);
  const [thirdValue, setThirdValue] = useState(data[theadValues.valueThree]);
  const [fourthValue, setFourthValue] = useState(data[theadValues.valueFour]);

  const handleChangeFirst = (event) => {
    setFirstValue(event.target.value);
  };
  const handleChangeSecond = (event) => {
    setSecondValue(event.target.value);
  };
  const handleChangeThird = (event) => {
    setThirdValue(event.target.value);
  };
  const handleChangeFourth = (event) => {
    setFourthValue(event.target.value);
  };

  const handleCancelClose = () => {
    cancelClose()
  };

  const handleClose = () => {
    data[theadValues.valueOne] = firstValue;
    data[theadValues.valueTwo] = secondValue;
    data[theadValues.valueThree] = thirdValue;
    data[theadValues.valueFour] = fourthValue;
    changeElement(data);
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={openEditor}>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>
              <TextField value={firstValue} label={theadLabels.labelName} variant="filled" onChange={handleChangeFirst} />
              <TextField value={secondValue} label={theadLabels.labelElementTwo} variant="filled" onChange={handleChangeSecond} />
              <TextField value={thirdValue} label={theadLabels.labelElementThree} variant="filled" onChange={handleChangeThird} />
              <TextField value={fourthValue} label={theadLabels.labelElementFour} variant="filled" onChange={handleChangeFourth} />
            </div>
          </form>
          <Tooltip title="Edit">
            <IconButton onClick={handleClose}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Cancel">
            <IconButton onClick={handleCancelClose}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </div>
      </Backdrop>
    </div>
  );
};

export default EditForm;
