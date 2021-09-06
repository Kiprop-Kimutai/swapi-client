import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Pagination from '@material-ui/lab/Pagination';
import { makeStyles } from '@material-ui/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';
import  Typography  from '@material-ui/core/Typography';

const useStyles = makeStyles({
  header: {
    marginTop: '15vh',
    marginLeft: '-12vw'
  },
  list: {
    marginTop: '10px',
    padding: '5px',
    position: 'relative'
  },
  listBigScreen: {
    margin: 'auto',
    width: '50%'
  },
  paginationbigScreen: {
    margin: 'auto',
    width: '50%'
  }
});
export const GET_PEOPLE = gql`
 query People($peoplePageNumber: Int) {
    People(pageNumber: $peoplePageNumber) {
      People {
        name
        height
        gender
        homeworld
      },
      Pagination {
        nextPage
        hasMore
        previousPage
        pageCount
      }    
    }
  }
`;
const Home:React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const bigScreen = useMediaQuery(theme.breakpoints.up('md'));
    const { loading, error, data, fetchMore} = useQuery(GET_PEOPLE, {
        variables: {
          peoplePageNumber: 1
        }
    });
    if(loading) return <p>loading....</p>
    if(error) return <p>`Error  ${error.message}`</p>

    const navigateToPerson = (name: string) => {
      history.push(`/person/${name}`)
    }
    return (
      <>
        <div className = {clsx(classes.list, {[classes.listBigScreen]: bigScreen})}>
          <Typography variant = "h3" className = {classes.header}>People's List</Typography>
        {data.People.People.map((person: any, index: number) => (
        <ListItem key = {person.name} button data-testid = "listItem" onClick = {() => navigateToPerson(person.name)}>
          <ListItemText primary = {person.name}/>
        </ListItem>
        ))
        }
        </div>
        {
          <Pagination onChange = {(event, page) => fetchMore({
            variables: {
              peoplePageNumber: page
            }
          })} count = {data.People.Pagination.pageCount} className = {clsx(classes.list, {[classes.paginationbigScreen]: bigScreen})}/>
        }
      </>
    );
}

export default Home;