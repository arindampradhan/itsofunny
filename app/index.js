import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styled from 'styled-components/native';
import { ThemeProvider } from 'styled-components/native';

const Header = styled.View`
    background: black;
    padding: 20px;
    padding-top: 40px;
`

const HeaderText = styled.Text`
    line-height: 16px;
    font-size: 16px;
    color: white;
`

export default class App extends React.Component {
    render() {
        return (
            <ThemeProvider theme={{}}>
                <View>
                    <Header>
                        <HeaderText>XKCD Comics List</HeaderText>
                    </Header>
                    <View>
                        <Text>Pradhan</Text>
                    </View>
                </View>
            </ThemeProvider>
        );
    }
}
console.log('degugger running')