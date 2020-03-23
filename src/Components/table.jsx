
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import CreateIcon from '@material-ui/icons/Create';
import theme from '../Theme/muiTheme';

import EditForm from './EditForm';
import { addNewElement, editElement, removeElements } from '../Store/actions/RootActions';


function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
};

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

function EnhancedTableHead(props) {
  const {
    classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, theadLabels, theadValues,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const headCells = [
    {
      id: theadValues.valueOne, numeric: false, disablePadding: false, label: theadLabels.labelName,
    },
    {
      id: theadValues.valueTwo, numeric: false, disablePadding: false, label: theadLabels.labelElementTwo,
    },
    {
      id: theadValues.valueThree, numeric: false, disablePadding: false, label: theadLabels.labelElementThree,
    },
    {
      id: theadValues.valueFour, numeric: false, disablePadding: false, label: theadLabels.labelElementFour,
    },
  ];

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'right'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    background: '#efffe4',
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

let edk = 1;

let swapiTable = ({
  data, handleClickDeleteSelected, handleClickAddNewElement, handleClickEditElement, labels, values,
}) => {
  const classes = useStyles();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = data || [];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((value) => value.key);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleClick = (event, key) => {
    const selectedIndex = selected.indexOf(key);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, key);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (key) => selected.indexOf(key) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const BaseSwitch = withStyles({
    switchBase: {
      color: theme.palette.secondary.dark,
      '&$checked': {
        color: theme.palette.primary.main,
      },
      '&$checked + $track': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    checked: {},
    track: {},
  })(Switch);

  const newObject = {};

  newObject[values.valueOne] = '123';
  newObject[values.valueTwo] = '';
  newObject[values.valueThree] = '';
  newObject[values.valueFour] = '';
  newObject.key = uuidv4();

  const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
      <Toolbar
        style={{ background: '#fffcde' }}
        className={clsx(classes.root, {
          [classes.highlight]: numSelected > 0,
        })}
      >
        {numSelected > 0 ? (
          <Typography className={classes.title} style={{ color: '#000000' }}>
            {numSelected}
            {' '}
            selected
          </Typography>
        ) : (
          <Typography className={classes.title}>
            Star Wars data
          </Typography>
        )}

        {numSelected > 0 ? (
          <div>
            <Tooltip title="Delete">
              <IconButton aria-label="Delete" onClick={props.deleteSelected}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ) : (
          <div>
            <Tooltip title="Add">
              <IconButton aria-label="Add" onClick={props.newElement}>
                <AddIcon />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };


  const [rowEditorVisible, setRowEditorVisible] = React.useState(false);
  const [editorCurrentObject, setEditorCurrentObject] = React.useState({});
  const [editorCompletionHandler, setEditorCompletionHandler] = React.useState({ fn: (r) => 1 } );

  function handleClickAddIcon() {
    setEditorCurrentObject({})
    setEditorCompletionHandler( { fn: (r) => handleClickAddNewElement(r) } )
    setRowEditorVisible(true)
  };

  function handleClickEditIcon(row) {
    console.log("handleClickEditIcon", row)
    setEditorCurrentObject(row)
    setEditorCompletionHandler({ fn: (r)=> handleClickEditElement(r) } )
    setRowEditorVisible(true)
  };

  function handleEditorApply(row) {
    console.log("handleEditorApply", row)
    editorCompletionHandler.fn(row)
    setRowEditorVisible(false)
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <EditForm
            key={++edk}
            changeElement={(row) => handleEditorApply(row)}
            data={editorCurrentObject}
            theadLabels={labels}
            theadValues={values}
            openEditor={rowEditorVisible}
            cancelClose={()=> setRowEditorVisible(false)}
        />
        <EnhancedTableToolbar
          theadLabels={labels}
          numSelected={selected.length}
          deleteSelected={() => { handleClickDeleteSelected(selected); setSelected([]); }}
          newElement={() => handleClickAddIcon()}
          theadValues={values}
        />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              theadLabels={labels}
              theadValues={values}
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                  const isItemSelected = isSelected(row.key);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow key={row.key}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          onClick={(event) => handleClick(event, row.key)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell align="right">{row[values.valueOne]}</TableCell>
                      <TableCell align="right">{row[values.valueTwo]}</TableCell>
                      <TableCell align="right">{row[values.valueThree]}</TableCell>
                      <TableCell align="right">{row[values.valueFour]}</TableCell>
                      <TableCell align="right">
                          <IconButton aria-label="Edit" onClick={()=> handleClickEditIcon(row)}>
                            <CreateIcon />
                          </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<BaseSwitch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapDispatchToProps = (dispatch) => ({
  handleClickDeleteSelected: (keys) => {
    dispatch(removeElements(keys));
  },
  handleClickAddNewElement: (newAddedObject) => {
    dispatch(addNewElement(newAddedObject));
  },
  handleClickEditElement: (changedObject) => {
    dispatch(editElement(changedObject));
  },
});

export default swapiTable = withRouter(connect(mapStateToProps, mapDispatchToProps)(swapiTable));
