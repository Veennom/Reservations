import { styled } from '@mui/material';
import * as React from 'react'

const Container = styled('div')({
    marginLeft: 55,
    color: 'green',
    marginBottom: -40,
});

interface choosenDateProps {
    selected?: any;
}

function ChoosenDate(props: choosenDateProps) {
    return (
        <Container>
            <h4> {props.selected} </h4>
        </Container>
    );
};

export default ChoosenDate;