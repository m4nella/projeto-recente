import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#B4D6F9',
        flex:1
    },
    caixa:{
        width: '80%',
        height: 40,
        borderRadius: 5,
        backgroundColor: '#FDF6C6',
        padding: 10,
        fontSize: 15,
        marginTop: 10,
        color: '#987C57',
        fontWeight: 'bold'
    },
    btn:{
        width:'40%',
        height:40,
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#00f', 
        alignItems:'center',
        justifyContent:'center'
    },
    textBtn:{
        fontSize: 25,
        color: '#987C57'
    },
    textTitle:{
        fontSize: 50,
        fontWeight:'#987C57'
    },
    textInput:{
        padding:10,
    },
    textos:{
        width:'80%',
        height:40,
        borderRadius:10,
        marginTop:10,
        backgroundColor:'#E8F1C7',
        padding:10,
        fontSize:15,
    

    },

})

export default styles