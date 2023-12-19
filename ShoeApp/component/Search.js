import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const Search = () => {
  const [searchtext, setsearchtext] = useState('');
  const [products, setproducts] = useState([]);
  // console.log(products);
  useEffect(() => {
    fetch('https://hungnttg.github.io/shopgiay.json')
      .then((response) => response.json())
      .then((data) => setproducts(data.products))
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchProducts = async () => {
    try {
      const response = await fetch('https://hungnttg.github.io/shopgiay.json');
      const data = await response.json();

      if (data && data.products) {
        const filteredProducts = data.products.filter((product) => product.product_additional_info.toLowerCase().indexOf(searchtext.toLowerCase()) !== -1);
        setproducts(filteredProducts);

      } else {
        console.error('Invalid data format or missing "products" property');
      }
    } catch (error) {
      console.error(error);

    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productFrame}>
      <Image source={{ uri: item.search_image }} style={styles.productImage} />
      <View style={{ flexDirection: 'column' }} >
        <Text style={styles.productAdditionalInfo}>{item.product_additional_info}</Text>
        <Text style={styles.price}>Price: {item.price}</Text>
      </View>
    </View>
  );

  return (
    <View >
      <View style={{ flexDirection: 'row' }}>
        <TextInput
          style={styles.textInput}
          placeholder='Search'
          value={searchtext}
          onChangeText={setsearchtext}
        />
        <View style={styles.search} >
          <TouchableOpacity onPress={searchProducts}>
            <Image source={require('../image/search.png')} />
          </TouchableOpacity>
        </View>
      </View>
      {products.length < 1 && <Text style={{ fontSize: 20, textAlign: 'center', }}>ko có sp nào</Text>}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.styleid.toString()}

      />

    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 8,
    marginBottom: 16,
    width: 320,
    marginLeft: 16,
    marginTop: 35
  },
  productFrame: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    marginLeft: 10
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray'
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productAdditionalInfo: {
    fontSize: 14,
    color: 'gray',
  },
  price: {
    fontSize: 14,
    color: 'black',
  },
  search: {
    height: 40,
    width: 40,
    marginLeft: 20,
    marginTop: 42
  }
})
export default Search;