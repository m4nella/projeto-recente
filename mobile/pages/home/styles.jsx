import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#B4D6F9',
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    caixa:{
        width:'80%',
        borderRadius: 5,
        backgroundColor: '#FDF6C6',
        padding:8,
        fontSize:25,
        marginTop:10,
        color: '#987C57',
        fontWeight:'bold'
    },
    title:{
        fontSize: 40,
        fontWeight:'bold',
        color: '#fff'
        
    },
    caixas:{
        alignItems:'center',
        justifyContent:'center',
        padding:20,
        color: '#987C57',
        fontWeight:'bold',
    },
    btnOk:{
        marginTop:20,
        borderRadius:5,
        width:'60%',
        height:50,
        backgroundColor:'#FDF6C6',
        alignItems:'center',
        justifyContent:'center',
        color: '#987C57',
        fontWeight:'bold',
    },
})

export default styles