import { StyleSheet, Image } from 'react-native';

export default StyleSheet.create({
    container: {
        marginTop: 30,
    },

    title: {
        fontSize: 20,
        color: '#444',
        paddingHorizontal: 20,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold'
    },

    list: {
        paddingHorizontal: 20,
    },

    listItem: {
        marginRight: 15,
    },

    thumbnail: {
        width: '50%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    }
});