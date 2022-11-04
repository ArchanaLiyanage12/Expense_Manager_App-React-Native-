/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  ScrollView,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import Footer from '../../Components/Footer';
//  import {CSVLink} from 'react-csv';
// import {jsonToCSV} from  'react-native-csv';
var RNFS = require('react-native-fs');
import XLSX from 'xlsx';
import {writeFile} from 'react-native-fs';



const Resault = () => {
  const [ExpenseArray, SetExpenseArray] = useState([]);
  const [jasonArray, setjasonArray] = useState([]);

  const getData = async () => {
    try {
      const ExpenseArray = await AsyncStorage.getItem('@ExpenseInfo');
      if (ExpenseArray != null) {
        setLoading(ExpenseArray);
        console.log(jasonArray);
        SetExpenseArray(JSON.parse(ExpenseArray));
        // console.log(ExpenseArray);
        console.log(jasonArray);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const markexpenseComplete = expenseId => {
    const newExpenseItem = ExpenseArray.map(item => {
      if (item.id == expenseId) {
        return {...item, complete: true};
      }
    });
    SetExpenseArray(newExpenseItem);
    console.log(newExpenseItem);
  };

  const deleteExpense = expenseId => {
    const newExpenseItem = ExpenseArray.filter(item => item.id != expenseId);
    SetExpenseArray(newExpenseItem);
  };

  const clearExpenses = () => {
    Alert.alert('Confirm', 'Clear all Expenses', [
      {
        text: 'No',
      },
      {
        text: 'Yes',
        onPress: () => SetExpenseArray([]),
      },
    ]);
  };
  const ListItem = ({expense}) => {
    return (
      <View>
        <View style={style.list}>
          <Text style={style.savetxt}>{expense?.date}</Text>
          <Text style={style.savetxt}>{expense?.Amount}</Text>
          <Text style={style.savetxt}>{expense?.Category}</Text>
          <Text style={style.savetxt}>{expense?.Note}</Text>
          <TouchableOpacity
            style={style.dltbtn}
            onPress={() => deleteExpense(expense.id)}>
            <Icon name="delete" size={20} color={'#FFFFFF'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  const saveExpenseToUserDevice = async () => {
    try {
      const stringifyExpenseArray = JSON.stringify(ExpenseArray);
      await AsyncStorage.setItem('@ExpenseInfo', stringifyExpenseArray);
    } catch (error) {
      console.log(error);
    }
    console.log('saving data to  local storage from result screen');
  };

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    saveExpenseToUserDevice();
  }, [saveExpenseToUserDevice]);

  // Firebase
  const [loading, setLoading] = useState(true);
  const [ArrayFirebase, setArrayFirebase] = useState([]);
  const ref = firestore().collection('Expenses');

  React.useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const {date, amount, complete, category, note} = doc.data();
        list.push({
          id: doc.id,
          date,
          amount,
          category,
          note,
          complete,
        });
      });

      setArrayFirebase(list);
      console.log(ArrayFirebase);

      if (loading) {
        setLoading(false);
        console.log(ArrayFirebase);
      }
    });
  }, []);

  // const headers = [
  //   {
  //     label: 'Date',
  //     key: 'date',
  //   },
  //   {
  //     label: 'amount',
  //     key: 'Amount',
  //   },
  //   {
  //     label: 'category',
  //     key: 'Category',
  //   },
  //   {
  //     label: 'note',
  //     key: 'Note',
  //   }
  // ];
  // const csvLink = {
  //   headers: headers,
  //   data: ExpenseArray,
  //   filename: 'Expenses.csv',
  // };
  // const csvfile = ()=>{
  //   const result = jsonToCSV(ExpenseArray);
  // }
  // function to handle exporting
  const exportDataToExcel = () => {
    // Created Sample data
    let sample_data_to_export = [
      {id: '1', name: 'First User'},
      {id: '2', name: 'Second User'},
    ];

    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(ExpenseArray);
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
    

    // Write generated excel to Storage
  //   RNFS.writeFile(
  //     RNFS.ExternalStorageDirectoryPath + '/my_exported_file.xlsx',
  //     wbout,
  //     'ascii',
  //   )
  //     .then(r => {
  //       console.log('Success');
  //     })
  //     .catch(e => {
  //       console.log('Error', e);
  //     });
  // };
    writeFile(
      RNFS.DownloadDirectoryPath + '/Expensesumary.csv',
      wbout,
      'ascii',

    )
    .then(res =>{
      alert('Export data successfully')
    })
    .catch(e =>{
      console.log('Error writeFile',e)
    }) ;

    };




  // const exportData = ()=>{
  //   var data = [
  //     {name: 'John', city: 'Seattle'},
  //     {name: 'Mike', city: 'Los Angeles'},
  //     {name: 'Zach', city: 'New York'},
  //   ];

  //   var ws = XLSX.utils.json_to_sheet(data);

  //   var wb = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(wb, ws, 'Prova');

  //   const wbout = XLSX.write(wb, {type: 'binary', bookType: 'xlsx'});
  //   var RNFS = require('react-native-fs');
  //   var file = RNFS.ExternalStorageDirectoryPath + '/test.xlsx';
  //   console.log(file);
  //    console.log(ws);
  //     // console.log(wb);
  //   writeFile(file, wbout, 'ascii')
  //     .then(r => {
  //       /* :) */
  //     })
  //     .catch(e => {
  //       /* :( */
  //     });
  // }
   const handleClick = async () => {
     try {
       // Check for Permission (check if permission is already given or not)
       let isPermitedExternalStorage = await PermissionsAndroid.check(
         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
       );

       if (!isPermitedExternalStorage) {
         // Ask for permission
         const granted = await PermissionsAndroid.request(
           PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
           {
             title: 'Storage permission needed',
             buttonNeutral: 'Ask Me Later',
             buttonNegative: 'Cancel',
             buttonPositive: 'OK',
           },
         );

         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
           // Permission Granted (calling our exportDataToExcel function)
           exportDataToExcel();
           console.log('Permission granted');
         } else {
           // Permission denied
           console.log('Permission denied');
         }
       } else {
         // Already have Permission (calling our exportDataToExcel function)
         exportDataToExcel();
       }
     } catch (e) {
       console.log('Error while checking permission');
       console.log(e);
       return;
     }
   };

  

  return (
    <View style={{flex: 1, backgroundColor: '#add9e6'}}>
      <View>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{marginLeft: '5%', marginTop: '5%'}}
            onPress={handleClick}>
            <Icon size={25} name="file-download" color="#3291a8" />
          </TouchableOpacity>

          <TouchableOpacity
            style={{marginLeft: '70%', marginTop: '5%'}}
            onPress={clearExpenses}>
            <Icon size={25} name="delete" color="red" />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: '#000000'}}>
            {JSON.stringify(ExpenseArray.date)}
          </Text>
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{padding: 20, paddingBottom: 100}}
          data={ExpenseArray}
          renderItem={({item}) => <ListItem expense={item} />}
        />
      </View>
      <View style={{position: 'absolute', bottom: 0, width: '100%'}}>
        <Footer screenName1="Resault" screenName2="Home" />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  list: {
    padding: '5%',
    backgroundColor: '#FFFFFF',
    marginTop: '5%',
    borderRadius: 30,
    elevation: 12,
    marginVertical: 10,
  },
  savetxt: {
    fontWeight: 'bold',
    fontSize: 15,
    color: '#000000',
    paddingLeft: '5%',
  },
  dltbtn: {
    height: '50%',
    backgroundColor: 'red',
    position: 'absolute',
    marginLeft: '80%',
    marginTop: '12%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  dltallbtn: {
    marginLeft: '80%',
    marginTop: '10%',
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Resault;

