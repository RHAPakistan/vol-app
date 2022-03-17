import {StyleSheet,Platform} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start', // if you want to fill rows left to right
        marginTop: '3%'
      },
    heading: {
        alignItems: 'center',
        
    },
    headingText:{
        fontSize: 18,
        color: 'black',
        fontWeight: 'bold',
        marginTop: '5%',
        marginBottom: '5%'
    },
    pickupText:{
        fontSize: 16,
        fontWeight: 'bold',
        paddingTop: '3%',
        marginLeft: '1%'
    },
    line:{
        paddingTop: '1%',
        maxWidth: '98%',
        borderBottomColor: '#155F30',
        borderBottomWidth: 1.5,
    },
    item: {
        width: '50%',
        marginTop: '2%',
    },
    column1Text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft: '2%'
    },
    columnButton:{
        width: 120,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        backgroundColor: '#155F30',
        marginLeft: '35%'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold'
    },
    description:{
        fontSize: 16,
        fontWeight: 'bold',
        marginLeft:'1%',
        marginTop: '2%'
    },
    textArea: {
        backgroundColor: 'white',
        borderRadius: 5,
        padding: '1%',
        marginLeft:'1%',
        marginTop: '1%',
        color: 'black'
    },
    button: {
        marginTop: '10%',
        marginLeft: '30%',
        width: 180,
        height: 40,
        borderRadius: 5,
        backgroundColor: '#155F30',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
    },
    bottomText: {
        fontSize: 22,
        
    }
});