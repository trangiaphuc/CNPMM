import React,{useState, useEffect} from "react";
import {
    View,
    Text,
    TextStyle,
    SafeAreaView,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Card} from "react-native-elements";
import API from "../../services/api";
import * as ImagePicker from 'expo-image-picker';
export default function addFoodCategoryScreen({navigation, route}){
    const{userData}=route.params;
    const[image, setImage] = useState([]);
    let form =new FormData();
    const[dataAddNewCat, setDataAddNewCat]=React.useState({
        catName: '',
    });
    const handleAddCategory = (val)=>{
        setDataAddNewCat({
            ...dataAddNewCat,
            catName: val,
        });
    }

    const addCategory=()=>{
        let data={
            catName: dataAddNewCat.catName,
            isShowing: true
        }
        //console.log(data);
        API.post('merchant/productcategory/addnew',data,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
            },

        })
        .then(res => {
            if(res.status===201){
                Alert.alert('Thông báo', "Thêm thành công");
            }
            //navigation.goBack();
        }).catch(error => {
                console.log('Error', error.res);
        });
    }


    return(
        <SafeAreaView>
            <View style={{height: '92%'}}>
                <View style={styles.return}>
                    <View style={styles.returnIcon}>
                        <TouchableOpacity onPress={()=>{navigation.goBack();}}>
                            <FontAwesome
                                name="arrow-left"
                                color="#05375a"
                                size={20}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerText}>
                        <Text style={styles.returnText}>Thêm danh mục sản phẩm</Text>
                    </View>
                </View>
                <Card>
                    <Text style={{fontWeight: 'bold'}}>Tên danh mục</Text>
                    <View style={styles.action}>
                        
                        <TextInput
                                placeholder="Tên danh mục"
                                style={styles.textInput}
                                autoCapitalize='none'
                                // defaultValue = {userInformation.address}
                                onChangeText={(val)=>handleAddCategory(val)}
                        />
                    </View>
                    
                </Card>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                   onPress = {addCategory}
                   style={[styles.signIn,{
                       borderColor:'#ff4700',
                       borderWidth: 1,
                       margin: 10,
                   }]}>
                       <Text style={[styles.textSign,{
                           color:'#ffffff',
                           fontSize: 20
                        }]}
                        >Thêm</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    return: {
        height: 60,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',

    },
    returnIcon:{
        flex: 2,
        marginBottom: 5,
        marginLeft: 10,
        justifyContent: 'flex-end',

    },
    returnText:{
        marginBottom: 5,

        fontWeight: 'bold',
        fontSize: 20,
        color: '#05375a',
    },
    containerText:{
        justifyContent: 'flex-end',
        flex: 8,
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        borderWidth: 0.5,
        height: 40
    },
    button: {
        alignItems: 'center',
        backgroundColor:'#FF4B3A',
        margin: 5,
        borderRadius: 10
    },
    signIn: {
        width: '100%',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});