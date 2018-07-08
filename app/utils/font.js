import Expo from 'expo';

export const fonts = {
    Neucha: 'Neucha'
}

Expo.Font.loadAsync({
    Neucha: require('../assets/font/Neucha.ttf'),
});


export default fonts;