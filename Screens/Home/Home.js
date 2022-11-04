/* eslint-disable prettier/prettier */
import React from 'react';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectList from 'react-native-dropdown-select-list';

import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Add from '../Add';

import {
  Text,
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Footer from '../../Components/Footer';
// import NewFooter from '../../Components/newFooter/NewFooter';
import {NavigationContainer} from '@react-navigation/native';

const Home = ({navigation}) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('', 'Are you sure want to quit ?', [
          {
            text: 'Cancel',
            onPress: () => null,
          },
          {
            text: 'Yes',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, []),
  );

  const data = [
    {key: 'Rent', value: 'Rent'},
    {key: 'Books', value: 'Books'},
    {key: 'Movies', value: 'Movies'},
  ];

  const [Amount, setAmount] = React.useState('0');
  const [Category, setCategory] = React.useState('');
  const [Note, setNote] = React.useState('');
  const [ExpenseInfo, setExpenseInfo] = React.useState('');

  const [chosenDate, setchosenDate] = React.useState('');
  const [isVisible, setisVisible] = React.useState(false);

  const [ExpenseArray, SetExpenseArray] = React.useState([]);

  React.useEffect(() => {
    getExpensesFromUserDevice();
  }, []);

  const updateExpenseinfor = () => {
    const expenseToSave = {
      date: chosenDate,
      Amount: Amount,
      Category: Category,
      Note: Note,
    };
    setExpenseInfo(expenseToSave);
  };

  const addExpense = () => {
    if (ExpenseInfo == '') {
      Alert.alert('Error', 'Please input data');
    } else {
      const newExpense = {
        id: Math.random(),
        date: chosenDate,
        Amount: Amount,
        Category: Category,
        Note: Note,
        completed: false,
      };

      SetExpenseArray([...ExpenseArray, newExpense]);
      console.log(ExpenseArray);
      setAmount('');
      setCategory('');
      setchosenDate('');
      setNote('');
    }
  };

  const saveExpensesToUserDevice = async () => {
    try {
      const stringifyExpenseArray = JSON.stringify(ExpenseArray);
      await AsyncStorage.setItem('@ExpenseInfo', stringifyExpenseArray);
    } catch (error) {
      console.log(error);
    }
    console.log('saving');
  };
  const getExpensesFromUserDevice = async () => {
    try {
      const ExpenseArray = await AsyncStorage.getItem('@ExpenseInfo');
      if (ExpenseArray != null) {
        SetExpenseArray(JSON.parse(ExpenseArray));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePicker = date => {
    setisVisible(false);
    setchosenDate(moment(date).format('MMMM, Do YYYY'));
  };

  const showPicker = () => {
    setisVisible(true);
  };

  const hidePicker = () => {
    setisVisible(true);
  };

  // Firebase Integration

  const ref = firestore().collection('Expenses');

  async function ExpenseAdd() {
    await ref.add({
      date: chosenDate,
      amount: Amount,
      category: Category,
      note: Note,
      complete: false,
    });
    setAmount('');
    setCategory('');
    setchosenDate('');
    setNote('');
    console.log('add expense to firebase button is clicked');
  }

  return (
    <View
      style={{
        backgroundColor: '#add9e6',
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          backgroundColor: '#add9e6',
          width: '100%',
          height: '90%',
        }}>
        <Image
          style={style.logo}
          source={require('../../Components/Images/back.png')}></Image>
        <Text style={style.heading}>Save Your Expenses</Text>
        <View>
          <View style={style.menuStyle}>
            <TextInput style={style.input} placeholder="Enter Date">
              {chosenDate}
            </TextInput>
            <TouchableOpacity
              onPress={showPicker}
              style={style.time}></TouchableOpacity>
            <DateTimePickerModal
              isVisible={isVisible}
              mode="date"
              onConfirm={handlePicker}
              onCancel={hidePicker}
            />
          </View>

          <View style={style.menuStyle}>
            <TextInput
              onChangeText={setAmount}
              keyboardType="numeric"
              style={style.inputAmount}
              value={Number}
              placeholder="Enter Amount"
            />
          </View>
          <View style={style.menuStyle}>
            <SelectList
              boxStyles={{
                width: '50%',
                marginLeft: '10%',
                borderRadius: 30,
                borderColor: '#000000',
              }}
              dropdownStyles={{
                width: '43%',
                marginLeft: '14%',
                borderRadius: 7,
                borderColor: '#000000',
                marginTop: '1%',
              }}
              inputStyles={{
                color: '#000000',
                textAlign: 'center',
                padding: '3%',
              }}
              dropdownTextStyles={{color: '#000000'}}
              setSelected={setCategory}
              data={data}
            />
          </View>
          <View style={style.menuStyle}>
            <TextInput
              onChangeText={setNote}
              style={style.inputnote}
              value={Text}
              onChange={updateExpenseinfor}
              placeholder="Add a Note"
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              // backgroundColor: 'red',
              height: '10%',
              marginTop: '4%',
            }}>
            {/* <View> */}
              <TouchableOpacity
                style={style.btnAdd}
                onPress={saveExpensesToUserDevice}
                onPressIn={addExpense}>
                <Text style={style.btntxt}>Add</Text>
              </TouchableOpacity>
            {/* </View> */}
            {/* <View> */}
              <TouchableOpacity
                style={style.btnAdd}
                onPress={() => navigation.navigate('Image')}>
                <Text style={style.btntxt}>Upload Image</Text>
              </TouchableOpacity>
            {/* </View> */}
            {/* <View > */}
              <TouchableOpacity
                style={style.btnView}
                onPress={() => navigation.navigate('Resault')}>
                <Text style={style.btntxt}>View Expenses</Text>
              </TouchableOpacity>
            {/* </View> */}
            <Add/>
      </View>
        </View>
      </View>
      <View style={style.FooterView}>
        <Footer screenName1="Resault" screenName2="Home" />
      </View>

      {/* <NewFooter /> */}
    </View>
  );
};

const style = StyleSheet.create({
  logo: {
    width: '60%',
    height: '25%',
    marginTop: '5%',
    alignSelf: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '10%',
    color: '#000000',
  },
  input: {
    width: '50%',
    marginTop: '10%',
    borderWidth: 1,
    borderColor: '#000000',
    marginLeft: '10%',
    borderRadius: 30,
    color: '#000000',
    paddingLeft: '5%',
  },
  time: {
    height: '65%',
    width: '50%',
    marginLeft: '10%',
    marginTop: '5%',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  inputAmount: {
    width: '50%',
    borderWidth: 1,
    marginLeft: '10%',
    borderColor: '#000000',
    borderRadius: 30,
    color: '#000000',
    paddingLeft: '5%',
  },
  inputnote: {
    marginLeft: '10%',
    width: '75%',
    borderWidth: 1,
    borderColor: '#000000',
    padding: 13,
    borderRadius: 30,
    color: '#000000',
    paddingLeft: '5%',
  },
  btnAdd: {
    // padding: '3%',
    backgroundColor: '#3291a8',
    width: '25%',
    height: '100%',
    // marginTop: '5%',
    // marginLeft: '15%',
    borderRadius: 30,
  },
  btnView: {
    // padding: '3%',
    backgroundColor: '#3291a8',
    
    // width: 'auto',
    // marginTop: '5%',
    // position: 'absolute',
    // marginLeft: '50%',
    // marginRight: '15%',
    // marginBottom: '5%',
    borderRadius: 30,
  },
  btntxt: {
    textAlign: 'center',
    // justifyContent:'center',
    color: '#000000',
    fontWeight: '500',
  },
  menuStyle: {
    marginBottom: '3%',
  },
  FooterView: {
    bottom: 0,
    position: 'absolute',
    width: '100%',
  },
});

export default Home;
