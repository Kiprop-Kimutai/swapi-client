import React from 'react';
import { gql, useQuery} from '@apollo/client';
import { useHistory, useParams  } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent  from '@material-ui/core/CardContent';
import CardActions  from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import useMediaQuery  from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';
import  Typography  from '@material-ui/core/Typography';
import clsx from 'clsx';
export const GET_PERSON_DETAILS = gql`
    query Person($personName: String!) {
        Person(name: $personName) {
        name
        height
        mass
        gender
        homeworld
        }
    }
`;

const useStyles = makeStyles({
    card: {
        width: '50%',
        margin: 'auto',
        marginTop: '10vh',
    },
    cardSmallScreen: {
        width: '100%',
        marginTop: '10vh'
    },
    label: {
        fontSize: '24px',
        left: '5%'
    },
    buttonLabel: {
        textTransform: 'none'
    },
    details: {
        backgroundColor: 'silver',
        wordWrap: 'break-word'
    }
})
const PersonDetails:React.FC = () => {
    const { name } = useParams<{name: string}>();
    const history = useHistory();
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigateToList = () => {
        history.push('/');
    }
    const { loading, error, data} = useQuery(GET_PERSON_DETAILS, {
        variables: {
            personName: name
        }
    });
    if(loading) return <p>Loading....</p>
    if(error) return <p>`Error ....${error.message}`</p>
    return data.Person.length  ?  (
        <div>
            <Card className = {clsx(classes.card, {[classes.cardSmallScreen]: smallScreen})}>
                <Typography variant = "h4">Personal Details</Typography>
                <CardContent>
                    <Typography variant = "h3" className = {classes.label}>
                        Name
                    </Typography>
                    <Typography variant = "h4" className = {classes.details}>
                        {data.Person[0].name}
                    </Typography>
                    <Typography variant = "h3" className = {classes.label}>
                        Height
                    </Typography>
                    <Typography variant = "h4" className = {classes.details}>
                        {data.Person[0].height}
                    </Typography>
                    <Typography variant = "h3" className = {classes.label}>
                        Mass
                    </Typography>
                    <Typography variant = "h4" className = {classes.details}>
                        {data.Person[0].mass}
                    </Typography>
                    <Typography variant = "h3" className = {classes.label}>
                        Gender
                    </Typography>
                    <Typography variant = "h4" className = {classes.details}>
                        {data.Person[0].gender}
                    </Typography>
                    <Typography variant = "h3" className = {classes.label}>
                        HomeWorld
                    </Typography>
                    <Typography variant = "h4" className = {classes.details}>
                        {data.Person[0].homeworld}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size = "small" aria-label =" Back" onClick = {() => navigateToList()} data-testid = "go-back">
                        <ArrowBackIcon fontSize = "small"/>
                        <span className = {classes.buttonLabel}>Back</span>
                    </Button>
                </CardActions>
            </Card>
        </div>
    ) : null;
}

export default PersonDetails;