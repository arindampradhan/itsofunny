import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';
import ComicsList from './components/ComicsList';
import theme from './data/theme';

const Header = styled.View`
    border-color: #333;
    border-width: 2px;
    
    border-top-left-radius: 0px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 8px;
    border-bottom-left-radius: 15px;
    
    background: ${theme.primary};
    padding: 20px;
    padding-top: 40px;
`

const HeaderText = styled.Text`
    line-height: 16px;
    font-size: 16px;
    color: ${theme.white};
`

export default class App extends React.Component {
    componentDidMount() {
    }
    render() {
        return (
            <ThemeProvider theme={{}}>
                <View>
                    <Header>
                        <HeaderText>XKCD Comics List</HeaderText>
                    </Header>
                    <ComicsList />
                </View>
            </ThemeProvider>
        );
    }
}