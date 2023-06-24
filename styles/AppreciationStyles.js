import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    containerDashboard: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingTop:50,
        paddingLeft: 15,
        paddingRight: 15
      },
    header:{
        margin: '2%',
        paddingTop: '5%',
        alignItems: 'center',
        alignContent: 'center'
    },
    headerText:{
        fontSize: 18,
        fontWeight: 'bold',
        color: '#155F30'
    },
    line:{
        paddingTop: '1%',
        marginLeft: '1%',
        maxWidth: '98%',
        borderBottomColor: '#155F30',
        borderBottomWidth: 1.5,
    },
    main:{
        margin: '12%',
        alignItems: 'center',
        alignContent: 'center'
    },
    thankText:{
        marginTop: '3%',
        fontSize: 22,
        fontWeight: 'bold',
        color: '#155F30',
    },
    message:{
        marginTop: '3%',
        fontSize: 16,
        color: '#39bf6a',
    },
    button: {
        marginTop: '3%',
        width: 240,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#155F30',
        marginTop: '5%',

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
});