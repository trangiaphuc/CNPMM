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
    Button,
} from "react-native";
import{
    Avatar,
} from 'react-native-paper';
import {Card} from "react-native-elements";
import API from "../../services/api";
import * as ImagePicker from 'expo-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Picker} from '@react-native-picker/picker';

export default function addNewFoodScreen({navigation, route}){
    const {userData, foodId}= route.params;
    const [category, setCategory]=useState([]);
    const [image, setImage] = useState([]);
    //const [initImage, setInitImage]=useState([]);
    const[num, setNum]=useState(1);

    let form =new FormData();
    const[foodName, setFoodName]=useState();
    const[foodDescription, setFoodDescription]=useState();
    const[foodCalories, setFoodCalories]=useState(null);

    const[data, setData]=useState([]);
    const[meterial, setMeterial]=useState([]);
    const[step, setStep]=useState([]);
    const[selectedValueCatName, setSelectedCatName]=useState();



    const fetchdataCategory = async() => {
        
        const result = await API.get('merchant/foodcategory/',
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
            },
        });
        //console.log(result.data.information);
        setCategory(result.data.foodCategories);
        //console.log(data);
    }


  

    const fetchdata = async() => {
        const result = await API.get(`foods/detail/${foodId}`,
        {
            headers:{
                'Content-Type': 'application/json',
                'x-access-token': userData.accessToken
            },
        });
        setData(result.data.food);
        //console.log(result.data.food.foodName);
        setMeterial(result.data.food.foodMaterials);
        setStep(result.data.food.foodCookSteps);
        //console.log(result.data.food.foodCategoryId);
        setSelectedCatName(result.data.food.foodCategoryId)
        setInputFields(result.data.food.foodCookSteps);
        setInputFieldsMaterial(result.data.food.foodMaterials)
    }

    useEffect(async() => {
        await fetchdata();
        fetchdataCategory();
    },[setCategory]);


    const[inputFields, setInputFields]=useState([
        {
            stepNumber: '',
            stepDescription: '',
        }
    ])
    const[inputFieldsMaterial, setInputFieldsMaterial]=useState([
        {
            quantityValue:'',
            foodMaterialName: '',
            productId: null,
            quantityDescription:'',
            quantityId: null,
        }
    ])
    
    const addFieldStep=()=>{
        const values = [...inputFields];
        values.push({ stepNumber: '', stepDescription: '' });
        setInputFields(values);
    }
   
        
    
    const addFieldMaterial=()=>{
        const values = [...inputFieldsMaterial];
        values.push({ 
            quantityValue:'',
            foodMaterialName: '',
            productId: null,
            quantityDescription:'',
            quantityId: null,
        });
        setInputFieldsMaterial(values);
    }
    
    const handleStepDes=(index, val, name)=>{
        //console.log(index, val, name);
        const values =[...inputFields];
        if(name === 'step'){
            values[index].stepNumber = val;
        }
        else
        {
            values[index].stepDescription=val;
        }
        setInputFields(values);
    }
    const handleMaterial =(index, val, name)=>{
        const valuesMaterial =[...inputFieldsMaterial];
        if(name === 'foodMaterialName'){
            valuesMaterial[index].foodMaterialName = val;
        }
        else
        {
            valuesMaterial[index].quantityDescription=val;
        }
        setInputFieldsMaterial(valuesMaterial);
    }
    const handleRemoveStepDes=index=>{
        const values = [...inputFields];
        values.splice(index, 1);
        setInputFields(values);
    }
    const handleRemoveMaterial=index=>{
        const values = [...inputFieldsMaterial];
        values.splice(index, 1);
        setInputFieldsMaterial(values);
    }
    const handleFoodName=(val)=>{
        setFoodName(val);
    }
    const handleDesFood=(val)=>{
        setFoodDescription(val);
    }

    // let dataUpdate={
    //         foodName: foodName,
    //         foodDescription: foodDescription,
    //         foodCalories: foodCalories,
    //         isShowing: true,
    //         foodCategory: selectedValueCatName,
    //         foodMaterials: inputFieldsMaterial,
    //         foodCookSteps: inputFields
    // }
    const updateFood=()=>{
        //console.log(dataUpdate);
        API.post(`merchant/foods/update/${foodId}`,
        {
            foodName: foodName,
            foodDescription: foodDescription,
            foodCalories: foodCalories,
            isShowing: true,
            foodCategory: selectedValueCatName,
            foodMaterials: inputFieldsMaterial,
            foodCookSteps: inputFields
        },
                {
                    headers:{
                        'Content-Type': 'application/json',
                        'x-access-token': userData.accessToken,
                    },
                })
                .then(res => {
                    Alert.alert('Thông báo', 'Lưu thành công');
                }).catch(error => {
                        Alert.alert('Error', error.res);
                });
    }

    return (
        <SafeAreaView>
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
                    <Text style={styles.returnText}>Chỉnh sửa món ăn</Text>
                </View>
            </View>
            <ScrollView style={{height: '85%'}}>
                
                <Card>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Tên món ăn</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Tên món ăn"
                        autoCapitalize='none'
                        style={{borderWidth:0.5, height:40, paddingLeft: 10}}
                        onChangeText={(val)=>handleFoodName(val)}
                        defaultValue={data.foodName}
                    />
                </Card>
                <Card>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Mô tả</Text>
                    <TextInput
                        multiline={true}
                        placeholder="Mô tả"
                        autoCapitalize='none'
                        style={{borderWidth:0.5, height:80, paddingLeft: 10}}
                        onChangeText={(val)=>handleDesFood(val)}
                        defaultValue={data.foodDescription}
                    />
                </Card>
                <Card>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Danh mục món ăn</Text>
                    <View style={{borderWidth: 0.5}}>
                    <Picker
                                //style={styles.picker}
                                selectedValue={selectedValueCatName}
                                onValueChange={(itemValue)=>setSelectedCatName(itemValue)}
                            >
                                {
                                    category.map((item)=>
                                        <Picker.Item key={item.id} label={item.catName} value={item.id}  style={{color: '#05375a'}}/>
                                    )
                                }

                            </Picker>
                    </View>
                    </Card>
                <Card>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Nguyên liệu</Text>
                    {
                        inputFieldsMaterial.map((inputFieldsMaterial, index)=>(
                            <View style={{marginTop: 10}} key={index}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 5, marginRight: 2}}>
                                        <TextInput
                                            placeholder="Nguyên liệu"
                                            autoCapitalize='none'
                                            style={{borderWidth:0.5, height:40, paddingLeft: 10}}
                                            //value={inputFields.id}
                                            defaultValue = {inputFieldsMaterial.foodMaterialName}
                                            onChangeText={(val)=>handleMaterial(index, val, 'foodMaterialName')}
                                        />
                                    </View>
                                    <View style={{flex: 3}}>
                                        <TextInput

                                            multiline={true}
                                            placeholder="Số lượng"
                                            autoCapitalize='none'
                                            style={{borderWidth:0.5, height:40, paddingLeft: 10}}

                                            defaultValue = {inputFieldsMaterial.quantityDescription}
                                            onChangeText={(val)=>handleMaterial(index, val,'quantity')}
                                        />
                                    </View>
                                   
                                    
                                    <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>handleRemoveMaterial(index)}>
                                        <FontAwesome
                                            name="minus"
                                            color="#05375a"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={addFieldMaterial}>
                                        <FontAwesome
                                            name="plus"
                                            color="#05375a"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </Card>
                <Card>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>Các bước nấu ăn</Text>
                    {
                        inputFields.map((inputFields, index)=>(
                            <View style={{marginTop: 10}} key={index}>
                                <View style={{flexDirection: 'row'}}>
                                    <View style={{flex: 1.5, marginRight: 2}}>
                                        <TextInput
                                            name="step"
                                            placeholder="Bước"
                                            autoCapitalize='none'
                                            style={{borderWidth:0.5, height:100, paddingLeft: 10}}
                                            //value={inputFields.id}
                                            defaultValue = {inputFields.stepNumber.toString()}
                                            onChangeText={(val)=>handleStepDes(index, val,'step')}
                                        />
                                    </View>
                                    <View style={{flex: 7}}>
                                        <TextInput
                                            name="des"
                                            multiline={true}
                                            placeholder="Chi tiết"
                                            autoCapitalize='none'
                                            style={{borderWidth:0.5, height:100, paddingLeft: 10}}

                                            defaultValue = {inputFields.stepDescription}
                                            onChangeText={(val)=>handleStepDes(index, val,'des')}
                                        />
                                    </View>
                                    <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={()=>handleRemoveStepDes(index)}>
                                        <FontAwesome
                                            name="minus"
                                            color="#05375a"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:1, alignItems: 'center', justifyContent: 'center'}} onPress={addFieldStep}>
                                        <FontAwesome
                                            name="plus"
                                            color="#05375a"
                                            size={20}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))
                    }
                </Card>
            </ScrollView>
            <View style={styles.button}>
                <TouchableOpacity
                   onPress = {updateFood}
                   style={[styles.signIn,{
                       borderColor:'#ff4700',
                       borderWidth: 1,
                       margin: 10,
                   }]}>
                       <Text style={[styles.textSign,{
                           color:'#ffffff',
                           fontSize: 20
                        }]}
                        >Lưu thay đổi</Text>
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
        flex: 3,
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
        flex: 7.5,
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