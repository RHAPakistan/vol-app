import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0',
        fontSize: 16,
        paddingLeft: '1.5%'
    },
    welcomeText:  {
        color: '#155F30',
        fontSize: 20,
        paddingTop: '1%',
        
    },
    line:{
        paddingTop: '1%',
        maxWidth: '98%',
        borderBottomColor: '#155F30',
        borderBottomWidth: 1.5,
    },
    button: {
        width: 280,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: '#155F30',
        marginTop: '7%',
        marginLeft: '5%'

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    },
    nullText:{
        fontWeight: 'bold',
        fontSize: 16,
        margin: '5%',
        alignItems: "center"
    },
    requestText:{
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingTop: '2%'
    },
    requestScrollView:{
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        maxWidth: '97%',
        maxHeight: '80%',
        minHeight: '20%'
    },
    requestCard: {
        padding: '5%',
        maxWidth: '100%',
        borderBottomColor: '#155F30',
        borderBottomWidth: 1.5,
    },  
    requestHeader:{
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16
    },
    detailsText: {
        fontFamily: 'sans-serif-light',
        fontWeight: 'normal',
        fontSize: 16
    },
    footer:{
        marginTop: 10,
        backgroundColor: '#fff'
    },
    lineStyle:{
        borderWidth: 0.5,
        borderColor:'black',
        margin:10,
   },
   row: {
       marginTop: '2%',
        flexDirection: 'row',
        justifyContent: "flex-start",
        flexWrap: "wrap"
   }
    
});